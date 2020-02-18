const chalk = require("chalk");
const boxen = require("boxen");

const promptFunctions = require('./logic/commandLine/fileFromPrompt');
const commandsList = require('./models/commandList')
const INDEX_COMMAND = 0;

/* 
class person{
    constructor(){

    }
    get name(){
        return this.name;
    }
    set setName(name){
        this.name = name;
    }
}


class Animal{

    constructor(number){
        this.age = number;
    }
    getAge(){
        return this.age;
    }
}

 var animal = new Animal(2);
const greeting = chalk.white.bold(`Lista de asistencia \n\nHola que tal mis panas como estan? \n ${animal.getAge()}`);






console.log(msgBox);

const run = async () => {
    const credentials = await getUrlFile.urlUser();
    console.log(credentials);
};
  
run(); */

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#555555"
};



const run = async ()=>{
    try {
        const readPromptFile = await promptFunctions.readPromptFile();
        const lineValidationResult = await promptFunctions.parseDataFromFile(readPromptFile.data);
        console.log(lineValidationResult.message);
        if(lineValidationResult.data.validLines.length == 0) throw new Error(lineValidationResult.message);
        for (const line of lineValidationResult.data.validLines) {
            const NUMBER_COMMAND = `${lineValidationResult.data.validLines.indexOf(line) + 1}`
            console.log(`Procesando linea Nº ${NUMBER_COMMAND}...`,);
            console.log(`Comando: ${line}`);
            const resultMessage = await commandsList[line.split(' ')[INDEX_COMMAND]](line);
            console.log(`Result: ${resultMessage}\n`);
        }
        // const msgBox = boxen( message, boxenOptions );
        // console.log(responseValdation.data);
    } catch (error) {
        const msgBox = boxen(error.message, boxenOptions );
        return console.log(msgBox);
    }
}

run();
