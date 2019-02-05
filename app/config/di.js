/**
 * Created by Oluwaleke Fakorede on 15/12/2018.
 */
const winston = require('winston');
const pg = require('pg');

const config = require('./settings');
const serviceLocator = require('../lib/serviceLocator');
const TriangleController = require('../controllers/triangle.controller');
const TriangleService = require('../service/triangle.service');

/**
 * Returns an instance of logger
 */
/**
 * Returns an instance of logger for the App
 */
serviceLocator.register('logger', () => {
    const consoleTransport = new (winston.transports.Console)({
        datePattern: 'yyyy-MM-dd.',
        prepend: true,
        json: false,
        colorize: true,
        level: process.env.ENV === 'development' ? 'debug' : 'info',
    });
    const transports = [consoleTransport];
    return winston.createLogger({
        transports,
    });
});


/**
 * Returns a mysql connection instance.
 */

// SERVICE INSTANCES

/**
 * Creates instances of services
 */
serviceLocator.register('TriangleService', (serviceLocator) => {
    const logger = serviceLocator.get('logger');
    return new TriangleService(logger);
});

// CONTROLLER INSTANCES

/**
 * Creates instances of controllers
 */
serviceLocator.register('triangleController', (serviceLocator) => {
    const logger = serviceLocator.get('logger');
    const service = serviceLocator.get('TriangleService');
    return new TriangleController(logger, service);
});

module.exports = serviceLocator;
