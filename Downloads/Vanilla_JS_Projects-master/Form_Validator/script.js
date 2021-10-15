const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_confirm = document.getElementById('password_confirm');



// Error outline and Message
function showError(input, message) {
    // Accesssing the username div;
    const formControl = input.parentElement;
    // Changing the class
    formControl.className = 'form-control error';
    // Displaying the error message using small tag
    const small = formControl.querySelector('small');
    small.textContent = message;
}

// Success outline and Message.
function showSuccess(input) {
    // Accesssing the username div;
    const formControl = input.parentElement;
    // Changing the class
    formControl.className = 'form-control success';
}

// Checking if entered i/p isn't empty
function checkRequired(inputArr) {
    inputArr.forEach(cur => {
        // console.log(cur.value);
        if (cur.value.trim() === '') {
            showError(cur, `${cur.name} is required`)
        }
    });
}

// Checking the length of entered input.
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${input.name} must be atleast ${min}`);
    } else if (input.value.length > max) {
        showError(input, `${input.name} must be less than ${max}`);
    } else {
        showSuccess(input);
    }
}

// Checking if email is valid.
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

//Check password match
function checkPasswordMatch(pass1, pass2) {
    if (pass1.value !== pass2.value) {
        showError(pass2, "Password do not match.");
    }
}

// Event Listeners
form.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(username.value);
    checkRequired([username, email, password, password_confirm]);
    checkLength(username, 3, 20);
    checkLength(password, 8, 25);
    checkEmail(email);
    checkPasswordMatch(password, password_confirm);
});
