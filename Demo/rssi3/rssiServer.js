var SerialPort = require("serialport");
var express = require('express');
var app = express();
var path = require('path');
var xbee_api = require('xbee-api');
var KNN = require('ml-knn');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var count=0;
var dataset = [];
var dataset1 = [];

var C = xbee_api.constants;
var XBeeAPI = new xbee_api.XBeeAPI({
  api_mode: 2
});

var max = 0;
var portName = process.argv[2];

var sampleDelay = 3000;
 

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
    
    var trainingSet =[];
var predictions = [];
fs.readFile('data.json', function(err, f){
    var array = f.toString().split('\n');
    // use the array
    // console.log(array);
  var jsonstring; 
  var tempArray = [];
  for(var i=0; i<array.length; i++){
    jsonstring = JSON.parse(array[i]);
    tempArray.push(jsonstring['sensor1']);
    tempArray.push(jsonstring['sensor2']);
    tempArray.push(jsonstring['sensor3']);
    tempArray.push(jsonstring['sensor4']);
    trainingSet.push(tempArray);
    predictions.push(jsonstring['p']);
    
  } 
       var knn = new KNN();
      knn.train(trainingSet, predictions);
      
      // dataset[0][count] = frame.data[0];
      dataset.push({
        id: parseInt(frame.data[1]),
        value: parseInt(frame.data[0])
      }
      );
      count++;
      // console.log(count);
      if(count==4){
        dataset.sort(function(a,b){
          return parseInt(a.id) - parseInt(b.id);
        });
        for(var c=0; c < 4; c++){
          // dataset1[c]=dataset.pop.value;
          dataset1.push(dataset[c].value);
        }
        console.log(dataset1);
        var ans = knn.predict([dataset1]);
        console.log(ans);
        io.emit('action',ans);
        count=0;
        dataset=[];
        dataset1=[];
      }
               
});
    console.log("Beacon ID: " + frame.data[1] + ", RSSI: " + (frame.data[0]));
  }
});