const addStudent = (event) => {
    event.preventDefault();

    let firstName = document.getElementsByName('first-name')[0].value;
    let lastName = document.getElementsByName('last-name')[0].value;
    let fn = document.getElementsByName('fn')[0].value;
    let mark = document.getElementsByName('mark')[0].value;

    const student = { firstName, lastName, fn, mark };

    const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    };

    const url = `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/${serverConfig.routes.studentsMarks}`;

    sendRequest(url, options, createNewStudent, handleError);

    firstName = '';
    lastName = '';
    fn = 0;
    mark = 0;
};

const createNewStudent = (data) => {
    if (data.error) {
        const errorLabel = document.getElementById('error');
        errorLabel.innerHTML = data.error;
        errorLabel.style.display = 'block';
        errorLabel.style.color = 'red';
        
        return;
    }

    const tbody = document.getElementsByTagName('tbody')[0];

    const tr = document.createElement('tr');
    tr.setAttribute('class', 'student');

    const firstNameTd = document.createElement('td');
    firstNameTd.innerHTML = data.firstName;

    const lastNameTd = document.createElement('td');
    lastNameTd.innerHTML = data.lastName;

    const fnTd = document.createElement('td');
    fnTd.innerHTML = data.fn;

    const markTd = document.createElement('td');
    markTd.innerHTML = data.mark;

    const deleteTd = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.addEventListener('click', deleteStudent);

    deleteTd.append(deleteBtn);
    tr.append(firstNameTd, lastNameTd, fnTd, markTd, deleteTd);
    tbody.appendChild(tr);
};

const deleteStudent = (event) => {
    const studentFn = event.target.parentElement.previousElementSibling.previousElementSibling.innerHTML;

    const options = {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/${serverConfig.routes.studentsMarks}/${studentFn}`;
    sendRequest(url, options, showStudents, handleError);
};

const showStudents = (data) => {
    JSON.parse(data).students.forEach(student => createNewStudent(student));
};