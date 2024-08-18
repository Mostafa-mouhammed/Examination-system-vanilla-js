let EmailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let PassRgx = /^[a-zA-Z0-9]{8,}$/;

function preventBack() {
    window.history.forward();
}
setTimeout("preventBack()", 0);
window.onunload = function () { null };

window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
window.history.go(1);
};

let Validate = (input, Rgx, span, error, type) => {
    let Check = () => {

        if ($(input).val().length < 1) {
            $($(`#Login_Form span`)[span]).css('opacity', 1).text(`please Enter Your ${$(input).attr('placeholder')}`);
        } else if (!Rgx.test($(input).val())) {
            $($(`#Login_Form span`)[span]).css('opacity', 1).text(error);
            IsFormValid() ? ErrorUser() : $($(`#Login_Form span`)[2]).css('opacity', 0);
        } else {
            $($(`#Login_Form span`)[span]).text('');
        }
    }
    type === 'active' ? Check() : $(input).on('input', Check);
}

let ValidateAll = (type) => {
    Validate('#Email_Input', EmailRgx, 0, 'ُEnter a valid Email', type);
    Validate('#Password_Input', PassRgx, 1, 'Your Password must be more than 7 characters', type);
}

ValidateAll('passive');

let IsFormValid = () => {
    let counter = 0;
    document.querySelectorAll('#Login_Form span').forEach(e => {
        e.textContent === '' ? counter++ : null;
    })
    return counter === $('#Login_Form span').length - 1;
}

let ValidateUser = () => {
    let User = JSON.parse(localStorage.getItem('User'));
    return User.Email === $('#Email_Input').val() && User.Password === $('#Password_Input').val() ? true : false;
}

let ErrorUser = () => {
    $($(`#Login_Form span`)[2]).css('opacity', 1).text('Email or Password is incorrect')
}

$('#Login_Button').click(function (e) {
    e.preventDefault();
    ValidateAll('active');
    IsFormValid() ? ErrorUser() : $($(`#Login_Form span`)[2]).css('opacity', 0);
    (ValidateUser() && IsFormValid()) ? window.location = '../Html/Exam.html' : null;
})