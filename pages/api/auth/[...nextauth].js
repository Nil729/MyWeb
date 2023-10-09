import pool from '../../../database/db.connection';

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // Add other providers if necessary
    ],


    callbacks: {

        async session({ session }) {
            console.log('session: ', session);


            const query = 'SELECT idUser FROM users WHERE emailUser = ?';
            const [rows] = await pool.promise().execute(query, [session.user.email]);


            session.user.id = rows[0].idUser;
            
            return session;
        },
        async signIn({ user, account }) {
            try {
                console.log('user: ', user);
                console.log('account: ', account);
            
                const [rows]  = await pool.promise().execute('SELECT idUser FROM users WHERE emailUser = ?', [user.email]);
                console.log('rows: ', rows);

                if (rows.length > 0) {
                    return true;
                }
                
                const insertQuery = 'INSERT INTO users (nameUser, emailUser, imagePorfileUser, provider_Auth, provider_id) VALUES (?, ?, ?, ?, ?)';
                await pool.promise().execute(insertQuery, [user.name, user.email, user.image, account.provider, account.providerAccountId]);
                return true;
            } catch (error) {
                console.log('error: ', error);
                return false;
            }
        },
        async signOut() {
            return '/api/logout'; // Path to your custom logout endpoint
        },

    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: null // If set, new users will be directed here on first sign in
    },

});



/*

async session({ session }) {
    console.log('session: ', session);

    return session;
},

async signIn({user}) {
    try {
        console.log('user: ', user.id);

        //const query = 'SELECT idUser FROM users WHERE emailUser = ?';



        //const insertQuery = 'INSERT INTO users (nameUser, emailUser, imageProfileUser, provider_Auth, provider_id) VALUES (?, ?, ?, ?, ?)';
        //[name, email, image, provider, providerAccountId]

    } catch (error) {
        console.log('error: ', error);
        return false;
    }
},

user: {
      id: '113183230089237446447',
      name: 'nil 729',
      email: 'nil.pinyana@gmail.com',
      image: 
        'https://lh3.googleusercontent.com/a/AAcHTtev-Gn341n2uXjrgKwKLRIeIEnmvor89Ca4jJDJLX-jYA=s96-c'
    },
    account: {
      provider: 'google',
      type: 'oauth',
      providerAccountId: '113183230089237446447',
      access_token: 
        'ya29.a0AfB_byCS1MBSE1LgwYmXtMwmtuDrE5sDCM8OtomKS4HEL7wVI1koxef0b8myQJapcUC7x7ywKOnAxY7pYZB-4TMYAUemEdCNiuLbgvfuwohGl0Cgk-PoU3V8Xnl1XvfB_ED1S0QS50QGJUHCVo28au88ImTjYucvLlWWee0aCgYKAXcSARESFQHsvYlsYs09a-rEFdPzX0q6U6MyaA0174',
      expires_at: 1693608895,
      scope: 
        'https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile',
      token_type: 'Bearer',
      id_token: 
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTExNDEwNTlhMTliMjE4MjA5YmM1YWY3YTgxYTcyMGUzOWI1MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NTU3OTE1NTgwNzYtcG8xODZncGdrdjIzczdxY3NvZzE0MnZobTV0N2FrMGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NTU3OTE1NTgwNzYtcG8xODZncGdrdjIzczdxY3NvZzE0MnZobTV0N2FrMGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTMxODMyMzAwODkyMzc0NDY0NDciLCJlbWFpbCI6Im5pbC5waW55YW5hQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVHF3TTFZMWFaaVNadnRhSnMxY0lBdyIsIm5hbWUiOiJuaWwgNzI5IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGV2LUduMzQxbjJ1WGpyZ0t3S0xSSWVJRW5tdm9yODlDYTRqSkRKTFgtallBPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Im5pbCIsImZhbWlseV9uYW1lIjoiNzI5IiwibG9jYWxlIjoiY2EiLCJpYXQiOjE2OTM2MDUyOTYsImV4cCI6MTY5MzYwODg5Nn0.UslkvkYVXb6Xswls4Ov_Rg7EfzIR7Mr86wIECCIKMROtEWkG8tSWKTjPQEpcCrA90jKgV63fK4jvyvROWOdV5cnR5e4D5BlpZGOKe_-DWkZIQ4FCyAwvFgYTQS2yPow1HYzFaLUa4PdeUeBG3UJQiogkPWah13e90ZVd3QOkMvGd7gHlpaPaqWGv4sNOyArHdwqDK7q2DMGsiB0txiuNAkrz-caUuX7jSLvhPRckBaYs87ZwwgdngGtaiJb_esO31yHZ8nrC5AdbxpKbF9_wjOC_ztOJEbxL4SqujZgz2y3lTQ0GG6FvDI0xH59lo6ro1GGji2Llqfk6XZKZ55GxpA'
    },
*/