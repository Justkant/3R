import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { auth } from '../controllers'
const router = new Router({
  prefix: '/auth'
})

router.post('/', bodyParser(), auth.register)
  .get('/', auth.authenticate(), auth.sendUser)
  .put('/', auth.authenticate(), auth.putUser)
  .del('/', auth.authenticate(), auth.delUser)
  .get('/token', auth.authenticateBasic(), auth.sendUser)

export default router
