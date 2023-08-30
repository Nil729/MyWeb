import '../styles/globals.css';
import '../styles/navbar.css';
import '../styles/styles_wm/stylewebmanager.css';
import '../styles/styles_wm/view_routin_style.scss';
import '../styles/styles_wm/style_inputs.scss';
import '../styles/styles_wm/style_list_task.scss';
import '../styles/styles_netdoc/networkManagementComponent.css';
import '../styles/styles_netdoc/dispositius.css';
import '../styles/styles_netdoc/dispositiusTaula.css';
import '../styles/styles_netdoc/xarxa.css';
import '../styles/styles_netdoc/xarxaTaula.css';
import '../styles/styles_netdoc/connexionsTaula.css';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp
