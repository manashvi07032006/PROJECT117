var date = new Date()
let display_date = "Date: " + date.toLocaleDateString()

$(document).ready(function(){
    $('#date').html(display_date)
    console.log('Ready')
})

let predicted_emotion;

$(function(){
    $('#button').click(function(){

        let input_text = {
            'text': $('#text').val()
        }

        $.ajax({
            type : 'POST',
            url: "/predict",
            data : JSON.stringify(input_text),
            dataType : 'json',
            contentType : 'application/json',
            success : function(result){
                // extract prediction and emoticon url from result
                predicted_emotion = result.data.predicted_emotion
                predicted_emotion_img_url = result.data.predicted_emotion_img_url

                //  update the DOM elements
                $("#sentiment").html(predicted_emotion)
                $("#emoji").attr('src', predicted_emotion_img_url)

                //  show them
                $('#sentiment').css("display", "");
                $('#emoji').css("display", "");
            },
            error : function(result){
                console.log(result)
            }
        })
        //  clearing the textbox after every button push
        $('#text').val("")
    })
})