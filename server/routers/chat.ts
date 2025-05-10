import { Chat, GoogleGenAI } from '@google/genai' // ou do SDK legado
import { Fastify } from '@/controllers/fastify'
import type { FastifyRequest } from 'fastify'
import { BearerStrategy } from '@/strategies/BearerStrategy'
import type { WebSocket } from '@fastify/websocket'



/*

Fastify.server.get('/ws', { websocket: true }, async (connection: WebSocket, request: FastifyRequest) => {
  console.log(request.req.headers.authorization)
  const user = await new BearerStrategy().validation(request)

  if (user.error) {
    connection.send(JSON.stringify({ error: user.error }))
    connection.close()
    return
  }

  console.log('asdasd')
  console.log(user)
  const chat = chats.get(connection.id)
  if (!chat) {
    chat = gemini.chats.create({
      model: 'gemini-1.5-flash',
    })
    chats.set(connection.id, chat)
  }
  let description = ''

  // 3️⃣ Envia prompt inicial
  const systemPrompt = `Você é um agente recrutador de tecnologia, quero que você faça inicialmente perguntas sobre quais linguagens o usuário sabe, depois faça uma pergunta a cada resposta do usuário em quais estágios, ou projetos ele utilizou essas linguagens, Framewroks e tecnologias, quando o usuário enviar a mensagem SAIR, responda em formato json dessa forma:

{
  technologies: ['NodeJS', 'Typescript'],
  tools: ['MySQL'],
  frameworks: ['Fastify', 'Express', 'NextJS'],
  description: '...',
  logs: [
    {
      agent: "chatbot",
      message: "Olá! Sou um agente recrutador de...",
    },
    {
      agent: "user",
      message: "Uso typescript, mas tambem sei Go...",
    },
  ],
}
`
  logs.({ agent: 'chatbot', message: systemPrompt })
  connection.send(systemPrompt)

  // 4️⃣ Recebe cada mensagem do usuário
  connection.on('message', async (data: string) => {
    const text = data.toString().trim()
    logs.push({ agent: 'user', message: text })

    // 5️⃣ Verifica comando de saída
    if (text.toUpperCase() === 'SAIR') {
      const payload = { description, logs }
      connection.send(JSON.stringify(payload, null, 2))
      connection.close()
      return
    }

    // 6️⃣ Chama o Gemini para próxima resposta
    const fullPrompt = [
      { role: 'system', content: systemPrompt },
      ...logs.map(l => ({ role: l.agent === 'user' ? 'user' : 'assistant', content: l.message }))
    ]
    const response = await gemini.({
      model: 'gemini-2.0-flash',
      contents: fullPrompt.join('\n'),
      jsonMode: true
    })
    const botMessage = response.text
    logs.push({ agent: 'chatbot', message: botMessage })

    // 7️⃣ Opcional: Parsear trechos JSON na resposta para preencher arrays
      const parsed = JSON.parse(botMessage)

    // 8️⃣ Envia de volta ao cliente
    connection.send(botMessage)
  })
})
*/