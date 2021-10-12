import { RSAA } from 'redux-api-middleware';

export const TEST_MODEL = 'TEST_MODEL';
export const TEST_MODEL_SUCCESS = 'TEST_MODEL_SUCCESS';
export const TEST_MODEL_FAILURE = 'TEST_MODEL_FAILURE';

export const testModel = (body) => {
    const endpointUrl = process.env.NEXT_PUBLIC_TEST_MODEL;

    return {
        [RSAA]: {
            types: [
                TEST_MODEL,
                TEST_MODEL_SUCCESS,
                TEST_MODEL_FAILURE,
            ],
            endpoint: endpointUrl,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        },
    };
};
