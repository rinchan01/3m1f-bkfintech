import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";
import axios from 'axios';
import {SigningCosmWasmClient} from '@cosmjs/cosmwasm-stargate';



const CreateToken = () =>{
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState('');
    const [supply, setSupply] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [displayImage, setDisplayImage] = useState(false);
    const [offlineSinger,setOfflineSigner] = useState('');
    const [walletAddress, setWalletAddress] = React.useState('');
    const chainId = "Oraichain"
    async function getOwallet() {
        if (window.owallet) {
            await window.owallet.enable(chainId);
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
    async function createSigningCosmWasm(){
        // setOfflineSigner(await window.getOfflineSigner(chainId));
        setOfflineSigner(await window.getOfflineSigner());
        console.log("offSigner", offlineSinger);
        // const client = await SigningCosmWasmClient.connectWithSigner('https://rpc.orai.io', offlineSinger);
        const client = await SigningCosmWasmClient.connectWithSigner('https://rpc.orai.io', offlineSinger);
        console.log(client);
    }
    async function handleConnection() {
        await createSigningCosmWasm();
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        handleConnection();
        const coin = {
                name,
                symbol,
                supply,
                imgUrl,
                walletAddress,
                price
        }
        console.log("coin", coin);
        try {
            // Make an API call to create the coin
            const response = await axios.post('http://localhost:5500/add', {
                name,
                symbol,
                supply,
                imgUrl,
                walletAddress,
                price
            });

            console.log('Coin created:', response.data);
            // Show success toast
            window.alert('Coin created successfully!');
            // Reset form fields after successful submission
            setName('');
            setSymbol('');
            setSupply('');
            setImgUrl('');
            setPrice('');
            setDisplayImage(false);
        } catch (error) {
            console.error('Error creating coin:', error);
        }
    };

    const handleImageUrlChange = (e) => {
        setImgUrl(e.target.value);
        setDisplayImage(true); // Set to true to display the image
    };

    
    return (
        <div className="flex flex-col">
            <NavBar/>
            <div className="mt-5 flex-col flex justify-center items-center">
                <h1 className='flex text-xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white mb-5'>Create your token in CW20 standard</h1>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-2/6 border border-slate-300 border-solid rounded-lg p-4'>
                    <div className="mb-4 w-2/5">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md max-w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4 w-2/5">
                        <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
                            Symbol
                        </label>
                        <input
                            type="text"
                            id="symbol"
                            name="symbol"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4 w-2/5">
                        <label htmlFor="supply" className="block text-sm font-medium text-gray-700">
                            Supply
                        </label>
                        <input
                            type="number"
                            id="supply"
                            name="supply"
                            value={supply}
                            onChange={(e) => setSupply(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4 w-2/5">
                        <label htmlFor="supply" className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <input
                            type="number"
                            id="supply"
                            name="supply"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4 w-2/5">
                        <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-700">
                            Image URL
                        </label>
                        <input
                            type="url"
                            id="imgUrl"
                            name="imgUrl"
                            value={imgUrl}
                            onChange={handleImageUrlChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    {displayImage && (
                        <img src={imgUrl} alt="Token Image" className="mt-4 rounded-md " style={{ maxWidth: '200px' }} />
                    )}
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 w-1/5  "
                    >
                        Create Token
                    </button>
                </form>
            </div>
        </div>
        
    )
}

export default CreateToken;