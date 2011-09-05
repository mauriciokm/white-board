test('Editar um post-it', function() { 
	Fixture.createPostit();
	setupEditarPostit();
	jQuery('.post-it p').trigger('dblclick');
	texto = jQuery('.post-it textarea').val();
	equals(texto, 'Post-it legal');
});

test('Confirmar edição de um post-it', function() { 
	Fixture.createPostitWithTextarea();
	setupConfirmarEdicaoPostit();
	jQuery('.post-it textarea').trigger({type:'keypress', which:13});
	texto = jQuery('.post-it p').html();
	equals(texto, 'Post-it com conteúdo');
});

test('Criar um novo post-it', function() {
	Fixture.createWhiteBoard();
	criarPostit();
	postits = jQuery('.white-board').find('.post-it');
	equals(1, postits.length);
	ok(jQuery(postits[0]).hasClass('ui-draggable'));
})