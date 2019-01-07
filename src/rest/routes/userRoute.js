import Router from 'koa-router'
import {create, list, show, update, remove} from '../controllers/userController'
import {isAuthenticated, isAdmin} from '../services/auth/authController'


const router = new Router(
    {
    prefix: '/api/'
    }
)

router
    .post('user/', create)
    .get('users/', isAdmin, list)
    .get('user/',isAuthenticated, show)
    .put('user/', isAuthenticated, update)
    .delete('user/', isAuthenticated, remove)




module.exports = router
