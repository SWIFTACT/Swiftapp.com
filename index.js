const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')


const app = express();

mongoose.connect(process.env.MONGO_URI)
    .catch(error => console.log(`DB Connection error: ${error}`));
const con = mongoose.connection;

//handle error while opening dbb 

con.on('open', error => {
    if (!error)
        console.log('DB Connection Succesful');
    else
        console.log(`Error Connecting to DB: ${error}`);
})

// handle mongoose disconnect from mongodb

con.on('disconnected', error => {
    console.log(`Mongoose lost connection with MongoDB:${error}`)
})

// parse Json data coming in the request body 
app.use(express.json());
app.use(cors());


// gain access to my routes
app.use("/auth", require('./user/routes/auth'));
app.use("/admin", require('./admin/routes/admin'));
app.use("/userCart", require('./user/routes/userCart'))
app.use("/authenticateUser", require('./user/routes/authenticateUser'))
app.use("/product", require('./user/routes/product'))
app.use("/Payment", require('./user/routes/payment'))
app.use("/review", require('./user/routes/review'))
app.use("/riderauth", require('./rider/routes/riderauth'));


const PORT = process.env.PORT || 2370

app.listen(PORT, () => console.log(`server running on port ${PORT}`)
);