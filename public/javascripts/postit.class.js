var Postit = function(position, text, id) {
  this.position = {top: 25, left: 5};
  this.text = '';
  this.id = '';

  this.create = function() {
    var postit = jQuery('<div>')
      .attr('id', this.id)
      .addClass('post-it')
      .position(this.position)
      .append(jQuery('<p>').html(this.text));
    return postit;
  };
}
