#!/usr/bin/env node
/* 
  _____                  _              ____                                 _        
 |  ___|   ___    _ __  (_)  ___       / ___|   ___    _ __    ___    ___   | |   ___ 
 | |_     / _ \  | '__| | | / __|     | |      / _ \  | '_ \  / __|  / _ \  | |  / _ \
 |  _|   | (_) | | |    | | \__ \     | |___  | (_) | | | | | \__ \ | (_) | | | |  __/
 |_|      \___/  |_|    |_| |___/      \____|  \___/  |_| |_| |___/  \___/  |_|  \___|

*/


const prompt = require('../logic/fileFromPrompt');

console.clear();
console.log( prompt.printGreetings() );

prompt.run();

