const { Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const config = require('./config');
const { User } = require('../models');

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.sub);
        if(!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch(error) {
        return(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy,
};