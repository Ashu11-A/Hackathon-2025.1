import { gemini } from '@/ai/gemini'
import { Router } from '@/controllers/router'

import { z } from 'zod'

export default new Router({
  name: 'teste',
  description: '',
  schema: {
    post: z.object({
      input: z.string()
    })
  },
  methods: {
    async post({ schema, reply }) {
      const response = await gemini.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: schema.input,
      })
      console.log(response.text)

      return reply.code(200).send({ message: 'sucess', data: response.text })
    }
  }
})