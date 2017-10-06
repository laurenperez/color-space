$(document).ready(function() {
console.log("Wooooo I'm Ready!")
});

$(function() {
  $('.edit').submit(function(e) {
    e.preventDefault();
    var url = $(this).attr('action');
    var data = $(this).serialize();

    $.ajax({
      method: 'PUT',
      url: url,
      data: data
    }).done(function() {
      window.location.href = '/spaces';
    });
  });
});

$('.delete').click(function(e) {
  e.preventDefault();
  var url = $(this).attr('href');

  $.ajax({
    method: 'DELETE',
    url: url
  }).done(function() {
    window.location.href = '/spaces';
  });
});
