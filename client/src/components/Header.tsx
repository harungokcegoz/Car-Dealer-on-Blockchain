"use client";
import Link from 'next/link';
const Header = () => {
    const accountType = localStorage.getItem('accountType');

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
        <header className="bg-orange-500 text-white p-5 py-7 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/"><h1 className="text-3xl font-bold">HG Cars</h1></a>
                <nav>
                    <ul className="flex space-x-8 text-md">
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
                            <span className='border-2 border-orange-200 px-6 py-2 rounded-full ml-8 shadow-lg'>{accountType} Account</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
