

var keyboard = {
  IVORY_WIDTH: 24,
  EBONY_WIDTH: 14,
  X_OFFSETS: [0, 15, 24, 44, 48, 72, 85, 96, 113, 120, 141, 144],
  note: function(pitch) {
    return {
      isEbony: function(){
        return !![1,3,6,8,10].contains(pitch % 12);
      },
      isIvory: function(){
        return ![1,3,6,8,10].contains(pitch % 12);
      },
      width: function(){
        if(this.isIvory()){
          return keyboard.IVORY_WIDTH;
        } else {
          return keyboard.EBONY_WIDTH;
        }
      },
      x: function(){
        return Math.floor(pitch / 12) * keyboard.IVORY_WIDTH * 7 + keyboard.X_OFFSETS[pitch % 12];
      }
    }
  }
}