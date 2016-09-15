module.exports = {
  production: process.env.NODE_ENV === 'production',
  secret: process.env.SECRET || 'your-dev-secret',
  name: 'api',
  port: '3030',
  rethinkdb: {
    host: 'db',
    port: '28015',
    db: 'api',
    silent: true
  }
}
