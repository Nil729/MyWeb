// components/ProtectedRoute.js
import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';

const IsAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
      // Puedes mostrar un loader mientras se verifica la sesión
      return <p>Cargando...</p>;
    }

    if (!session) {
      // Si no hay sesión, redirige al inicio de sesión
      router.push('/LoginPage'); // Ajusta la ruta según tu configuración
      return null;

    } else {

      router.push('/projects/pageNetDoc');
    }

    // Si hay sesión, renderiza el componente envuelto con las props
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default IsAuth;
