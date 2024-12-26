/* Dependencies */
const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const config = require("config");

/* Imported files */
const mysqlConnection = require("./database");  // mysql connection
const router = require("./routes");

/* Initiate app */
const app = express();
app.use(express.json({ extended: false }));
app.use(cookieParser());

// routes
app.use(router);

/* Listen/Start server */
const SERVER_PORT = config.get("port") || "5000";
app.listen(SERVER_PORT, async () => {
    try {
        console.log(`Server running at ${SERVER_PORT}`);
    } catch (error) {
        console.log("Something went wrong: ", error);
    }
});
