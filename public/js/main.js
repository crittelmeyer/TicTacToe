var socket;
$(function() {
  socket = io.connect('http://localhost');
  socket.on('newConnection', function (data) {
    alert(data.msg);
    //socket.emit('my other event', { my: 'data' });
  });

  var board = new Board();
  var boardView = new BoardView({
    model: board
  });
  boardView.render();
  $("#app").html(boardView.el);
});