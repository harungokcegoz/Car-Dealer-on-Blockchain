"use client";
import Image from 'next/image';
import Logo from '../assets/logo.png';
import useRetrieveAccountType from '@/hooks/useRetrieveAccountType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import useCurrentEtherPrice from '@/hooks/useCurrentEtherPrice';

const Header = () => {
    const currentEtherPrice = useCurrentEtherPrice() || 3400.32;
    const accountType = useRetrieveAccountType();
    return (
        <header className="bg-orange-500 text-white p-5">
            <div className="container mx-auto flex justify-between items-center">
                <div className="logo flex items-center gap-8">
                    <a href="/" className='flex items-center'>
                        <Image src={Logo} alt="Auto Trading" width={70} height={50}/>
                        <span className='font-bold text-xl pt-2 ml-2'>HG Cars</span>
                    </a>
                </div>
                <nav>
                    <ul className="flex space-x-8 text-md items-center">
                        <li>
                            <span className='border-b-2 border-gray-100 text-md font-semibold px-3 mt-2 py-2 drop-shadow-xl'>{accountType} Account</span>
                        </li>
                        <li>
                            <span className="ether flex items-center border-2 border-blue-700 py-2 px-4 rounded-full shadow-lg">
                                <span className='text-blue-700 mx-2'><FontAwesomeIcon icon={faEthereum} /></span>
                                <span className='w-20'>{`$${currentEtherPrice}`}</span>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
