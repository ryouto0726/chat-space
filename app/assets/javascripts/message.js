$(function(){
  function appendMessage(message) {
    var html = `<div class="message" data-message-id=${message.id}>
                  <div class='message__upper-info'>
                  <div class="upper-message__user-name">${message.user_name}
                  <div class="upper-message__date">${message.date}
                  </div>
                  </div>
                  <div class="lower-message">
                  <p class="lower-message__content">${message.content}</p>
                  </div>
                    ${ message.image !== null ? `<img class='lower-message__image' src='${message.image}'>` : `` }
                  </div>`
    $('.messages').append(html)
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message) {
      appendMessage(message);
      $('#new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate({scrollTop: 999999}, 500, 'swing');
    })
    .fail(function() {
      alert('メッセージを投稿できませんでした。');
      $('.submit-btn').prop('disabled', false);
    })
  });

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('message-id')
    var urlRegex = new RegExp("groups/\[0-9]{1,}/messages")
    var currentUrl = location.pathname

    if( urlRegex.test(currentUrl) ) {
      $.ajax({
        type: 'get',
        url: url,
        dataType: 'json',
        data: { id: last_message_id }
      })

      .done(function(messages) {
        if(messages.length !== 0) {
          messages.forEach(function (message) {
            appendMessage(message);
          });
          $('.messages').animate({scrollTop: 999999}, 500, 'swing');
        }
        $('.submit-btn').prop('disabled', false);
      })
      .fail(function() {
        $('.submit-btn').prop('disabled', false);
      });
    }
  };

  setInterval(reloadMessages, 5000);
});