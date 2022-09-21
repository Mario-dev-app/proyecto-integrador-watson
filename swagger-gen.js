const swaggerAutogen = require('swagger-autogen')();

const doc = {
    openapi: '3.0.0',
    info: {
        title: 'API REST de prueba',
        description: 'Esta es una API para probar la funcionalidad de generar automáticamente el documento JSON de Swagger',
    },
    host: 'test-swagger-cibertec.herokuapp.com',
    schemes: ['https'],
    /* definitions: {
        Usuario: {
            nombre: 'Mario',
            apellido: 'Peralta',
            edad: 27
        }
    } */
    components: {
        '@schemas': {
            Usuario: {
                type: 'object',
                properties: {
                    nombre: {
                        type: 'string'
                    }
                }
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/routes'];

swaggerAutogen(outputFile, endpointsFiles, doc);