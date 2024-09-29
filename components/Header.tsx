import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-teal-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Resume IOI</h1>
        
        {/* Center Navigation */}
        <nav className="flex-grow text-center">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link href="/resume" className="hover:text-gray-300">Resume</Link>
            </li>
          </ul>
        </nav>

        {/* Utility Links on the Right */}
        <div className="flex space-x-4">
          <Link href="/login" className="hover:text-gray-300">Login</Link>
          <Link href="/register" className="hover:text-gray-300">Register</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
