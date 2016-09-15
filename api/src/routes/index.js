import combineRouters from 'koa-combine-routers'
import users from './users'

const routes = combineRouters([
  users
])

export default routes
