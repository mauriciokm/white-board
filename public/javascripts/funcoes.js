var socket = io.connect('http://192.168.1.7:8888');

function permitirArrastar(id) {
        jQuery( "#"+id ).draggable({
	  start: function(even, ui) {
            element = jQuery( "#"+id );
            element.addClass('dragging');
            socket.emit('start-drag', {id: id});
          },
          stop: function(even, ui) {
            element = jQuery( "#"+id );
            element.removeClass('dragging');
            socket.emit('stop-drag', {id: id, position: element.position()});
          }
	});
}

function setupEditarPostit(){
	jQuery('.post-it:not(.editing) p').live('dblclick', function(){
            element = $(this);
            conteudo = element.html();
            postit = element.parent();
            postit.addClass('editing');
	    postit.html(jQuery('<textarea>').val(conteudo));
            id = postit.attr('id');
            socket.emit('editing', {id: id});
            confirmaEdicaoPostit(id);
	});
}

function confirmaEdicaoPostit(id){
	jQuery('#'+id+' textarea').keypress(function(event){
		if(event.which == 13){
                  textarea = $(this);
                  postit = textarea.parent();
                  postit.removeClass('editing');
	  	  conteudo = textarea.val();
                  postit.attr('aria-disabled', false);
                  socket.emit('edited', {id: postit.attr('id'), text: conteudo});
		  postit.html(jQuery('<p>').html(conteudo));
		  event.preventDefault();
		}
	});
}

function criarPostit(){
  $.get('/postit/new', function(data){
    postit = novoPostit({top: '25px', left: '5px'}, data.next_id);
    socket.emit('create', {position: postit.position(), id: data.next_id});
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
