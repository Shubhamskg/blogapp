import React ,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [file, setFile] = useState(null);
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      const res =await axios.post("/auth/register", {
        username:inputs.username,
        email:inputs.email,
        password:inputs.password,
        img:file ? imgUrl : "",
      });
      console.log(res);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
