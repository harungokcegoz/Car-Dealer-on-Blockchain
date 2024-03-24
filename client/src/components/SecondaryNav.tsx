import Link from 'next/link';

interface SecondaryNavProps {
    link1: string;
    text1: string;
    link2: string;
    text2: string;
}

const SecondaryNav: React.FC<SecondaryNavProps> = ({ link1, text1, link2, text2 }) => {
    return (
        <>  
            <nav className='text-orange-700 border-b-2'>
                <ul className='flex items-center justify-center space-x-20'>
                    <li className="border-b-2 border-transparent hover:border-current hover:text-rose-500 h-14 flex items-center justify-center">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="border-b-2 border-transparent hover:border-current hover:text-rose-500 h-14 flex items-center justify-center">
                        <Link href={link1}>{text1}</Link>
                    </li>
                    <li className="border-b-2 border-transparent hover:border-current hover:text-rose-500 h-14 flex items-center justify-center">
                        <Link href={link2}>{text2}</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default SecondaryNav;