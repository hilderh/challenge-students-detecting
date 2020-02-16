const inquirer = require('inquirer');
var fs = require('fs');

var enabledCommands = require('../../models/commandList')
let response = {
  error: false,
  message: '',
  data: ''
}

const INDEX_COMMAND = 0;

module.exports = {
    urlUser: ()=>{
        const questions = [
            {
              name: 'urlFile',
              type: 'input',
              message: 'Introduce la ubicación de tu archivo ( Ejm: ./lista.txt ): ',
              validate: function( value ) {
                if (value.length) {
                  return true;
                } else {
                  return 'Please enter your username or e-mail address.';
                }
              }
            }
        ];
        return inquirer.prompt(questions);
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
        return response;
      } catch (error) {
        response.error = true;
        response.message = error.message;
        return response;
      }
    }
}