/* const saludo = ()=>{
    for (let i = 0; i < 10; i++) {
        console.log(`${i}: Resultado`)
    }
} */
const chalk = require("chalk");
const boxen = require("boxen");

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

const boxenOptions = {
 padding: 1,
 margin: 1,
 borderStyle: "round",
 borderColor: "green",
 backgroundColor: "#555555"
};




const msgBox = boxen( greeting, boxenOptions );
console.log(msgBox);