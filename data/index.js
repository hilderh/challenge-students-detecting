var studentClass = require('../models/classes/student') ;
var newa = new studentClass();
newa.setName('Hilder')
var hola = new Array();
hola.push(newa)
module.exports = {
    studentTable: hola,
    presenceTable: new Array()
}