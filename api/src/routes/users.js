import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { auth, user } from '../controllers'
const router = new Router({
  prefix: '/users'
})

router.get('/', auth.isAdmin, user.getUsers)
  .get('/:userId', user.getUser)
  .put('/:userId', bodyParser(), user.isOwner, user.putUser)
  .del('/:userId', bodyParser(), user.isOwner, user.delUser)

export default router
