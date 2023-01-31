const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = 3000;
const path= require('path')
const {connectDB} = require('./src/db')

//execute the connectdb function to connect to our database
connectDB();

app.set('view engine', 'ejs')
//update the location of the folder for res.rendre to use
app.set('views', path.join(__dirname, 'src/templates/views'))

//set up  middleware to parse form data and add to request body
app.use(express.urlencoded({extended:true}))



app.get('/', (req, res) => {
    res.send('hello world');
});

//import the function from the routes module
const initroutes = require('./src/routes');
//execute the function with app as arguement
initroutes(app);


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});


