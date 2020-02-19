const chalk = require("chalk");
const boxen = require("boxen");
const figlet = require("figlet");
const inquirer = require('inquirer');

const promptFunctions = require('./logic/commandLine/fileFromPrompt');
const reports = require('./logic/report');
const commandsList = require('./models/schemas/commandList');
const INDEX_COMMAND = 0;

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "doubleSingle",
    borderColor: "#38B7B1",
    backgroundColor: "#555555",
};

const boxenOptionsLibne = {
    padding: 0,
    margin: 0,
    borderStyle: {
        topLeft: ' ',
        topRight: ' ',
        bottomLeft: ' ',
        bottomRight: ' ',
        horizontal: ' ',
        vertical: ' '
    },
};
console.clear();
console.log(
    chalk.yellow(
        figlet.textSync('Foris  Console', { horizontalLayout: 'full' })
    )
);
const run = async ()=>{
    try {
        const readPromptFile = await promptFunctions.readPromptFile();
        const lineValidationResult = await promptFunctions.parseDataFromFile(readPromptFile.data);
        if(lineValidationResult.data.validLines.length == 0) throw new Error(lineValidationResult.message);
        let messageHeader = boxen(`Proccesing file...\nThe invalid commands will be deleted...\nReading...`,boxenOptionsLibne)
        console.log(messageHeader);
        let messageByReadLine = ''
        for (const line of lineValidationResult.data.validLines) {
            let getCommand = line.split(' ')[INDEX_COMMAND];
            const executionLineMessage = await commandsList[getCommand](line);
            messageByReadLine = messageByReadLine + `${line} -> ${executionLineMessage}\n\n`
        }
        console.log(boxen(`${messageByReadLine}`,boxenOptionsLibne));
        let aq = await inquirer.prompt([
            {
              name: 'seeReport',
              type: 'confirm',
              message: "Do you want to see the students presence's report ?",
              validate: ( value ) => value
            }
          ])
        const {data: consoleOutputReport } = await reports.generatePresencesByStudentReport();
        console.log(boxen( (aq.seeReport) ? consoleOutputReport : "Why?. Please, run me again :)" , boxenOptions ));
    } catch (error) {
        const msgBox = boxen(error.message, boxenOptions );
        return console.log(msgBox);
    }
}

run();
