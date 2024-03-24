"use client";
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../assets/logo.png';
import useRetrieveAccountType from '@/hooks/useRetrieveAccountType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import useCurrentEtherPrice from '@/hooks/useCurrentEtherPrice';

const Header = () => {
    const accountType = useRetrieveAccountType();
    const currentEtherPrice = useCurrentEtherPrice() || 3400.32;
    let link1, link2, text1, text2;

    switch(accountType) {
        case 'Dealer':
            link1 = "/apk-confirmations";
            link2 = "/trade-confirmations";
            text1 = "APK Confirmations";
            text2 = "Trades Confirmations";
            break;
        case 'Buyer':
            link1 = "/orders";
            link2 = "/my-cars";
            text1 = "Orders";
            text2 = "My Cars";
            break;
        case 'Seller':
            link1 = "/car-registration";
            link2 = "/my-cars";
            text1 = "Car Registration";
            text2 = "My Cars";
            break;
        default:
            link1 = "/car-registration";
            link2 = "/my-cars";
            text1 = "Car Registration";
            text2 = "My Cars";
    }

    return (
        <header className="bg-orange-500 text-white p-5 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="logo flex items-center gap-8">
                    <a href="/" className='flex items-center'>
                        <Image src={Logo} alt="Auto Trading" width={70} height={50}/>
                        <span className='font-bold text-xl pt-2 ml-2'>HG Cars</span>
                    </a>
                    <span className='border-b-2 border-gray-100 text-md font-semibold px-3 mt-2 py-1 drop-shadow-xl'>{accountType} Account</span>
                </div>
                <nav>
                    <ul className="flex space-x-8 text-md items-center">
                        <li className="border-b-2 border-transparent hover:border-current hover:text-rose-100">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="border-b-2 border-transparent hover:border-current hover:text-rose-200">
                            <Link href={link1}>{text1}</Link>
                        </li>
                        <li className="border-b-2 border-transparent hover:border-current hover:text-rose-200">
                            <Link href={link2}>{text2}</Link>
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
