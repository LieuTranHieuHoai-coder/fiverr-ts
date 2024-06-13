import { PlusOutlined } from "@ant-design/icons";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  Input,
  Radio,
  Upload,
} from "antd";
import { authSignUp } from "../../apis/apiAuth";
import { ThongTinNguoiDung } from "../../models/ThongTinNguoiDung";
import dayjs from "dayjs";

function Register() {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ThongTinNguoiDung>();
  const navigate = useNavigate();

  const onSubmit = async (data: ThongTinNguoiDung) => {
    try {
      const res = await authSignUp(data);
      localStorage.setItem("currentUser", JSON.stringify(res.user));
      navigate("/login");
    } catch (err: any) {
      console.error(err);
    }
  };

  const validateBirthday = (value: string | undefined) => {
    const today = dayjs();
    const birthdate = dayjs(value);

    // Check if the birthday is a valid date
    if (!birthdate.isValid()) {
      return "Invalid birthday";
    }

    // Check if the birthday is in the future
    if (birthdate.isAfter(today)) {
      return "Birthday cannot be in the future";
    }

    // Check if the person is at least 18 years old
    const age = today.diff(birthdate, "year");
    if (age < 18) {
      return "You must be at least 18 years old to register";
    }

    // Birthday is valid
    return true;
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="left">
          <label htmlFor="username">Username:</label>
          <input
              id="username"
              {...register("name", { required: "Username is required" })}
            />
          {errors.name && <p className="text-danger font-bold">{errors.name.message}</p>}
          <label htmlFor="email">Email:</label>
          <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          {errors.email && <p className="text-danger font-bold">{errors.email.message}</p>}
          <label htmlFor="phone">Phone Number:</label>
          <input
              type="number"
              id="phone"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value:
                    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                  message: "Invalid phone number",
                },
              })}
            />
          {errors.phone && <p className="text-danger font-bold">{errors.phone.message}</p>}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
              },
            })}
          />
          {errors.password && <p className="text-danger font-bold">{errors.password.message}</p>}
        </div>

        <div className="right">
          <label htmlFor="birthday">Birthday:</label>
          <input
              type="date"
              id="birthday"
              {...register("birthday", {
                required: "Birthday is required",
                validate: validateBirthday,
              })}
            />
          {errors.birthday && <p className="text-danger font-bold">{errors.birthday.message}</p>}
          <label htmlFor="role">Role:</label>
          <input
              type="text"
              id="role"
              {...register("role", {
                required: "Role is required",
              })}
            />
          {errors.role && <p className="text-danger font-bold">{errors.role.message}</p>}
          <label htmlFor="role">Gender:</label>
          <Radio.Group
              id="gender"
              {...register("role", {
                required: "Gender is required",
              })}
            >
              <Radio value="true"> Male </Radio>
              <Radio value="false"> Female </Radio>
            </Radio.Group>
          {errors.gender && <p className="text-danger font-bold">{errors.gender.message}</p>}
          <label htmlFor="role">Avatar:</label>
          <Form.Item valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Avatar</div>
              </button>
            </Upload>
          </Form.Item>

          <button
            type="submit"
            className="inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-success-3 transition duration-150 ease-in-out hover:bg-success-accent-300 hover:shadow-success-2 focus:bg-success-accent-300 focus:shadow-success-2 focus:outline-none focus:ring-0 active:bg-success-600 active:shadow-success-2 motion-reduce:transition-none"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
