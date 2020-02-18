const Joi = require('@hapi/joi');

module.exports = {
    schemaValidation: Joi.object({
        student: Joi.object({
            name: Joi.string().required()
        }).required(),
        dayNumber: Joi.number().integer().greater(0).less(8).required(),
        initHour: Joi.number().integer().min(0).max(23).required(),
        initMinutes: Joi.number().integer().min(0).max(59).required(),
        endHour: Joi.number().integer().min(Joi.ref('initHour')).max(23).required(),
        endMinutes: Joi.number().integer().when('endHour',{
            is: Joi.number().equal(Joi.ref('initHour')),
            then: Joi.number().greater(Joi.ref('initMinutes')).max(59).required(),
            otherwise: Joi.number().min(0).max(59).required()
        }),
        classroomCode: Joi.string().required()
    }),
    attributtes: {
        student:{
            title: 'Estudiante',
        },
        dayNumber:{
            title: 'Día',
        },
        initHour:{
            title: 'Hora de entrada',
        },
        initMinutes:{
            title: 'Hora de entrada',
        },
        endHour:{
            title: 'Hora de salida',
        },
        endMinutes: {
            title: 'Hora de salida',
        },
        classroomCode:{
            title: 'Código de Sala',
        }
    }
}