export async function status (ctx, next) {
  if (ctx.url === '/') {
    ctx.body = 'Status: ok'
  } else {
    await next()
  }
}

export async function errorHandler (ctx, next) {
  try {
    await next()
  } catch (err) {
    console.error('Error handler: ', err.message)
    ctx.body = err.message
    ctx.status = err.status || 500
  }
}
