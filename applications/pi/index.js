/**
 * Created by Jairo Martinez on 2/3/15.
 */

// LCD pin name  RS EN  DB4 DB5 DB6 DB7
// Arduino pin # 7  8   9   10  11  12

const RS = 7;
const EN = 6;
const D4 = 5;
const D5 = 4;
const D6 = 3;
const D7 = 2;

var five = require("johnny-five");
var gpio = require("gpio");

var board = {};
var	btn1,btn2,btn3,btn4,btn5;
var	led = {};
var	pot = {};
var lcd = {};

var	gpio25 = {};
var	gpio24 = {};

var itm = {};
var strLn1 = "";
var strLn2 = "";
var strLn3 = "";
var strLn4 = "";

var minVal = 0;
var maxVal = 0;
var setLed = 0;

var data = {
	line1: '',
	line2: '',
	line3: '',
	line4: ''
};

var setLedR = true;
var setLedG = false;

////////////////////////////////////////////////////////////////////
//

function init(){

	gpio25 = gpio.export(25, {
		ready: function() {
			itm = setInterval(function() {
				gpio25.set();
				setTimeout(function() { gpio25.reset(); }, 500);
			}, 1000);
		}
	});

	gpio24 = gpio.export(24, {
		ready: function() {
			gpio25.on("change", function(val) {
				gpio24.set(1 - val); // set gpio24 to the opposite value
			});
		}
	});
}


function print() {
	lcd.clear();

	lcd.cursor(0, 0);
	lcd.print(strLn1);

	lcd.cursor(1, 0);
	lcd.print(strLn2);

	lcd.cursor(2, 0);
	lcd.print(strLn3);

	lcd.cursor(3, 0);
	lcd.print(strLn4);
}

function println(i,str) {
	lcd.cursor(i, 0);
	lcd.print("                    ");
	lcd.cursor(i, 0);
	board.wait(50, function() {
		lcd.print(str);
	});
}

////////////////////////////////////////////////////////////////////
//

board = new five.Board({
	port: "/dev/ttyAMA0"
});

console.log(board);

board.on("ready", function() {

	console.log("Johnny 5 Is Alive");

	btn1 = new five.Button(8);
	btn2 = new five.Button(9);
	btn3 = new five.Button(13);
	btn4 = new five.Button(11);
	btn5 = new five.Button(12);

	led  = new five.Led(10);

	pot = new five.Sensor({
		pin: "A2",
		freq: 250
	});

	lcd = new five.LCD({
		pins: [RS, EN, D4, D5, D6, D7],
		rows: 4,
		cols: 20
	});

	btn1.on("down", function () {
		console.log("btn red down");
		strLn3 = "Button Red Down";
		println(3,strLn3);
	}); // Button 1 Down Event

	btn2.on("down", function () {
		console.log("btn green down");
		strLn3 = "Button Green Down";
		println(3,strLn3);
	});

	btn3.on("down", function () {
		console.log("btn blue down");
		strLn3 = "Button Blue Down";
		println(3,strLn3);
	});

	btn4.on("down", function () {
		console.log("btn yellow down");
		strLn3 = "Button Yellow Down";
		println(3,strLn3);
	});

	btn5.on("down", function () {
		console.log("btn white down");
		strLn3 = "Button White Down";
		println(3,strLn3);
	});

	board.repl.inject({
		led: led,
		pot: pot
	});

	pot.on("data", function() {

		if(this.value < minVal || this.value > maxVal)
		{
			if(this.value > 5) { minVal = this.value - 5; }
			else { minVal = 0; }

			if(this.value < 1018) { maxVal = this.value + 5; }
			else { maxVal = 1023; }

			setLed = (this.value / 4);
			led.fade( parseInt(setLed), 250 );
			console.log(this.value);
		}
	});

	lcd.on("ready", function() {

		strLn1 = "Technilinx Node.js";
		strLn2 = "WebServer:";
		strLn3 = "";
		strLn4 = "";

		print();
	});
});

////////////////////////////////////////////////////////////////////
//

process.on('disconnect', function () {
	console.log('Parent Closed Channel - Shutting Down Pi Service');
	process.exit();
});

process.on('message', function (msg) {
	switch (msg.type) {
		case 'stop': {
			process.exit();
			break;
		}
		case 'restart': {
			break;
		}
		case 'init': {
			init(msg.data);
			break;
		}
		default: {
			break;
		}
	}
});


