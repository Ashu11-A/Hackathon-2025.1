import { Router } from '@/controllers/router'
import { Company } from '@/database/entity/Company'
import { Internship } from '@/database/entity/Internship'
import { Skill } from '@/database/entity/Skill'
import { z } from 'zod'

export default new Router({
  name: 'Create Internship',
  description: 'Create a new internship',
  schema: {
    post: z.object({
      name: z.string(),
      description: z.string(),
      salary: z.number().optional(),
      link: z.string(),
      skills: z.array(z.string()),
      companyName: z.string().optional(),
    })
  },
  methods: {
    async post({ reply, schema }) {
      let company: Company | undefined = undefined
        
      if (schema.companyName) {
        company = await Company.findOne({ where: { name: schema.companyName } }) ?? undefined
    
        if (!company) company = await Company.create({ name: schema.companyName }).save()
      }

      const normalized = Array.from(new Set(schema.skills))

      const skills = await Promise.all(
        normalized.map(async (skill) => {
          const existingSkill = await Skill.findOne({ where: { value: skill.toLowerCase() } })
          if (existingSkill) return existingSkill
          return Skill.create({ name: skill, value: skill.toLowerCase(),  }).save()
        })
      )

      const existingInternship = await Internship.findOne({ where: { link: schema.link } })
      if (existingInternship) return reply.status(400).send({ message: 'Internship already exists' })

      const internship = await Internship.create({
        name: schema.name,
        description: schema.description,
        salary: schema.salary,
        link: schema.link,
        company: company,
        skills,
      }).save()

      return reply.status(201).send({ 
        message: 'Internship created successfully',
        data: internship,
      })
    }
  }
})

