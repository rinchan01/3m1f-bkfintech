import * as React from 'react'
import dai from '../../assets/dai-stablecoin.png';
import eth from '../../assets/eth-icon.png';
import usdc from '../../assets/usdc-icon.png';
import usdt from '../../assets/usdt-icon.png';
import orai from '../../assets/orai.png';
import { useState, useEffect } from 'react';

export default function BuyContent() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const [selectedPair1, setSelectedPair1] = useState('');

    const [pair1Amount, setPair1Amount] = useState(0); // Default Amount


    const [pair1Balance, setPair1Balance] = useState(0); // Default Amount

    const pairs = [
        {
            coin: 'ETH',
            img: eth
        },
        {
            coin: 'DAI',
            img: dai
        },
        {
            coin: 'USDT',
            img: usdt
        },
        {
            coin: 'ORAI',
            img: orai
        }
    ]; // Example array of pairs

    const handleSelectPair1 = (pair) => {
        setSelectedPair1(pair);
        setIsOpen1(false);
    };



    return (
        <>
            <div className=" place-self-center lg:col-span-6 justify-center items-center">
                <div className="w-full border border-slate-300 border-solid rounded-lg p-4">
                    <div className="relative mt-4">
                        <div id="select-pair" className='flex-col items-center justify-between'>
                            <button
                                onClick={() => {
                                    setIsOpen1(!isOpen1)
                                    if (isOpen2) setIsOpen2(!isOpen2)
                                }
                                }
                                className="border border-solid border-gray-300 rounded-lg p-4 h-full w-full bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded-lg shadow-md flex items-center"
                            >
                                {selectedPair1 ? (
                                    <>
                                        <img src={selectedPair1.img} alt={selectedPair1.coin} className="mr-2 w-6 h-6" />
                                        {selectedPair1.coin}
                                    </>
                                ) : "Select token"}
                            </button>
                            {isOpen1 && (
                                <div className="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50">
                                    <ul>
                                        {pairs.map((pair, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectPair1(pair)}
                                                className="cursor-pointer py-2 px-4 hover:bg-gray-100 flex items-center"
                                            >
                                                <img src={pair.img} alt={pair.coin} className="mr-2 w-6 h-6" />
                                                {pair.coin}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>
                        <div id='swap-content' className={`mt-5 flex-col flex-1`}>
                            <div className='bg-slate-100 w-full border border-solid border-gray-300 rounded-lg p-4 mb-3'>
                                <div className="flex items-center">
                                    {selectedPair1 ? <img src={selectedPair1.img} alt={selectedPair1.coin} className="mr-2 w-6 h-6" /> : ''}
                                    <p className="text-xl font-bold">{selectedPair1.coin}</p>
                                </div>
                                <input
                                    className='w-full bg-slate-100 h-10 text-xl font-bold'
                                    type="number"
                                    value={pair1Amount}
                                    onChange={(e) => setPair1Amount(Number(e.target.value))}
                                />
                                <p> Balance: {pair1Balance}</p>

                            </div>

                            <button className='bg-blue-200 hover:bg-blue-300 text-blue-600 font-bold rounded-lg px-5 py-2.5 text-center justify-center' >Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}