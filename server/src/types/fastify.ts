import { User } from '@/database/entity/User.js'
import { BearerStrategy } from '@/strategies/BearerStrategy.js'
import { CookiesStrategy } from '@/strategies/CookiesStrategy.js'
import type { GithubStrategy } from '@/strategies/GithubStrategy'
import type { Server } from 'socket.io'
import type { GithubUser } from './github'

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface PassportUser extends User {}
  interface FastifyInstance {
    io: Server
    // request.server.auth
    auth: {
      strategies: (typeof BearerStrategy | typeof CookiesStrategy | typeof GithubStrategy)[]
    }
  }
  interface FastifyRequest {
    user?: User
    githubUser?: GithubUser
  }
}
