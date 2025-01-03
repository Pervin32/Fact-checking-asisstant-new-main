// React və lazımi hook-ları idxal edirik
import React, { useEffect, useState } from 'react'
// Cari route məlumatını almaq üçün hook idxal edirik
import { useLocation } from 'react-router-dom'

// Navbar-ın göstərilib-göstərilməməsini idarə edən komponent
const MaybeNavbar = ( {children} ) => {
    // Cari route-u əldə edirik
    const location = useLocation();
    
    // Navbar-ın görünməsini idarə edən state
    const [showNavbar, setShowNavbar] = useState(false)

    // Route dəyişdikdə Navbar-ın görünməsini yoxlayırıq
    useEffect(() => {
        // Müəyyən səhifələrdə Navbar-ı gizlədirik
        if (location.pathname === '/login' || 
            location.pathname === '/registration' || 
            location.pathname === '/textinput' || 
            location.pathname === '/loading' || 
            location.pathname === '/result' || 
            location.pathname === '/forgetpassword') {
            setShowNavbar(false)
        } else {
            // Digər səhifələrdə Navbar-ı göstəririk
            setShowNavbar(true)
        }
    }, [location]) // Route dəyişdikdə effekti yenidən işə salırıq

    // Navbar-ın görünməsi şərtindən asılı olaraq children-i render edirik
    return (
        <div>
            {showNavbar && children}
        </div>
    )
}

export default MaybeNavbar