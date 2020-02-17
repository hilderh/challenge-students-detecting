
var should = require('chai').should();
var studentFunctions = require('../logic/student')

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

    /* describe('isExistingStudent Function - check if a Student exist in data', () =>{

        describe('1) Existing Student', () => {
    
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

    }) */

    
  
})