var express = require('express');
var MySql = require('sync-mysql');

var connection = new MySql({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "instagramlike"
});

module.exports = connection;