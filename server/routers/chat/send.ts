import { Router } from '@/controllers/router'
import { GoogleGenAI } from '@google/genai'
import type { Chat } from '@google/genai'
import { z } from 'zod'

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_SDK_TOKEN as string })
const chats = new Map<number, Chat>()
const logs = new Map<number, { agent: string, message: string}>()

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
        })
        chats.set(request.user!.id, chat)
      }
      
      const response = await chat.sendMessage({
        message: schema.message,
      })
      const data = logs.get(request.user!.id)

      logs.set(request.user!.id, )

      reply.code(200).send({
        message: 'Message sent',
        data: response
      })
    }
  }
})