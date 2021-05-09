const withPWA = require('next-pwa');
const prod = process.env.NODE_ENV === 'production';

module.exports = withPWA({
    target: 'serverless',
    basePath: '',
    future: {
        webpack5: true,
    },
    pwa: {
        disable: !prod,
        dest: 'public'
    }
});
