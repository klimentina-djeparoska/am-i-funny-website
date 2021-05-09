import React, {useState} from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home = () => {
    const [enteredText, setEnteredText] = useState('');

    const test = () => {
        if (enteredText === '') {
            alert('Please enter some text first');
        } else {

        }
    };

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
                        <span style={{fontWeight: '500'}}>FUNNY</span>
                        <span className={styles.middleOr}>or</span>
                        <span style={{fontWeight: '500', color: '#c70404'}}>NOT</span>
                    </h1>
                    <p className={styles.description}>
                        Test your jokes and see how funny are you!
                    </p>
                </div>
                <div className={styles.enterText}>
                    <textarea value={enteredText} onChange={e => setEnteredText(e.target.value)}/>
                    <button onClick={() => test()}>TEST</button>
                </div>
            </div>
        </div>
    </>
  );
};

export default Home;
