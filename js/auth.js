function auth(req) {
    let hBearer = req.headers['x-access-token'] || req.headers['authorization'];

    if (typeof hBearer !== 'undefined') {

        const bearer = hBearer.split(' ');
        const token = bearer[1];

        return token;
    }
}


exports.auth = auth;