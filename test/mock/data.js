const Student = require('../../models/classes/student')

let arrayWithStudent = new Array();
let student = new Student();
student.setName('Hilder');
arrayWithStudent.push(student);


module.exports = {
    arrayWithStudent,
    presenceTable: new Array()
}