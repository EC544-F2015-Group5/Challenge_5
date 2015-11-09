var SerialPort = require("serialport");
var app = require('express')();
var express = require('express');
var app = express();
var xbee_api = require('xbee-api');
var http = require('http').Server(app);
var ejs = require('ejs');
var math = require('mathjs');
//var path = require('path');
app.get('/', function(req, res) {
  res.render('index');
});
app.use('/', express.static(__dirname + '/views'), function(req, res, next) {
  console.log("Client: Page loaded.");
});
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//connect to the MySQL

//app.use(express.static(path.join(__dirname, 'views')));
  app.set
//is necessary for parsing POST request
//app.use(express.bodyParser());
http.listen(3000, function() {
  console.log('listening on *:3000');
});
//app.listen(3000);
var C = xbee_api.constants;
var XBeeAPI = new xbee_api.XBeeAPI({
  api_mode: 2
});

var portName = process.argv[2];

var sampleDelay = 3000;


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
var s = [];
var distance  = [];
var d = [];
var arr = [];
XBeeAPI.on("frame_object", function(frame) {
  if (frame.type == 144){
    console.log("Beacon ID: " + frame.data[1] + ", RSSI: " + (frame.data[0]));
    var fs = require('fs');
    //s.push(frame.data[0]+'\r\n');
    var A = -45.0;
    var n = 2.2;
    distance =math.round(math.pow(10.0,(A + frame.data[0])/(10.0*n)),3);

    s=[{x:0,y:13},{x:13,y:13},{x:13,y:0}];
    d = { z:distance};
    /*var keys = Object.keys(s[0]);
var csv = [keys.join('\t')];
s.forEach(function (data) {
  var row = [];
  keys.forEach(function (key) {
    row.push(data[key]);
  });
  csv.push(row.join('\t'));
});
csv = csv.join('\t');
console.log(csv);*/
var str = JSON.stringify(s);
fs.writeFile("C:/Users/HP/Desktop/RSSI_INO/views/data.json",str , function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");

}); 
arr =[{x:0,y:13,z:5,p:1},{x:4,y:9,z:5,p:2},{x:13,y:0,z:5,p:3}];
var st = JSON.stringify(arr);
  fs.writeFile("C:/Users/HP/Desktop/RSSI_INO/views/lookuptable.json",st , function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
    
});   
 /* var PythonShell = require('python-shell');
//you can use error handling to see if there are any errors
PythonShell.run('knn.py', function (err, results) { 
if (err) throw err;
});*/
  

}
});
var s = []; var xa = []; var ya =[]; var za = [];
var fs = require("fs");
 
// Get content from file
 var contents = fs.readFileSync("C:/Users/HP/Desktop/RSSI_INO/views/lookuptable.json");
// Define to JSON type
// var str = JSON.stringify(contents);
 var json = JSON.parse(contents);
   // console.log(json); // this will show the info it in firebug console
  //console.log(json[0].x);
var A = -45.0;
    var n = 2.2;
    for(var i = 0; i<json.length; i++){
     xa = math.round(math.pow(10.0,(A + json[i].x)/(10.0*n)),3);
     ya = math.round(math.pow(10.0,(A + json[i].y)/(10.0*n)),3);
     za = math.round(math.pow(10.0,(A + json[i].z)/(10.0*n)),3);
 
//var x = (pow(json.x/2,2)-pow(json.y/2,2)+pow(i,2))/(2*i);
//var y = -1 * sqrt(pow(r3,2)-pow(x,2))+j;

var A = 26; var B = 0; var C = math.pow(xa,2) - math.pow(ya,2)+169;

var D = 0; var E = -26; var F = math.pow(ya,2) - math.pow(za,2)-169;

var a = math.round(((C*D ) - (F*A)) /((B*D)-(E*A)),3);  var b =math.round(((A*E ) - (D*B)) /((C*E)-(F*B)),3); 
 s .push([{x:a,y:b}]);


}
console.log(s);
var str = JSON.stringify(s);

fs.writeFile("C:/Users/HP/Desktop/RSSI_INO/views/loc.json",str , function(err) {
    if(err) {

        return console.log(err);
    

}

});