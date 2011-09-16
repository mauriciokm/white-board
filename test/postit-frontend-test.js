module("Prototype para adição de postits no frontend");
var SocketMock = function() {
	this.emit = function(evento, fn) {
          if(evento == "new") {
            fn("postit-1");
          }
	}
}

test("Adiciona post-it no frontend", function(){
  $("#qunit-fixture").append($("<div>").addClass("white-board"));
  postit = new Postit();
  postit.add(new SocketMock);
  equal($(".white-board .post-it").length, 1);
  equal(postit.id, "postit-1");
  equal($("#postit-1").length, 1);
});


