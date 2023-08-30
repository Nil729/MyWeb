// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // Agrega otros proveedores si es necesario
    ],
    callbacks: {
        async session(session, user) {
            console.log('session', session, user);
            return session;
        },
        async signIn(user, account, profile) {
            console.log('signIn', user, account, profile);
            return true;
        }

    },
    pages: {
        // Configura las rutas de páginas personalizadas aquí si es necesario
    },
    // Otras opciones de configuración

});



// async signIn(user, account, profile) {
//     const connection = await createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'password',
//       database: 'mydatabase',
//     });

//     const [rows, fields] = await connection.execute(
//       'SELECT * FROM users WHERE email = ?',
//       [user.email]
//     );

//     if (rows.length > 0) {
//       // User already exists in the database
//       await connection.end();
//       return true;
//     } else {
//       // User does not exist in the database, insert new user
//       const [result, fields] = await connection.execute(
//         'INSERT INTO users (name, email) VALUES (?, ?)',
//         [user.name, user.email]
//       );
//       await connection.end();
//       return true;
//     }
//   },