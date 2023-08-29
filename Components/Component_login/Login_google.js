import { signIn } from 'next-auth/react';

function Login_google() {
  const handleGoogleSignIn = () => {
    signIn('google');
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <button onClick={handleGoogleSignIn}>Iniciar Sesión con Google</button>
    </div>
  );
}

export default Login_google;
