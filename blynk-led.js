#!/usr/bin/env node

var Blynk = require('blynk-library');
require('shelljs/global');
var AUTH = 'CHANGEME';

var blynk = new Blynk.Blynk(AUTH, options = {
  connector : new Blynk.TcpClient()
});
//var blynk = new Blynk.Blynk(AUTH);
//button 1
var red=0;
var green=0;
var blue=0;
var onoff=0;

var v1 = new blynk.VirtualPin(1);
//combined rgp
var v2 = new blynk.VirtualPin(2);
var v3 = new blynk.VirtualPin(3);
var v4 = new blynk.VirtualPin(4);
//button 2
var v5 = new blynk.VirtualPin(5);
//terminal
//led output 
var v7 = new blynk.VirtualPin(7);
//general write
var v8 = new blynk.VirtualPin(8);
//RGB Sliders 
var v10 = new blynk.VirtualPin(10);
var v11 = new blynk.VirtualPin(11);
var v12 = new blynk.VirtualPin(12);


//console
var term = new blynk.WidgetTerminal(9);

term.on('write', function(data) {
  term.write('You wrote:' + data + '\n');
  blynk.notify("HAHA! " + data);
});

v1.on('write', function(param) {
  console.log('V1:', param[0]);
  onoff=param[0];
  console.log('Setting LEDs:'+param[0]+'\n');
  run();
});

v2.on('write', function(param) {
  console.log('V2:[0]', param[0]);
  console.log('V2:[1]', param[1]);
  console.log('V2:[2]', param[2]);
});
v3.on('write', function(param) {
  console.log('V3:', param[0]);
});
v4.on('write', function(param) {
  console.log('V4:', param[0]);
});
v5.on('write', function(param) {
  console.log('V5:', param[0]);
  run();
});
v7.on('read', function() {
//  console.log('V7:', onoff);
  v7.write(onoff);
});
v8.on('read', function() {
  v8.write(new Date().getSeconds());
});
v10.on('write', function(param) {
  console.log('V10 - Red:', param[0]);
  red=param[0];
});
v11.on('write', function(param) {
  console.log('V11 - Green:', param[0]);
  green=param[0];
});
v12.on('write', function(param) {
  console.log('V12 - Blue:', param[0]);
  blue=param[0];
});

term.on('write', function(data) {
  term.write('You wrote:' + data + '\n');
  blynk.notify("HAHA! " + data);
});

function off() {
 exec ("./ledstripCLI.py -s Off ");
}
function run() {
  if (onoff==0){
  console.log("LEDs OFF");
  off();
  } else {
  console.log("LEDs On");
  str="./ledstripCLI.py -r ";
  str+=red;
  str+=" -g ";
  str+=green;
  str+=" -b ";
  str+=blue;
  console.log(str);
  exec(str);
  }

}
