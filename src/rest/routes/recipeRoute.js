import Router from 'koa-router'
import {create, list, show, update, remove} from '../controllers/recipeController'

import {isAuthenticated} from '../services/auth/authController'

const router = new Router(
    {
        prefix: '/api/recipes'
    }
);

router
    .post('/',isAuthenticated, create)
    .get('/', isAuthenticated, list)
    .get('/:id',isAuthenticated, show)
    .put('/:id',isAuthenticated, update)
    .delete('/:id',isAuthenticated, remove)


module.exports = router
