function permitirArrastar(){
	jQuery( ".post-it" ).draggable({
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
	jQuery('.white-board').append(jQuery('<div>').addClass('post-it').attr({style: 'position: absolute; left: 5px; top: 25px'}).append('<p>'));
	permitirArrastar();
	return false;
}