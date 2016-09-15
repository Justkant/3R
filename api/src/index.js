import Koa from 'koa'
import config from './config'
import logger from 'koa-logger'
import { status, errorHandler } from './middlewares'
import { auth } from './controllers'
import combineRouters from 'koa-combine-routers'
import { default as authRoutes } from './routes/auth'
import routes from './routes'

const app = new Koa()
app.name = config.name

app.use(status)
app.use(errorHandler)
app.use(logger())

app.use(auth.initialize())
app.use(combineRouters([authRoutes]))
app.use(auth.authenticate())

app.use(routes)

app.listen(config.port, (err) => {
  if (err) {
    console.error('Cannot listen: ', err.message)
  }
  console.info(config.production ? 'Production' : 'Development')
  console.info('Server listening on port: ', config.port)
})
