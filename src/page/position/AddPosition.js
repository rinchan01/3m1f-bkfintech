import React, { useState } from 'react';
import NavBar from "../../components/NavBar";
import { useEffect } from 'react';
import Footer from '../../components/Footer';
import ethIcon from '../../assets/eth-icon.png';
import daiIcon from '../../assets/dai-stablecoin.png';
import usdtIcon from '../../assets/usdt-icon.png';
import oraiIcon from '../../assets/orai.png';
import pool from '../../assets/SAFETY.svg';


const AddPosition = () => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const [pairSelected, setPairSelected] = useState(false);

    const [selectedPair1, setSelectedPair1] = useState('');
    const [selectedPair2, setSelectedPair2] = useState('');

    const [currentPrice, setCurrentPrice] = useState(1500); // Default low price
    const [lowPrice, setLowPrice] = useState(0); // Default low price
    const [highPrice, setHighPrice] = useState(0); // Default high price

    const [pair1Amount, setPair1Amount] = useState(0); // Default Amount
    const [pair2Amount, setPair2Amount] = useState(0); // Default Amount

    const [pair1Balance, setPair1Balance] = useState(0); // Default Amount
    const [pair2Balance, setPair2Balance] = useState(0); // Default Amount
    const pairs = [
        {
            coin: 'ETH',
            img: ethIcon
        },
        {
            coin: 'DAI',
            img: daiIcon
        },
        {
            coin: 'USDT',
            img: usdtIcon
        },
        {
            coin: 'ORAI',
            img: oraiIcon
        }
    ]; // Example array of pairs
    const fee = "0.30%";
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
        <div className="flex flex-col">
            <NavBar />
            <div class="grid mt-5 lg:grid-cols-12">
                <div className=" place-self-center lg:col-span-6 justify-center items-center">
                    <div className="w-full border border-slate-300 border-solid rounded-lg p-4">
                        <h1 className='border-b border-solid border-gray-300 p-4 font-bold'>Add liquidity</h1>
                        <div className="relative mt-4">

                            <div id="select-pair" className='flex-col items-center justify-between'>
                                <h2 className='mb-4 justify-center flex font-bold'>Select pair</h2>
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
                                            className="border border-solid border-gray-300 rounded-lg p-4 h-full w-full bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded-lg shadow-md flex items-center"
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
                            </div>

                            <div id='fee' className='w-full border border-solid border-gray-300 rounded-lg p-4 mt-5 mb-5'>
                                <p>{fee} fee tier</p>
                            </div>

                            <div id='price_range' className={`flex-col flex-1 ${!pairSelected ? 'opacity-40' : ''}`}>
                                <h2 className='flex justify-center font-bold'>Set price range</h2>
                                <p className='my-3'>Current price: {currentPrice}</p>
                                <div className={`bg-slate-100 w-full border border-solid border-gray-300 rounded-lg p-4 mb-5`}>
                                    <p>Low price</p>
                                    <input
                                        disabled={!pairSelected}
                                        className={`w-full bg-slate-100 h-10 text-xl font-bold`}
                                        type="number"
                                        value={lowPrice}
                                        onChange={(e) => setLowPrice(Number(e.target.value))}
                                    />
                                    <p>{selectedPair2.coin} per {selectedPair1.coin}</p>
                                </div>
                                <div className=' bg-slate-100   w-full border border-solid border-gray-300 rounded-lg p-4 mb-5'>
                                    <p>High price</p>
                                    <input
                                        disabled={!pairSelected}
                                        className='w-full bg-slate-100 h-10 text-xl font-bold'
                                        type="number"
                                        value={highPrice}
                                        onChange={(e) => setHighPrice(Number(e.target.value))}
                                    />
                                    <p>{selectedPair2.coin} per {selectedPair1.coin}</p>
                                </div>
                            </div>

                            <div id='deposit' className={`flex-col flex-1 ${!pairSelected ? 'opacity-40' : ''}`}>
                                <h2 className='mb-4 flex justify-center font-bold'>Deposit amounts</h2>

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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ml-2 lg:col-span-4" style={{ width: '671.58px', height: '698.62px', position: 'relative' }}>
                    <img className="w-4/5 h-full" src={pool} />
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default AddPosition;
