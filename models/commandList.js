const studentFunctions = require('../logic/student');
const presenceFunctions = require('../logic/presence');


module.exports = {
    async Student(commandLineStudent){
        const responseCreate = await studentFunctions.createNewStudent(commandLineStudent)
        return responseCreate.message;
    },
    async Presence(commandLinePresence){
        const responseCreate = await presenceFunctions.createNewPresence(commandLinePresence)
        return responseCreate.message;
    }
}