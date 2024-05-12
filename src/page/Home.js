import * as React from 'react';
import Hero from '../components/Hero';
import Swap from '../components/Swap';
import Footer from '../components/Footer';
import AISupport from '../components/AISupport';


export default function Home() {
    return (
        <>
            <Hero/>
            <Swap/>
            <AISupport/>
            <Footer/>
        </>
    );
}