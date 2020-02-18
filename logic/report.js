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
            for (const student of dataTables.studentTable) {
                const presencesStudent = await presenceFunctions.getPresencesByStudent(student);
                // const minutesPresence = await studentFunctions.getTotalMinutesByStudent([...presencesStudent.data]);
                // console.log(minutesPresence);
                const daysPresences = await studentFunctions.getTotalPrecensesDaysByStudent([...presencesStudent.data]);
                console.log(daysPresences)
                /* console.log(`${ student.getName() }: `,`${minutesPresence.data} minutos`,`en ${daysPresences.data} dias`) */
            }
            for (const student of dataTables.studentTable) {
                const presencesStudent = await presenceFunctions.getPresencesByStudent(student);
                const minutesPresence = await studentFunctions.getTotalMinutesByStudent([...presencesStudent.data]);
                console.log(minutesPresence);
                /* console.log(`${ student.getName() }: `,`${minutesPresence.data} minutos`,`en ${daysPresences.data} dias`) */
            }
            // console.log("Test",responseReport);
            /* response.error = false
            response.message = 'Atributos del Studiante validados de manera correcta.';
            response.data = validData;
            return response; */
        } catch (error) {
            const fieldError = studentObject.attributtes[Object.keys( error._original )[0]].title;
            response.error = true;
            response.message = `Asegúrate que el parámetro ${fieldError} exista y/o esté escrito de manera correcta`;
            return response;
        }
    }
}