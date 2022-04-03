import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

const options = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    // database: process.env.NEXT_PUBLIC_DATABASE_URL,
    session: {
        strategy: 'jwt',
        jwt: true,
    },
    callbacks: {
        session: async ({ session, token }) => {
            console.log({ session, token })
            session.jwt = token;
            session.id = token.sub;
            return Promise.resolve(session);
        },
        jwt: async ({ token, user, account }) => {
            console.log('jwt callback', { token, user, account })
            const isSignIn = user ? true : false;
            if (isSignIn) {
                const strapiAuthURL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
                console.log({ strapiAuthURL })
                const response = await fetch(strapiAuthURL)
                const data = await response.json()
                console.log({ data })
                token.jwt = data.jwt
                token.id = data.user.id
            }
            return Promise.resolve(token)
        },
    },
};

const Auth = (req, res) =>
    NextAuth(req, res, options)

export default Auth