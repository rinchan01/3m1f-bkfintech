import * as React from 'react';
import btc from '../assets/btc.png';
import eth from '../assets/eth.png';
import chart from '../assets/chart.png';
import NavBar from './NavBar';

export default function Hero() {
    return (
        <>
            
            <section id='hero' class="bg-white dark:bg-gray-900 ">
                <NavBar />
                <div class="grid max-w-screen-xl px-4 py-8 mx-auto -mt-14 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div class="mr-auto place-self-center lg:col-span-6">
                        <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Easily Manage Your Crypto Assets</h1>
                        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Buy, sell, convert and earn Crypto with our platform.</p>
                        <a href="#swap" >
                            <button type="button" class="text-white bg-gradient-to-r from-purple-500 to-blue-300 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-2xl px-5 py-3 text-center me-2 mb-2">Get started!</button>
                        </a>
                    </div>
                    <div class="ml-auto lg:col-span-5" style={{ width: '671.58px', height: '698.62px', position: 'relative' }}>
                        <img style={{ width: '574px', height: '574px', left: '97.58px', top: '101.58px', position: 'absolute' }} src={chart} />
                        <div style={{ width: '256.38px', height: '256.38px', left: '289.25px', top: '442.25px', position: 'absolute' }}>
                            <img style={{ width: '242px', height: '242px', left: '14.83px', top: '0', position: 'absolute', transform: 'rotate(3.51deg)' }} src={eth} />
                        </div>
                        <img style={{ width: '320.36px', height: '320.36px', left: '73.53px', top: '0', position: 'absolute', transform: 'rotate(13.27deg)' }} src={btc} />
                    </div>
                </div>
            </section>
        </>
    );
}
