import { Router } from '@/controllers/router'
import { Role } from '@/database/enums'
import { z } from 'zod'

export default new Router({
  name: 'Edit User',
  description: '',
  schema: {
    post: z.object({
      name: z.string().min(4).optional(),
      institution: z.string().optional()
    })
  },
  authenticate: Role.Student,
  methods: {
    async post({ request, schema }) {
      if (schema.name) request.user.name = schema.name

      await request.user.save()
    }
  }
})