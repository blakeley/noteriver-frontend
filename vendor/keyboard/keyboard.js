MidiNumber = function(number){
  this.number = number;
}

MidiNumber.prototype = {
  get isEbony(){
    return !![1,3,6,8,10].contains(this.number % 12);
  },
  get isIvory(){
    return !this.isEbony;
  },
  get width(){
    if(this.isIvory){
      return keyboard.IVORY_WIDTH;
    } else {
      return keyboard.EBONY_WIDTH;
    }
  },
  get offset(){
    return Math.floor(this.number / 12) * keyboard.IVORY_WIDTH * 7 + keyboard.OFFSETS[this.number % 12];
  },
  get noteColors(){
    if(this.isIvory){
      return keyboard.IVORY_NOTE_COLORS;
    } else {
      return keyboard.EBONY_NOTE_COLORS;
    }
  },
  get keyColors(){
    if(this.isIvory){
      return keyboard.IVORY_KEY_COLORS;
    } else {
      return keyboard.EBONY_KEY_COLORS;
    }
  },
}

function Keyboard() {
  this.IVORY_WIDTH = 24 / 24;
  this.EBONY_WIDTH = 14 / 24;
  this.IVORY_HEIGHT = 132 / 24; // IVORY_WIDTH * 5.5
  this.EBONY_HEIGHT = 77 / 24; // EBONY_WIDTH * 5.5
  this.OFFSETS = [0, 15, 24, 44, 48, 72, 85, 96, 113, 120, 141, 144].map(function(offset){return offset / 24;});
  this.MIDI_NUMBERS = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
    34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67,
    68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
    85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
    101, 102, 103, 104, 105, 106, 107, 108].map(function(number){return new MidiNumber(number);});
  this.IVORY_KEY_COLORS = ['#729FCF', '#8AE234', '#FCEB57', '#FCAF3E', '#EE5E5E', '#AD68B4'];
  this.EBONY_KEY_COLORS = ['#3768A5', '#569D11', '#DAC300', '#F57900', '#E93131', '#6C4C71'];
  this.IVORY_NOTE_COLORS = ['#95B7DB', '#AAEA6A', '#FCF084', '#FCC36E', '#F28989', '#CCA1D0'];
  this.EBONY_NOTE_COLORS = ['#4975AE', '#6AA92D', '#E2D038', '#F79433', '#ED5656', '#8A708D'];
}

Keyboard.prototype = {
  get EBONY_MIDI_NUMBERS(){
    return keyboard.MIDI_NUMBERS.filter(function(midiNumber){
      return midiNumber.isEbony;
    });
  },

  get IVORY_MIDI_NUMBERS(){
    return keyboard.MIDI_NUMBERS.filter(function(midiNumber){
      return midiNumber.isIvory;
    });    
  },
}

var keyboard = new Keyboard();
