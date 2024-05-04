import * as React from 'react';
import logo from '../assets/logo.png';
const navigation = [
    { name: 'Home', href: '' },
    { name: 'Swap', href: '#swap' },
    { name: 'NFTs', href: 'nft' },
    { name: 'Pool', href: 'pool' },
]
export default function NavBar() {
    const [connected, setConnected] = React.useState(false);
    async function getKeplr() {
        if (window.keplr) {
            console.log('0',window.keplr);
            await window.keplr.enable("theta-testnet-001");
            setConnected(true);
            return window.keplr;
        }
    
        if (document.readyState === "complete") {
            console.log("1",window.keplr)
            return window.keplr;
        }
    
        return new Promise((resolve) => {
            const documentStateChange = (event) => {
                if (
                    event.target &&
                    event.target.readyState === "complete"
                ) {
                    resolve(window.keplr);
                    document.removeEventListener("readystatechange", documentStateChange);
                }
            };
    
            document.addEventListener("readystatechange", documentStateChange);
        });
    }

    async function handleConnection() {
        try {
            await getKeplr();
            // If you want to do something after connecting, you can put it here
            console.log("Connected to Keplr wallet successfully!");
        } catch (error) {
            console.error("Failed to connect to Keplr wallet:", error);
        }
    }
    
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
                    
                    {connected ? 
                    <div className="bg-blue-200 text-blue-600 font-bold py-2 px-4 rounded-full">
                        Keplr wallet connected
                    </div> :
                     <button className="bg-blue-200 hover:bg-blue-300 text-blue-600 font-bold py-2 px-4 rounded-full" onClick={handleConnection}>
                        Connect
                    </button>}
                </div>
            </nav>
        </div>
    )
}