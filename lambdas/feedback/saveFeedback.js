const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
const docClient = new AWS.DynamoDB.DocumentClient({convertEmptyValues: true});

async function saveFeedback(item) {
    return new Promise(async resolve => {

        const params = {
            TableName: 'leave-feedback',
            Item: item
        };

        try {
            const res = await docClient.put(params).promise();
            console.log('Result: ', res);
            resolve(res);
        } catch (err) {
            console.log(err);
            resolve(err);
        }
    });
}

exports.handler = async (event) => {
    const item = JSON.parse(event.body);
    console.log('Item: ', item);
    const response = await saveFeedback(item);

    const statusCode = response['statusCode'] ? response.statusCode : '200';
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(response),
    }
};
