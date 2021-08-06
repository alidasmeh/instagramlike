let mysql = require(`sync-mysql`);

let connection = new mysql({
    host: "localhost",
    username: "root",
    password: "",
    database: "instagramlike"
})

module.exports = connection;