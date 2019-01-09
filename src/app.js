// if (process.env.NODE_ENV === 'development'){
//   require('dotenv').config()
// }
require('dotenv').config()
import Koa from 'koa'
import cors from 'koa-cors'
import bodyParser  from 'koa-bodyparser'
import swaggerUi from 'swagger-ui-koa'
import convert  from 'koa-convert'
import mount  from 'koa-mount'
import { ApolloServer} from 'apollo-server-koa'
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers} from 'merge-graphql-schemas'


const app = new Koa()

app.use(cors())

//Mongoose settings
if(process.env.NODE_ENV === 'test'){
    const database = require('./config/database/database_tests')
    database.connect()
}
else{
    const database = require('./config/database/database');
    database.connect()
}

//Routes imports
const authRouter = require('./rest/services/auth/authRouter')
const recipeRouter = require('./rest/routes/recipeRoute')
const userRouter = require('./rest/routes/userRoute')


app.use(bodyParser())



//Routes callings
app.use(authRouter.routes())
app.use(recipeRouter.routes())
app.use(userRouter.routes())


// import {isAuthenticated} from './rest/services/auth/authController'
// app.use(isAuthenticated)

//GraphQL Settings
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/schemas')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')))
const server = new ApolloServer({typeDefs, resolvers, context:({ ctx }) => ({ ctx }) })
server.applyMiddleware({ app })

//Swagger settings
const swaggerDocument = require('../api/swagger/swagger.json')
swaggerDocument.host = process.env.SWAGGER_URL
app.use(swaggerUi.serve)
app.use(convert(mount('/swagger', swaggerUi.setup(swaggerDocument))))



//Server setup
const PORT = process.env.PORT || '8000'
const HOST = process.env.HOST || '0.0.0.0'

if (!module.parent) {
    app.listen(PORT, HOST, () =>{
        console.log(`App running on port ${PORT}.`)
    })
}


module.exports = app