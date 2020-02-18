const Joi = require('@hapi/joi');
const studentObject = require('../models/student');
const Student = require('../models/classes/student');

const studentFuncionts = require('../logic/student')

const presenceObject = require('../models/pesence');
const Presence = require('../models/classes/presence');

let dataTables = require('../data');
let testTables = require('../test/mock/data');

const INDEX_EXEC_COMMAND = 0;
const INDEX_STUDENT_COMMAND = 1;
const INDEX_DAY_COMMAND = 2;
const INDEX_INITHOUR_COMMAND = 3;
const INDEX_ENDHOUR_COMMAND = 4;
const INDEX_CLASSROOM_COMMAND = 5;

let response = {
    error: false,
    message: '',
    data: ''
}

module.exports = {
    validationFields: async (commandLine)=>{
        try {
            const commandsIntoArray = commandLine.split(' ').filter(command => command != '');
            const isExistingStudent = await studentFuncionts.isExistingStudent(commandsIntoArray[INDEX_STUDENT_COMMAND]);
            if(commandsIntoArray.length < 6) throw new Error('Asegúrate de introducir todos los datos para registrar una presencia.')
            if(!isExistingStudent) throw new Error('Esta intentando registrar una presencia con un estudiante sin registrar.');
            const dayNumber = commandsIntoArray[INDEX_DAY_COMMAND];
            const validData = await presenceObject.schemaValidation.validateAsync({
                student: {
                    name: commandsIntoArray[INDEX_STUDENT_COMMAND]
                },
                dayNumber: dayNumber,
                initHour: commandsIntoArray[INDEX_INITHOUR_COMMAND].split(':')[0],
                initMinutes: commandsIntoArray[INDEX_INITHOUR_COMMAND].split(':')[1],
                endHour: commandsIntoArray[INDEX_ENDHOUR_COMMAND].split(':')[0],
                endMinutes: commandsIntoArray[INDEX_ENDHOUR_COMMAND].split(':')[1],
                classroomCode: commandsIntoArray[INDEX_CLASSROOM_COMMAND]
            });
            response.error = false
            response.message = 'Atributos del Studiante validados de manera correcta.';
            response.data = validData;
            return response;
        } catch (error) {
            console.log("Error",error)
            const fieldError =(error._original) && presenceObject.attributtes[error.details[0].context.key].title;
            response.error = true;
            response.message = (error._original) ?`Asegúrate que el parámetro "${fieldError}" exista y/o esté escrito de manera correcta`: error.message;
            return response;
        }
    },
    createNewPresence: async (commandLine)=>{
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
    }
}