module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'its a secret',
};

// uses alg (HS256) to encrypt and decrypt ket