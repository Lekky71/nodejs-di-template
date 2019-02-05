/**
 * Created by Oluwaleke Fakorede on 15/12/2018.
 */
const config = require('../config/settings');

const routes = function routes(server, serviceLocator) {
  const triangle = serviceLocator.get('triangleController');
  const blog = serviceLocator.get('blogPostController');
  const comment = serviceLocator.get('commentController');
  const blogUrl = '/blog/post';
  const commentUrl = '/blog/comment';

  server.get({
    path: '/',
    name: 'home',
    version: '1.0.0'
  }, (req, res) => res.send(`Welcome to ${config.appName} API`));

  server.get({
    path: '/triangle',
    name: 'Triangle type check',
    version: '1.0.0'
  }, (req, res) => triangle.receiveTriangle(req, res));

};

module.exports = routes;
