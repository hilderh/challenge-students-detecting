const Joi = require('@hapi/joi');
const studentObject = require('../models/schemas/student');
const Student = require('../models/classes/student');
let dataTables = require('../data');
let studentFunctions = require('../logic/student')
let presenceFunctions = require('../logic/presence')

let response = {
    error: false,
    message: '',
    data: ''
}

module.exports = {
    generatePresencesByStudentReport: async ()=>{
        try {
            let consoleOutput = 'Students Report\n'
            for (const student of dataTables.studentTable) {
                const {data: presences ,error,message} = await presenceFunctions.getPresencesByStudent(student);
                const {data: minutes} = await studentFunctions.getTotalMinutesByStudent([...presences]);
                const {data: days} = await studentFunctions.getTotalPrecensesDaysByStudent([...presences]);
                const buildStudentOutput = `${student.getName()}: ${  (days == 0 && minutes == 0) ? '0' : minutes + ' minutos en ' + days + ' dias\n'}`;
                consoleOutput = consoleOutput + buildStudentOutput; 
            }
            response.error = false
            response.message = 'Atributos del Studiante validados de manera correcta.';
            response.data = consoleOutput;
            return response;
        } catch (error) {
            response.error = true;
            response.message = `Asegúrate que el parámetro exista y/o esté escrito de manera correcta`;
            return response;
        }
    }
}