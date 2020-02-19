const inquirer = require('inquirer');
const chalk = require("chalk");
const figlet = require("figlet");
const boxen = require("boxen");
var fs = require('fs');

const reports = require('./report');
var enabledCommands = require('../models/schemas/commandList');

const INDEX_COMMAND = 0;
let response = {
  error: false,
  message: '',
  data: ''
}


module.exports = {
    run: async ()=>{
      try {
        const {line: boxenLinePrint,report: boxenReportPrint} = module.exports.boxenOptions;
        const {data: readPromptFile} = await module.exports.readPromptFile();
        const { data: dataPrompt,message: messagePrompt } = await module.exports.parseDataFromFile(readPromptFile);
        console.log( boxen(`Proccesing and reading file...`,boxenLinePrint) );
        if(dataPrompt.validLines.length == 0) throw new Error(messagePrompt);
        let linesReadToPrint = await module.exports.itarateValidLines(dataPrompt.validLines);
        console.log(boxen(`${linesReadToPrint}`,boxenLinePrint));
        let {seeReport} = await module.exports.showQuestionReport();
        const {data: outputReport } = await reports.generatePresencesByStudentReport();
        console.log(boxen( (seeReport) ? outputReport : "Why Not?. Please, run me again :)" , boxenReportPrint ));
      } catch (error) {
          const msgBox = boxen(error.message, boxenReportPrint );
          return console.log(msgBox);
      }
    },
    readPromptFile: ()=>{
      return new Promise((resolve,reject)=>{
        try {
          const fileName = process.argv[2];
          if(process.argv.length < 3) throw new Error(`Instuccion incorrecta, asegúrate que sea: node index.js nombre_archivo.txt`);
          const data = fs.readFileSync(fileName,'utf8');
          response.error = false;
          response.message = `El archivo ${fileName} fue leido de manera correcta.`;
          response.data = data;
          return resolve(response);
        } catch (err) {
          response.error = true;
          response.message = err.message;
          return reject(response);
        }
      });
    },
    parseDataFromFile: (data) => {
      try {
        const linesFromFile = data.split('\n').filter(command => command != '');
        if (linesFromFile.length === 0)  throw new Error('El archivo procesado no contiene ningun dato');
        response.error = false;
        response.message = 'Los datos provenientes del archivo se han procesado.';
        response.data = {
          invalidLines: linesFromFile.filter(line=> (!enabledCommands[line.split(' ')[INDEX_COMMAND]]) ),
          validLines: linesFromFile.filter(line=> (enabledCommands[line.split(' ')[INDEX_COMMAND]]) ),
        };
        if(response.data.validLines.length === 0) throw new Error('El archivo proporcionado no contiene comandos validos para procesar los datos');
        return response;
      } catch (error) {
        response.error = true;
        response.message = error.message;
        return response;
      }
    },
    showQuestionReport:()=>{
      return inquirer.prompt([
        {
          name: 'seeReport',
          type: 'confirm',
          message: "Do you want to see the students presence's report ?",
          validate: ( value ) => value
        }
      ])
    },
    boxenOptions: {
      line: {
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
      },
      report: {
          padding: 1,
          margin: 1,
          borderStyle: "doubleSingle",
          borderColor: "#38B7B1",
          backgroundColor: "#555555",
      }
    },
    printGreetings: ()=>{
      return chalk.yellow( figlet.textSync( 'Foris  Console' , { horizontalLayout: 'full' } ) )
    },
    itarateValidLines: async (validLines)=>{
      let messageByReadLine = ''
      for (const line of validLines) {
          let getCommand = line.split(' ')[INDEX_COMMAND];
          const executionLineMessage = await enabledCommands[getCommand](line);
          messageByReadLine = messageByReadLine + `${line} -> ${executionLineMessage}\n`;
      }
      return messageByReadLine;
    }
}