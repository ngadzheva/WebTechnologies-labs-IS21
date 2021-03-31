// for (var i = 0; i < 5; ++i) {
//     setTimeout(() => console.log(i), 1000);
// }

// for (let i = 0; i < 5; ++i) {
//     setTimeout(() => console.log(i), 1000);
// }

const fs = require('fs');

const changeFn = fn => fn.replace(/00/g, '12');

let result = '';

// fs.readFile('./resources/students.txt', 'utf-8', (error, data) => {
//     if (error) {
//         console.error(`Failed reading file: ${error}`);
//         return;
//     }

//     result = data.toString();

//     console.log('Successfully read file!');
// });

// result = changeFn(result);

// console.log('Successfully changed fns!');

// fs.writeFile('./resources/editedStudents.txt', result, (error) => {
//     if (error) {
//         console.error(`Failed writing file: ${error}`);
//         return;
//     }

//     console.log('Successfully written file!');
// });

// fs.readFile('./resources/students.txt', 'utf-8', (error, data) => {
//     if (error) {
//         console.error(`Failed reading file: ${error}`);
//         return;
//     }

//     console.log('Successfully read file!');

//     result = changeFn(data.toString());

//     console.log('Successfully changed fns!');

//     fs.writeFile('./resources/editedStudents.txt', result, (error) => {
//         if (error) {
//             console.error(`Failed writing file: ${error}`);
//             return;
//         }
    
//         console.log('Successfully written file!');

//         fs.readFile('./resources/editedStudents.txt', 'utf-8', (error, data) => {
//             if (error) {
//                 console.error(`Failed reading file: ${error}`);
//                 return;
//             }

//             // handle data with another async operation
//         });
//     });
// });

const read = (file, successCallback, errorCallback) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(data);
        });
    });
}

const write = (file, data, successCallback, errorCallback) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });
}

read('./resources/students.txt')
    .then(data => changeFn(data.toString()))
    .then(result => write('./resources/editedStudents.txt', result))
    .then(() => console.log('DONE'))
    .catch(error => console.error(error));
