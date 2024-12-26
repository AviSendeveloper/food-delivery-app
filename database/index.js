const mysql = require('mysql2/promise');
const config = require('config');

const {host, port, name:dbName, password, username='root'} = config.get('db-mysql');

let connection = null;

module.exports = async () => {

    if (!connection) {
        try {
            connection = await mysql.createConnection({
                host,
                port,
                user: username,
                password,
                database: dbName
            });
            console.log('Connected to MySQL');
        } catch (err) {
            console.log('Error connecting to MySQL: ', err);
            throw err;
        }
    }

    return connection;
};
