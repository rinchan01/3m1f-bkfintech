import * as React from 'react';
import { useState } from 'react';
import SwapContent from './swap-contents/SwapContent';
import SendContent from './swap-contents/SendContent';
import LimitContent from './swap-contents/LimitContent';


export default function Swap() {
    const [selectedTab, setSelectedTab] = useState('Swap');

    function handleTabClick(tabName) {
        setSelectedTab(tabName);
        
    } 


    return (
        <section id='swap'>
            <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div class=" lg:col-span-7 mr-20" >
                    <img class="w-3/4 h-full " src={"https://cdn3d.iconscout.com/3d/premium/thumb/bitcoin-to-ethereum-swap-5401593-4521525.png?f=webp"} />
                </div>
                <div class="mr-auto place-self-center lg:col-span-5 -mt-40 ">
                    <h1 class="max-w-4xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Buy & Trade On The Original Exchange</h1>
                    <p class="max-w-2xl mb-1 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"> Get even higher earning rates and our lowest borrowing rates.</p>
                    <ul class="flex flex-wrap font-bold text-sm text-center text-gray-500 dark:text-gray-400">
                        <li class="me-2">
                            <a onClick={() => handleTabClick('Swap')} className={`inline-block px-4 py-3 rounded-3xl ${selectedTab === 'Swap' ? 'text-white bg-purple-500' : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}`} aria-current="page">Swap</a>
                        </li>
                        <li class="me-2">
                            <a onClick={() => handleTabClick('Limit')} className={`inline-block px-4 py-3 rounded-3xl ${selectedTab === 'Limit' ? 'text-white bg-purple-500' : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}`}>Limit</a>
                        </li>
                        <li class="me-2">
                            <a onClick={() => handleTabClick('Send')} className={`inline-block px-4 py-3 rounded-3xl ${selectedTab === 'Send' ? 'text-white bg-purple-500' : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}`}>Send</a>
                        </li>
                        <li class="me-2">
                            <a onClick={() => handleTabClick('Buy')} className={`inline-block px-4 py-3 rounded-3xl ${selectedTab === 'Buy' ? 'text-white bg-purple-500' : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'}`}>Buy</a>
                        </li>
                        
                    </ul>
                    <div className='tab-content mt-5'>
                        {selectedTab === 'Swap' && <SwapContent />}
                        {selectedTab === 'Send' && <SendContent />}
                        {selectedTab === 'Limit' && <LimitContent/>}
                    </div>

                </div> 
                
                
            </div>
            
        </section>
    )
}
