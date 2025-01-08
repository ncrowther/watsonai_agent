'use strict';

var utils = require('../utils/writer.js');
var MarketGen = require('../service/MarketGenService');

module.exports.generateEmail = function generateEmail (req, res, next, body, projectId, apiKey, min_new_tokens, max_new_tokens) {


  MarketGen.getBearer(req, apiKey)
    .then(function (bearerTokenResponse) {
      console.log('****bearerToken: ', bearerTokenResponse);
      MarketGen.generateEmail(body, projectId, bearerTokenResponse, min_new_tokens, max_new_tokens)
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
};