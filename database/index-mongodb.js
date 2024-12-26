const mongoose = require("mongoose")
const config = require('config');

const {host: dbHost, port: dbPort, dbName, password: dbPass, username: dbUser='root'} = config.get('db');

module.exports =  async () => {
    // await mongoose.connect(`mongodb+srv://${dbHost}:${dbPort}/`, {
    await mongoose.connect(`mongodb+srv://`, {
        user: dbUser,
        pass: dbPass,
        dbName: dbName,
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    });
    
    mongoose.connection.on('connected', () => console.log('connected'));
    mongoose.connection.on('open', () => console.log('open'));
    mongoose.connection.on('disconnected', () => console.log('disconnected'));
    mongoose.connection.on('reconnected', () => console.log('reconnected'));
    mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
    mongoose.connection.on('close', () => console.log('close'));

    // await mongoose.connect("mongodb+srv://senavijit1697:<password>@cluster0.nvkdudg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}