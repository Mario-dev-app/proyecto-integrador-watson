const swaggerAutogen = require('swagger-autogen')();

const doc = {
    openapi: '3.0.0',
    info: {
        title: 'API REST de prueba',
        description: 'Esta es una API para probar la funcionalidad de generar automáticamente el documento JSON de Swagger',
    },
    host: 'test-swagger-cibertec.herokuapp.com',
    schemes: ['https'],
    '@definitions': {
        Paciente: {
            type: 'object',
            properties: {
                nombre: {
                    type: 'string'
                },
                correo: {
                    type: 'string'
                },
                telefono: {
                    type: 'string'
                },
                dni: {
                    type: 'string'
                }
            }
        },
        BasicResponse :{
            type: 'object',
            properties: {
                ok: {
                    type: 'boolean'
                },
                message: {
                    type: 'string'
                }
            }
        },
        ArrayResponse: {
            type: 'object',
            properties: {
                ok: {
                    type: 'boolean'
                },
                message: {
                    type: 'array'
                }
            }
        },
        FakeReniec: {
            type: 'object',
            properties: {
                dni: {
                    type: 'string'
                },
                nombre: {
                    type: 'string'
                },
                apellidos: {
                    type: 'string'
                }
            }
        },
        Cita: {
            type: 'object',
            properties: {
                turno: {
                    type: 'string'
                },
                especialidad: {
                    type: 'string'
                },
                fecha: {
                    type: 'string'
                },
                dni: {
                    type: 'string'
                },
                codigo: {
                    type: 'string'
                }
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/routes'];

swaggerAutogen(outputFile, endpointsFiles, doc);