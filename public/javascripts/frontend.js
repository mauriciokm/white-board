Postit.prototype.add = function(socket) {
  self = this;
  socket.emit('new', function(id) {
      self.setId(id);
  });
  this.allowDrag(socket);
  $(".white-board").append(this.obj);
}
