$(function(){
  function buildHTML(message){
    var messageimage = (message.image != null) ? message.image : "";
    var html = 
      `<div class="message" data-message-id=${message.id}>
        <div class="message__upper-info">
          <p class="message__upper-info__talker">
            ${message.user_name}
          </p>
          <p class="message__upper-info__date">
            ${message.date}
          </p>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
        <img src=${messageimage}>
      </div>`
      return html;
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
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        $('form')[0].reset();
      })
      .fail(function(){
        alert('error');
      })
      return false;
    });
    var reloadMessages = function() {
      last_message_id = $('.message:last').data("message-id"); 
      var urlRegex = new RegExp("groups/\[0-9]{1,}/messages")
    var currentUrl = location.pathname
    
    if( urlRegex.test(currentUrl) ) {
      $.ajax({
        type: 'get',
        url: './api/messages',
        dataType: 'json',
        data: { id: last_message_id }
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        });
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert.log('error');
      });
    }
    };
    setInterval(reloadMessages, 5000);
  });
  