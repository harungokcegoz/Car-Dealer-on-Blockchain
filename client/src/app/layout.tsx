'use client';

import './globals.css';
import React from 'react';
import Header from '../components/Header';
import SecondaryNav from '../components/SecondaryNav';
import useRetrieveAccountType from '../hooks/useRetrieveAccountType';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accountType = useRetrieveAccountType();
  let link1;
  let link2;
  let text1;
  let text2;

  switch (accountType) {
    case 'Dealer':
      link1 = '/apk-confirmations';
      link2 = '/trade-confirmations';
      text1 = 'APK Confirmations';
      text2 = 'Trades Confirmations';
      break;
    case 'Buyer':
      link1 = '/orders';
      link2 = '/my-cars';
      text1 = 'Orders';
      text2 = 'My Cars';
      break;
    case 'Seller':
      link1 = '/car-registration';
      link2 = '/my-cars';
      text1 = 'Car Registration';
      text2 = 'My Cars';
      break;
    default:
      link1 = '/car-registration';
      link2 = '/my-cars';
      text1 = 'Car Registration';
      text2 = 'My Cars';
  }

  return (
    <html lang="en">
      <body className="bg-gray-100 font-montserrat">
        <Header />
        <SecondaryNav link1={link1} text1={text1} link2={link2} text2={text2} />

        {children}
      </body>
    </html>
  );
}
