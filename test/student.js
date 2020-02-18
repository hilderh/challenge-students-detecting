
var should = require('chai').should();
var studentFunctions = require('../logic/student');
var dataTable = require('../data');
var Student = require('../models/classes/student');
var Presence = require('../models/classes/presence');

describe('Student Test - Validate functions about Student data', () => {


    describe('validateStudentFields Function - Validate all fields about students', () =>{

        describe('1) Student without name', () => {
    
            it("Should get an object with error true and error's message property",async () => {

                const response = await studentFunctions.validationFields('Student ')
                response.should.be.an('object');
                response.should.have.property('error');
                response.error.should.be.an('boolean');
                response.error.should.be.equals(true)
                response.should.have.property('message');
                response.message.should.be.an("string");
                
            })
            
        })

        describe('2) Student with correct fields (name)', () => {
    
            it("Should get an object with error false, message property and object prepared to save",async () => {

                const response = await studentFunctions.validationFields('Student Hilder');
                response.should.be.an('object');
                response.should.have.property('error');
                response.error.should.be.an('boolean');
                response.error.should.be.equals(false)
                response.should.have.property('message');
                response.message.should.be.an("string");
                response.should.have.property('data');
                response.data.should.be.an("object");
                response.data.should.have.property('name');
                response.data.name.should.be.an('string');

            })
            
        })

    })

    describe('saveNewStudent Function - Record a new Student in data', () =>{

        describe('1) New or Existing Student', () => {
    
            it("Should get an object with error false, message property and object prepared to save",async () => {

                const response = await studentFunctions.createNewStudent('Student Hilder');
                response.should.be.an('object');
                response.should.have.property('error');
                response.error.should.be.an('boolean');
                response.error.should.be.equals(false)
                response.should.have.property('message');
                response.message.should.be.an("string");
                response.should.have.property('data');
                response.data.should.be.an("object");
                response.data.should.have.property('name');
                response.data.name.should.be.an('string');

            })
            
        })

    })

    describe('isExistingStudent Function - check if a Student exist in data', () =>{

        describe('1) Existing Student', () => {
    
            var student = new Student();
            beforeEach(() => {
                
                student.setName('Hilder');
                dataTable.studentTable.push(student);

            })

            it("Should get a true value",async () => {
                const response = await studentFunctions.isExistingStudent('Hilder');
                response.should.be.an('boolean');
                response.should.be.equals(true)
                
            })
            
        })

        describe('2) New Student', () => {
    
            it("Should get a false value",async () => {

                const response = await studentFunctions.isExistingStudent('Hajdoropo');
                response.should.be.an('boolean');
                response.should.be.equals(false);

            })
            
        })

    })

    describe('getTotalMinutesByStudent Function - Retrive sumatory of minutes presences by student',()=>{
        describe('1) When exist a presence less than 1 minute, others with 2 minutes or more',()=>{
            var student = new Student();
            let presence = new Presence();
            let presence2 = new Presence();
            let presence3 = new Presence();
            beforeEach(() => {
                student.setName('Hilder');
                dataTable.studentTable.push(student);
                /* 1 */
                presence.setStudent(student);
                presence.setDayNumber(2);
                presence.setInitHour(11,50);
                presence.setEndHour(15,35);
                presence.setClassroomCode('F100');
                dataTable.presenceTable.push(presence);
                /* 2 */
                presence3.setStudent(student);
                presence3.setDayNumber(3);
                presence3.setInitHour(14,50);
                presence3.setEndHour(15,35);
                presence3.setClassroomCode('F600');
                dataTable.presenceTable.push(presence3);
                /* 3 */
                presence2.setStudent(student);
                presence2.setDayNumber(4);
                presence2.setInitHour(11,50);
                presence2.setEndHour(11,54);
                presence2.setClassroomCode('F300');
                dataTable.presenceTable.push(presence2);
            })
            it('Shloud retrive a number without sum the presences with 5 minutes of asistence',async ()=>{
                const response = await studentFunctions.getTotalMinutesByStudent(dataTable.presenceTable);
                response.should.be.an('object');
                response.should.have.property('error');
                response.error.should.be.an('boolean');
                response.error.should.be.equals(false)
                response.should.have.property('message');
                response.message.should.be.an("string");
                response.should.have.property('data');
                response.data.should.be.an("number");
            });
        });
    });

    describe('getTotalPrecensesByStudent Function - Retrive a total counter of presences by student',()=>{
        describe('1) When exist a presence less than 1 minute, others with 2 minutes or more',()=>{
            var student = new Student();
            let presence = new Presence();
            let presence2 = new Presence();
            let presence3 = new Presence();
            beforeEach(() => {
                student.setName('Hilder');
                dataTable.studentTable.push(student);
                /* 1 */
                presence.setStudent(student);
                presence.setDayNumber(2);
                presence.setInitHour(11,50);
                presence.setEndHour(15,35);
                presence.setClassroomCode('F100');
                dataTable.presenceTable.push(presence);
                /* 2 */
                presence3.setStudent(student);
                presence3.setDayNumber(3);
                presence3.setInitHour(14,50);
                presence3.setEndHour(15,35);
                presence3.setClassroomCode('F600');
                dataTable.presenceTable.push(presence3);
                /* 3 */
                presence2.setStudent(student);
                presence2.setDayNumber(4);
                presence2.setInitHour(11,50);
                presence2.setEndHour(11,54);
                presence2.setClassroomCode('F300');
                dataTable.presenceTable.push(presence2);
            })
            it('Shloud retrive a number without sum the presences with 5 minutes of asistence',async ()=>{
                const response = await studentFunctions.getTotalPrecensesDaysByStudent(dataTable.presenceTable);
                response.should.be.an('object');
                response.should.have.property('error');
                response.error.should.be.an('boolean');
                response.error.should.be.equals(false)
                response.should.have.property('message');
                response.message.should.be.an("string");
                response.should.have.property('data');
                response.data.should.be.an("number");
            });
        });
    });

    afterEach(() => {
        dataTable.studentTable = new Array();
        dataTable.presenceTable = new Array();
    })
  
})