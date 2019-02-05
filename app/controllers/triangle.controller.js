const Response = require('../lib/responseManager');
const HttpStatus = require('../constants/httpStatus');

class TriangleController {
  constructor(logger, service) {
    this.logger = logger;
    this.triangleService = service;
  }

  receiveTriangle(req, res) {
    const { a, b, c } = req.query;
    this.logger.info(`Triangle Request: ${JSON.stringify(req.query)}`);
    //Check if params are valid numbers
    if (isNaN(a)) {
      return Response.failure(res, { message: 'Param a (number type) is required' }, HttpStatus.BAD_REQUEST);
    }
    else if (isNaN(b)) {
      return Response.failure(res, { message: 'Param b (number type) is required' }, HttpStatus.BAD_REQUEST);
    }
    else if (isNaN(c)) {
      return Response.failure(res, { message: 'Param c (number type) is required' }, HttpStatus.BAD_REQUEST);
    }
    this.triangleService.checkTriangle(Number(a), Number(b), Number(c))
      .then(response => {
        this.logger.info(response);
        return Response.success(res, {
          message: 'Triangle Check complete:',
          response
        }, HttpStatus.OK);
      });

  }
}

module.exports = TriangleController;
