socket.on('connect', function () {
  socket.on('create', function(data) {
    console.info(data);
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
});
