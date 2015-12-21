import Ember from 'ember';

const { observer } = Ember;

export default Ember.Component.extend({
  classNames: ['score-view'],

  midi: new Midi(),
  time: 0,
  lowNumber: 21,
  highNumber: 108,
  timeScale: 10,

  draw: observer('midi', 'time', function(){
    let canvas = this.$('canvas')[0];
    canvas.width = canvas.width;
    let ctx = canvas.getContext('2d');

    const highMidiNumber = new MidiNumber(this.get('highNumber'));
    const lowMidiNumber = new MidiNumber(this.get('lowNumber'));

    const xScale = window.devicePixelRatio * this.$().width() / (highMidiNumber.offset - lowMidiNumber.offset + keyboard.IVORY_WIDTH);
    const yScale = xScale * this.get('timeScale');

    ctx.translate(0, canvas.height);
    ctx.scale(xScale, -xScale);
    ctx.translate(-lowMidiNumber.offset, 0);

    // piano roll notes
    ctx.save();
    ctx.translate(0, keyboard.IVORY_HEIGHT);
    //ctx.scale(1, this.get('timeScale'));
    ctx.translate(0, -this.get('time') * this.get('timeScale'));
    for(const track of this.get('midi').tracks){
      for(const note of track.notesOnDuring(this.get('time'), this.get('time') + 10)){
        const midiNumber = new MidiNumber(note.number);
        ctx.fillStyle = midiNumber.noteColors[track.index % midiNumber.noteColors.length];
        ctx.strokeStyle = '#202020';

        ctx.lineWidth = midiNumber.width / 16;
        const x = midiNumber.offset + ctx.lineWidth / 2;
        const y = note.onSecond * this.get('timeScale');
        const w = midiNumber.width - ctx.lineWidth;
        const h = note.duration * this.get('timeScale');
        const r = midiNumber.width / 4;

        ctx.beginPath();
        ctx.moveTo(x+r, y);
        ctx.arcTo(x+w, y,   x+w, y+h, r);
        ctx.arcTo(x+w, y+h, x,   y+h, r);
        ctx.arcTo(x,   y+h, x,   y,   r);
        ctx.arcTo(x,   y,   x+w, y,   r);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }
    ctx.restore();

    // Keyboard backdrop 
    ctx.fillStyle = '#2C2C2C';
    ctx.beginPath();
    ctx.rect(lowMidiNumber.offset,0,highMidiNumber.offset - lowMidiNumber.offset + keyboard.IVORY_WIDTH, keyboard.IVORY_HEIGHT);
    ctx.fill();

    // Ivory keys 
    ctx.fillStyle = '#FFFCE5';
    ctx.lineWidth = 0.01;
    for(const midiNumber of keyboard.IVORY_MIDI_NUMBERS){
      const x = midiNumber.offset + ctx.lineWidth;
      const y = 0;
      const width = midiNumber.width * (1 - 2 * ctx.lineWidth);
      const height = keyboard.IVORY_HEIGHT;
      const r = width / 8;

      ctx.beginPath();
      ctx.moveTo(x, y + height);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.lineTo(x + width - r, y)
      ctx.arcTo(x + width, y, x + width, y + r, r);
      ctx.lineTo(x + width, y + height);
      ctx.closePath();
      ctx.fill();
      //ctx.stroke();
    }

    // Ebony keys
    // background
    ctx.fillStyle = '#202020';
    for(const midiNumber of keyboard.EBONY_MIDI_NUMBERS){
      const x = midiNumber.offset;
      const y = keyboard.IVORY_HEIGHT - keyboard.EBONY_HEIGHT;
      const width = keyboard.EBONY_WIDTH;
      const height = keyboard.EBONY_HEIGHT;

      ctx.beginPath();
      ctx.rect(x,y,width,height);
      ctx.fill();
    }



  }),

  didInsertElement: function(){
    let canvas = this.$('canvas')[0];
    const width = this.$().width();
    const height = this.$().height();
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  },


});
