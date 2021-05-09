import React from 'react';
import Link from "next/link";
import {HOME, LEAVE_FEEDBACK} from "../../public/routes";

const Menu = () => {
    const styles = {
        wrapper: {
            textAlign: 'left',
            padding: '1rem 2rem',
            display: 'flex',
        },
        logo: {
            fontWeight: 'bold',
            fontSize: '2.7vh'
        },
        feedback: {
            marginLeft: 'auto',
            fontWeight: '500'
        },
    };

    return (
        <div style={styles.wrapper}>
            <Link href={HOME}><a style={styles.logo}>Am I Funny</a></Link>
            <Link href={LEAVE_FEEDBACK}><a style={styles.feedback}>Leave Feedback</a></Link>
        </div>
    );
};

export default Menu;
