const Joi = require('@hapi/joi');
const studentObject = require('../models/schemas/student');
const Student = require('../models/classes/student');
let dataTables = require('../data');
let testTables = require('../test/mock/data');

let response = {
    error: false,
    message: '',
    data: ''
}

module.exports = {
    validationFields: async (commandLine)=>{
        try {
            var nameFromCommand = commandLine.split(' ').filter(command => command != '')[1];
            const validData = await studentObject.schemaValidation.validateAsync({ name: nameFromCommand });
            response.error = false
            response.message = 'Atributos del Studiante validados de manera correcta.';
            response.data = validData;
            return response;
        } catch (error) {
            const fieldError = studentObject.attributtes[Object.keys( error._original )[0]].title;
            response.error = true;
            response.message = `Asegúrate que el parámetro ${fieldError} exista y/o esté escrito de manera correcta`;
            return response;
        }
    },
    createNewStudent: async (commandLine)=>{
        try {
            var studentDataToSave = await module.exports.validationFields(commandLine);
            if(studentDataToSave.error) throw new Error(studentDataToSave.message)
            var isExistingStudent = await module.exports.isExistingStudent(studentDataToSave.data.name);
            response.error = false;
            !isExistingStudent && (
                newStudent = new Student(),
                newStudent.setName(studentDataToSave.data.name),
                dataTables.studentTable.push(newStudent),
                response.data = newStudent
            )
            response.message = (!isExistingStudent) ? `El studiante ${studentDataToSave.data.name} se ha almacenado de manera correcta.` :`El estudiante ${studentDataToSave.data.name} ya se registro previamente`;
            return response; 
        } catch (error) {
            response.error = true;
            response.message = (!error.message) ? `Error trantando de almacenar un nuevo estudiante` : error.message;
            return response;
        }
    },
    isExistingStudent: async (studentName)=>{
        const isExistingStudent = dataTables.studentTable.find(a => a.getName() == studentName);
        return (typeof isExistingStudent == 'object');
    }
}