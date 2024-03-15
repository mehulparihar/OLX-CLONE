import { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import categories from "./categoriesList";

function EditProduct() {
    const p = useParams();
    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimage, setImage] = useState('');
    const [poldimage, setoldImage] = useState('');

    

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])
    useEffect(() => {
        const url = 'http://localhost:4000/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                // console.log(res);
                if (res.data.product) {
                    let product = res.data.product;
                    setpname(product.pname);
                    setdesc(product.pdesc);
                    setprice(product.price);
                    setcategory(product.category)
                    setoldImage(product.pimage)
                }

            })
            .catch((err) => {
                alert('server err');
            })
    }, [])


    const handleApi = () => {

        const formData = new FormData();
        formData.append('pid', p.productId)
        formData.append('pname', pname)
        formData.append('pdesc', pdesc)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('pimage', pimage)
        formData.append('userId', localStorage.getItem('userId'))

        const url1 = 'http://localhost:4000/edit-product';
        axios.post(url1, formData)
            .then((res) => {
                // console.log(res);
                if (res.data.message) {
                    alert(res.data.message);
                    navigate('/my-products');
                }
            })
            .catch((err) => {
                alert('server err');
            })

    }
    return (
        <div>
            <Header />
            <div className="form-control" style={{ width: "600px", height: "700px", margin: "0 auto", marginTop: "100px" }}>
                <h2 style={{ fontWeight: "bold", textAlign: "center", marginTop: "30px" }}> EDIT YOUR AD </h2>
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
                <input style={{ width: "50%" }} className="form-control" type="file"
                    onChange={(e) => { setImage(e.target.files[0]) }} required />
                <img src={"http://localhost:4000/" + poldimage} alt="" width={150} height={70} />
                <div style={{ marginTop: "20px" }}>
                    <button style={{ float: "right", margin: "20px" }} onClick={handleApi} className="btn btn-primary mt-3"> POST NOW</button>
                </div>
            </div>
        </div>
    )
}

export default EditProduct;