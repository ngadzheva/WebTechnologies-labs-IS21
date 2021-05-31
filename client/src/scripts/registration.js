const sendForm = event => {
    event.preventDefault();
  
    const userName = document.getElementById('user-name').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const email = document.getElementById('email').value;
  
    const user = {
        username: userName,
        password: password,
        confirmPassword: confirmPassword,
        email: email
    };

    const options = {
        method: 'POST',
        dataType: 'json',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    const url = `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/${serverConfig.routes.register}`;
  
    sendRequest(url, options, redirectToLogin, handleError);
}
  
const redirectToLogin = response => {
    console.log(response)
    if(response.success) {
        window.location = 'login.html';
    } else {
        const errors = document.getElementById('errors');
        errors.innerHTML = response.error;
    }
}

(function() {
    const register = document.getElementById('register');
  
    register.addEventListener('click', sendForm);
  })();