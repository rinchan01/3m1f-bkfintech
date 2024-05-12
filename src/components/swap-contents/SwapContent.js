import * as React from 'react';
import { useState } from 'react';
import dai from '../../assets/dai-stablecoin.png';
import eth from '../../assets/eth-icon.png';
import wbtc from '../../assets/wbtc.png';
import usdc from '../../assets/usdc-icon.png';
import usdt from '../../assets/usdt-icon.png';

export default function SwapContent() {
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [selectedCoin1, setSelectedCoin1] = useState('ETH');
    const [selectedImg1, setSelectedImg1] = useState(eth);

    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    const [selectedCoin2, setSelectedCoin2] = useState('ETH');
    const [selectedImg2, setSelectedImg2] = useState(eth);

    const toggleDropdown1 = (coin) => {
        setSelectedCoin1(coin);
        setIsDropdownOpen1(!isDropdownOpen1);
        switch (coin) {
            case 'ETH':
                setSelectedImg1(eth);
                break;
            case 'WBTC':
                setSelectedImg1(wbtc);
                break;
            case 'USDC':
                setSelectedImg1(usdc);
                break;
            case 'USDT':
                setSelectedImg1(usdt);
                break;
            case 'DAI':
                setSelectedImg1(dai);
                break;
            default:
                setSelectedImg1(eth);
        }
        console.log("Dropdown 1 state:", isDropdownOpen1);
    };

    const toggleDropdown2 = (coin) => {
        setSelectedCoin2(coin);
        setIsDropdownOpen2(!isDropdownOpen2);
        switch (coin) {
            case 'ETH':
                setSelectedImg2(eth);
                break;
            case 'WBTC':
                setSelectedImg2(wbtc);
                break;
            case 'USDC':
                setSelectedImg2(usdc);
                break;
            case 'USDT':
                setSelectedImg2(usdt);
                break;
            case 'DAI':
                setSelectedImg2(dai);
                break;
            default:
                setSelectedImg2(eth);
        }
        console.log("Dropdown 2 state:", isDropdownOpen2);
    };

    return (
        <>
            <form>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">You pay</label>
                <div className="flex h-full">
                    
                    <div className="relative">
                        <button
                            id="dropdown-button1"
                            data-dropdown-toggle="coin1"
                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-md font-xl text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                            type="button"
                            onClick={() => setIsDropdownOpen1(!isDropdownOpen1)}
                        >
                            <img className="w-5 h-5 mr-4 rounded-full" src={selectedImg1} alt={selectedCoin1} />
                            {selectedCoin1}
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {isDropdownOpen1 && (
                            <div id="coin1" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-3/5 dark:bg-gray-700">
                                <ul className="py-2 font-xl text-xl text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button1">
                                    <li onClick={() => toggleDropdown1('ETH')} className="flex-shrink inline-flex cursor-pointer hover:text-blue-600 hover:bg-slate-300 items-center">
                                        <img className="w-5 h-5 mr-4 rounded-full" src={eth} alt="ETH" />
                                        <span>ETH</span>
                                    </li>
                                    <li onClick={() => toggleDropdown1('WBTC')} className="flex-shrink inline-flex cursor-pointer hover:text-blue-600 hover:bg-slate-300 items-center">
                                        <img className="w-5 h-5 mr-4 rounded-full" src={wbtc} alt="WBTC" />
                                        <span>WBTC</span>
                                    </li>
                                    <li onClick={() => toggleDropdown1('USDC')} className="flex-shrink inline-flex cursor-pointer hover:text-blue-600 hover:bg-slate-300 items-center">
                                        <img className="w-5 h-5 mr-4 rounded-full" src={usdc} alt="USDC" />
                                        <span>USDC</span>
                                    </li>
                                    <li onClick={() => toggleDropdown1('USDT')} className="flex-shrink inline-flex cursor-pointer hover:text-blue-600 hover:bg-slate-300 items-center">
                                        <img className="w-5 h-5 mr-4 rounded-full" src={usdt} alt="USDT" />
                                        <span>USDT</span>
                                    </li>
                                    <li onClick={() => toggleDropdown1('DAI')} className="flex-shrink inline-flex cursor-pointer hover:text-blue-600 hover:bg-slate-300 items-center">
                                        <img className="w-5 h-5 mr-4 rounded-full" src={dai} alt="DAI" />
                                        <span>DAI</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    
                    <div className="relative w-full">
                        <input
                            type="input"
                            id="search-dropdown1"
                            className="block p-2.5 w-1/2 z-20 text-xl text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            placeholder="0"
                            required
                        />
                    </div>
                </div>
            </form>
        
            <form className="mt-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">You receive</label>
                <div className="flex h-full">

                    <div className="relative">
                        <button
                            id="dropdown-button2"
                            data-dropdown-toggle="coin2"
                            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-md font-xl text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                            type="button"
                            onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
                        >
                            <img className="w-5 h-5 mr-4 rounded-full" src={selectedImg2} alt={selectedCoin2} />
                            {selectedCoin2}
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {isDropdownOpen2 && (
                            <div id="coin2" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-3/5 dark:bg-gray-700">
                                <ul className="py-2 font-xl text-xl text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button2">
                                    <li onClick={() => toggleDropdown2('ETH')} className="inline-flex cursor-pointer hover:text-blue-600 hover:bg-slate-300 items-center">
                                        <img className="w-5 h-5 mr-4 rounded-full" src={eth} alt="ETH" />
                                        <span>ETH</span>
                                    </li>
                                    <li onClick={() => toggleDropdown2('WBTC')} className="inline-flex cursor-pointer hover:text-blue-600 hover:bg-slate-300 items-center">
                                        <img className="w-5 h-5 mr-4 rounded-full" src={wbtc} alt="WBTC" />
                                        <span>WBTC</span>
                                    </li>
                                    <li onClick={() => toggleDropdown2('USDC')} className="inline-flex cursor-pointer hover:text-blue-600 hover:bg-slate-300 items-center">
                                        <img className="w-5 h-5 mr-4 rounded-full" src={usdc} alt="USDC" />
                                        <span>USDC</span>
                                    </li>
                                    <li onClick={() => toggleDropdown2('USDT')} className="inline-flex cursor-pointer hover:text-blue-600 hover:bg-slate-300 items-center">
                                        <img className="w-5 h-5 mr-4 rounded-full" src={usdt} alt="USDT" />
                                        <span>USDT</span>
                                    </li>
                                    <li onClick={() => toggleDropdown2('DAI')} className="inline-flex cursor-pointer hover:text-blue-600 hover:bg-slate-300 items-center">
                                        <img className="w-5 h-5 mr-4 rounded-full" src={dai} alt="DAI" />
                                        <span>DAI</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    
                    <div className="relative w-full">
                        <input
                            type="input"
                            id="search-dropdown2"
                            className="block p-2.5 w-1/2 z-20 text-xl text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            placeholder="0"
                            required
                        />
                    </div>
                </div>
            </form>
            <button type="button" className="mt-5 w-40 bg-blue-200 hover:bg-blue-300 text-blue-600 font-bold rounded-xl text-lg px-5 py-2.5 text-center me-2 mb-2">Swap</button>
            
        </>
    );
}
