const login = event => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').value;

    const user = {
        username,
        password,
        rememberMe
    };

    const options = {
        method: 'POST',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    const url = `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/${serverConfig.routes.login}`;

    sendRequest(url, options, loginUser, handleError);
};

const loginUser = (data) => {
    if (data.error) {
        const errors = document.getElementById('errors');
        errors.innerHTML = data.error;
        errors.style.display = 'block';
        errors.style.color = 'red';
    } else {
        window.location = './students-marks.html';
    }
}

(function() {
    const loginBtn = document.getElementById('login');

    loginBtn.addEventListener('click', login);
})();