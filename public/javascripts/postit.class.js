var Postit = function(position, text, id, obj) {
  this.position = position || {top: 25, left: 5};
  this.text = text || '';
  this.id = id || '';
  this.obj = obj || undefined;
	
  this.setUp = function(hash) {
    this.position = hash.position;
    this.text = hash.text;
    this.id = hash.id;
  };
	
  this.hash = function() {
    return {position: this.position, text: this.text, id:this.id};
  }
	
  this.create = function() {
    var postit = $('<div>')
	.css('position', 'absolute')
        .css(this.position)
        .addClass('post-it')
        .attr('id', this.id)
        .append(jQuery('<p>').html(this.text));
    this.obj = postit;
    return postit;
  };
	
  this.allowDrag = function(socket) {
    if(this.obj == undefined) this.create();
    self = this;
    self.obj.draggable({
      start: function(even, ui) {
        self.obj.addClass('dragging');
        socket.emit('start-drag', {id: self.id});
      },
      stop: function(even, ui) {
        self.obj.removeClass('dragging');
        socket.emit('stop-drag', {id: self.id, position: self.obj.position()});
      }
    });
    return this.obj;
  };	
}
