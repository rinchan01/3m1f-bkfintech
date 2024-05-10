import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import NavBar from "../components/NavBar";
const Pool = () =>{
    
    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex-col flex justify-center items-center">
                <div className=" flex items-center justify-between w-3/5 mb-5 mt-5">
                    <h1>Positions</h1>
                    <Link to="/add" className='bg-blue-200 hover:bg-blue-300 text-blue-600 font-bold py-2 px-4 rounded-lg'>New position</Link>
                </div>
                <div className='flex-col last:flex items-center justify-center h-80 w-3/5 border border-solid border-gray-300 rounded-lg p-4'>
                    <svg className="w-10 h-10 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                        <path stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                    </svg>
                    <p>
                        Your active V3 liquidity positions will appear here.
                    </p>
                    
                </div>
            </div>
        </div>
    )
}

export default Pool