import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

const scopes = ['identify', 'email'].join(' ')

export default NextAuth({
    secret: process.env.SECRET,
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            authorization: {params: {scope: scopes}},
        }),
    ],
    // quero que o ID do usuário faça parte dos dados da sessão que são enviados para o front-end
    callbacks: {
        async session(session, token) {
            session.session.user.id = session.token.sub
            return session
        },
    },
})