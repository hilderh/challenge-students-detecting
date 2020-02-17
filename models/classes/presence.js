
let Student = require('./student')
class Presence{
    constructor(){
        this.student = new Student();
        this.dayNumber = 0;
        this.initHour = new Date();
        this.endHour = new Date();
        this.classroomCode = '';
    }
    // Setters
    setStudent(student){
        this.student = student;
    }
    setDayNumber(dayNumber){
        this.dayNumber = dayNumber;
    }
    setInitHour(initHour){
        this.initHour = initHour;
    }
    setEndHour(endHour){
        this.endHour = endHour;
    }
    setClassroomCode(classroomCode){
        this.classroomCode = student;
    }

    // Getters
    getStudent(){
        return this.student;
    }
    getDayNumber(){
        return this.dayNumber;
    }
    getInitHour(){
        return this.initHour;
    }
    getEndHour(){
        return this.endHour;
    }
    getClassroomCode(){
        return this.classroomCode;
    }
    getMinutesDuration(){
        return Math.floor( ( this.endHour.getTime() - this.initHour.getTime()) / 60000 )
    }
}

module.exports = Presence;

