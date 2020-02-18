const Joi = require('@hapi/joi');

module.exports = {
    schemaValidation: Joi.object({
        name: Joi.string().required(),
    }),
    attributtes: {
        name: {
            title: 'Nombre',
        }
    }
}