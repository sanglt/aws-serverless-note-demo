'use strict';

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();
const tableName = 'Note';

module.exports.getNotes = (event, context, callback) => {

  var payload = {
    TableName: tableName
  };

  dynamo.scan(payload, function (err, data) {
    var items = [];
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    }
    else {
      data.Items.forEach(function (note) {
        items.push(note);
      });
    }
    var response = {
      statusCode: 200,
      body: items,
    };
    callback(null, response);
  });
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.createNote = (event, context, callback) => {
  var payload = {
    TableName: tableName,
    Item: event.body
  };
  dynamo.putItem(payload, function (err, data) {
    if (err) {
      console.error("Unable to put data to the table. Error JSON:", JSON.stringify(err, null, 2));
    }
    else {
      var response = {
        statusCode: 200,
        body: event.body,
      };
      callback(null, response);
    }
  });
};


module.exports.deleteNote = (event, context, callback) => {
  var payload = {
    TableName: tableName,
    Key: {
      title: event.path.title
    }
  }
  dynamo.deleteItem(payload, (err, data) => {
    if (err) {
      console.error("Unable to remove data from the table. Error JSON:", JSON.stringify(err, null, 2));
    }
    else {
      var response = {
        statusCode: 200
      };
      callback(null, response);
    }
  });
}
