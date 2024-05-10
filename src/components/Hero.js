import * as React from 'react';
import btc from '../assets/btc.png';
import eth from '../assets/eth.png';
import chart from '../assets/chart.png';
import NavBar from './NavBar';
import p2p from '../assets/PEER_TO_PEER.svg';

export default function Hero() {
    return (
        <>
            
            <section id='hero' class="bg-white dark:bg-gray-900 ">
                <NavBar />
                <div class="grid -mt-28 -mb-28 max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div class="mr-auto place-self-center lg:col-span-6">
                        <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Easily Manage Your Crypto Assets</h1>
                        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Buy, sell, convert and earn Crypto with our platform.</p>
                        <a href="#swap" >
                            <button type="button" class="bg-blue-200 text-blue-600 font-bold py-2 px-4 rounded-full flex items-center">Get started!</button>
                        </a>
                    </div>
                    <div class="ml-16 lg:col-span-5" style={{ width: '671.58px', height: '698.62px', position: 'relative' }}>
                        <img class="w-4/5 h-full" src={p2p} />
                    </div>
                </div>
            </section>
        </>
    );
}
