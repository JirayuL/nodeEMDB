$(document).ready(function () {
  $('.delete-article').on('click', function (e) {
    $target = $(e.target)
    const id = $target.attr('data-id')
    $.ajax({
      type: 'DELETE',
      url: '/articles/' + id,
      success: function (response) {
        alert('Delete Article')
        window.location.href = '/'
      },
      error: function (err) {
        console.log(err)
      }
    });
  })
  $('.delete-athlete').on('click', function (e) {
    $target = $(e.target)
    const id = $target.attr('data-id')
    $.ajax({
      type: 'DELETE',
      url: '/athletes/' + id,
      success: function (response) {
        alert('Delete Athlete')
        window.location.href = '/'
      },
      error: function (err) {
        console.log(err)
      }
    });
  })
});
