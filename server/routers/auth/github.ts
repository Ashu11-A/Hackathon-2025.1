import { Fastify } from '@/controllers/fastify'
import { Router } from '@/controllers/router'
import { Auth } from '@/database/entity/Auth'
import type { GithubUser } from '@/types/github'
import { timer } from '@/utils/timer'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import { getCookieOptions } from './login'

export default new Router({
  name: 'Auth With Github',
  path: '/auth/github/callback',
  authenticate: true,
  description: '',
  methods: {
    async get({ reply, request }) {
      try {
        // getAccessToken já faz o POST pra /login/oauth/access_token
        const tokenResponse = await Fastify.server.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)
        const gitToken = tokenResponse.token.access_token
            
        // Busca perfil do usuário
        const { data, status } = await axios.get('https://api.github.com/user', {
          headers: { Authorization: `Bearer ${gitToken}` }
        })

        if (status !== 200) return reply.code(403).send({ message: 'Login Not' })
        const profile = data as GithubUser
        const expiresTokenInSeconds = timer.number(process.env.JWT_EXPIRE ?? '7d') as number
        const expiresRefreshInSeconds = timer.number(process.env.REFRESH_EXPIRE ?? '7d') as number
            
        const expirationTokenDate = new Date(Date.now() + expiresTokenInSeconds)
        const expirationRefreshDate = new Date(Date.now() + expiresRefreshInSeconds)
            
        const payload = {
          id: profile.id,
          username: profile.name,
          login: profile.login
        }
            
        const accessToken = jwt.sign(payload, process.env.JWT_TOKEN as string, {
          expiresIn: expiresTokenInSeconds,
          algorithm: 'HS512'
        })
            
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN as string, {
          expiresIn: expiresRefreshInSeconds,
          algorithm: 'HS512'
        })
            
        await Auth.create({
          accessToken,
          refreshToken,
          user: request.user,
          expireAt: moment(expirationRefreshDate.toISOString()).format('YYYY-MM-DD HH:mm:ss.SSS')
        }).save()
            
        reply.setCookie('GitHubBearer', accessToken, getCookieOptions(expirationTokenDate))
        reply.setCookie('GitHubRefresh', refreshToken, getCookieOptions(expirationRefreshDate))
            
        return reply.code(200).send({
          message: 'Login successful',
          data: {
            accessToken: {
              token: accessToken,
              expireDate: expirationTokenDate,
              expireSeconds: expiresTokenInSeconds
            },
            refreshToken: {
              token: refreshToken,
              expireDate: expirationRefreshDate,
              expireSeconds: expiresRefreshInSeconds
            },
          }
        })
      } catch (err) {
        request.log.error(err)
        return reply.code(500).send({ message: 'Erro no login com GitHub' })
      }
    }
  }
})