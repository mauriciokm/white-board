module("Inicialização + Hash");
test("Criar um postit com parametros padrão", function(){
	postit = new Postit();
	deepEqual(postit.position, {top: 25, left: 5});
	equals(postit.id, '');
	equals(postit.text, '');
});

test("Setup de postit através de parametros", function(){
	postit = new Postit({top:10, left:15}, 'herp a derp', '15');
	deepEqual(postit.position, {top: 10, left: 15});
	equals(postit.id, '15');
	equals(postit.text, 'herp a derp');
});

test("Setup de postit através de um hash", function(){
	postit = new Postit();
	postit.setUp({position: {top: 5, left:12}, text: 'derpino', id: '12'});
	deepEqual(postit.position, {top: 5, left: 12});
	equals(postit.id, '12');
	equals(postit.text, 'derpino');
});  

test("Extração de hash", function(){
	postit = new Postit({top:10, left:15}, 'herp a derp', '15');
	hash = postit.hash();
	deepEqual(hash, {position: {top: 10, left: 15}, text: 'herp a derp', id: '15'});
});

module("Criação de objeto jQuery");

test("Cria objeto jQuery com todas os parametros", function(){
	postit = new Postit({top:10, left:15}, 'herp a derp', '15');
	postit.create();
	obj = postit.obj;
	equal(obj.attr("id"), postit.id);
	equal(obj.html(), "<p>herp a derp</p>");
	ok(obj.hasClass('post-it'));
	equal(obj.css('top'), '10px');
	equal(obj.css('left'), '15px');
	equal(obj.css('position'), 'absolute');
});

module("SetUp do drag and drop");

test("SetUp drag com postit criado", function(){
	postit = new Postit({top:10, left:15}, 'herp a derp', '15');
	postit.create();
	postit.allowDrag();
	ok(postit.obj.hasClass('ui-draggable'));
});

test("SetUp drag sem postit criado", function(){
	postit = new Postit({top:10, left:15}, 'herp a derp', '15');
	postit.allowDrag();
	ok(postit.obj.hasClass('ui-draggable'));
});

var SocketMock = function() {
	this.emit = function(evento, options) {
		console.info(evento);
		console.info(options);
	}
}

test("Callback de DragStart chamando socket", function(){
	postit = new Postit({top:10, left:15}, 'herp a derp', '15');
	postit.create();
	postit.allowDrag();
	el = postit.obj;
	$("#qunit-fixture").append(el);
	el.simulate("drag", {dx: 10, dy: 10});
});







