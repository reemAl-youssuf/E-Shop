const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose')
const authJwt = require('./helper/jwt')
const errorHandler = require('./helper/error-handler')

require('dotenv/config')

app.use(cors());
app.options('*', cors())


//middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler)


// Routes 
const productsRoutes = require('./router/products')
const usersRoutes = require('./router/users')
const ordersRoutes = require('./router/orders')
const categoryRoutes = require('./router/category')
const orderItemsRoutes = require('./router/orderItems')

const api = process.env.API_URL

app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/orders`, ordersRoutes)
app.use(`${api}/category`, categoryRoutes)
app.use(`${api}/orderItems`, orderItemsRoutes)

//connection database
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
}).then (()=>{
    console.log('Database connection is ready..')  
})
.catch((err)=>{console.log(err)});


// server
app.listen(3000, () => {
    console.log('listening on port 3000')
})

