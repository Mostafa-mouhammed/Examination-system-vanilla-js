let WordsRgx = /^[a-zA-Z]{3,}$/;
let EmailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let PassRgx = /^[a-zA-Z0-9]{8,}$/;

let Validate = (input, Rgx, span, error, type) => {
    let Check = () => {
        span === 4 ? Rgx = new RegExp(`^${$('#Password_Input').val()}$`) : '';
        if ($(input).val().length < 1) {
            $($(`#Registration_Form span`)[span]).css('opacity', 1).text(`please Enter Your ${$(input).attr('placeholder')}`);
        } else if (!Rgx.test($(input).val())) {
            $($(`#Registration_Form span`)[span]).css('opacity', 1).text(error);
        } else {
            $($(`#Registration_Form span`)[span]).text('');
        }
    }
    type === 'active' ? Check() : $(input).on('input', Check);
}

let ValidateAll = (type) => {
    Validate('#FirstName_Input', WordsRgx, 0, 'First Name must be words and more than 2 letters', type);
    Validate('#LastName_Input', WordsRgx, 1, 'Last Name must be words and more than 2 letters', type);
    Validate('#Email_Input', EmailRgx, 2, 'ُEnter a valid Email', type);
    Validate('#Password_Input', PassRgx, 3, 'Your Password must be more than 7 characters', type);
    Validate('#RePassword_Input', 'Re', 4, 'Password must match each other', 'passive');
}
ValidateAll('passive');

let IsFormValid = () => {
    let counter = 0;
    document.querySelectorAll('#Registration_Form span').forEach(e => {
        e.textContent === '' ? counter++ : null;
    })
    return counter === $('#Registration_Form span').length ? true : false;
}

let SaveUser = () => {
    localStorage.setItem('User', JSON.stringify({
        "FirstName": $('#FirstName_Input').val(),
        "LastName": $('#LastName_Input').val(),
        "Email": $('#Email_Input').val(),
        "Password": $('#Password_Input').val(),
    }));
}

$('#Registration_Button').click(function (e) {
    e.preventDefault();
    ValidateAll('active');
    IsFormValid() ? (SaveUser(), window.location.replace('../Html/Login.html')) : null
})

$('#Password_Input').on('input', () => {
    if (PassRgx.test($('#Password_Input').val())) {
        $('#RePassword_Input').slideDown();
        $($(`#Registration_Form span`)[4]).css('opacity', 1);
        Validate('#RePassword_Input', 'Re', 4, 'Password must match each other', 'active');
    } else {
        $('#RePassword_Input').slideUp();
        $($(`#Registration_Form span`)[4]).css('opacity', 0);
    }
})