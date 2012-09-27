var BoardView = Backbone.View.extend({
  className: "board",
  template: _.template("<% _.each(pieces, function(row, rowIndex) { %><ul> <% _.each(row, function(cell, colIndex) { %> <li rowIndex='<%= rowIndex %>' colIndex='<%= colIndex %>'><%= cell=='' ? '&nbsp;' : cell %></li> <% }); %></ul><% }); %>"),

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('change', this.checkForWin, this);
  },

  render: function() {
    var attributes = this.model.toJSON();
    this.$el.html(this.template(attributes));
  },

  // other events: click, mouseover, etc. NOTE: if you don't specify a selector, it registers as anywhere on EL
  events: {
    "click ul li": "playTurn"
  },

  playTurn: function(el) {
    var row = $(el.currentTarget).attr('rowIndex');
    var col = $(el.currentTarget).attr('colIndex');

    this.model.playTurn(row, col);
  }
});