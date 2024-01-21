import Link from 'next/link';

function navbarNetdoc() {
  return (
      
      <nav className="navbarNetdoc">
        <ul>
          <li className="mb-2">
            <Link href="/projects/pages_netdoc/gestionar-dispositius">
              Devices
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/projects/pages_netdoc/gestionar-ubicacions">
              Locations
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/projects/pages_netdoc/gestionar-xarxes">
              Nets
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/projects/pages_netdoc/gestionar-connexions">
              Connections
            </Link>
          </li>
        </ul>
      </nav>
  );
}

export default navbarNetdoc;
