import os
import io
import boto3
import json
import csv
import string
# grab environment variables
ENDPOINT_NAME = os.environ['ENDPOINT_NAME']
runtime= boto3.client('runtime.sagemaker')


def pad_sequence(array, length, padding, value):
    num_zeros = length - len(array)
    new_array = []
    for x in range(0, num_zeros):
        new_array.append(value)
    for x in range(0, len(array)):
        new_array.append(x)
    return new_array


def sent_tokenize(sentences):
    return sentences.split('\n')


def word_tokenize(sentence):
    return sentence.split(' ')

def format_data_for_prediction (text):
    vocabulary = []
    vocabulary_map = {}
    counter = 1

    text_represented_with_numbers = []
    # break the text into sentences
    sentences = sent_tokenize(text)

    for sentence in sentences:
        # break the sentence into words
        words_array = word_tokenize(sentence)

        for word in words_array:
            # remove punctuation
            word = word.translate(str.maketrans('', '', string.punctuation))

            # lower case all letters
            word = word.lower()

            if word != '' and word != 's':
                if not vocabulary.__contains__(word):
                    vocabulary.append(word)
                    vocabulary_map[word] = counter
                    counter += 1

                text_represented_with_numbers.append(vocabulary_map[word])
    # arrays to have same length
    padded_seq = pad_sequence(text_represented_with_numbers, length=63, padding='pre', value=0)
    print(len(vocabulary))
    return padded_seq


def lambda_handler(event, context):
    data = json.loads(json.dumps(event))
    print(data['body'])

    payload = format_data_for_prediction(data['body'])
    converted = json.dumps(payload)

    response = runtime.invoke_endpoint(EndpointName=ENDPOINT_NAME,
                                       ContentType='application/json',
                                       Body=converted)
    print('result from endpoint: ', response)
    result = json.loads(response['Body'].read().decode())
    print('prediction', result)

    pred = result['predictions'][0][0]
    predicted_label = 'funny' if pred > 0.5 else 'not funny'
    result_data = [predicted_label, pred]

    result = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(result_data)
    }
    return result