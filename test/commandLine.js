
var should = require('chai').should();
var prompt = require('./../logic/commandLine/fileFormPrompt')

describe('CommandLine Test - Validate functions about Command Line', () => {

    describe('promptFile Function - Validate command to readfile from prompt', () =>{

        describe('1) Run command in prompt without arguments', () => {
    
            it('Should get an object with error and message property',async () => {
                try {
                    const response = await prompt.readPromptFile()
                } catch (reject) {
                    reject.should.be.an('object');
                    reject.should.have.property('error');
                    reject.error.should.be.an('boolean');
                    reject.error.should.be.equals(true)
                    reject.should.have.property('message');
                    reject.message.should.be.an("string");
                }
            })
            
        })
    
        describe('2) Run command in prompt with file that does not exist', () => {
    
            beforeEach(() => {
                process.argv.push('test/mock/notExistingFile.txt');
            })
    
            it('Should get an object with error and message property', async () => {
                try {
                    const response = await prompt.readPromptFile()
                } catch (reject) {
                    reject.should.be.an('object');
                    reject.should.have.property('error');
                    reject.error.should.be.an('boolean');
                    reject.error.should.be.equals(true)
                    reject.should.have.property('message');
                    reject.message.should.be.an("string");
                }
            })
            
        })
    
        describe('3) Run command in prompt with correct file', () => {
    
            beforeEach(() => {
                process.argv.splice(2,1);
                process.argv.push('test/mock/existingFile.txt');
            })
    
            it('Should get an object with error, message and data property', async () => {
                const response = await prompt.readPromptFile();
                response.should.be.an('object');
                response.should.have.property('error');
                response.error.should.be.an('boolean');
                response.error.should.be.equals(false)
                response.should.have.property('message');
                response.message.should.be.an("string");
                response.should.have.property('data');
            })
            
        })

    })

    describe('parseDataFromFile Function - Transform data into readble from file', ()=>{

        describe('1) File from prompt without any data',()=>{
            it('Should get an object with error and message property', async ()=>{
                const parseResponse = prompt.parseDataFromFile('');
                parseResponse.should.be.an('object');
                parseResponse.should.have.property('error');
                parseResponse.error.should.be.an('boolean');
                parseResponse.error.should.be.equals(true)
                parseResponse.should.have.property('message');
                parseResponse.message.should.be.an("string");
            })
        });

        describe('2) File from prompt with a line with a not existing command',()=>{
            it('Should get an object with error false, message, and property data with valid and Invalid Lines', async ()=>{
                const parseResponse = await prompt.parseDataFromFile('hola\nStudent aaaa\nPresence am a\nPresenc\n\n');
                parseResponse.should.be.an('object');
                parseResponse.should.have.property('error');
                parseResponse.error.should.be.an('boolean');
                parseResponse.error.should.be.equals(false)
                parseResponse.should.have.property('message');
                parseResponse.message.should.be.an("string");
                parseResponse.should.have.property('data');
                parseResponse.data.should.have.property('invalidLines');
                parseResponse.data.invalidLines.should.be.an('array');
                parseResponse.data.should.have.property('validLines');
                parseResponse.data.validLines.should.be.an('array');
            })
        });

       /* describe('2) File from prompt with empty line',()=>{
            beforeEach(() => {
                process.argv.splice(2,1);
                process.argv.push('test/mock/someEmptyLinesFile.txt');
            });
            it('Should bla bña', async ()=>{
                const response = await prompt.parseDataFromFile('hola\n\nhola\nhola\nhola\nhola\nhola\nhola\nhola\nholahola\nhola\nhola\nhola\nhola\nhola\nhola\nhola');
            })
        });

          */
    });

  
})