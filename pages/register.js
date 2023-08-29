// pages/register.js
import { useState } from 'react';
import { signUp } from 'next-auth/react';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Validación básica de correo electrónico y contraseña
      if (!email || !password) {
        setError('Por favor, complete todos los campos.');
        return;
      }

      // Llamar a la función signUp de next-auth con las credenciales del usuario
      const result = await signUp('credentials', {
        email,
        password,
      });

      if (result.error) {
        setError('Hubo un problema al crear la cuenta. Por favor, inténtelo nuevamente.');
      } else {
        window.location.href = '/login'; // Cambia esto a la ruta que desees para la página de inicio de sesión
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('Ocurrió un error al intentar registrar la cuenta. Por favor, inténtelo más tarde.');
    }
  };

  return (
    <div>
      <h1>Registrar Cuenta</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        
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
        <button type="submit">Registrar Cuenta</button>
      </form>
    </div>
  );
}

export default RegisterPage;
