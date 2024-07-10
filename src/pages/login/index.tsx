import React, { useState } from "react";
import "./login.scss";
import { authSignIn } from "../../apis/apiAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
}
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    //e.preventDefault();
    try {
      const res = await authSignIn({
        email: data.email,
        password: data.password,
      });
      
      if (res.user.role === "ADMIN" || res.user.role === "admin") {
        localStorage.setItem("currentUser", JSON.stringify(res.user));
        localStorage.setItem("user", JSON.stringify(res));
        navigate("/admin/loai-cong-viec");
      }
      else
      {
        localStorage.setItem("currentUser", JSON.stringify(res.user));
        localStorage.setItem("user", "");
        navigate("/");
      }
      
    } catch (err: any) {
      setLoginError('Invalid email or password');
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-bold text-center">Sign in</h1>
        {loginError && <p className="text-danger text-bold text-lg">{loginError}</p>}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className="text-danger font-bold">{errors.email.message}</p>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 4,
              message: 'Password must be at least 4 characters long',
            },
            // pattern: {
            //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            //   message:
            //     'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            // },
          })}
        />
        {errors.password && <p className="text-danger font-bold">{errors.password.message}</p>}
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
