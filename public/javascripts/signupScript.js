let errors = []

$("#username").on('focusout', function() {
    usernameValidation()
})

$("#email").on('focusout', function(){
    emailValidation()
})

$("#username").on('focus keyup' , function () {
    usernameCheck()
})

$("#email").on('focus keyup' , function () {    
    emailCheck()
})

$("#avatar").on('change click' , function () {
    checkAvatar()
})

$("#gender").on('click', function () {
    checkGender()
})

$("#password").on('focus keyup', function () {
    password()
})

$("#password2").on('focus keyup', function () {
    checkPassword2()
})

function usernameCheck(){

    var username = $("#username").val()
    if( username.length <= 4 || username.length > 20 ){
        $("#username_error").html("Your username must be between 4 and 20 characters long");
        $("#username_error").show();  
        errors[0] = true;
    }else{ 
        $("#username_error").hide();  
        errors[0] = false;
    }
}

function emailCheck(){

    var email = $("#email").val()
    if( email.length < 12 || email.length > 35 ){
        $("#email_error").html("Your email must be between 12 and 35 characters long");
        $("#email_error").show();  
        errors[1] = true;
    }else{ 
        $("#email_error").hide();  
        errors[1] = false;
    }
}

function checkAvatar(){

    var avatar = $("#avatar").val()
    if( avatar == '' ){
        $("#avatar_error").html("Determine the gender");
        $("#avatar_error").show();  
        errors[2] = true;
    }else{ 
        $("#avatar_error").hide();  
        errors[2] = false;
    }
}

function checkGender(){

    var gender = $("#gender").val()
    if( gender == '0' ){
        $("#gender_error").html("Choose an image");
        $("#gender_error").show();  
        errors[3] = true;
    }else{ 
        $("#gender_error").hide();  
        errors[3] = false;
    }
}

function password(){

    var password = $("#password").val()
    if( password.length < 8 || password.length > 20 ){
        $("#password_error").html("Your password must be between 8 and 20 characters long");
        $("#password_error").show();  
        errors[4] = true;
    }else if( password.search(/[a-z]/i) < 0 ){
        $("#password_error").html("Your password must contain one letter");
        $("#password_error").show();  
        errors[4] = true;
    }else if( password.search(/[0-9]/) < 0 ){
        $("#password_error").html("Your password must contain one number");
        $("#password_error").show();  
        errors[4] = true;
    }else{ 
        $("#password_error").hide();  
        errors[4] = false;
    }
}

function checkPassword2(){

    var password = $("#password").val()
    var password2 = $("#password2").val()

    if( password !== password2 ){
        $("#password2_error").html("Your password must be between 8 and 20 characters long");
        $("#password2_error").show();  

        errors[5] = true;
    }else{ 
        $("#password2_error").hide();  
        errors[5] = false;
    }
}

function usernameValidation(){

    var username = $("#username").val()
    
    axios.post( `../auth/signup/username`, data = {username:username} )
        .then((response) => {
            if( response.data.length != 0 ){
                $("#username_error").html("Your username is duplicated");
                $("#username_error").show();  
                errors[6] = true;
            }else{
                // $("#username_error").hide();  
                errors[6] = false;
            }
            
        })
        .catch((error) => {
            console.log(error)
        })
}


function emailValidation(){

    var email = $("#email").val()

    axios.post( `../auth/signup/email`, data = {email:email} )
        .then((response) => {
            if( response.data.length != 0 ){
                $("#email_error").html("This email has been used before");
                $("#email_error").show();  
                errors[7] = true;
            }else{
                // $("#email_error").hide();  
                errors[7] = false;
            }
            
        })
        .catch((error) => {
            console.log(error)
        })
}

document.querySelector("form").addEventListener("submit", function(e) {
    
    usernameCheck()
    emailCheck()
    checkAvatar()
    checkGender()
    password()
    checkPassword2()
    usernameValidation()
    emailValidation()
    console.log(errors);

    let have_an_error = (have_an_error) => have_an_error == false;

    if(!errors.every(have_an_error)){ 
        e.preventDefault();
    }
    
})