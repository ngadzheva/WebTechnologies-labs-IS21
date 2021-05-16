(function() {
    const headers = document.getElementsByTagName('header');
    const firstName = document.getElementById('first-name');
    const studentInfo = document.getElementsByClassName('student');
    const headerRow = document.querySelector('#header-row');
    const students = document.querySelectorAll('.student');

    console.log(headers);
    console.log(firstName);
    console.log(studentInfo);
    console.log(headerRow);
    console.log(students);

    headers[0].innerHTML += ' Marks';

    const th = document.createElement('th');
    const text = document.createTextNode('Mark');
    th.append(text);

    const deleteHeader = document.getElementById('delete-header');
    deleteHeader.before(th);

    const addBtn = document.querySelector('[name="add"]');
    addBtn.addEventListener('click', addStudent);

    const options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    const url = `${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/${serverConfig.routes.studentsMarks}`;
    sendRequest(url, options, showStudents, handleError);
})();

function example() {
    var a = 5; // function scope

    for (var i = 0; i < 10; i++) {
        var c = a + i;
        let d = a - i; // block scope
    }

    c++;
    d--; // error
}