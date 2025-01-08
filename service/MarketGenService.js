var request = require('request');
var questionParser = require('../utils/questionParser.js');
/**
 * Get bearer token 
 *
 * returns Bearer Token given API Key
 **/
exports.getBearer = function (req, apiKey) {

  return new Promise(function (resolve, reject) {

    console.log("***getBearer");

    //var requestJson = req.headers.authorization;
    //console.log('*** Auth: ', requestJson);

    console.log('*** ApiKey: ', apiKey);

    var options = {
      'method': 'POST',
      'url': 'https://iam.cloud.ibm.com/identity/token',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        'grant_type': 'urn:ibm:params:oauth:grant-type:apikey',
        'apikey': apiKey
      }
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);

      var responseJson = JSON.parse(response.body);
      console.log(responseJson);

      var accessToken = responseJson.access_token;

      console.log("Token: " + accessToken);

      resolve(accessToken);

    });

  });
}

/**
 * Generate MarketGen email
 * Generate MarketGen email into tokens
 *
 * body Request MarketGen prompt
 * projectId String Project Identifier for classification
 * apiKey String Api Key
 * returns Response
 **/

exports.generateEmail = function (body, projectId, token, min_new_tokens, max_new_tokens) {

  return new Promise(function (resolve, reject) {

    var bearerToken = "Bearer " + token;
    console.log("Bearer Token: " + bearerToken);

    var prompt = body.prompt;
    console.log('Prompt: ', prompt);


    var inputPayload = {
      "input": prompt,
      "parameters": {
        "decoding_method": "greedy",
        "max_new_tokens": max_new_tokens,
        "min_new_tokens": min_new_tokens,
        "stop_sequences": [],
        "repetition_penalty": 1
      },
      "model_id": "ibm/granite-3-8b-instruct",
      "project_id": projectId,
      "moderations": {
        "hap": {
          "input": {
            "enabled": true,
            "threshold": 0.5,
            "mask": {
              "remove_entity_value": true
            }
          },
          "output": {
            "enabled": true,
            "threshold": 0.5,
            "mask": {
              "remove_entity_value": true
            }
          }
        },
        "pii": {
          "input": {
            "enabled": true,
            "threshold": 0.5,
            "mask": {
              "remove_entity_value": true
            }
          },
          "output": {
            "enabled": true,
            "threshold": 0.5,
            "mask": {
              "remove_entity_value": true
            }
          }
        
        }
      }
    }

    var inputStr = JSON.stringify(inputPayload);
    console.log('***inputStr: ', inputStr);


    var options = {
      'method': 'POST',
      'url': 'https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': bearerToken,
      },
      body: inputStr
    }


    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);

      var responsePayload = {
        "generated": "Cannot generate",
      };

      var responseJson = JSON.parse(response.body);

      console.log('***Response: ', responseJson);

      if (responseJson.status_code != 403) {

        var generatedTxt = responseJson.results[0].generated_text

        console.log('***generatedTxt: ', generatedTxt);

        responsePayload = {
          "generated": generatedTxt,
        }
      }

      resolve(responsePayload);

    });

  })
}