
var should = require('chai').should();
var prompt = require('./../logic/commandLine/fileFormPrompt')

describe('Student Test - Validate functions about Student data', () => {

    describe('validateStudentFields Function - Validate all fields about students', () =>{

        describe('1) Student without name', () => {
    
            it("Should get an object with error true and error's message property",async () => {

                const response = await prompt.readPromptFile()
                /* reject.should.be.an('object');
                reject.should.have.property('error');
                reject.error.should.be.an('boolean');
                reject.error.should.be.equals(true)
                reject.should.have.property('message');
                reject.message.should.be.an("string"); */
                
            })
            
        })

    })
  
})