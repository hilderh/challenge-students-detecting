
var should = require('chai').should();
var presenceFunctions = require('../logic/presence')

describe('Presence Test - Validate functions about Presence data', () => {

    describe('validatePresenceFields Function - Validate all fields about Presence', () =>{
        describe('1) Presence Student validation',()=>{
            describe('1.1) Presence without Student', () => {
        
                it("Should get an object with error true and error's message property",async () => {
    
                    const response = await presenceFunctions.validationFields('Presence 2 09:04 10:35 F100');
                    response.should.be.an('object');
                    response.should.have.property('error');
                    response.error.should.be.an('boolean');
                    response.error.should.be.equals(true)
                    response.should.have.property('message');
                    response.message.should.be.an("string");
                    
                })
                
            })
            describe('1.2) Presence with a not exiting Student', () => {
        
                it("Should get an object with error true and error's message property",async () => {
    
                    const response = await presenceFunctions.validationFields('Presence Matthias 2 09:04 10:35 F100');
                    response.should.be.an('object');
                    response.should.have.property('error');
                    response.error.should.be.an('boolean');
                    response.error.should.be.equals(true)
                    response.should.have.property('message');
                    response.message.should.be.an("string");
                    
                })
                
            })
        });
        describe('2) Presence dayNumber Validation',()=>{
            describe('2.1) Presence without Day', () => {
        
                it("Should get an object with error true and error's message property",async () => {
    
                    const response = await presenceFunctions.validationFields('Presence Matthias 09:04 10:35 F100');
                    response.should.be.an('object');
                    response.should.have.property('error');
                    response.error.should.be.an('boolean');
                    response.error.should.be.equals(true)
                    response.should.have.property('message');
                    response.message.should.be.an("string");
                    
                })
                
            })
    
            describe('2.2) Presence with string day', () => {
        
                it("Should get an object with error true and error's message property",async () => {
    
                    const response = await presenceFunctions.validationFields('Presence Hilder hi 09:04 10:35 F100');
                    response.should.be.an('object');
                    response.should.have.property('error');
                    response.error.should.be.an('boolean');
                    response.error.should.be.equals(true)
                    response.should.have.property('message');
                    response.message.should.be.an("string");
                    
                })
                
            })
    
            describe('2.3) Presence with a day smaller than 1', () => {
        
                it("Should get an object with error true and error's message property",async () => {
    
                    const response = await presenceFunctions.validationFields('Presence Hilder 0 09:04 10:35 F100');
                    response.should.be.an('object');
                    response.should.have.property('error');
                    response.error.should.be.an('boolean');
                    response.error.should.be.equals(true)
                    response.should.have.property('message');
                    response.message.should.be.an("string");
                    
                })
                
            })
    
            describe('2.4) Presence with a day bigger than 7', () => {
        
                it("Should get an object with error true and error's message property",async () => {
    
                    const response = await presenceFunctions.validationFields('Presence Hilder 32 09:04 10:35 F100');
                    response.should.be.an('object');
                    response.should.have.property('error');
                    response.error.should.be.an('boolean');
                    response.error.should.be.equals(true)
                    response.should.have.property('message');
                    response.message.should.be.an("string");
                    
                })
                
            })
        });
        describe('3) Presence initHour Validation',()=>{
            describe('3.1) Presence without Init hour', () => {
        
                it("Should get an object with error true and error's message property",async () => {
    
                    const response = await presenceFunctions.validationFields('Presence Hilder 2 10:35 F100');
                    response.should.be.an('object');
                    response.should.have.property('error');
                    response.error.should.be.an('boolean');
                    response.error.should.be.equals(true)
                    response.should.have.property('message');
                    response.message.should.be.an("string");
                    
                })
                
            })
    
            describe('3.2) Presence with Init hour invalid', () => {
        
                it("Should get an object with error true and error's message property",async () => {
    
                    const response = await presenceFunctions.validationFields('Presence Hilder 2 a:04 10:35 F100');
                    response.should.be.an('object');
                    response.should.have.property('error');
                    response.error.should.be.an('boolean');
                    response.error.should.be.equals(true)
                    response.should.have.property('message');
                    response.message.should.be.an("string");
                    
                })
                
            })
    
            describe('3.3) Presence with Init hour minutes invalid', () => {
        
                it("Should get an object with error true and error's message property",async () => {
    
                    const response = await presenceFunctions.validationFields('Presence Hilder 2 1:a 10:35 F100');
                    response.should.be.an('object');
                    response.should.have.property('error');
                    response.error.should.be.an('boolean');
                    response.error.should.be.equals(true)
                    response.should.have.property('message');
                    response.message.should.be.an("string");
                    
                })
                
            })
        });
        describe('4) Presence endHour Validation',()=>{
            describe('4.1) Presence without End hour', () => {
        
                it("Should get an object with error true and error's message property",async () => {
    
                    const response = await presenceFunctions.validationFields('Presence Matthias 2 10:35 F100');
                    response.should.be.an('object');
                    response.should.have.property('error');
                    response.error.should.be.an('boolean');
                    response.error.should.be.equals(true)
                    response.should.have.property('message');
                    response.message.should.be.an("string");
                    
                })
                
            })
    
            describe('4.2) Presence with End hour invalid', () => {
        
                it("Should get an object with error true and error's message property",async () => {
    
                    const response = await presenceFunctions.validationFields('Presence Hilder 2 10:04 a:35 F100');
                    response.should.be.an('object');
                    response.should.have.property('error');
                    response.error.should.be.an('boolean');
                    response.error.should.be.equals(true)
                    response.should.have.property('message');
                    response.message.should.be.an("string");
                    
                })
                
            })
    
            describe('4.3) Presence with End hour minutes invalid', () => {
        
                it("Should get an object with error true and error's message property",async () => {
    
                    const response = await presenceFunctions.validationFields('Presence Hilder 2 10:00 11:a F100');
                    response.should.be.an('object');
                    response.should.have.property('error');
                    response.error.should.be.an('boolean');
                    response.error.should.be.equals(true)
                    response.should.have.property('message');
                    response.message.should.be.an("string");
                    
                })
                
            })
    
            describe('4.4) Presence with an InitHour later than Endhour', () => {
        
                it("Should get an object with error true and error's message property",async () => {
    
                    const response = await presenceFunctions.validationFields('Presence Hilder 2 12:00 11:00 F100');
                    response.should.be.an('object');
                    response.should.have.property('error');
                    response.error.should.be.an('boolean');
                    response.error.should.be.equals(true)
                    response.should.have.property('message');
                    response.message.should.be.an("string");
                    
                })
                
            })
    
            describe('4.5) Presence with an InitHourMinutes later than EndhourMinutes when initHour and Endhour have a same hour', () => {
        
                it("Should get an object with error true and error's message property",async () => {
    
                    const response = await presenceFunctions.validationFields('Presence Hilder 2 12:10 12:00 F100');
                    response.should.be.an('object');
                    response.should.have.property('error');
                    response.error.should.be.an('boolean');
                    response.error.should.be.equals(true)
                    response.should.have.property('message');
                    response.message.should.be.an("string");
                    
                })
                
            })
        })

        describe('5) Presence without classroom', () => {
    
            it("Should get an object with error true and error's message property",async () => {

                const response = await presenceFunctions.validationFields('Presence Matthias 2 10:35 10:35');
                response.should.be.an('object');
                response.should.have.property('error');
                response.error.should.be.an('boolean');
                response.error.should.be.equals(true)
                response.should.have.property('message');
                response.message.should.be.an("string");
                
            })
            
        })

        describe('6) Prescence with correct fields', () => {
    
            it("Should get an object with error false, message property and object prepared to save",async () => {

                const response = await presenceFunctions.validationFields('Presence Hilder 2 10:55 10:58 F100');
                response.should.be.an('object');
                response.should.have.property('error');
                response.error.should.be.an('boolean');
                response.error.should.be.equals(false)
                response.should.have.property('message');
                response.message.should.be.an("string");
                response.should.have.property('data');
                response.data.should.be.an("object");
                response.data.should.have.property('student');
                response.data.student.should.have.property('name');
                response.data.student.name.should.be.an('string');
                response.data.should.have.property('dayNumber');
                response.data.dayNumber.should.be.an('number');
                response.data.should.have.property('initHour');
                response.data.initHour.should.be.an('number');
                response.data.should.have.property('endHour');
                response.data.endHour.should.be.an('number');
                response.data.should.have.property('classroomCode');
                response.data.classroomCode.should.be.an('string');

            })
            
        })

    })

    describe('saveNewPresence Function - Record a new Presence in data', () =>{

        describe('1) When the student does not exist', () => {
    
            it("Should get an object with error true, message property",async () => {

                const response = await presenceFunctions.createNewPresence('Presence Matthias 2 10:55 10:58 F100');
                response.should.be.an('object');
                response.should.have.property('error');
                response.error.should.be.an('boolean');
                response.error.should.be.equals(true)
                response.should.have.property('message');
                response.message.should.be.an("string");

            })
            
        })
        describe('2) When the student exist', () => {
    
            it("Should get an object with error false, message property and object presence stored",async () => {

                const response = await presenceFunctions.createNewPresence('Presence Hilder 2 11:50 23:49 F100');
                response.should.be.an('object');
                response.error.should.be.equals(false)
                response.should.have.property('error');
                response.error.should.be.an('boolean');
                response.should.have.property('message');
                response.message.should.be.an("string");
                response.should.have.property('data');
                response.data.should.be.an("object");
                response.data.should.have.property('student');
                response.data.student.should.be.an("object");
                response.data.student.should.have.property('name');
                response.data.student.name.should.be.an("string");
                response.data.should.have.property('dayNumber');
                response.data.dayNumber.should.be.an("number");
                response.data.should.have.property('initHour');
                response.data.initHour.should.be.an("date");
                response.data.should.have.property('endHour');
                response.data.endHour.should.be.an("date");
                response.data.should.have.property('classroomCode');
                response.data.classroomCode.should.be.an("string");

            })
            
        })

    })
    
})