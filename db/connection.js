var mysql = require('sync-mysql');

var connection = new mysql({
    host: "localhost",
    user: "root",
    password: "",
    database: "instagramlike_masoud"
})

module.exports = connection