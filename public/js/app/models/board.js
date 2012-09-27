var Board = Backbone.Model.extend({
  // urlRoot: 'http://localhost:52556/Service1.svc/GetAppointment',
  defaults: function() {
    return {
      x_count: 0,
      o_count: 0,
      tile_count: 9,
      pieces: [
                ['','',''],
                ['','',''],
                ['','','']
              ]
    }
  },

  playTurn: function(row, col) {
    window.socket.emit('turnPlayed', {
      row: row,
      col: col
    });

    if (this.get('pieces')[row][col] == '' && !this.get('game_over')) {
      var x_count = parseInt(this.get('x_count'));
      var o_count = parseInt(this.get('o_count'));

      var newPieces = this.get('pieces').slice(0);

      var mark;
      if (x_count > o_count) {
        mark = "O";
        newPieces[row][col] = mark;
        o_count++;
        this.set('o_count', o_count);
      } else {
        mark = "X";
        newPieces[row][col] = mark;
        x_count++;
        this.set('x_count', x_count);
      }
      
      this.pieces = newPieces;

      //check end conditions
      this.checkEndConditions(row, col, mark);
    }
  },

  checkEndConditions: function(row, col, mark) {
    var n = Math.sqrt(parseInt(this.get('tile_count')));

    //check col
    for(i = 0; i < n; i++) {
      if(this.get('pieces')[row][i] != mark) break;
      if(i == n-1) {
        //report win for mark
        alert('winner: ' + mark);
        this.set('game_over', true);
      }
    }

    //check row
    for(i = 0; i < n; i++) {
      if(this.get('pieces')[i][col] != mark) break;
      if(i == n-1) {
        //report win for mark
        alert('winner: ' + mark);
        this.set('game_over', true);
      }
    }

    //check diag
    if(row == col) {
      //we're on a diagonal
      for(i = 0; i < n; i++) {
        if(this.get('pieces')[i][i] != mark) break;
        if(i == n-1) {
          //report win for mark
          alert('winner: ' + mark);
          this.set('game_over', true);
        }
      }
    }

    //check anti diag
    for(i = 0; i < n; i++) {
      if(this.get('pieces')[i][(n-1)-i] != mark) break;
      if(i == n-1) {
        //report win for mark
        alert('winner: ' + mark);
        this.set('game_over', true);
      }
    }

    //check draw
    if((parseInt(this.get('x_count')) + parseInt(this.get('o_count'))) == this.get('tile_count')) {
      //report draw
      alert('draw!');
      this.set('game_over', true);
    }
  }

});