const mongoose = require('mongoose');
require('dotenv').config();
exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then( () => console.log("Database connected successfully") )
    .catch( (e) => {
        console.log(e)
        console.log("Issue in DB Connection")
        process.exit(1);
    });
}