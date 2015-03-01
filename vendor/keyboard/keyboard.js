function Keyboard() {
  this.IVORY_WIDTH = 24;
  this.EBONY_WIDTH = 14;
  this.X_OFFSETS = [0, 15, 24, 44, 48, 72, 85, 96, 113, 120, 141, 144];
  this.PITCHES = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
    69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
    86, 87, 88];
}

Keyboard.prototype = {
  get value(){
    return 5;
  },
  get value2(){
    return 6;
  },
  get EBONY_PITCHES(){
    return keyboard.PITCHES.filter(function(pitch){
      return keyboard.note(pitch).isEbony; 
    });
  },

  get IVORY_PITCHES(){
    return keyboard.PITCHES.filter(function(pitch){
      return keyboard.note(pitch).isIvory; 
    });    
  },
}

Keyboard.prototype.note = function(pitch) {
  return {
    get isEbony(){
      return !![1,3,6,8,10].contains(pitch % 12);
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
    get x(){
      return Math.floor(pitch / 12) * keyboard.IVORY_WIDTH * 7 + keyboard.X_OFFSETS[pitch % 12];
    }
  }
}


var keyboard = new Keyboard();

/*
var keyboard = {
  IVORY_WIDTH: 24,
  EBONY_WIDTH: 14,
  X_OFFSETS: [0, 15, 24, 44, 48, 72, 85, 96, 113, 120, 141, 144],
  PITCHES: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
    69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
    86, 87, 88],

  get EBONY_PITCHES(){
    return keyboard.PITCHES.filter(function(pitch){
      return keyboard.note(pitch).isEbony; 
    });
  },

  get IVORY_PITCHES(){
    return keyboard.PITCHES.filter(function(pitch){
      return keyboard.note(pitch).isIvory; 
    });    
  },

  note: function(pitch) {
    return {
      get isEbony(){
        return !![1,3,6,8,10].contains(pitch % 12);
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
      get x(){
        return Math.floor(pitch / 12) * keyboard.IVORY_WIDTH * 7 + keyboard.X_OFFSETS[pitch % 12];
      }
    }
  }
}

*/