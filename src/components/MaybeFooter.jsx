// React və hook-ları idxal edirik
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// Footer-in şərti göstərilməsini idarə edən komponent
const MaybeFooter = ({ children }) => {
    // Cari səhifənin route-nu alırıq
    const location = useLocation();

    // Footer-in görünüşünü idarə edən state
    const [showFooter, setShowFooter] = useState(false);

    // Route dəyişdikdə Footer-in görünməsini yoxlayırıq
    useEffect(() => {
        if (location.pathname === '/login' || 
            location.pathname === '/registration' || 
            location.pathname === '/textinput' || 
            location.pathname === '/loading' || 
            location.pathname === '/result' || 
            location.pathname === '/forgetpassword' ){
            setShowFooter(false)
        } else {
            setShowFooter(true)
        }
    }, [location])

    // Footer-in görünməsi şərtinə əsasən render edirik
    return (
        <div>
            {showFooter && children}
        </div>
    )
}

export default MaybeFooter