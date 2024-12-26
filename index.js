/* Dependencies */
const express = require("express");
require("dotenv").config();
const config = require("config");

/* Imported files */
const mysqlConnection = require("./database");  // mysql connection

/* Initiate app */
const app = express();

/* Listen/Start server */
const SERVER_PORT = config.get("port") || "5000";
app.listen(SERVER_PORT, async () => {
    try {
        console.log(`Server running at ${SERVER_PORT}`);

        console.log(1);
        const connection = await mysqlConnection();
        const result = await connection.query("select * from users");
        console.log("Result: ", result);

        console.log("=======================================");
        
        const connection2 = await mysqlConnection();
        const result2 = await connection.query("select * from users");
        console.log("Result: ", result2);
        console.log(2);

        // await mongoConnection();
    } catch (error) {
        console.log("Something went wrong: ", error);
    }
});
