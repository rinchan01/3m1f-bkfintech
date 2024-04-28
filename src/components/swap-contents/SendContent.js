import * as React from 'react'
import dai from '../../assets/dai-stablecoin.png';
import eth from '../../assets/eth-icon.png';
import wbtc from '../../assets/wbtc.png';
import usdc from '../../assets/usdc-icon.png';
import usdt from '../../assets/usdt-icon.png';

export default function BuyContent() {
    return (
        <>
            <form>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">You send</label>
                <div class="flex h-full">

                    <button id="dropdown-button" data-dropdown-toggle="coin" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-md font-xl text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type="button">
                        <img class="w-5 h-5 mr-4 rounded-full" src={eth} />
                        ETH
                        <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg></button>
                    <div id="coin" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul class="py-2 font-xl text-xl text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                                <img class="w-5 h-5 mr-4 rounded-full" src={wbtc} />
                                WBTC
                            </li>
                            <li>
                                <img class="w-5 h-5 mr-4 rounded-full" src={usdc} />
                                USDC
                            </li>
                            <li>
                                <img class="w-5 h-5 mr-4 rounded-full" src={usdt} />
                                USDT
                            </li>
                            <li>
                                <img class="w-5 h-5 mr-4 rounded-full" src={dai} />
                                DAI
                            </li>
                        </ul>
                    </div>
                    <div class="relative w-full">
                        <input type="input" id="search-dropdown" class="block p-2.5 w-1/2 z-20 text-xl text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="0" required />
                    </div>
                </div>
                <label class="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white">To</label>
                <div class="w-full">
                    <input type="input" class="p-2.5 w-3/4 text-xl text-gray-900 bg-gray-50 rounded-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Wallet address" required />
                </div>
            </form>

    
            <button type="button" class=" mt-5 w-40 text-white bg-gradient-to-br from-purple-500 to-blue-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">Send</button>

        </>
    )
}