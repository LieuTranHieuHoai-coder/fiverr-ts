import React, { useState } from "react";
import "./featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleInputKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    if (input === "") return;
    navigate(`/gigs/${input}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          
          <div className="search">
            <div className="searchInput w-full">
              <img src="./img/search.png" alt="" />
              <input className="w-full"
                type="text"
                placeholder='Try "building mobil app"'
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}  
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
