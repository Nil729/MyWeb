import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    // database: process.env.DATABASE_URL,
    // secret: process.env.SECRET,
    // session: {
    //     jwt: true,
    // },
    // jwt: {
    //     secret: process.env.SECRET,
    // },
    // pages: {
    //     signIn: '/login',
    //     signOut: '/logout',
    //     error: '/login',
    //     verifyRequest: '/login',
    // },
    // callbacks: {
    //     async session({ session, token, user }) {
    //         session.user.id = token.id;
    //         return session;
    //     }
    // }
});

