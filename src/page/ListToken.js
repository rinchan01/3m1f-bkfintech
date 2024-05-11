import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";
import axios from 'axios';

const ListToken = () =>{
    const [tokens, setTokens] = useState([]);
    const [walletAddress, setWalletAddress] = React.useState('');
    const chainId = "cosmoshub-4"
    async function getKeplr() {
        if (window.keplr) {
            await window.keplr.enable(chainId);
            return window.keplr;
        }

        if (document.readyState === "complete") {
            console.log("1", window.keplr)
            console.log("connected")
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
        console.log("connecting")
        try {
            const keplr = await getKeplr();
            if (!keplr) {
                console.error("Keplr wallet not found");
                return;
            }
            const key = await keplr.getKey(chainId);
            console.log("key", key.bech32Address);
            setWalletAddress(key.bech32Address);
        } catch (error) {
            console.error("Failed to connect to Keplr wallet:", error);
        }
    }

    async function fetchData() {
        
        try {
            // Make an API call to create the coin
            const response = await axios.get(`http://localhost:5500/get/${walletAddress}`);

            setTokens(response.data.listCoins);

        } catch (error) {
            console.error('Error creating coin:', error);
        }
    }
    useEffect(() => {
        handleConnection()
        fetchData()
        
    },[])
    return (
        <>
            <NavBar/>
            <div className="flex flex-col justify-center items-center ">
            
            <h1 className='text-xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white mb-5'>Your token in CW20 standard</h1>
            <div className="overflow-x-auto w-3/5">
                <table className="table-auto divide-y w-full mx-auto divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supply</th>
                            
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {tokens.map((token, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={token.imgUrl} alt={token.name} className="h-10 w-10 rounded-full" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{token.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{token.symbol}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{token.supply}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
        
    );
}

export default ListToken;   

