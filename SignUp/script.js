const names = document.getElementById('name');
const password = document.getElementById('password');
const form = document.getElementById('form');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    let messages = [];
    if (names.value.length < 6 & names.value.length >= 1) {
        messages.push("username can't be smaller then 6 characters");
        console.log("username can't be smaller then 6 characters");
    }
    if (names.value.length >= 10) {
        messages.push("username can't be longer then 10 characters")
    }
    if (password.value.length < 6 & password.value.length >= 1) {
        messages.push("password can't be smaller then 6 characters");
        console.log("password can't be smaller then 6 characters");
    }
    if (password.value.length >= 10) {
        messages.push("password can't be longer then 10 characters")
    }
    if (password.value === 'Password' | password.value === 'password') {
        messages.push("please use some creative words for password");
    }
    if (password.value === names.value) {
        messages.push("name and password can't be same");
    }
    if (messages.length > 0) {
        e.preventDefault();
        errorElement.innerText = messages.join(', ');
    }
});

console.log(names.value);
console.log(password.value);