const jwt = require('jsonwebtoken');

function generateUserToken(user) {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
}

const generateOwnerToken = (owner) => {
    const { role, id } = owner;
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
};

module.exports = {
    generateUserToken,
    generateOwnerToken
};
