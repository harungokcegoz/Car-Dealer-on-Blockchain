import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-orange-400 text-white p-5">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-4xl font-bold">Car Dealership</h1>
                <nav>
                    <ul className="flex space-x-4 text-xl">
                        <li className="hover:text-gray-200">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="hover:text-gray-200">
                            <Link href="/car-registration">Car Registration</Link>
                        </li>
                        <li className="hover:text-gray-200">
                            <Link href="/my-cars">My Cars</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
