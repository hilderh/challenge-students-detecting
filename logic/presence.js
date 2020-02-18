const Joi = require('@hapi/joi');
const studentObject = require('../models/schemas/student');
const Student = require('../models/classes/student');

const studentFuncionts = require('../logic/student')

const presenceObject = require('../models/schemas/pesence');
const Presence = require('../models/classes/presence');

let dataTables = require('../data');

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
            if(commandsIntoArray.length < 6) throw new Error('Asegúrate de introducir todos los datos para registrar una presencia.');
            if(!isExistingStudent) throw new Error('Esta intentando registrar una presencia con un estudiante sin registrar.');
            const dayNumber = commandsIntoArray[INDEX_DAY_COMMAND];
            const validData = await presenceObject.schemaValidation.validateAsync({
                student: { name: `${commandsIntoArray[INDEX_STUDENT_COMMAND]}` },
                dayNumber: parseInt(dayNumber),
                initHour: parseInt(commandsIntoArray[INDEX_INITHOUR_COMMAND].split(':')[0]),
                initMinutes: parseInt(commandsIntoArray[INDEX_INITHOUR_COMMAND].split(':')[1]),
                endHour: parseInt(commandsIntoArray[INDEX_ENDHOUR_COMMAND].split(':')[0]),
                endMinutes: parseInt(commandsIntoArray[INDEX_ENDHOUR_COMMAND].split(':')[1]),
                classroomCode: commandsIntoArray[INDEX_CLASSROOM_COMMAND]
            });
            response.error = false
            response.message = 'Atributos de la presencia validados de manera correcta.';
            response.data = validData;
            return response;
        } catch (error) {
            const fieldError =(error._original) && presenceObject.attributtes[error.details[0].context.key].title;
            response.error = true;
            response.message = (error._original) ?`Asegúrate que el parámetro "${fieldError}" exista y/o esté escrito de manera correcta`: error.message;
            return response;
        }
    },
    createNewPresence: async (commandLine)=>{
        try {
            var presenceDataToSave = await module.exports.validationFields(commandLine);
            if(presenceDataToSave.error) throw new Error(presenceDataToSave.message);
            const newPresence = module.exports.newPresenceInstance(presenceDataToSave.data);
            dataTables.presenceTable.push(newPresence);
            response.error = false;
            response.data = newPresence;
            response.message = `La presencia del estudiante ha sido almacenada.`;
            return response;
        } catch (error) {
            response.error = true;
            response.message = (!error.message) ? `Error trantando de almacenar una nueva presencia` : error.message;
            return response;
        }
    },
    newPresenceInstance: (presenceData)=>{
        const {student,dayNumber,initHour,initMinutes,endHour,endMinutes,classroomCode} = presenceData;
        let newPresence = new Presence();
        let parseStudent = new Student();
        parseStudent.setName(student.name)
        newPresence.setStudent(parseStudent);
        newPresence.setDayNumber(dayNumber);
        newPresence.setInitHour(initHour,initMinutes);
        newPresence.setEndHour(endHour,endMinutes);
        newPresence.setClassroomCode(classroomCode);
        return newPresence;
    },
    getPresencesByStudent: async (student)=>{
        try {
            const presences =  dataTables.presenceTable.filter( presence => presence.getStudent().getName() === student.getName() );
            response.error = false;
            response.data = presences;
            response.message = `Se han buscando las presencias de manera exitosa.`;
            return response;
        } catch (error) {
            response.error = true;
            response.message = `Error buscando las presencias del alumno`;
            return response;
        }
    }
} 