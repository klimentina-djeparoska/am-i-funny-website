import React, {useState} from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useDispatch} from "react-redux";
import {TEST_MODEL_SUCCESS, testModel} from "../actions/test-model";

const Home = () => {
    const [enteredText, setEnteredText] = useState('');
    const [resultText, setResultText] = useState('');
    const dispatch = useDispatch();

    const test = () => {
        if (enteredText === '') {
            alert('Please enter some text first');
        } else {
            dispatch(testModel(enteredText)).then(res => {
                if(res.type === TEST_MODEL_SUCCESS) {
                    const text = 'The model thinks your text is ' + res.payload[0] + ', with probability of ' + res.payload[1].toFixed(2) + '.';
                    setResultText(text);
                    setEnteredText('');
                } else {
                    console.error(res.payload.message);
                }
            });
        }
    };

    function enteredTextChange (value) {
        setEnteredText(value);
        if (resultText !== '') {
            setResultText('');
        }
    }

  return (
    <>
        <Head>
            <title>Am I Funny?</title>
            <meta name="description" content="Test your jokes and see how funny are you!" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
            <div className={styles.innerWrap}>
                <div className={styles.main}>
                    <h1 className={styles.title}>
                        <span className={styles.bold}>FUNNY</span>
                        <span className={styles.middleOr}>or</span>
                        <span className={styles.not}>NOT</span>
                    </h1>
                    <p className={styles.description}>
                        Test your jokes and see how funny are you!
                    </p>
                </div>
                <div className={styles.enterText}>
                    <textarea value={enteredText} onChange={e => enteredTextChange(e.target.value)}/>
                    <button disabled={enteredText === ''} className={styles.testButton} onClick={() => test()}>TEST</button>
                </div>
                {
                    resultText ?
                        <div className={styles.textCenter}>
                            <label>RESULT:</label>
                            <p>{resultText}</p>
                            <p className={styles.note}>NOTE: THE RESULTS ARE FOR EDUCATIONAL PURPOSE ONLY. IT DOES NOT MEAN YOU ARE NOT FUNNY :)</p>
                        </div>
                        : ''
                }
            </div>
        </div>
    </>
  );
};

export default Home;
