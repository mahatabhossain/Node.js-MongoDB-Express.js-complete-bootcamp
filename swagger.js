const swaggerAutogen = require('swagger-autogen')()

const outputFile = './doc/swagger_output.json'
const endpointsFiles = ['./routers/*.js']

swaggerAutogen(outputFile, endpointsFiles)