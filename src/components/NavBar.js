import * as React from 'react';
import logo from '../assets/logo.png';

const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Swap', href: '#swap' },
    { name: 'NFTs', href: '#' },
    { name: 'Pool', href: '#' },
]
export default function NavBar() {
    return (
        <div id='navbar'>
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">UETCoin</span>
                        <img
                            className="h-8 w-auto"
                            src={logo}
                            alt=""
                        />
                    </a>
                    <span class="ml-2 p-1 text-md text-opacity-90 font-bold">UETCoin</span>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <button class="bg-blue-200 hover:bg-blue-300 text-blue-600 font-bold py-2 px-4 rounded-full">
                        Connect
                    </button>
                </div>
            </nav>
        </div>
    )
}