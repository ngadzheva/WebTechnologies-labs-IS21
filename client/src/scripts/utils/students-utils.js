const addStudent = (event) => {
    event.preventDefault();

    const firstName = document.getElementsByName('first-name')[0];
    const lastName = document.getElementsByName('last-name')[0];
    const fn = document.getElementsByName('fn')[0];
    const mark = document.getElementsByName('mark')[0];

    const student = { firstName, lastName, fn, mark };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type:': 'application/json'
        },
        body: JSON.stringify(student)
    };

    const url = `${serverConfig.host}:${serverConfig.port}/${serverConfig.routes.studentMarks}`;

    sendRequest(url, options, createNewStudent, handleError);

    // createNewStudent({firstName, lastName, fn, mark});

    firstName.value = '';
    lastName.value = '';
    fn.value = 0;
    mark.value = 0;
};

const createNewStudent = (data) => {
    const tbody = document.getElementsByTagName('tbody')[0];

    const tr = document.createElement('tr');
    tr.setAttribute('class', 'student');

    const firstNameTd = document.createElement('td');
    firstNameTd.innerHTML = data.firstName.value || data.firstName;

    const lastNameTd = document.createElement('td');
    lastNameTd.innerHTML = data.lastName.value || data.lastName;

    const fnTd = document.createElement('td');
    fnTd.innerHTML = data.fn.value || data.fn;

    const markTd = document.createElement('td');
    markTd.innerHTML = data.mark.value || data.mark;

    const deleteTd = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.addEventListener('click', deleteStudent);

    deleteTd.append(deleteBtn);
    tr.append(firstNameTd, lastNameTd, fnTd, markTd, deleteTd);
    tbody.appendChild(tr);
};

const deleteStudent = (event) => {
    const studentFn = event.target.parent.previousElementSibling.innerHTML;

    const url = `${serverConfig.host}:${serverConfig.port}/${serverConfig.routes.studentMarks}/${studentFn}`;
    sendRequest(url, {}, showStudents, handleError);

    // const studentToDeleteRow = event.target.parentNode.parentNode;
    // studentToDeleteRow.parentNode.removeChild(studentToDeleteRow);
};

const showStudents = (data) => {
    data.students.forEach(student => createNewStudent(student));
};