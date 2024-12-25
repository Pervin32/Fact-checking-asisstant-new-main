import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const MaybeNavbar = ( {children} ) => {


    
    const location = useLocation();

    const [showNavbar, setShowNavbar] = useState(false)

    useEffect(() => {
       

        if (location.pathname === '/login' || location.pathname === '/registration' || location.pathname === '/textinput' || location.pathname === '/loading' || location.pathname === '/result' | location.pathname === '/forgetpassword') {
            setShowNavbar(false)
        } else {
            setShowNavbar(true)
        }


    }, [location])
    return (
        <div>
            {showNavbar && children}
        </div>
    )
}

export default MaybeNavbar