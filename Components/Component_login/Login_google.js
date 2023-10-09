import { signIn, signOut } from 'next-auth/react';

function Login_google() {

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: 'http://localhost:3002/projects/pageNetDoc' });

  };

  const handleGoogleSignOut = () => {
    signOut();
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <p>Por favor, inicie sesión con su cuenta de Google.</p>
      <button onClick={handleGoogleSignIn} className="login-button">
          Iniciar Sesión con Google
        </button>
        {/* <div>
          <button onClick={handleGoogleSignOut}>Cerrar Sesión</button>
        </div> */}
    </div>
  );
}

export default Login_google;
