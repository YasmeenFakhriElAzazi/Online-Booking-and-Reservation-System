import "./Navbar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Signup from "../../Signup/Signup";
import Signin from "../../Signin/Signin";
import Contact from "../Contact Us/Contact";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
    const [suButtonPopup, setSuButtonPopup] = useState(false);
    const [siButtonPopup, setSiButtonPopup] = useState(false);
    const [contactPopup, setContactPopup] = useState(false);
    const isPopupOpen = suButtonPopup || siButtonPopup || contactPopup;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        setIsDropdownOpen(false);
        navigate('/'); 
        toast.success('Successfully signed out!');
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/">
                        <p className="welcome">Welcome&nbsp;to</p>
                        <p className="tbooky">Table<strong>Booky</strong></p>
                    </Link>
                </div>
                {role && (
                   <div className="menu-icon" onClick={toggleDropdown}>
                       {isDropdownOpen ? <FaTimes /> : <FaBars />} 
                   </div>
                )}
                
            <ul className="nav-links">
                {role === 'user' && (
                    <>
                        <li className="nav-link"><Link to="/">Home</Link></li>
                        <li className="nav-link"><Link to="/reservation">Reservations</Link></li>
                        <li className="nav-link"><Link to="/" 
                           onClick={() => setContactPopup(true) }>
                             Contact Us</Link>
                        </li>
                        <li className="nav-link" onClick={handleLogout}><Link to="/">Sign Out</Link></li>
                        <div className="vertical-line"></div>
                        <div className="user-info user-role">
                            <p className="profile"><Link to='/profile'><FaUser /> {role}</Link></p>
                        </div>
                    </>
                )}
                {role === 'manager' && (
                    <>
                        <li className="nav-link"><Link to="/admin/reservationsTable">Manager Dashboard</Link></li>
                        <li className="nav-link"><Link to="/" 
                           onClick={() => setContactPopup(true) }>
                             Contact Us</Link>
                        </li>
                        <li className="nav-link" onClick={handleLogout}><Link to="/">Sign Out</Link></li>
                        <div className="vertical-line"></div>
                        <div className="user-info user-role">
                        <p className="profile"><Link to='/profile'><FaUser /> {role}</Link></p>
                        </div>
                    </>
                )}
                {role === 'admin' && (
                    <>
                        <li className="nav-link"><Link to="/superAdmin">Admin Dashboard</Link></li>
                        <li className="nav-link"><Link to="/" 
                           onClick={() => setContactPopup(true) }>
                             Contact Us</Link>
                        </li>
                        <li className="nav-link" onClick={handleLogout}><Link to="/">Sign Out</Link></li>
                        <div className="vertical-line"></div>
                        <div className="user-info user-role">
                        <p className="profile"><Link to='/profile'><FaUser /> {role}</Link></p>
                        </div>
                    </>
                 )}
            </ul>

            {isDropdownOpen && (
                <ul className="dropdown-menu">
                    {role === 'user' && (
                        <>
                            <li onClick={toggleDropdown}><Link to="/profile">Your Profile</Link></li>
                            <li onClick={toggleDropdown}><Link to="/">Home</Link></li>
                            <li onClick={toggleDropdown}><Link to="/reservation">Reservations</Link></li>
                            <li onClick={toggleDropdown}><Link to="/" 
                               onClick={() => setContactPopup(true) }>
                                 Contact Us</Link>
                            </li>
                            <li onClick={handleLogout}><Link to="/">Sign Out</Link></li>
                        </>
                    )}
                    {role === 'manager' && (
                        <>
                            <li onClick={toggleDropdown}><Link to="/profile">Your Profile</Link></li>
                            <li onClick={toggleDropdown}><Link to="/admin/reservationsTable">Manager Dashboard</Link></li>
                            <li onClick={toggleDropdown}><Link to="/" 
                               onClick={() => setContactPopup(true) }>
                                 Contact Us</Link>
                            </li>
                            <li onClick={handleLogout}><Link to="/">Sign Out</Link></li>
                        </>
                    )}
                    {role === 'admin' && (
                        <>
                            <li onClick={toggleDropdown}><Link to="/profile">Your Profile</Link></li>
                            <li onClick={toggleDropdown}><Link to="/superAdmin">Admin Dashboard</Link></li>
                            <li onClick={toggleDropdown}><Link to="/" 
                               onClick={() => setContactPopup(true) }>
                                 Contact Us</Link>
                            </li>
                            <li onClick={handleLogout}><Link to="/">Sign Out</Link></li>
                        </>
                    )}
                </ul>
              )}
                    
                    {!role && (

                        <div className="nav-btns">
                            <button className="nav-btn signin-btn"
                                onClick={() => {
                                    setSiButtonPopup(true);
                                    setContactPopup(false);
                                    setSuButtonPopup(false);
                                }}>
                                <Link to="/">Sign In</Link>
                            </button>
                            <button className="nav-btn signup-btn"
                                onClick={() => {
                                    setSuButtonPopup(true);
                                    setContactPopup(false);
                                    setSiButtonPopup(false);
                                }}>
                                <Link to="/">Sign Up</Link>
                            </button>
                        </div>
                    )}
                
            </nav>

            <Contact trigger={contactPopup} closeModal={() => setContactPopup(false)} />

            <Signup trigger={suButtonPopup} closeModal={() => setSuButtonPopup(false)}
                openSigninPopup={() => {
                    setSiButtonPopup(true);
                    setSuButtonPopup(false);
                }}
            />

            <Signin trigger={siButtonPopup} closeModal={() => setSiButtonPopup(false)}
                openSignupPopup={() => {
                    setSuButtonPopup(true);
                    setSiButtonPopup(false);
                }}
            />

            <div className={`main-content ${isPopupOpen ? "blurred" : ""}`}>
                <Outlet />
            </div>
        </>
    );
}

export default Navbar;
