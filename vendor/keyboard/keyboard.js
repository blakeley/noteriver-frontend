

var keyboard = {
  note: function(pitch) {
    return {
      isEbony: function(){
        return !![1,3,6,8,10].contains(pitch % 12);
      },
      isIvory: function(){
        return ![1,3,6,8,10].contains(pitch % 12);
      }
    }    
  }
}