import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { ThongTinNguoiDung } from "../../models/ThongTinNguoiDung";
import CatLink from "../catLink";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);
  const [isLogin, setLogin] = useState<boolean>(false);

  const [currentUser, setUser] = useState<ThongTinNguoiDung>(JSON.parse(localStorage.getItem("currentUser") ?? "null")); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.setItem("currentUser", 'null');
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setUser(()=> {
      if(localStorage.getItem("currentUser")){
        return JSON.parse(localStorage.getItem("currentUser") ?? "null");
      }
      return null;
    });
  }, []);
  
  useEffect(() => {
    handleLogin();
    setUser(()=> {
      if(localStorage.getItem("currentUser")){
        return JSON.parse(localStorage.getItem("currentUser") ?? "null");
      }
      return null;
    });
  }, [localStorage.getItem("currentUser")]);

  const handleLogin = () => {
    if (localStorage.getItem("currentUser") !== "null" && localStorage.getItem("currentUser") !== null) {
      setLogin(() => {
        return true;
      })
      return true;
    }
    else {
      setLogin(() => {
        return false;
      })
    }
  };


  return (
    <>
      <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>

        <div className="container">
          <div className="logo">
            <Link className="link" to="/">
              <span className="text">fiverr</span>
            </Link>
            <span className="dot">.</span>
          </div>
          <div className="links">
            <span>Fiverr Pro</span>
            <span>Explore</span>
            <span>English</span>
            {currentUser?.role === "User" ? <span>Become a Seller</span> : <span></span>}
            {isLogin ? (
              <div className="user" onClick={() => setOpen(!open)}>
                <img src={currentUser?.avatar || "/img/noavatar.jpg"} alt="" />
                <span className="text-lg text-danger">{currentUser?.name}</span>
                {open && (
                  <div className="options">
                    {currentUser && (
                      <>
                        <Link className="link" to="/myGigs">
                          Gigs
                        </Link>
                        <Link className="link" to="/add">
                          Add New Gig
                        </Link>
                      </>
                    )}
                    <Link className="link" to="/myprofile">
                      Profile
                    </Link>
                    <Link className="link" to="/orders">
                      Orders
                    </Link>
                    <Link className="link" to="/messages">
                      Messages
                    </Link>
                    <Link className="link" to="/" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="link">Sign in</Link>
                <Link className="link" to="/register">
                  <button>Join</button>
                </Link>
              </>
            )}
          </div>
        </div>
        {(active || pathname !== "/") && (
          <>
            <hr />
            
              <CatLink></CatLink>
            <hr />
          </>
        )}
      </div>
    </>

  );
}

export default Navbar;