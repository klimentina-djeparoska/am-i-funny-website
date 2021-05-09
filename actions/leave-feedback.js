import { RSAA } from 'redux-api-middleware';

export const SAVE_FEEDBACK = 'SAVE_FEEDBACK';
export const SAVE_FEEDBACK_SUCCESS = 'SAVE_FEEDBACK_SUCCESS';
export const SAVE_FEEDBACK_FAILURE = 'SAVE_FEEDBACK_FAILURE';

export const saveFeedback = (body) => {
    const endpointUrl = process.env.NEXT_PUBLIC_SAVE_FEEDBACK;
    return {
        [RSAA]: {
            types: [
                SAVE_FEEDBACK,
                SAVE_FEEDBACK_SUCCESS,
                SAVE_FEEDBACK_FAILURE,
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
