$(document).ready(function() {
console.log("Wooooo I'm Ready!")
});

// $(function() {
//   $('.edit-form').submit(function(e) {
//     e.preventDefault();
//     var url = $(this).attr('action');
//     var data = $(this).serialize();
//
//     $.ajax({
//       url: url,
//       method: 'PUT',
//       data: data
//     }).done(function() {
//       window.location.href = '/tacos';
//     });
//   });

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
