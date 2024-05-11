import React, { useState } from 'react';
import dai from '../../assets/dai-stablecoin.png';
import eth from '../../assets/eth-icon.png';
import wbtc from '../../assets/wbtc.png';
import usdc from '../../assets/usdc-icon.png';
import usdt from '../../assets/usdt-icon.png';

export default function LimitContent() {
    const [isRatioDropdownOpen, setIsRatioDropdownOpen] = useState(false);
    const [isCoinDropdownOpen1, setIsCoinDropdownOpen1] = useState(false);
    const [isCoinDropdownOpen2, setIsCoinDropdownOpen2] = useState(false);
    const [selectedCoin1, setSelectedCoin1] = useState('ETH');
    const [selectedCoin2, setSelectedCoin2] = useState('ETH');
    const [selectedImg1, setSelectedImg1] = useState(eth);
    const [selectedImg2, setSelectedImg2] = useState(eth);
    const [selectedRatio, setSelectedRatio] = useState('');

    const toggleRatioDropdown = () => {
        setIsRatioDropdownOpen(!isRatioDropdownOpen);
    };

    const toggleCoinDropdown1 = () => {
        setIsCoinDropdownOpen1(!isCoinDropdownOpen1);
    };

    const toggleCoinDropdown2 = () => {
        setIsCoinDropdownOpen2(!isCoinDropdownOpen2);
    };

    const handleCoinSelection1 = (coin, img) => {
        setSelectedCoin1(coin);
        setSelectedImg1(img);
        setIsCoinDropdownOpen1(false);
    };

    const handleCoinSelection2 = (coin, img) => {
        setSelectedCoin2(coin);
        setSelectedImg2(img);
        setIsCoinDropdownOpen2(false);
    };

    const handleRatioSelection = (ratio) => {
        setSelectedRatio(ratio);
        setIsRatioDropdownOpen(false);
    };

    return (
        <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Limit price</label>
            <form className="mb-3 w-full">
                <div className="flex h-full">
                    <button
                        id="dropdown-button-ratio"
                        data-dropdown-toggle="ratio"
                        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-md font-xl text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        type="button"
                        onClick={toggleRatioDropdown}
                    >
                        {selectedRatio || 'Select ratio'}
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {isRatioDropdownOpen && (
                        <div id="ratio" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 font-xl text-xl text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button-ratio">
                                <li className="cursor-pointer hover:text-blue-600 hover:bg-slate-300" onClick={() => handleRatioSelection('Market')}>
                                    Market
                                </li>
                                <li className="cursor-pointer hover:text-blue-600 hover:bg-slate-300" onClick={() => handleRatioSelection('5%')}>
                                    5%
                                </li>
                                <li className="cursor-pointer hover:text-blue-600 hover:bg-slate-300" onClick={() => handleRatioSelection('10%')}>
                                    10%
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className="relative w-full">
                        <input
                            type="input"
                            id="search-dropdown"
                            className="block p-2.5 w-1/2 z-20 text-xl text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            placeholder="0"
                            required
                        />
                    </div>
                </div>
            </form>
            <form>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">You pay</label>
                <div className="flex h-full">
                    <button
                        id="dropdown-button-coin1"
                        data-dropdown-toggle="coin1"
                        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-md font-xl text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        type="button"
                        onClick={toggleCoinDropdown1}
                    >
                        <img className="w-5 h-5 mr-4 rounded-full" src={selectedImg1} alt={selectedCoin1} />
                        {selectedCoin1}
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {isCoinDropdownOpen1 && (
                        <div id="coin1" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 font-xl text-xl text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button-coin1">
                                <li className="cursor-pointer hover:text-blue-600 hover:bg-slate-300" onClick={() => handleCoinSelection1('ETH', eth)}>
                                    <img className="w-5 h-5 mr-4 rounded-full" src={eth} alt="ETH" />
                                    ETH
                                </li>
                                <li className="cursor-pointer hover:text-blue-600 hover:bg-slate-300" onClick={() => handleCoinSelection1('WBTC', wbtc)}>
                                    <img className="w-5 h-5 mr-4 rounded-full" src={wbtc} alt="WBTC" />
                                    WBTC
                                </li>
                                <li className="cursor-pointer hover:text-blue-600 hover:bg-slate-300" onClick={() => handleCoinSelection1('USDC', usdc)}>
                                    <img className="w-5 h-5 mr-4 rounded-full" src={usdc} alt="USDC" />
                                    USDC
                                </li>
                                <li className="cursor-pointer hover:text-blue-600 hover:bg-slate-300" onClick={() => handleCoinSelection1('USDT', usdt)}>
                                    <img className="w-5 h-5 mr-4 rounded-full" src={usdt} alt="USDT" />
                                    USDT
                                </li>
                                <li className="cursor-pointer hover:text-blue-600 hover:bg-slate-300" onClick={() => handleCoinSelection1('DAI', dai)}>
                                    <img className="w-5 h-5 mr-4 rounded-full" src={dai} alt="DAI" />
                                    DAI
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className="relative w-full">
                        <input
                            type="input"
                            id="search-dropdown"
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
                    <button
                        id="dropdown-button-coin2"
                        data-dropdown-toggle="coin2"
                        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-md font-xl text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        type="button"
                        onClick={toggleCoinDropdown2}
                    >
                        <img className="w-5 h-5 mr-4 rounded-full" src={selectedImg2} alt={selectedCoin2} />
                        {selectedCoin2}
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {isCoinDropdownOpen2 && (
                        <div id="coin2" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 font-xl text-xl text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button-coin2">
                                <li className="cursor-pointer hover:text-blue-600 hover:bg-slate-300" onClick={() => handleCoinSelection2('ETH', eth)}>
                                    <img className="w-5 h-5 mr-4 rounded-full" src={eth} alt="ETH" />
                                    ETH
                                </li>
                                <li className="cursor-pointer hover:text-blue-600 hover:bg-slate-300" onClick={() => handleCoinSelection2('WBTC', wbtc)}>
                                    <img className="w-5 h-5 mr-4 rounded-full" src={wbtc} alt="WBTC" />
                                    WBTC
                                </li>
                                <li className="cursor-pointer hover:text-blue-600 hover:bg-slate-300" onClick={() => handleCoinSelection2('USDC', usdc)}>
                                    <img className="w-5 h-5 mr-4 rounded-full" src={usdc} alt="USDC" />
                                    USDC
                                </li>
                                <li className="cursor-pointer hover:text-blue-600 hover:bg-slate-300" onClick={() => handleCoinSelection2('USDT', usdt)}>
                                    <img className="w-5 h-5 mr-4 rounded-full" src={usdt} alt="USDT" />
                                    USDT
                                </li>
                                <li className="cursor-pointer hover:text-blue-600 hover:bg-slate-300" onClick={() => handleCoinSelection2('DAI', dai)}>
                                    <img className="w-5 h-5 mr-4 rounded-full" src={dai} alt="DAI" />
                                    DAI
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className="relative w-full">
                        <input
                            type="input"
                            id="search-dropdown"
                            className="block p-2.5 w-1/2 z-20 text-xl text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                            placeholder="0"
                            required
                        />
                    </div>
                </div>
            </form>
            <select id="expiry" className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Expiry</option>
                <option value="US">1 day</option>
                <option value="CA">1 week</option>
                <option value="FR">1 month</option>
                <option value="DE">1 year</option>
            </select>
            <button type="button" className="mt-5 w-40 bg-blue-200 hover:bg-blue-300 text-blue-600 font-bold rounded-xl text-lg px-5 py-2.5 text-center me-2 mb-2">Confirm</button>
        </>
    );
}
