const db = require('../database/dbConfig')//database import

module.exports = {
    add,
    find,
    findBy,
    findById,
} // exporting functions


function find() {
    return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
    return db('users').where(filter)
}

async function add(user) {
    const [id] = await db('users').insert(user);
}

function findById(id) {
    return db('users').where({id}).first();
}