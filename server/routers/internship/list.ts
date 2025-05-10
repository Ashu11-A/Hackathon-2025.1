import { Router } from '@/controllers/router'
import { internshipRepository } from '@/database'
import { paginate } from '@/database/pagination'

export default new Router({
  name: 'List Internship',
  description: 'List internships',
  methods: {
    async post({ reply }) {
      const pagination = await paginate({
        repository: internshipRepository,
        page: 1,
        pageSize: 10,
        interval: 'none',
      })
      
      return reply.status(200).send({
        message: 'Internships listed successfully',
        ...pagination
      })
    }
  }
})

