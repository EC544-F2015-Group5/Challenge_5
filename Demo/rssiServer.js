var SerialPort = require("serialport");
var app = require('express')();
var xbee_api = require('xbee-api');

var C = xbee_api.constants;
var XBeeAPI = new xbee_api.XBeeAPI({
  api_mode: 2
});

var max = 0;
var portName = process.argv[2];

var sampleDelay = 3000;

// Map for xbee1
var map1 = new Array();
map1[0] = 30;
map1[1] = 50;
map1[2] = 60;
map1[3] = 72;
map1[4] = new Array();
map1[5] = new Array();
map1[6] = new Array();
map1[7] = new Array();


//Map for xbee2
var map2 = new Array();
map2[0] = 40;
map2[1] = 51;
map2[2] = 63;
map2[3] = 73;
map2[4] = new Array();
map2[5] = new Array();
map2[6] = new Array();
map2[7] = new Array();


//Map for xbee3
var map3 = new Array();
map3[0] = 85;
map3[1] = 78;
map3[2] = 75;
map3[3] = new Array();
map3[4] = new Array();
map3[5] = new Array();
map3[6] = new Array();
map3[7] = new Array();


//Map for xbee4
var map4 = new Array();
map4[0] = 79;
map4[1] = 70;
map4[2] = new Array();
map4[3] = new Array();
map4[4] = new Array();
map4[5] = new Array();
map4[6] = new Array();
map4[7] = new Array();

//Counting
var count = new Array(0,0,0,0,0,0,0,0);


//Note that with the XBeeAPI parser, the serialport's "data" event will not fire when messages are received!
portConfig = {
	baudRate: 9600,
  parser: XBeeAPI.rawParser()
};

var sp;
sp = new SerialPort.SerialPort(portName, portConfig);


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
    for(var i=0; i<map1.length;i++){
        if(Math.abs(frame.data[0]-map1[i])<5){
        count[i]++;
      }
    }
    for(var i=0; i<map2.length;i++){
      for(var j=0; j<map2[0].length; j++){
        if(Math.abs(frame.data[0]-map2[i])<5){
        count[i]++;
      }
      }
    }
    for(var i=0; i<map3.length;i++){
      for(var j=0; j<map3[0].length; j++){
        if(Math.abs(frame.data[0]-map3[i])<5){
        count[i]++;
      }
      }
    }
    for(var i=0; i<map4.length;i++){
      for(var j=0; j<map4[0].length; j++){
        if(Math.abs(frame.data[0]-map4[i])<5){
        count[i]++;
      }
      }
    }
    
    var result = count[0];
    //Locate the position
    for(var c=1; c<count.length; c++){
        if(count[c]>result){
          result = count[c];
          max = c+1;
        }
    }
    console.log("Area:"+max);
    console.log("Beacon ID: " + frame.data[1] + ", RSSI: " + (frame.data[0]));
  }
});