import React from 'react';

const Footer = () => {
    const styles = {
        footerStyle: {
            width: '100%',
            height: '100px',
            borderTop: '1px solid #eaeaea',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        logoStyle: {
            marginLeft: '5px',
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.footerStyle}>
            Powered by
            <span style={styles.logoStyle}>Am I Funny</span>
        </div>
    );
};

export default Footer;
