socket.on('create', function(data) {
  postit = novoPostit(data.position, data.id);
});
socket.on('start-drag', function(data) {
  element = $("#"+data.id);
  element.addClass('dragging');
  element.draggable('disable');
});
socket.on('stop-drag', function(data) {
  element = $("#"+data.id);
  element.removeClass('dragging');
  element.css(data.position);
  element.draggable('enable');
});
socket.on('editing', function(data){
  element = $("#"+data.id);
  element.addClass('editing');
});
socket.on('edited', function(data){
  element = $("#"+data.id);
  element.html(jQuery('<p>').html(data.text));
  element.removeClass('editing');
});
