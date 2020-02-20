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
            const {studentTable: students} = dataTables;
            const studentsData = await module.exports.getStudentsData(students);
            const orderByMinutes = await module.exports.orderReportbyMinutes(studentsData);
            const printReport = module.exports.printReport(studentsData,orderByMinutes);
            response.error = false
            response.message = 'Atributos del Studiante validados de manera correcta.';
            response.data = printReport;
            return response;
        } catch (error) {
            response.error = true;
            response.message = `Asegúrate que el parámetro exista y/o esté escrito de manera correcta`;
            return response;
        }
    },
    getStudentReport: async (presences)=>{
        const {data: minutes} = await studentFunctions.getTotalMinutesByStudent(presences);
        const {data: days} = await studentFunctions.getTotalPrecensesDaysByStudent(presences);
        return {minutes,days};
    },
    getStudentsData: async (students)=>{
        const studentsData = new Array();
        for (const student of students){
            const {data: presences ,error,message} = await presenceFunctions.getPresencesByStudent(student);
            const {minutes,days} = await module.exports.getStudentReport(presences);
            studentsData.push({name: student.getName(),minutes,days});
        };
        return studentsData;
    },
    orderReportbyMinutes:(report)=>{
        return report.sort( (last,next) => next.minutes > last.minutes);
    },
    printReport(orderByMinutes){
        let consoleOutput = 'PRESCENCES REPORT: \n\n';
        orderByMinutes.map((output)=> {consoleOutput = consoleOutput + `${output.name}: ${output.minutes} minutes in ${output.days} days\n`});
        return consoleOutput;
    }
}