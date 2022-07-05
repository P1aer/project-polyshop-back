function hsts(req, res, next) {
    res.setHeader('Strict-Transport-Security', 'max-age=300000; includeSubDomains; preload');
    next()
}

export default hsts