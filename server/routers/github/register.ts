import { Github } from '@/controllers/github'
import { Router } from '@/controllers/router'
import { Role } from '@/database/enums'

export default new Router({
  name: 'Register All Repos in Database',
  description: '',
  // authenticate: Role.Student,
  methods: {
    async get({ request }) {
      console.log(request)
      // const github = new Github({ token: request.session.githubUser.token })

      console.log(await github.fetchAllRepos())
      /*
            const github = new Github({
                token: 
            })
                */
    }
  }
})