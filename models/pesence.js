const Joi = require('@hapi/joi');

module.exports = {
    schemaValidation: Joi.object({
        student: Joi.object({
            name: Joi.string().required()
        }),
        dayNumber: Joi.number().integer().allow(1,2,3,4,5,6,7),
        initHour: Joi.number().min(0).max(24).allow(0),
        initMinutes: Joi.number().min(0).max(59).allow(0),
        endHour: Joi.number().min(Joi.ref('initHour')).max(24).allow(0),
        endMinutes: Joi.number().min(Joi.ref('endHour') <= Joi.ref('initHour')?Joi.ref('initMinutes'):0).max(59).allow(0),
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