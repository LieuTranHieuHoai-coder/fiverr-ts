import React, { useState, ChangeEvent, FormEvent } from "react";
import upload from "../../apis/apiUtil";
import "./register.scss";
import api from "../../apis/apiUtil";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  email: string;
  password: string;
  img: string;
  country: string;
  isSeller: boolean;
  desc: string;
}

function Register() {
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const uploadFile = async (file: File | null) => {
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await api.post("/upload", formData);
      return response.data.url;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const url = await uploadFile(file);
    try {
      await api.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files![0])} />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols={30}
            rows={10}
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;