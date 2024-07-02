import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse, nanoid } from 'ai';
import platformConfig from '@/config/app-config';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: platformConfig.variables.OPENAI_API_KEY,
});


export async function POST(req: Request) {
    const json = await req.json();
    const session = await getServerSession(authOptions);


    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 })
    }
    const { messages } = json

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        stream: true,
        messages,
        temperature: 0.7
    });


    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
        async onStart() {
            const message = messages[messages.length - 1]
            const id = json.id ?? nanoid()
            await prisma.message.create({
                data: {
                    serialized: JSON.stringify(messages),
                    chatId: id,
                    userId: (session?.user as any).id,
                    content: message.content,
                    role: 'user'
                }
            })
        },
        async onCompletion(completion) {
            const id = json.id ?? nanoid()
            await prisma.message.create({
                data: {
                    serialized: JSON.stringify(completion),
                    chatId: id,
                    userId: (session?.user as any).id,
                    content: completion,
                    role: 'assistant'
                }
            })
        }
    });
    // Respond with the stream
    return new StreamingTextResponse(stream);
}