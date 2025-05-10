import { fastifyCompress } from '@fastify/compress'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import oauthPlugin from '@fastify/oauth2'
import fastifySession from '@fastify/session'
import fastifyWebsocket from '@fastify/websocket'
import fastify, { type FastifyInstance } from 'fastify'
import fastifyIO from 'fastify-socket.io'
import { constants as zlibConstants } from 'zlib'

import { BearerStrategy } from '@/strategies/BearerStrategy.js'
import { CookiesStrategy } from '@/strategies/CookiesStrategy.js'
import { GithubStrategy } from '@/strategies/GithubStrategy'

interface Options {
  host: string
  port: number
  log?: boolean
}

export class Fastify {
  static server: FastifyInstance
  constructor(public options: Options){}

  config () {
    const cookieToken = process.env['COOKIE_TOKEN']
    if (cookieToken === undefined) throw new Error('Cookie token are undefined')

    Fastify.server = fastify({
      logger: this.options.log === undefined ? undefined : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname,reqId',
          },
        },
      },
    })
      .register(fastifyCors, {
        origin: process.env.FRONT_END_URL
      })
      .register(fastifyCompress, {
        logLevel: 'debug',
        brotliOptions: {
          params: {
            [zlibConstants.BROTLI_PARAM_MODE]: zlibConstants.BROTLI_MODE_TEXT,
            [zlibConstants.BROTLI_PARAM_QUALITY]: 11
          }
        },
        zlibOptions: {
          level: 9,
        }
      })
      .register(fastifyMultipart, {
        limits: {
          fileSize: 1024 * 1024 * 50 // 50 Mb
        }
      })
      .register(fastifyCookie, {
        secret: cookieToken,
      })
      .register(fastifyIO, {
        async allowRequest(req, fn) {
          const strategy = new BearerStrategy()
          await strategy.validation(req)

          if (strategy.authenticated) return fn(undefined, true)
          fn(strategy.error?.message, false)
        },
      })
      .register(fastifySession, {
        secret: process.env.SESSION_SECRET,
        cookie: { secure: false /* em produção use HTTPS */ },
      })
      .register(oauthPlugin, {
        name: 'githubOAuth2',
        scope: ['read:user', 'repo'],   // scopes que você precisa
        credentials: {
          client: {
            id: process.env.GH_CLIENT_ID!,
            secret: process.env.GH_CLIENT_SECRET!,
          },
          auth: oauthPlugin.GITHUB_CONFIGURATION,
        },
        startRedirectPath: '/auth/github',
        callbackUri: 'http://localhost:4000/auth/github/callback',
      })
      .register(fastifyWebsocket)
      .decorate('auth', {
        strategies: [
          BearerStrategy,
          CookiesStrategy,
          GithubStrategy
        ]
      })

    return this
  }

  async listen () {
    if (Fastify.server == undefined) throw new Error('Server not configured!')

    await new Promise<void>((resolve) => {
      Fastify.server.listen({
        port: this.options.port,
        host: this.options.host
      }, (err) => {
        if (err === null) return resolve()
        console.log(`Port unavailable: ${this.options.port}`)
        console.log(err)
        this.options.port = this.options.port + 1
        return this.listen()
      })
    }) 
  }
}