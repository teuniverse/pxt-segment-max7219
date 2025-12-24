/**
 * Segment block for Segment Display Module - 8 Character - Decimal - MAX7219
 * See also: https://www.tinytronics.nl/en/displays/segments/segment-display-module-8-character-decimal-red-max7219
 */

/**
 * Segment blocks
 */
//% weight=100 color=#0fbc11 icon="\uf26c" block="Segment (MAX7219)"
namespace Segment_MAX7219 {
  let MAX7219_DIN = DigitalPin.P9;
  let MAX7219_CS = DigitalPin.P8;
  let MAX7219_CLK = DigitalPin.P16;

  let LSBFIRST = 0;
  let MSBFIRST = 1;

  function shiftOut(
    dataPin: DigitalPin,
    clockPin: DigitalPin,
    bitOrder: number,
    val: number
  ): void {
    for (let i = 0; i < 8; i++) {
      let bit: number;
      if (bitOrder == 0) {
        // LSBFIRST = 0
        bit = (val >> i) & 1;
      } else {
        // MSBFIRST = 1
        bit = (val >> (7 - i)) & 1;
      }
      pins.digitalWritePin(dataPin, bit);
      pins.digitalWritePin(clockPin, 1);
      pins.digitalWritePin(clockPin, 0);
    }
  }

  function output(address: number, data: number): void {
    pins.digitalWritePin(MAX7219_CS, 0);
    shiftOut(MAX7219_DIN, MAX7219_CLK, MSBFIRST, address);
    shiftOut(MAX7219_DIN, MAX7219_CLK, MSBFIRST, data);
    pins.digitalWritePin(MAX7219_CS, 1);
  }

  function initialize(): void {
    pins.digitalWritePin(MAX7219_CS, 1);

    output(0x0f, 0x00); //display test register - test mode off
    output(0x0c, 0x01); //shutdown register - normal operation
    output(0x0b, 0x07); //scan limit register - display digits 0 thru 7
    output(0x0a, 0x08); //intensity register - max brightness
    //output(0x09, 0xff); //decode mode register - CodeB decode all digits
    output(0x09, 0x00); // no decode mode
  }
  initialize();

  // https://www.jameco.com/Jameco/workshop/TechTip/working-with-seven-segment-displays.html
  const segDigits: number[] = [
    0b01111110, // 0
    0b00110000, // 1
    0b01101101, // 2
    0b01111001, // 3
    0b00110011, // 4
    0b01011011, // 5
    0b01011111, // 6
    0b01110000, // 7
    0b01111111, // 8
    0b01110011, // 9
  ];

  /**
   * Display
   */
  //% block
  export function display(
    seg1: number,
    seg2: number,
    seg3: number,
    seg4: number,
    seg5: number,
    seg6: number,
    seg7: number,
    seg8: number
  ): void {
    output(0x08, (seg1 & 0x80) + segDigits[seg1 & 0x7f]); //digit 7 (leftmost digit) data
    output(0x07, (seg2 & 0x80) + segDigits[seg2 & 0x7f]);
    output(0x06, (seg3 & 0x80) + segDigits[seg3 & 0x7f]);
    output(0x05, (seg4 & 0x80) + segDigits[seg4 & 0x7f]);
    output(0x04, (seg5 & 0x80) + segDigits[seg5 & 0x7f]);
    output(0x03, (seg6 & 0x80) + segDigits[seg6 & 0x7f]);
    output(0x02, (seg7 & 0x80) + segDigits[seg7 & 0x7f]);
    output(0x01, (seg8 & 0x80) + segDigits[seg8 & 0x7f]); //digit 0 (rightmost digit) data*/
  }

  const segChars: number[] = [
    /*  00 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /*  16 */ 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /*  32 */ 0, 0, 0, 0, 0, 0, 0,
    0b00100000, 0, 0, 0, 0, 0, 0b00000001, 0, 0, /*  48 */ 0b01111110,
    0b00110000, 0b01101101, 0b01111001, 0b00110011, 0b01011011, 0b01011111,
    0b01110000, 0b01111111, 0b01110011, 0, 0, 0, 0b00001001, 0, 0, /*  64 */ 0,
    0b01110111, 0b00011111, 0b01001110, 0b00111101, 0b01001111, 0b01000111,
    0b01111011, 0b00110111, 0b00110000, 0b00111000, 0 /*K*/, 0b00001110,
    0 /*M*/, 0b01110110, 0b01111110, /*  80 */ 0b01100111, 0b01110011,
    0b00000101, 0b01011011, 0b00001111, 0b00111110, 0b00111110 /*V*/, 0 /*W*/,
    0b00110111 /*X*/, 0b00111011, 0b01101101, 0b01001110, 0, 0b01111000, 0,
    0b00001000, /*  96 */ 0, 0b01110111, 0b00011111, 0b01001110, 0b00111101,
    0b01001111, 0b01000111, 0b01111011, 0b00110111, 0b00110000, 0b00111000,
    0 /*k*/, 0b00001110, 0 /*m*/, 0b00010101, 0b01111110, /* 112 */ 0b01100111,
    0b01110011, 0b00000101, 0b01011011, 0b00001111, 0b00111110,
    0b00111110 /*v*/, 0 /*w*/, 0b00110111 /*x*/, 0b00111011, 0b01101101, 0, 0,
    0, 0, 0, /* 128 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    /* 144 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /* 160 */ 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /* 176 */ 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, /* 192 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, /* 208 */ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /* 224 */ 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /* 240 */ 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,

    /*  0b01111110, // 0
        0b00110000, // 1
        0b01101101, // 2
        0b01111001, // 3
        0b00110011, // 4
        0b01011011, // 5
        0b01011111, // 6
        0b01110000, // 7
        0b01111111, // 8
        0b01110011  // 9*/
  ];

  /**
   * Display text
   */
  //% block
  export function displayText(text: string): void {
    let i = 8;
    while (i >= 1) {
      let charCode =
        8 - i <= text.length ? text.charCodeAt(8 - i) : " ".charCodeAt(0);
      output(i, (charCode & 0x80) + segChars[charCode & 0x7f]);
      i--;
    }
  }

  /**
   * Display time
   */
  //% block
  export function displayTime(
    hours: number,
    minutes: number,
    seconds: number,
    seconds_100: number
  ): void {
    let dot = 128;
    display(
      hours / 10,
      dot + (hours % 10),
      minutes / 10,
      dot + (minutes % 10),
      seconds / 10,
      dot + (seconds % 10),
      seconds_100 / 10,
      seconds_100 % 10
    );
  }

  /**
   * Display date
   */
  //% block
  export function displayDate(day: number, month: number, year: number): void {
    let dot = 128;
    display(
      day / 10,
      dot + (day % 10),
      month / 10,
      dot + (month % 10),
      year / 1000,
      (year % 1000) / 100,
      (year % 100) / 10,
      year % 10
    );
  }

  /**
   * Display coordinate
   */
  //% block
  export function displayCoordinate(lat_lon: string, value: number): void {
    let value_1000 = Math.round(value * 1000);
    let value_1000_str = value_1000.toString();
    let add_space_count = 7 - value_1000_str.length;
    let spaces = "";
    for (let i = 0; i < add_space_count; i++) {
      spaces = spaces + " ";
    }
    let dotPos = 4;
    let dot = 128;

    let firstChar = lat_lon.length > 0 ? lat_lon[0] : " ";
    let display = firstChar + spaces + value_1000_str;
    display =
      display.slice(0, dotPos) +
      String.fromCharCode(display.charCodeAt(dotPos) + dot) +
      display.slice(dotPos + 1);
    displayText(display);
  }

  /**
   * Set brightness
   */
  //% block="set segment brightness to: $brightness"
  //% brightness.min=0 brightness.max=15
  export function setBrightness(brightness: number) {
    if (brightness >= 0 && brightness <= 0x0f) {
      output(0x0a, brightness); //intensity register - max brightness = 0x0f
    }
  }

  /**
   * Test
   */
  //% block
  export function test(): void {
    output(0x0f, 0x00); //display test register - test mode off
    output(0x0c, 0x01); //shutdown register - normal operation
    output(0x0b, 0x07); //scan limit register - display digits 0 thru 7
    output(0x0a, 0x0f); //intensity register - max brightness
    output(0x09, 0xff); //decode mode register - CodeB decode all digits
    output(0x08, 0x0c); //digit 7 (leftmost digit) data
    output(0x07, 0x0b);
    output(0x06, 0x0d);
    output(0x05, 0x0e);
    output(0x04, 0x08);
    output(0x03, 0x07);
    output(0x02, 0x06);
    output(0x01, 0x05); //digit 0 (rightmost digit) data
  }
}
