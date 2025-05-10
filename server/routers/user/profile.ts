import { Router } from '@/controllers/router'
import { Skill } from '@/database/entity/Skill'

export default new Router({
  name: 'Get user profile',
  authenticate: true,
  description: '',
  methods: {
    async get({ request, reply }) {
      const skills = await Skill.find({ where: { users: { id: request.user!.id } } })
      const data = {
        name: request.user!.name,
        email: request.user!.email,
        username: request.user!.username,
        language: request.user!.language,
        skills: skills.map((skill) => ({
          id: skill.id,
          name: skill.name,
          value: skill.value,
          link: skill.link
        }))
      }

      return reply.code(200).send({ data: data, message: 'Informações requisitadas com sucesso!' })
    }
  }
})