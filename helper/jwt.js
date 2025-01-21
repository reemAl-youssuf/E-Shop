const expressJwt = require('express-jwt');



function authJwt() { 
    const secret = process.env.secret
    const api = process.env.API_URL
    return expressJwt.expressjwt({
        secret,
        algorithms:['HS256'],
        isRevoked: expressJwt.isRevoked
    }).unless({
        path: [
            {url: /\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/category(.*)/ , methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    })
}

async function isRevoked(req,payload, done){
    if(!payload.isAdmin){
        return done(null, true)
    }
    return done(null, false);
}


module.exports = authJwt;