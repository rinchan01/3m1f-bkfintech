import React, { useState, useEffect } from 'react';
import dai from '../../assets/dai-stablecoin.png';
import eth from '../../assets/eth-icon.png';
import orai from '../../assets/orai.png';
import usdt from '../../assets/usdt-icon.png';

export default function LimitContent() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const [pairSelected, setPairSelected] = useState(false);

    const [selectedPair1, setSelectedPair1] = useState('');
    const [selectedPair2, setSelectedPair2] = useState('');

    const [pair1Amount, setPair1Amount] = useState(0); // Default Amount
    const [pair2Amount, setPair2Amount] = useState(0); // Default Amount

    const [pair1Balance, setPair1Balance] = useState(0); // Default Amount
    const [pair2Balance, setPair2Balance] = useState(0);

    const [limitRatio, setLimitRatio] = useState(5) // Default Amount
    const [isLimitOpened, setIsLimitOpened] = useState(false);

    const [expire, setExpire] = useState('1 day')
    const [isExpireOpened, setIsExpireOpened] = useState(false);

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

    const limitRatioSelection = [5, 10, 15];
    const handleSelectPair1 = (pair) => {
        setSelectedPair1(pair);
        setIsOpen1(false);
    };

    const handleSelectPair2 = (pair) => {
        console.log(pair);
        setSelectedPair2(pair);
        setIsOpen2(false);
    };





    useEffect(() => {
        if (selectedPair1 && selectedPair2) {
            setPairSelected(true);
        } else {
            setPairSelected(false);
        }
    }, [selectedPair1, selectedPair2])

    return (
        <>
            <div className=" place-self-center lg:col-span-6 justify-center items-center">
                <div className="w-full border border-slate-300 border-solid rounded-lg p-4">
                        <div id="select" className='flex-col items-center justify-between mb-3'>
                            <div className='flex justify-between'>
                                <div className="relative w-2/5">
                                
                                    <button
                                        onClick={() => {
                                            setIsLimitOpened(!isLimitOpened)
                                        }
                                        }
                                        className="border border-solid border-gray-300 rounded-lg p-4 h-full w-full bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 shadow-md flex items-center"
                                    >
                                        {limitRatio ? (
                                            <>
                                                <p>{limitRatio}%</p>
                                            </>
                                        ) : "Select limit ratio"}
                                    </button>
                                    {isLimitOpened && (
                                        <div className="absolute left-0 -mt-2 w-full bg-white rounded-lg shadow-lg z-50">
                                            <ul>
                                                {limitRatioSelection.map((limit, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => {
                                                            setLimitRatio(limit)
                                                            setIsLimitOpened(!isLimitOpened)
                                                        }}
                                                        className="cursor-pointer py-2 px-4 hover:bg-gray-100 flex items-center"
                                                    >
                                                        <p>{limit}%</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="relative w-2/5">
                                    
                                    <button
                                        onClick={() => {
                                            setIsExpireOpened(!isExpireOpened)
                                        }
                                        }
                                    className="border border-solid border-gray-300 rounded-lg p-4 h-full w-full bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 shadow-md flex items-center"
                                    >
                                        {expire ? (
                                            <>
                                                <p>{expire}</p>
                                            </>
                                        ) : "Select expire"}
                                    </button>
                                    {isExpireOpened && (
                                        <div className="absolute left-0 -mt-2 w-full bg-white rounded-lg shadow-lg z-50">
                                            <ul>
                                                {['1 day', '1 week', '1 month', '1 year'].map((expire, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => {
                                                            setExpire(expire)
                                                            setIsExpireOpened(!isExpireOpened)
                                                        }}
                                                        className="cursor-pointer py-2 px-4 hover:bg-gray-100 flex items-center"
                                                    >
                                                        <p>{expire}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div id="select" className='flex-col items-center justify-between'>
                            <div className='flex justify-between'>
                                <div className="relative w-2/5">
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
                                        ) : "Select pair"}
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
                                <div className="relative w-2/5">
                                    <button
                                        onClick={() => {
                                            setIsOpen2(!isOpen2)
                                            if (isOpen1) setIsOpen1(!isOpen1)
                                        }}
                                        className="border border-solid border-gray-300 rounded-lg p-4 h-full w-full bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 shadow-md flex items-center"
                                    >
                                        {selectedPair2 ? (
                                            <>
                                                <img src={selectedPair2.img} alt={selectedPair2.coin} className="mr-2 w-6 h-6" />
                                                {selectedPair2.coin}
                                            </>
                                        ) : "Select pair"}
                                    </button>
                                    {isOpen2 && (
                                        <div className="z-50 absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
                                            <ul>
                                                {pairs.map((pair, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleSelectPair2(pair)}
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
                            </div>


                        <div id='swap-content' className={`mt-5 flex-col flex-1 ${!pairSelected ? 'opacity-40' : ''}`}>
                            <div className='bg-slate-100 w-full border border-solid border-gray-300 rounded-lg p-4 mb-5'>
                                <div className="flex items-center">
                                    {pairSelected && <img src={selectedPair1.img} alt={selectedPair1.coin} className="mr-2 w-6 h-6" />}
                                    <p className="text-xl font-bold">{selectedPair1.coin}</p>
                                </div>
                                <input
                                    disabled={!pairSelected}
                                    className='w-full bg-slate-100 h-10 text-xl font-bold'
                                    type="number"
                                    value={pair1Amount}
                                    onChange={(e) => setPair1Amount(Number(e.target.value))}
                                />
                                <p> Balance: {pair1Balance}</p>

                            </div>
                            <div className=' bg-slate-100   w-full border border-solid border-gray-300 rounded-lg p-4 mb-5'>
                                <div className="flex items-center">
                                    {pairSelected && <img src={selectedPair2.img} alt={selectedPair2.coin} className="mr-2 w-6 h-6" />}
                                    <p className="text-xl font-bold">{selectedPair2.coin}</p>
                                </div>
                                <input
                                    disabled={!pairSelected}
                                    className='w-full bg-slate-100 h-10 text-xl font-bold'
                                    type="number"
                                    value={pair2Amount}
                                    onChange={(e) => setPair2Amount(Number(e.target.value))}
                                />
                                <p> Balance: {pair2Balance}</p>
                            </div>
                            <button className='bg-blue-200 hover:bg-blue-300 text-blue-600 font-bold rounded-lg px-5 py-2.5 text-center justify-center' disabled={!pairSelected}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
