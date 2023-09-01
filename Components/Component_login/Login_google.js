import { signIn, signOut } from 'next-auth/react';

function Login_google() {

  const handleGoogleSignIn = () => {
    signIn('google');
  };

  const handleGoogleSignOut = () => {
    signOut();
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <p>Por favor, inicie sesión con su cuenta de Google.</p>
        <div>
          <button onClick={handleGoogleSignIn}>Iniciar Sesión con Google</button>
        </div>
        <div>
          <button onClick={handleGoogleSignOut}>Cerrar Sesión</button>
        </div>
    </div>
  );
}

export default Login_google;
