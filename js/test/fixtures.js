Fixture = {
	createPostit: function(){
		jQuery('#qunit-fixture').append('<div class="post-it"><p>Post-it legal</p></div>');
	},
	createPostitWithTextarea: function(){
	    jQuery('#qunit-fixture').append('<div class="post-it"><textarea>Post-it com conteúdo</textarea></div>');
	},
	createWhiteBoard: function(){
		jQuery('#qunit-fixture').append('<div class="white-board"></div>')
	}
}