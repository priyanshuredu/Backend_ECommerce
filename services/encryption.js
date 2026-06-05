const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const createHashPassword = (password) => {
    const hash = bcrypt.genSaltSync(password ,salt);
    return hash;
};

const verifyHashPassword = (password ,hash) => {
    const match = bcrypt.compareSync(password ,hash);
    if(match ) return true;
    else return false;
};

module.exports = {createHashPassword ,verifyHashPassword};