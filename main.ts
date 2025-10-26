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

  /**
   * Initialize
   */
  //% block
  export function initialize(): void {
    pins.digitalWritePin(MAX7219_CS, 1);

    output(0x0f, 0x00); //display test register - test mode off
    output(0x0c, 0x01); //shutdown register - normal operation
    output(0x0b, 0x07); //scan limit register - display digits 0 thru 7
    output(0x0a, 0x08); //intensity register - max brightness
    output(0x09, 0xff); //decode mode register - CodeB decode all digits
  }

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
    output(0x08, seg1); //digit 7 (leftmost digit) data
    output(0x07, seg2);
    output(0x06, seg3);
    output(0x05, seg4);
    output(0x04, seg5);
    output(0x03, seg6);
    output(0x02, seg7);
    output(0x01, seg8); //digit 0 (rightmost digit) data
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
