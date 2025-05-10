import Fastify from 'fastify'
import oauthPlugin from '@fastify/oauth2'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import axios from 'axios'

const fastify = Fastify()

const GH_CLIENT_ID = 'Ov23liZXTQY7WD5uQE1K'
const GH_CLIENT_SECRET = 'a9d840bf2fd7ae308299c81d8c7bf0bd1e36a8bb'

// 1) Registra plugins de cookie e sessão
fastify.register(fastifyCookie)
fastify.register(fastifySession, {
  secret: process.env.SESSION_SECRET || '3t7Ex9WJS3QFhy9vU6ffkv1g2gmwO5KM',
  cookie: { secure: false /* em produção use HTTPS */ },
})

// 2) Configura OAuth2 do GitHub
fastify.register(oauthPlugin, {
  name: 'githubOAuth2',
  scope: ['read:user', 'repo'],   // scopes que você precisa
  credentials: {
    client: {
      id: GH_CLIENT_ID!,
      secret: GH_CLIENT_SECRET!,
    },
    auth: oauthPlugin.GITHUB_CONFIGURATION,
  },
  startRedirectPath: '/login/github',
  callbackUri: 'http://localhost:4000/login/github/callback',
})

// 3) Rota de callback — recebe `code`, troca por token e busca dados do usuário
fastify.get('/login/github/callback', async (request, reply) => {
  try {
    // getAccessToken já faz o POST pra /login/oauth/access_token
    const tokenResponse = await fastify.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)
    const accessToken = tokenResponse.token.access_token

    // Busca perfil do usuário
    const { data: profile } = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })

    // Salva na sessão
    request.session.githubUser = {
      id: profile.id,
      login: profile.login,
      name: profile.name,
      avatar_url: profile.avatar_url,
      token: accessToken,
    }

    return reply.redirect('/dashboard')
  } catch (err) {
    request.log.error(err)
    reply.code(500).send('Erro no login com GitHub')
  }
})

// 4) Rota protegida — exemplo de uso do token para buscar repositórios
fastify.get('/dashboard', async (request, reply) => {
  const user = request.session.githubUser
  if (!user) {
    return reply.redirect('/login/github')
  }

  // usa o token salvo para chamar API do GitHub
  const { data: repos } = await axios.get('https://api.github.com/user/repos', {
    headers: { Authorization: `Bearer ${user.token}` },
    params: { affiliation: 'owner,collaborator,organization_member' }
  })

  return reply.send({
    login: user.login,
    name: user.name,
    repos: repos.map((r: any) => ({
      name: r.name,
      full_name: r.full_name,
      private: r.private,
    }))
  })
})

fastify.listen({ port: 3000 }).then(() => {
  console.log('Server running on http://localhost:3000')
})
