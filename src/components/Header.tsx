import { MdOpenInNew } from "react-icons/md";

function Header() {
  return (
    <header>
      <nav className="flex items-center justify-between px-8 py-4">
        <h1 className="text-md font-bold">SQL Runner</h1>

        <ul className="flex items-center gap-4">
          <li>
            <a
              href="https://github.com/ravid7000"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2"
            >
              Github <MdOpenInNew />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ravid7000/solid-octo-potato/blob/master/README.md"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2"
            >
              Documentation <MdOpenInNew />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
