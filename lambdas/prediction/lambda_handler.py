import os
import io
import boto3
import json
import csv
import string
# grab environment variables
ENDPOINT_NAME = os.environ['ENDPOINT_NAME']
runtime= boto3.client('runtime.sagemaker')
import math

def stable_sigmoid(x):
    if x >= 0:
        z = math.exp(-x)
        sig = 1 / (1 + z)
        return sig
    else:
        z = math.exp(x)
        sig = z / (1 + z)
        return sig


def download_vocabulary ():
    bucket = 'sagemaker-model-vocabularies' # replace with your bucket name
    key = 'keras-model/vocabulary.json' # replace with your object key

    s3 = boto3.client('s3')
    response = s3.get_object(Bucket=bucket, Key=key)
    content = response['Body']
    file = json.load(content)
    return file


def pad_sequence(array, length, padding, value):
    num_zeros = length - len(array)
    new_array = []
    for x in range(0, num_zeros):
        new_array.append(value)
    for x in range(0, len(array)):
        new_array.append(array[x])
    return new_array


def sent_tokenize(sentences):
    return sentences.split('\n')


def word_tokenize(sentence):
    return sentence.split(' ')

def format_data_for_prediction (text):
    vocabulary_map = download_vocabulary()
    counter = len(vocabulary_map.keys()) + 1

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
                if not vocabulary_map.keys().__contains__(word):
                    vocabulary_map[word] = counter
                    counter += 1

                text_represented_with_numbers.append(vocabulary_map[word])
    # arrays to have same length
    padded_seq = pad_sequence(text_represented_with_numbers, length=63, padding='pre', value=0)
    return padded_seq


def lambda_handler(event, context):
    data = json.loads(json.dumps(event))
    print(data['body'])

    # payload = format_data_for_prediction(data['body'])
    # print(payload)
    # converted = json.dumps(payload)

    response = runtime.invoke_endpoint(EndpointName=ENDPOINT_NAME,
                                       ContentType='text/csv',
                                       Body=data['body'])
    print('result from endpoint: ', response)
    result = json.loads(response['Body'].read().decode())
    print('prediction', result)

    pred = result['predictions'][0][0]
    percentage = stable_sigmoid(pred) * 100
    predicted_label = 'funny' if percentage > 50 else 'not funny'
    result_data = [predicted_label, percentage]

    result = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(result_data)
    }
    return result