import Router from 'koa-router'
import {authenticate} from './authController'


const router = new Router(
    {
        prefix: '/api/auth'
    }
)

router
    .post('/login', authenticate)


module.exports = router
