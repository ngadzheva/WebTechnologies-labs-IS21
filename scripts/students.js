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

    const td = document.createElement('td');
    td.innerHTML = '6';
    td.setAttribute('id', 'mark');

    const deleteBtn = document.getElementById('delete');
    deleteBtn.before(td);

    deleteBtn.addEventListener('click', function(event) {
        const studentToDeleteRow = event.target.parentNode.parentNode;
        studentToDeleteRow.parentNode.removeChild(studentToDeleteRow);
    });

    const addBtn = document.querySelector('[name="add"]');
    addBtn.addEventListener('click', addStudent);
})();

function addStudent(event) {
    event.preventDefault();
    event.stopPropogation();

    const firstName = document.getElementsByName('first-name')[0];
    const lastName = document.getElementsByName('last-name')[0];
    const fn = document.getElementsByName('fn')[0];
    const mark = document.getElementsByName('mark')[0];

    createNewStudent({firstName, lastName, fn, mark});

    firstName.value = '';
    lastName.value = '';
    fn.value = 0;
    mark.value = 0;
}

function createNewStudent(data) {
    const tbody = document.getElementsByTagName('tbody')[0];

    const tr = document.createElement('tr');
    tr.setAttribute('class', 'student');
    const firstNameTd = document.createElement('td');
    firstNameTd.innerHTML = data.firstName.value;
    const lastNameTd = document.createElement('td');
    lastNameTd.innerHTML = data.lastName.value;
    const fnTd = document.createElement('td');
    fnTd.innerHTML = data.fn.value;
    const markTd = document.createElement('td');
    markTd.innerHTML = data.mark.value;
    const deleteTd = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';

    deleteTd.append(deleteBtn);
    tr.append(firstNameTd, lastNameTd, fnTd, markTd, deleteTd);
    tbody.appendChild(tr);
} 

function example() {
    var a = 5; // function scope

    for (var i = 0; i < 10; i++) {
        var c = a + i;
        let d = a - i; // block scope
    }

    c++;
    d--; // error
}