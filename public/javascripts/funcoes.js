var socket = io.connect('http://192.168.1.7:8888');

function permitirArrastar(){
	jQuery( ".post-it" ).draggable({
		drag: function() {  }
	});
}

function permitirArrastarId(id) {
	jQuery( "#"+id ).draggable({
		drag: function() {  }
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
    postit = novoPostit({top: '25px', left: '5px'}, 'postit-'+data.next_id);
    jQuery('.white-board').append(postit);
    permitirArrastar();
    socket.emit('new', {position: postit.position(), id: data.next_id});
  });
  return false;
}
socket.on('connect', function () {
  socket.on('create', function(data) {
    id = 'postit-'+data.id;
    postit = novoPostit(data.position, id);
    jQuery('.white-board').append(postit);
    permitirArrastarId(id);
  });
});
function novoPostit(position, id) {
    var postit = jQuery('<div>').attr('id', id).addClass('post-it').attr({style: 'position: absolute; left: '+position.left+'; top: '+position.top+';'}).append('<p>');
    return postit;
}
