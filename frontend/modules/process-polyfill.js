window.process = {
    argv: [],
    env: {
        NODE_ENV:
            window.location.hostname === 'vesseract.com'
                ? 'production'
                : window.location.hostname.includes('.netlify.app')
                ? 'staging'
                : 'development',
        testing: false,
    },
};
