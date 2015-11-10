var SerialPort = require("serialport");
var express = require('express');
var app = express();
var path = require('path');
var xbee_api = require('xbee-api');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var C = xbee_api.constants;
var XBeeAPI = new xbee_api.XBeeAPI({
  api_mode: 2
});

var max = 0;
var portName = process.argv[2];

var sampleDelay = 3000;

// Map for xbee1
var map1 = new Array();
map1[0] = new Array(36,37,41,46,49);
map1[1] = new Array(50,55,57,59,61);
map1[2] = new Array(62,65,68,69,71);
map1[3] = new Array(72,73,74,75,76);
map1[4] = new Array();
map1[5] = new Array();
map1[6] = new Array();
map1[7] = new Array();
map1[8] = new Array();


//Map for xbee2
var map2 = new Array();
map2[0] = new Array(46,48,49,50,51)
map2[1] = new Array(52,57,58,60,67);
map2[2] = new Array(68,70,72,74,76);
map2[3] = new Array(73,73,73,75,75);
map2[4] = new Array();
map2[5] = new Array();
map2[6] = new Array();
map2[7] = new Array();
map2[8] = new Array();



//Map for xbee3
var map3 = new Array();
map3[0] = new Array(85,86,87,87,87);
map3[1] = new Array(79,79,79,79,81);
map3[2] = new Array(77,77,78,78,78);
map3[3] = new Array(75,75,76,76,76);
map3[4] = new Array();
map3[5] = new Array();
map3[6] = new Array();
map3[7] = new Array();
map3[8] = new Array();


//Map for xbee4
var map4 = new Array();
map4[0] = new Array(79,79,89,92,96);
map4[1] = new Array(70,71,72,76,79);
map4[2] = new Array(69.69,69,70,72);
map4[3] = new Array(70,70,70,70,70);
map4[4] = new Array();
map4[5] = new Array();
map4[6] = new Array();
map4[7] = new Array();
map4[8] = new Array();

app.use(express.static(path.join(__dirname, 'public')));

//Note that with the XBeeAPI parser, the serialport's "data" event will not fire when messages are received!
portConfig = {
	baudRate: 9600,
  parser: XBeeAPI.rawParser()
};

var sp;
sp = new SerialPort.SerialPort(portName, portConfig);

app.get('/', function(req, res){
  res.sendfile('1.html');
});


// io.on('connection', function(socket){
//   console.log("haha");
// });

http.listen(3000, function(){
  console.log('listening on *:3000');
});

//Create a packet to be sent to all other XBEE units on the PAN.
// The value of 'data' is meaningless, for now.
var RSSIRequestPacket = {
  type: C.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST,
  destination64: "000000000000ffff",
  broadcastRadius: 0x01,
  options: 0x00,
  data: "test"
}

var requestRSSI = function(){
  sp.write(XBeeAPI.buildFrame(RSSIRequestPacket));
}

sp.on("open", function () {
  
  console.log('open');
  requestRSSI();
  setInterval(requestRSSI, sampleDelay);
});

XBeeAPI.on("frame_object", function(frame) {
  if (frame.type == 144){
    //Counting
    var count = new Array(0,0,0,0,0,0,0,0);
    for(var i=0; i<map1.length;i++){
      for(var j=0; j<map1[0].length; j++){
        if(Math.abs(frame.data[0]-map1[i][j])<5){
        count[i]++;
      }
      }
    }
    for(var i=0; i<map2.length;i++){
      for(var j=0; j<map2[0].length; j++){
        if(Math.abs(frame.data[0]-map2[i][j])<5){
        count[i]++;
      }
      }
    }
    for(var i=0; i<map3.length;i++){
      for(var j=0; j<map3[0].length; j++){
        if(Math.abs(frame.data[0]-map3[i][j])<5){
        count[i]++;
      }
      }
    }
    for(var i=0; i<map4.length;i++){
      for(var j=0; j<map4[0].length; j++){
        if(Math.abs(frame.data[0]-map4[i][j])<5){
        count[i]++;
      }
      }
    }
    
    var result =0;
    //Locate the position
    for(var c=0; c<count.length; c++){
        if(count[c]>result){
          result = count[c];
          max = c+1;
        }
    }
     var data = max;
     max=0;
     io.emit('action',data);

    console.log("Area:"+data);
    console.log("Beacon ID: " + frame.data[1] + ", RSSI: " + (frame.data[0]));
  }
});