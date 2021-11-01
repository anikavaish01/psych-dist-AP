var trial = ['AI 1','AI 2','AI 3'];
var trial_rand = RANDOMIZE(trial)
var dist_ind = ['Imagine that you are a student who has just graduated from art school. Because of your promise, you have just been hired by the local art association to plan and develop an intimate art gallery to be held in your city tomorrow. In a detailed paragraph response, please write about how you envision the gallery.', 'Imagine that you are a student who will graduate from art school next year. Because of your promise, you have been hired by an art association to plan and develop a small art gallery to be held in Grand Fenswick, Andorra 5 years from now. In a detailed paragraph response, please write about how you envision the gallery.'];
var position = 0;
stimpath = 'stimuli/'

$(document).ready(function(){
    $('#rating').hide();
    $('#rating_area').hide();
    $('#warning_box').hide();
    $('#pledgebox').hide();
    $('#dist_ind_1').hide();
    $('#dist_ind_2').hide();
    $('#instrbox').show();
})

function RANDOMIZE(input) {
    var j, temp;
    var arr = Array.from(input);
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

function INSTRUCTIONS() {
    const rsp = $('input[name="not robot"]:checked').val();
    if (CHECK_RESPONSE(rsp)){
        if (rsp == 1) {
            SHOW_PLEDGE();
        }
    }
        else if (rsp == 0) {
            is_robot();
        }
}

function SHOW_PLEDGE() {
    $('#instrbox').hide();
    $('#pledgebox').show();
}

function DISTANCE_INDUCTION() {
    const rsp = $('input[name="pledge"]:checked').val();
    $('#pledgebox').hide();

    if (CHECK_RESPONSE(rsp)){
        if (rsp == 1) {
            var condition = RANDOM_INT(1, 3);
            
            if (condition == 1) {
                $('#dist_ind_1').show()
            }
            else if (condition == 2) {
                $('#dist_ind_2').show()
            }
        }
    }
        else if (rsp == 0) {
            no_accept();
        }
}

function LOAD_IMG() {
    
    $('#dist_ind_1').hide();
    $('#dist_ind_2').hide();

    $('#rating').show();
    CREATE_IMAGE();
    $('#rating_area').show();
}


function CHECK_RESPONSE(input) {
    if (typeof (input) == 'undefined'){
        $('#warning_box').text('You must answer this question in order to proceed.')
        $('#warning_box').show()
        return false;
    }
    else{
        return true;
    }
}

function not_robot(){
    $('.textbox').hide();
}

function is_robot() {
    STOP_EXPERIMENT('Unfortunately, you will be unable to proceed with this experiment.')
}

function no_accept() {
    STOP_EXPERIMENT('It appears that you do not wish to continue with this experiment. You may return to the SONA homepage.')
}

function RANDOM_INT(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function CREATE_IMAGE() {
    var img = document.createElement('img')
    img.src = stimpath + trial_rand[position] + '.jpg';
    document.getElementById('stimuli').appendChild(img);
}

function NEXT_IMAGE(){
    if (position < trial.length - 1){
        var img = document.getElementById('stimuli').getElementsByTagName('img')[0]
        position++;
        img.src = stimpath + trial_rand[position] + '.jpg';
    }
    else{
        STOP_EXPERIMENT("You are done!");
    }
}

function STOP_EXPERIMENT(why){
    $('.textbox').hide();
    $('#warning_box').text(why);
    $('#warning_box').show();
}