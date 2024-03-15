import { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "./categoriesList";

function AddProduct() {
    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimage, setImage] = useState('');

    const url = 'http://localhost:4000/add-product';

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])


    const handleApi = () => {

        navigator.geolocation.getCurrentPosition((position) => {
            const formData = new FormData();
            formData.append('plat', position.coords.latitude)
            formData.append('plong', position.coords.longitude)
            formData.append('pname', pname)
            formData.append('pdesc', pdesc)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('pimage', pimage)
            formData.append('userId', localStorage.getItem('userId'))

            axios.post(url, formData)
                .then((res) => {
                    if (res.data.message) {
                        alert(res.data.message);
                        navigate('/');
                    }
                })
                .catch((err) => {
                    alert('server err');
                })
        });


    }
    return (
        <div>
            <Header />
            <div className="form-control" style={{ width: "600px", height: "650px", margin: "0 auto", marginTop: "100px" }}>
                <h2 style={{ fontWeight: "bold", textAlign: "center", marginTop: "30px" }}> POST YOUR AD </h2>
                <h5> Ad title *</h5>
                <input className="form-control" type="text" value={pname}
                    onChange={(e) => { setpname(e.target.value) }} required />
                <br />
                <h5> Description *</h5>
                <input className="form-control" type="text" value={pdesc}
                    onChange={(e) => { setdesc(e.target.value) }} required />
                <br />
                <h5> SET A PRICE</h5>
                <input className="form-control" type="Number" value={price}
                    onChange={(e) => { setprice(e.target.value) }} required />
                <br />
                <h5> Category</h5>
                <select className="form-control" value={category}
                    onChange={(e) => { setcategory(e.target.value) }}>
                    {
                        categories && categories.length > 0 &&
                        categories.map((item, index) => {
                            return (
                                <option key={'option' + index}> {item}</option>
                            )
                        })
                    }
                </select>
                <br />
                <h5> Upload Image</h5>
                <input className="form-control" type="file"
                    onChange={(e) => { setImage(e.target.files[0]) }} required />
                <div style={{marginTop : "20px"}}>
                    <button style={{ float: "right", margin: "20px" }} onClick={handleApi} className="btn btn-primary mt-3"> POST NOW</button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct;