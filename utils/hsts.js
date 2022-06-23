function hsts(req, res, next) {//max-age=31536000
    res.setHeader('Strict-Transport-Security', 'max-age=300; includeSubDomains; preload');
    next()
}

export default hsts