import { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from 'react-icons/fa';
import './Home.css'

function CategoryPage() {
    const navigate = useNavigate();

    const param = useParams();
    // console.log(param);
    const [products, setproducts] = useState([]);
    const [refresh, setrefresh] = useState(false);
    const [likedproducts, setlikedproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');
    const [issearch, setissearch] = useState(false);

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login')
    //     }
    // }, [])

    useEffect(() => {
        // const url = 'http://localhost:4000/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');

        const url = 'http://localhost:4000/get-products?catName=' + param.catName;
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    // console.log(res.data.products);
                    setproducts(res.data.products);
                }

            })
            .catch((err) => {
                alert('server err');
            })
        const url2 = 'http://localhost:4000/liked-products';
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url2, data)
            .then((res) => {
                if (res.data.products) {
                    // console.log(res.data.products);
                    setlikedproducts(res.data.products);
                }

            })
            .catch((err) => {
                alert('server err');
            })
    }, [param, refresh])

    const handlesearch = (value) => {
        setsearch(value);
    }
    const handleClick = () => {
        const url = 'http://localhost:4000/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');
        axios.get(url)
            .then((res) => {
                setcproducts(res.data.products);
                setissearch(true);
            })
            .catch((err) => {
                alert('server err');
            })
        // let filteredProducts = products.filter((item) => {
        //     if (item.pname.toLowerCase().includes(search.toLowerCase()) || item.pdesc.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())) {
        //         return item;
        //     }
        // });
        // setcproducts(filteredProducts);
    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
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
                alert('server err');
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


    const handleProduct = (id) => {
        navigate('/product/' + id)
    }
    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />
            {issearch && cproducts && <h5>SEARCH RESULT
                <button className="clear-btn" onClick={() => setissearch(false)}>CLEAR</button>
            </h5>}
            {issearch && cproducts && cproducts.length == 0 && <h5>No Result Found</h5>}
            {issearch && <div className="d-flex justify-content-center flex-wrap grid-container">
                {cproducts && cproducts.length > 0 &&
                    cproducts.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3">
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
                                {/* <p className="m-2 text-success"> {item.pdesc}</p> */}
                            </div>
                        )
                    })}
            </div>}

            {!issearch && <div className="d-flex justify-content-center flex-wrap grid-container">
                {products && products.length > 0 &&
                    products.map((item, index) => {
                        return (
                            <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
                                <div className="icon-con">
                                    {
                                        likedproducts.find((likedItem) => likedItem._id == item._id) ?
                                            <FaHeart onClick={(e) => handleDisLike(item._id, e)} className="red-icons" /> :
                                            <FaHeart onClick={(e) => handleLike(item._id, e)} className="icons" />
                                    }
                                </div>
                                <img width='300px' height='200px' src={'http://localhost:4000/' + item.pimage} />
                                <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
                                <p className="m-2" style={{width : "280px"}}> {item.pname}</p>
                                <h5 className="m-2">{item.category}</h5>
                                {/* <p className="m-2 text-success"> {item.pdesc}</p> */}
                            </div>
                        )
                    })}
            </div>}
        </div>
    )
}

export default CategoryPage;