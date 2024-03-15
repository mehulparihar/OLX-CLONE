import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from 'axios';

function Signup() {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    const [email, setemail] = useState('');
    const [mobile, setmobile] = useState('');
    const navigate = useNavigate();
    const handleApi = () => {
        if (username.length == 0 || password.length == 0 || email.length == 0 || mobile.length == 0) {
            alert('fill all the details');
            return;
        }
        if(password != cpassword) 
        {
            alert('Password not matching');
            return;
        }
        const url = "http://localhost:4000/signup";
        const data = { username, password, mobile, email };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('You Are Successfully Signup')
                    navigate('/login')
                }
            })
            .catch((err) => {
                alert('server err');
            })
    }
    return (
        <div>
            <Header />
            <div className="form-control" style={{ width: "600px", height: "650px", margin: "0 auto", marginTop: "100px" }} >


                <h3 style={{ fontWeight: "bold", textAlign: "center", marginTop: "30px" }}>Welcome To Signup Page</h3>
                <br />
                <h5>USERNAME</h5>
                <input className="form-control" type="text" value={username} onChange={(e) => {
                    setusername(e.target.value)
                }} required />
                <br />
                <h5>PHONE NO</h5>
                <input className="form-control" type="Number" value={mobile} onChange={(e) => {
                    setmobile(e.target.value)
                }} required />
                <br />
                <h5>EMAIL</h5>
                <input className="form-control" type="email" value={email} onChange={(e) => {
                    setemail(e.target.value)
                }} required />
                <br />
                <h5>PASSWORD</h5>
                <input className="form-control" type="password" value={password} onChange={(e) => {
                    setpassword(e.target.value)
                }} required />
                <br />
                <h5>CONFIRM PASSWORD</h5>
                <input className="form-control" type="password" value={cpassword} onChange={(e) => {
                    setcpassword(e.target.value)
                }} required />
                <br />
                <div style={{ float: "right", margin: "10px" }}>
                    <Link className="m-3" to="/login"> LOGIN </Link>
                    <button className="btn btn-primary" onClick={handleApi}> SIGNUP</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;