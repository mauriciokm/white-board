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

test("setId com objeto não criado", function(){
    postit = new Postit();
    postit.setId("foo");
    equal(postit.id, "foo");
    equal(postit.obj, undefined);
});

test("setId com objeto criado", function(){
    postit = new Postit;
    postit.create();
    console.info(postit.obj);
    notEqual(postit.obj, undefined);
    postit.setId("foo");
    equal(postit.id, "foo");
    //equal(postit.obj.attr("id"), "foo");
});

module("Criação de objeto jQuery");

test("Cria objeto jQuery com todas os parametros", function(){
	postit = new Postit({top:10, left:15}, 'herp a derp', '15');
	postit.create();
	obj = postit.obj;
	$("#qunit-fixture").append(obj);
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
          if(evento == "start-drag") {
            equal(options.id, "15");
          }
          else if(evento == "stop-drag") {
            deepEqual(options.position, {top: 40, left: 45})
            start();
          }
	}
}

test("Callback de DragStart chamando socket", function(){
	postit = new Postit({top:10, left:15}, 'herp a derp', '15');
	postit.create();
	postit.allowDrag(new SocketMock);
	el = postit.obj;
	$("#qunit-fixture").append(el);
        stop();
        expect(2);
        setTimeout(function(){
	  el.simulate("drag", {dx: 30, dy: 30});
        }, 200);
});







