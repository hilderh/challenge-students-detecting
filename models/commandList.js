const studentFunctions = require('../logic/student');

module.exports = {
    async Student(commandLineStudent){
        const responseCreate = await studentFunctions.createNewStudent(commandLineStudent)
        return responseCreate.message;
    },
    async Presence(commandLinePresence){
        return commandLinePresence
    }
}