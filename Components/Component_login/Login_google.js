import { signIn, signOut } from 'next-auth/react';

function Login_google() {

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}/projects/pageNetDoc` });

  };

  const handleGoogleSignOut = () => {
    signOut();
  };

  return (
    <div className="login-container">
      <h2>Log in</h2>
      <p>Please sign in with your Google account.</p>
      <button onClick={handleGoogleSignIn} className="login-button">
        Sign in with Google
        </button>
        {/* <div>
          <button onClick={handleGoogleSignOut}>Cerrar Sesión</button>
        </div> */}
    </div>
  );
}

export default Login_google;
