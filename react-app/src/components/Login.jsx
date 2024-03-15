import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from 'axios';

function Login() {
    const navigate = useNavigate();

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = () => {

        const url = "http://localhost:4000/login";
        const data = { username, password };
        axios.post(url, data)
            .then((res) => {
                // console.log(res.data);
                if (res.data.message) {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('userId', res.data.userId)
                        navigate('/');
                    }
                    else{
                        alert('Username Incorrect');
                    }
                }
               
            })
            .catch((err) => {
                alert('server err');
            })
    }

    return (
        <div>
            <Header />
            <div className="form-control" style={{ width: "480px", height: "400px", margin: "0 auto", marginTop: "200px" }} >
                <h2 style={{ textAlign : "center", fontWeight : "bold", marginTop :"30px"}}>Welcome To Login Page</h2>
                <br />
                <h5>USERNAME</h5>
                <input className="form-control" type="text" value={username} onChange={(e) => {
                    setusername(e.target.value)
                }} required />
                <br />
                <h5>PASSWORD</h5>
                <input className="form-control" type="password" value={password} onChange={(e) => {
                    setpassword(e.target.value)
                }} required />
                <br />
                <div style={{float: "right", margin : "10px"}}>
                    <Link className="m-3" to="/signup"> SIGNUP </Link>
                    <button className="btn btn-primary" onClick={handleApi}> LOGIN</button>
                </div>
            </div>
        </div>
    )
}

export default Login;