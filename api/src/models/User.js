import bcrypt from 'bcrypt'

module.exports = function () {
  const type = this.thinky.type
  // const models = this.models

  return {
    tableName: 'User',
    schema: {
      id: type.string().allowNull(false),
      picture: type.string().allowNull(false),
      firstname: type.string().required().allowNull(false),
      lastname: type.string().required().allowNull(false),
      email: type.string().email().required().allowNull(false),
      password: type.string().allowNull(false).required(),
      createdAt: type.date().default(() => new Date()).required().allowNull(false),
      updatedAt: type.date().default(() => new Date()).required().allowNull(false)
    },
    options: {
      enforce_extra: 'remove'
    },
    init: function (Model) {
      Model.ensureIndex('email')
      Model.ensureIndex('firstname')
      Model.ensureIndex('lastname')
      Model.ensureIndex('createdAt')

      Model.defineStatic('getView', function () {
        return this.without('password')
      })

      Model.defineStatic('uniqueResult', function () {
        return this.nth(0).default(null)
      })

      Model.define('comparePassword', function (password, done) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
          done(err, isMatch)
        })
      })

      Model.pre('save', function (next) {
        this.updatedAt = new Date()
        if (!this.password.match(/\$2a\$.*/)) {
          bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) {
              return next(new Error(err.message))
            }
            this.password = hash
            next()
          })
        } else {
          next()
        }
      })
    }
  }
}
