import { Router } from '@/controllers/router'
import { Skill } from '@/database/entity/Skill'
import { User } from '@/database/entity/User'
import { GoogleGenAI } from '@google/genai'
import type { Chat } from '@google/genai'
import { In } from 'typeorm'
import { z } from 'zod'

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_SDK_TOKEN as string })
const chats = new Map<number, Chat>()
const logs = new Map<number, { agent: string, message: string}[]>()
const removeBackticks = (input: string): string => {
  const re = /`{4}|```(?:json)?/g
  return input.replace(re, '')
};


export default new Router({
  name: 'chat',
  description: 'Chat',
  authenticate: true,
  schema: {
    post: z.object({
      message: z.string()
    })
  },
  methods: {
    async post({ request, reply, schema }) {
      let chat: Chat | undefined

      if (chats.has(request.user!.id)) {
        chat = chats.get(request.user!.id)!
      } else {
        chat = gemini.chats.create({
          model: 'gemini-1.5-flash',
          config: {
            systemInstruction: `Você é um agente recrutador de tecnologia, quero que você faça inicialmente perguntas sobre quais linguagens o usuário sabe, depois faça uma pergunta a cada resposta do usuário em quais estágios, ou projetos ele utilizou essas linguagens, Framewroks e tecnologias, quando o usuário enviar a mensagem SAIR, responda em formato json dessa forma:
{
    technologies: \\['NodeJS', 'Typescript'],
    tools: \\['MySQL'],
    frameworks: \\['Fastify', 'Express', 'NextJS'],
    description: '...'
}            
`
          }
        })
        chats.set(request.user!.id, chat)
      }
      
      const response = await chat.sendMessage({ message: schema.message })
      const data = logs.get(request.user!.id)

      logs.set(request.user!.id, [...(data ?? []), { agent: 'user', message: schema.message }, { agent: 'assistant', message: response.text ?? '' }])

      if (schema.message === 'SAIR') {
        try {
          const user = await User.findOneBy({ id: request.user!.id })
          const {
            technologies,
            tools,
            frameworks,
          } = JSON.parse(removeBackticks(response.text ?? ''))

          const keys = Array.from(new Set([...technologies, ...tools, ...frameworks]))
          await Promise.all(keys.map(async (key) => {
            let skill = await Skill.findOne({ where: { value: key.toLowerCase() }, relations: ['users'] })

            if (skill && !skill.users.some(u => u.id === user!.id)) {
              skill.users.push(user!)
              await skill.save()
            }

            if (!skill) skill = await Skill.create({ name: key, value: key.toLowerCase(), users: [user!] }).save()
          }))

          return reply.code(200).send({
            message: 'Skills saved',
            data: keys,
            metadata: {
              total: keys.length,
              currentPage: 1,
              totalPages: 1,
              pageSize: 1
            }
          })
        } catch (error) {
          console.log(error)
          return reply.code(400).send({
            message: 'Error saving skills',
            data: error ?? 'Unknown error'
          })
        }
      }

      return reply.code(200).send({
        message: 'Message sent',
        data: response.text
      })
    }
  }
})