$(function() {
  var board = new Board();
  var boardView = new BoardView({
    model: board
  });
  boardView.render();
  $("#app").html(boardView.el);
});