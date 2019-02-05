class TriangleService {
  constructor(logger) {
    this.logger = logger;
  }

  checkTriangle(a, b, c) {
    return new Promise(((resolve) => {
      const response = { type: 'Scalene' };
      if ((a <= 0) || (b <= 0) || (c <= 0)) {
        response.type = 'Incorrect';
      }// added test
      else if ((a >= b + c) || (c >= b + a) || (b >= a + c)) {
        response.type = 'Incorrect';
      } else if ((a === b) && (b === c)) {
        response.type = 'Equilateral';
      } else if ((b === c) || (a === b) || (c === a)) response.type = 'Isosceles';
      resolve(response);
    }));
  }
}

module.exports = TriangleService;
