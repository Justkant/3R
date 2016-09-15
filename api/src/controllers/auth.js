import { models } from 'thinky-loader'
import passport from 'koa-passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { BasicStrategy } from 'passport-http'
import jwt from 'jwt-simple'
import moment from 'moment'
import config from '../config'

function createJWT (user) {
  var payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }
  return jwt.encode(payload, config.secret)
}

function initialize () {
  passport.use(new JwtStrategy({
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
  }, async function (payload, done) {
    const user = await models.User.get(payload.sub).getJoin({ friends: true }).run()
    return done(null, user)
  }))

  passport.use(new BasicStrategy(
    async function (email, password, done) {
      const user = await models.User.getAll(email, { index: 'email' }).uniqueResult().run()
      user.comparePassword(password, function (err, isMatch) {
        if (err) return done(err)
        if (!isMatch) return done(new Error('Invalid email or password'))
        done(null, { token: createJWT(user), ...user })
      })
    }
  ))

  return passport.initialize()
}

function authenticate () {
  return passport.authenticate('jwt', { session: false })
}

function authenticateBasic () {
  return passport.authenticate('basic', { session: false })
}

async function register (ctx) {
  const alreadyTaken = await models.User.getAll(ctx.request.body.email, { index: 'email' }).uniqueResult().execute()
  if (alreadyTaken) {
    return ctx.throw(409, 'Email is already taken')
  }
  let user = await new models.User(ctx.request.body).save()
  user.token = createJWT(user)
  ctx.body = user
  ctx.status = 201
}

function sendUser (ctx) {
  ctx.body = ctx.state.user
}

async function putUser (ctx) {
  ctx.body = await ctx.state.user.merge(ctx.request.body).save()
}

async function delUser (ctx) {
  await ctx.state.user.delete()
  ctx.body = 'User deleted'
}

async function isAdmin (ctx, next) {
  if (!ctx.state.user.admin) {
    return ctx.throw(403, 'You\'re not an admin...')
  }
  await next()
}

export default {
  initialize,
  authenticate,
  authenticateBasic,
  register,
  sendUser,
  putUser,
  delUser,
  isAdmin
}
