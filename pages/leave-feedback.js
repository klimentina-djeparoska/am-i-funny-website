import React, {useState} from 'react';
import Head from "next/head";
import { useDispatch } from 'react-redux';
import {SAVE_FEEDBACK_SUCCESS, saveFeedback} from "../actions/leave-feedback";
import styles from '../styles/leave-feedback.module.css';
import SmileyIcon from "../components/icons/smileyIcon";

const LeaveFeedback = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [sendFeedback, setSendFeedback] = useState(false);
    const feedback = () => {
        if (text !== '') {
            const date = new Date();
            const body = {
                text: text,
                date: date.toISOString(),
            };
            dispatch(saveFeedback(body)).then(res => {
                if(res.type === SAVE_FEEDBACK_SUCCESS) {
                    console.log('saved', res);
                } else {

                }
                setSendFeedback(true);
            });
        }
    };

    return (
        <>
            <Head>
                <title>Leave Feedback</title>
                <meta name="description" content="Want to share your feedback? I'd be happy to hear it!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.wrapper}>
                {
                    sendFeedback ?
                        <div className={styles.sentMessage}>
                            <span><SmileyIcon/></span>
                            <p>Thank you for your feedback. I really appreciate it!</p>
                        </div> :
                        <div>
                            <h1>How was the prediction? </h1>
                            <div className={styles.textWrap}>
                                <textarea value={text} onChange={e => setText(e.target.value)}/>
                                <button onClick={() => feedback()}>Save</button>
                            </div>
                        </div>
                }
            </div>
        </>
    );
};

export default LeaveFeedback;
