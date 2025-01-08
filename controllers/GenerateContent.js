'use strict';

var utils = require('../utils/writer.js');
var GenerateContent = require('../service/GenerateContentService');

module.exports.generateContent = function generateContent(req, res, next, body, projectId, apiKey, min_new_tokens, max_new_tokens) {
  GenerateContent.getBearer(req, apiKey)
    .then(function (bearerTokenResponse) {
      console.log('****bearerToken: ', bearerTokenResponse);
      GenerateContent.generateContent(body, projectId, bearerTokenResponse, min_new_tokens, max_new_tokens)     
        .then(function (watsonxResponse) {
          utils.writeJson(res, watsonxResponse);
        })
        .catch(function (watsonxResponse) {
          utils.writeJson(res, watsonxResponse);
        });
    })
    .catch(function (bearerTokenResponse) {
      console.log('****bearer error: ', bearerTokenResponse);
      utils.writeJson(res, bearerTokenResponse);
    });
  }