import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { SlOptionsVertical } from 'react-icons/sl';
import CommonNav from './CommonNav';
import MobileCommonNav from './MobileCommonNav';


function Nav() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 700);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='bg-slate-100 h-[60px] flex justify-between items-center px-3 relative'>
            <Logo />
            {isMobile ? (
                <div className='relative'>
                    <SlOptionsVertical onClick={() => setShowSidebar(!showSidebar)} />
                    <MobileCommonNav showSidebar={showSidebar} />
                </div>
            ) : (
                <CommonNav />
            )}
        </div>
    );
}

export default Nav;
