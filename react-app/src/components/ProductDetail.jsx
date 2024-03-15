import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { FaRupeeSign } from "react-icons/fa";


function ProductDetail() {
    const p = useParams();
    const [product, setproduct] = useState();
    const [user, setuser] = useState();
    // console.log(user);
    useEffect(() => {
        const url = 'http://localhost:4000/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                // console.log(res);
                if (res.data.product) {
                    // console.log(res);
                    setproduct(res.data.product)
                }

            })
            .catch((err) => {
                alert('server err');
            })
    }, [])
    const handleContact = (addedBy) => {
        // console.log('id', addedBy)
        const url = 'http://localhost:4000/get-user/' + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setuser(res.data.user)
                }

            })
            .catch((err) => {
                alert('server err');
            })
    }
    return (
        <div>
            <Header />
            <div style={{ display: "flex" }}>
                {product && <div className="d-flex justify-content-between flex-wrap">
                    <div class="card" style={{ marginTop: "70px", marginLeft: "280px" }}>
                        <img width="900px" height="550px" src={"http://localhost:4000/" + product.pimage} alt="" />
                        <h3 style={{ fontWeight: "bold", margin: "20px" }}> Description </h3>
                        <hr />
                        <div style={{width : "400px"}}>
                            <p style={{ margin: "20px" }}>{product.pdesc}</p>
                        </div>
                    </div>
                    <div className="card" style={{ marginTop: "70px", width: "400px" }}>
                        <div style={{ width: "300px", margin: "20px" }} >

                            <h3 className="m-2 price-text"> <FaRupeeSign /> {product.price} /- </h3>
                            <hr />
                            <p className="m-2"> {product.pname} | {product.category}</p>
                            {product.addedBy && <button className="btn btn-secondary" style={{ width: "300px", margin: "5px", marginTop: "50px" }} onClick={() => handleContact(product.addedBy)}>
                                SHOW CONTACT DETAILS </button>}
                            {user && <div className="card">
                               {user && user.username && <h5> Name :  {user.username} </h5>}
                                <hr />
                                {user && user.mobile && <h5>Phone :  {user.mobile} </h5>}
                                <hr />
                                {user && user.email && <h5> Email : {user.email} </h5>}
                            </div>}
                        </div>

                    </div>
                </div>}
            </div>
        </div>
    )
}

export default ProductDetail;