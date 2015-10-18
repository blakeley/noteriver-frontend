/* global Trianglify */

import Ember from 'ember';

export default Ember.Component.extend({
  triangles: Ember.computed('width', 'height', function(){
    var width = 1440;
    var height = 700;

    var colorFunction = function(x, y){
      var color1 = [30,58,87]; // $primary-color-darker
      var color2 = [114, 159, 207];
      var distance = Math.sqrt(Math.pow(x - 1/2, 2) + Math.pow(y - 1, 2));
      var maxDistance = 0.9;
      var percentage = Math.min(distance / maxDistance, 1);

      var red = parseInt(color1[0] * percentage + color2[0] * (1-percentage));
      var green = parseInt(color1[1] * percentage + color2[1] * (1-percentage));
      var blue = parseInt(color1[2] * percentage + color2[2] * (1-percentage));

      return `rgb(${red}, ${green}, ${blue})`;
    };

    var pattern = new Trianglify({
      height: height,
      width: width,
      cell_size: 60,
      color_function: colorFunction,
    });

    return pattern.svg();
  }),

  didInsertElement: function(){
  },
});
