$(document).ready(function() {


    $("#form").validator().on("submit", function(e) {
        if (e.isDefaultPrevented()) {

        } else {

            var postData = $(this).serializeArray();
            var formURL = $(this).attr("action");

            $.ajax({
                type: "POST",
                url: "captcha.php",
                data: "&g-recaptcha-response=" + grecaptcha.getResponse()
            }).done(function(status) {
                if (status == "ok") {
                    $.ajax({
                        url: formURL,
                        type: "POST",
                        dataType: 'json',
                        data: postData,
                        success: function(data, textStatus, jqXHR) {
                            if (data['status']=='success') {
                                $('.modal-body').append(data['status_text']);
                                $('#modal').modal('show');
                            } else {
                                $('#email-helper').append('<ul class="list-unstyled"><li>'+data['status_text']+'</li></ul>');
                                $('#email-helper').parent().addClass('has-error has-danger');
                            }
                        },
                        error: function(jqXHR, status, error) {
                            console.log(status + ": " + error);
                        }
                    });
                }
            });

            e.preventDefault();
        }
    });

});

