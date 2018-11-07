import { RequestHandlerParams } from 'express-serve-static-core'
import * as createError from 'http-errors'
import * as express from 'express'
import * as path from 'path'
import * as cookieParser from 'cookie-parser'
import * as logger from 'morgan'
import * as session from 'express-session'

import * as dotenv from 'dotenv'
dotenv.config()

import * as passport from 'passport'

import * as api from './routes/api'
import { models } from './db/shema'

let app = express()

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev') as RequestHandlerParams)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser() as RequestHandlerParams)
// app.use(session({ secret: 'taiga rocks and is fair!' }))

// app.use(passport.initialize())
// app.use(passport.session())

app.use('/', express.static(path.join(__dirname, '..', '..', 'client', 'dist')))

app.use('/api', api)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export = app
