import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const MaybeFooter = ({ children }) => {

    const location = useLocation();

    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {

        if (location.pathname === '/login' || location.pathname === '/registration' || location.pathname === '/textinput' || location.pathname === '/loading' || location.pathname === '/result' || location.pathname === '/forgetpassword' ){
            setShowFooter(false)
        } else {
            setShowFooter(true)
        }
    }, [location])

    return (
        <div>
            {showFooter && children}
        </div>
    )
}

export default MaybeFooter