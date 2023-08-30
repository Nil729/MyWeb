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

    },
    pages: {
        // Configura las rutas de páginas personalizadas aquí si es necesario
    },
    // Otras opciones de configuración

});
