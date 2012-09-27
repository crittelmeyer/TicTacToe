var Board = Backbone.Model.extend({
  // urlRoot: 'http://localhost:52556/Service1.svc/GetAppointment',
  defaults: function() {
    return {
      x_count: 3,
      o_count: 2,
      tile_count: 9,
      pieces: [
                ['X','' ,'' ],
                ['O','O','X'],
                ['X','' ,'' ]
              ]
    }
  },

  playTurn: function(row, col) {
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
    checkEndConditions(row, col, mark);
  },

  checkEndConditions: function(row, col, mark) {
    var n = Math.sqrt(parseInt(this.get('tile_count')));

    //check col
    for(i = 0; i < n; i++) {
      if(newPieces[row][i] != mark) break;
      if(i == n-1) {
        //report win for mark
        alert('winner: ' + mark);
      }
    }

    //check row
    for(i = 0; i < n; i++) {
      if(newPieces[i][col] != mark) break;
      if(i == n-1) {
        //report win for mark
        alert('winner: ' + mark);
      }
    }

    //check diag
    if(row == col) {
      //we're on a diagonal
      for(i = 0; i < n; i++) {
        if(newPieces[i][i] != mark) break;
        if(i == n-1) {
          //report win for mark
          alert('winner: ' + mark);
        }
      }
    }

    //check anti diag
    for(i = 0; i < n; i++) {
      if(newPieces[i][(n-1)-i] != mark) break;
      if(i == n-1) {
        //report win for mark
        alert('winner: ' + mark);
      }
    }

    //check draw
    if((parseInt(x_count) + parseInt(o_count)) == this.get('tile_count')) {
      //report draw
      alert('draw!');
    }
  }

});