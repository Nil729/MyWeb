// pages/login.js
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import LoginGoogle from './Login_google.js';

function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Validación básica de correo electrónico y contraseña
      if (!email || !password) {
        setError('Por favor, ingrese correo electrónico y contraseña.');
        return;
      }

      // Llamar a la función signIn de next-auth con las credenciales del usuario
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError('Credenciales inválidas. Por favor, verifique e intente nuevamente.');
      } else {
        window.location.href = '/home'; // Cambia esto a la ruta que desees
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtelo más tarde.');
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        <button type='button' onClick={handleRegisterClick}>
        Registrate
      </button>
      </form>
      <LoginGoogle/>
    </div>
  );
}

export default LoginPage;
