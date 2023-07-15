import React,{ useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
const Profile = () => {
  const [file, setFile] = useState(null);
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("https://blogapp-ma64.onrender.com/api/upload", formData);
      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { update,deleted } = useContext(AuthContext);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
        const res = await update({
          username:inputs.username,
          email:inputs.email,
          password:inputs.password,
          img:file ? imgUrl : "",
        });
        
      console.log(res);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
        await deleted();
        navigate("/");
        } catch (err) {
        console.log(err);
        }
    };

  return (
    <div className="auth">
      <h1>Profile Update</h1>
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
        <button onClick={handleSubmit}>Update Profile</button>
        {err && <p>{err}</p>}
        <span>
          Want to delete your account? <button className="delete" onClick={handleDelete}>Delete Account</button>
        </span>
      </form>
    </div>
  );
};

export default Profile;
