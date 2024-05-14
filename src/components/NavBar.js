import * as React from 'react';
import logo from '../assets/logo.png';
import { FaWallet } from "react-icons/fa";
const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Swap', href: '/#swap' },
    { name: 'NFTs', href: 'nft' },
    { name: 'Pool', href: 'pool' },
    { name: 'Create Token', href: 'createToken' },
    { name: 'List Token', href: 'listToken' },
]
export default function NavBar() {
    const [connected, setConnected] = React.useState(false);
    const [walletAddress, setWalletAddress] = React.useState('');
    const chainId = "Oraichain"
    async function getOwallet() {
        if (window.owallet) {
            await window.owallet.enable(chainId);
            setConnected(true);
            return window.owallet;
        }

        if (document.readyState === "complete") {
            console.log("1", window.owallet)
            console.log("connected")
            return window.owallet;
        }

        return new Promise((resolve) => {
            const documentStateChange = (event) => {
                if (
                    event.target &&
                    event.target.readyState === "complete"
                ) {
                    resolve(window.owallet);
                    document.removeEventListener("readystatechange", documentStateChange);
                }
            };

            document.addEventListener("readystatechange", documentStateChange);
        });
    }

    async function handleConnection() {
        console.log("connecting")
        try {
            const owallet = await getOwallet();
            if (!owallet) {
                console.error("Owallet wallet not found");
                return;
            }
            const key = await owallet.getKey(chainId);
            console.log("key", key.bech32Address);
            setWalletAddress(key.bech32Address);
        } catch (error) {
            console.error("Failed to connect to Owallet wallet:", error);
        }
    }

    return (
        <div id='navbar' className='bg-white sticky top-0 z-50'>
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
                    <span class="ml-2 p-1 text-md text-opacity-90 font-bold">3M1FCoin</span>
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
                <div className="hidden -mt-3 lg:flex lg:flex-1 lg:justify-end">
                    {connected ?
                        <div className="bg-blue-200 text-blue-600 font-bold py-2 px-4 rounded-full flex items-center">
                            <FaWallet className="mr-2" />
                            <span>{walletAddress.slice(0, 3)}...{walletAddress.slice(-5)}</span>
                        </div>
                        :
                        <button className="bg-blue-200 hover:bg-blue-300 text-blue-600 font-bold py-2 px-4 rounded-full flex items-center" onClick={handleConnection}>
                            <FaWallet className="mr-2" />
                            <span>Connect</span>
                        </button>
                    }
                </div>

            </nav>
            <hr
                class="h-px -mt-2 border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-25 dark:via-neutral-400" />
        </div>
    )
}
