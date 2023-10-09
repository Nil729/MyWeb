import Link from 'next/link';

function navbarNetdoc() {
  return (
      
      <nav className="navbarNetdoc">
        <ul>
          <li className="mb-2">
            <Link href="/projects/pages_netdoc/gestionar-dispositius">
              Dispositius
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/projects/pages_netdoc/gestionar-ubicacions">
              Ubicacions
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/projects/pages_netdoc/gestionar-xarxes">
              Xarxes
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/projects/pages_netdoc/gestionar-connexions">
              Connexions
            </Link>
          </li>
        </ul>
      </nav>
  );
}

export default navbarNetdoc;
