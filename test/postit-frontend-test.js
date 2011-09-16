module("Prototype para adição de postits no frontend");
test("Adiciona post-it no frontend", function(){
  $("#qunit-fixture").append($("<div>").addClass("white-board"));
  postit = new Postit({top:10, left:15}, 'herp a derp', '15');
  postit.create();
  postit.add();
  postit.allowDrag();
  equal($(".white-board .post-it").length, 1);
});


