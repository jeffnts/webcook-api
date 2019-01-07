const mongoose = require('mongoose');

module.exports ={

    connect: () =>{
        mongoose.connect(process.env.DB_URL, {useNewUrlParser: true });
        mongoose.Promise = global.Promise;
        mongoose.connection.once('open', () =>{
            console.log('Database connected.');
        });
    }
};