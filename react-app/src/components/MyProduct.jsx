import { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from 'react-icons/fa';
import './Home.css'

function MyProduct() {
    const navigate = useNavigate();
    const [likedproducts, setlikedproducts] = useState([]);
    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');
    const [refresh, setrefresh] = useState(false);
    const [issearch, setissearch] = useState(false);


    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login')
    //     }
    // }, [])

    useEffect(() => {
        const url = 'http://localhost:4000/my-products';
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }

            })
            .catch((err) => {
                alert('server err');
            })
        const url2 = 'http://localhost:4000/liked-products';
        let data1 = { userId: localStorage.getItem('userId') }
        axios.post(url2, data1)
            .then((res) => {
                if (res.data.products) {
                    // console.log(res.data.products);
                    setlikedproducts(res.data.products);
                }

            })
            .catch((err) => {
                alert('server err');
            })
    }, [refresh])

    const handlesearch = (value) => {
        setsearch(value);
    }
    const handleClick = () => {
        // let filteredProducts = products.filter((item) => {
        //     if (item.pname.toLowerCase().includes(search.toLowerCase()) || item.pdesc.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())) {
        //         return item;
        //     }
        // });
        // setcproducts(filteredProducts);
        const url = 'http://localhost:4000/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');
        axios.get(url)
            .then((res) => {
                setcproducts(res.data.products);
                setissearch(true);
            })
            .catch((err) => {
                alert('server err');
            })
    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item) => {
            if (item.category == value) {
                return item;
            }
        });
        setcproducts(filteredProducts);
    }

    const handleLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');
        const url = 'http://localhost:4000/like-product';
        const data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                // console.log(res);
                if (res.data.message) {
                    // alert('liked');
                    setrefresh(!refresh);
                }
            })
            .catch((err) => {
                alert('serveLikedProductsr err');
            })
    }

    const handleDisLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');
        if (!userId) {
            alert('LOGIN IN')
            return;
        }
        const url = 'http://localhost:4000/dislike-product';
        const data = { userId, productId }
        axios.post(url, data)
            .then((res) => {
                // console.log(res);
                if (res.data.message) {
                    // alert('liked');
                    setrefresh(!refresh);
                }
            })
            .catch((err) => {
                alert('server err');
            })
    }

    const handleDel = (pid, e) => {
        e.stopPropagation();
        if (!localStorage.getItem('userId')) {
            alert('login in');
            return;
        }
        const url = 'http://localhost:4000/delete-product'
        const data = {
            pid,
            userId: localStorage.getItem('userId')
        }
        axios.post(url, data)
            .then((res) => {
                // console.log(res);
                if (res.data.message) {
                    alert('delete');
                    setrefresh(!refresh);
                }
            })
            .catch((err) => {
                alert('err');
            })
    }

    const handleProduct = (id) => {
        navigate('/product/' + id)
    }

    const handleEdit = (id, e) => {
        e.stopPropagation();
    }
    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />
            <div className="d-flex justify-content-center flex-wrap">
                {cproducts && cproducts.length > 0 &&
                    cproducts.map((item, index) => {
                        return (
                            <div style={{ cursor: "pointer" }} key={item._id}  width='300px' height='200px' onClick={() => handleProduct(item._id)} className="card m-3">
                                <div className="icon-con">
                                    {
                                        likedproducts.find((likedItem) => likedItem._id == item._id) ?
                                            <FaHeart onClick={(e) => handleDisLike(item._id, e)} className="red-icons" /> :
                                            <FaHeart onClick={(e) => handleLike(item._id, e)} className="icons" />
                                    }
                                </div>
                                <img width='300px' height='200px' src={'http://localhost:4000/' + item.pimage} />
                                <h3 className="m-2 price-text"> {item.price} </h3>
                                <p className="m-2" style={{width : "280px"}}> {item.pname}</p>
                                <h5 className="m-2">{item.category}</h5>
                            </div>
                        )
                    })}
            </div>
            <div className="d-flex justify-content-center flex-wrap grid-container">
                {products && products.length > 0 &&
                    products.map((item, index) => {
                        return (
                            <div style={{ cursor: "pointer"}}  width='300px' height='200px' key={item._id} onClick={() => handleProduct(item._id)} className="card m-3">
                                <div className="icon-con">
                                    {
                                        likedproducts.find((likedItem) => likedItem._id == item._id) ?
                                            <FaHeart onClick={(e) => handleDisLike(item._id, e)} className="red-icons" /> :
                                            <FaHeart onClick={(e) => handleLike(item._id, e)} className="icons" />
                                    }
                                </div>
                                <img width='300px' height='200px' src={'http://localhost:4000/' + item.pimage} />
                                <h3 className="m-2 price-text"> {item.price} </h3>
                                <p className="m-2" style={{width : "280px"}}> {item.pname}</p>
                                <h5 className="m-2">{item.category}</h5>
                                <div style={{display : "flex", marginTop : "15px", bottom : 0, position : "relative"}}>
                                    <p onClick={(e) => handleEdit(item._id, e)}>
                                        <Link style = {{ fontSize : "20px", color : "black", margin : "15px", width : "100%", height : "100%"}}  to={`/edit-product/${item._id}`}> Edit Your Ad</Link>
                                    </p>
                                    <button  className="ediDel" onClick={(e) => handleDel(item._id, e)}>DELETE AD</button>
                                </div>

                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default MyProduct;