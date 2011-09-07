var socket = io.connect('http://192.168.1.7:8888');

function permitirArrastar(id) {
  element = jQuery( "#"+id );
	element.draggable({
	  start: function(even, ui) {
            element.addClass('dragging');
            socket.emit('start-drag', {id: id});
          },
          stop: function(even, ui) {
            element.removeClass('dragging');
            socket.emit('stop-drag', {id: id, position: element.position()});
          }
	});
}

function setupEditarPostit(){
	jQuery('.post-it p').live('dblclick', function(){
		conteudo = jQuery(this).html();
		jQuery(this).parent().html(jQuery('<textarea>').val(conteudo));
	})
}

function setupConfirmarEdicaoPostit(){
	jQuery('.post-it textarea').live('keypress', function(event){
		if(event.which == 13){
			conteudo = jQuery(this).val();
			jQuery(this).parent().html(jQuery('<p>').html(conteudo));
			event.preventDefault();
		}
	})
}

function criarPostit(){
  $.get('/postit/new', function(data){
    postit = novoPostit({top: '25px', left: '5px'}, data.next_id);
    socket.emit('new', {position: postit.position(), id: data.next_id});
  });
  return false;
}

function novoPostit(position, next_id) {
    id = 'postit-'+next_id;
    var postit = jQuery('<div>').attr('id', id).addClass('post-it').attr({style: 'position: absolute; left: '+position.left+'; top: '+position.top+';'}).append('<p>');
    jQuery('.white-board').append(postit);
    permitirArrastar(id);
    return postit;
}
