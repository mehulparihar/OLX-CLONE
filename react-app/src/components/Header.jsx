import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { CgProfile } from "react-icons/cg";

function Header(props) {
    const [loc, setloc] = useState(null);
    const [showOver, setshowOver] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login')
    }
    let location = [
        {
            "latitude": 0,
            "longitude": 0,
            "placeName": "Select Your Location"
        },
        {
            "latitude": 28.6139,
            "longitude": 77.2090,
            "placeName": "New Delhi, Delhi"
        },
        {
            "latitude": 19.0760,
            "longitude": 72.8777,
            "placeName": "Mumbai, Maharashtra"
        },
        {
            "placeName": "Jaipur, India",
            "latitude": 26.907524,
            "longitude": 75.739639
        },
        {
            "placeName": "Nanjangud, Mysore, Karnataka, India",
            "latitude": 12.12,
            "longitude": 76.68
        },
        {
            "placeName": "Chittorgarh, Rajasthan, India",
            "latitude": 24.879999,
            "longitude": 74.629997
        },
        {
            "placeName": "Ratnagiri, Maharashtra, India",
            "latitude": 16.994444,
            "longitude": 73.300003
        },
        {
            "placeName": "Goregaon, Mumbai, Maharashtra, India",
            "latitude": 19.155001,
            "longitude": 72.849998
        },
        {
            "placeName": "Pindwara, Rajasthan, India",
            "latitude": 24.7945,
            "longitude": 73.055
        },
        {
            "placeName": "Raipur, Chhattisgarh, India",
            "latitude": 21.25,
            "longitude": 81.629997
        },
        {
            "placeName": "Gokak, Karnataka, India",
            "latitude": 16.1667,
            "longitude": 74.833298
        },
        {
            "placeName": "Lucknow, Uttar Pradesh, India",
            "latitude": 26.85,
            "longitude": 80.949997
        },
        {
            "placeName": "Delhi, India",
            "latitude": 28.679079,
            "longitude": 77.06971
        },
        {
            "placeName": "Mumbai, Maharashtra, India",
            "latitude": 19.07609,
            "longitude": 72.877426
        },
        {
            "placeName": "Sagar, Karnataka, India",
            "latitude": 14.16704,
            "longitude": 75.040298
        },
        {
            "placeName": "Jalpaiguri, West Bengal, India",
            "latitude": 26.540457,
            "longitude": 88.719391
        },
        {
            "placeName": "Pakur, Jharkhand, India",
            "latitude": 24.633568,
            "longitude": 87.849251
        },
        {
            "placeName": "Sardarshahar, Rajasthan, India",
            "latitude": 28.440554,
            "longitude": 74.493011
        },
        {
            "placeName": "Sirohi, Rajasthan, India",
            "latitude": 24.882618,
            "longitude": 72.858894
        },
        {
            "placeName": "Jaysingpur, Maharashtra, India",
            "latitude": 16.779877,
            "longitude": 74.556374
        },
        {
            "placeName": "Ramanagara, Karnataka, India",
            "latitude": 12.715035,
            "longitude": 77.281296
        },
        {
            "placeName": "Chikkaballapura, Karnataka, India",
            "latitude": 13.432515,
            "longitude": 77.727478
        },
        {
            "placeName": "Channapatna, Karnataka, India",
            "latitude": 12.651805,
            "longitude": 77.208946
        },
        {
            "placeName": "Surendranagar, Gujarat, India",
            "latitude": 22.728392,
            "longitude": 71.637077
        },
        {
            "placeName": "Thiruvalla, Kerala, India",
            "latitude": 9.383452,
            "longitude": 76.574059
        },
        {
            "placeName": "Ranebennur, Karnataka, India",
            "latitude": 14.623801,
            "longitude": 75.621788
        },
        {
            "placeName": "Karaikal, Puducherry, India",
            "latitude": 10.92544,
            "longitude": 79.838005
        },
        {
            "placeName": "Belgaum, Karnataka, India",
            "latitude": 15.852792,
            "longitude": 74.498703
        },
        {
            "placeName": "Chatrapur, Odisha, India",
            "latitude": 19.354979,
            "longitude": 84.986732
        },
        {
            "placeName": "Suri, West Bengal, India",
            "latitude": 23.905445,
            "longitude": 87.52462
        },
        {
            "placeName": "Bhubaneswar, Odisha, India",
            "latitude": 20.296059,
            "longitude": 85.824539
        },
        {
            "placeName": "Mahuva, Gujarat, India",
            "latitude": 21.105001,
            "longitude": 71.771645
        },
        {
            "placeName": "Jagadhri, Haryana, India",
            "latitude": 30.172716,
            "longitude": 77.299492
        },
        {
            "placeName": "Barh, Bihar, India",
            "latitude": 25.477585,
            "longitude": 85.709091
        },
        {
            "placeName": "Bhusawal, Maharashtra, India",
            "latitude": 21.045521,
            "longitude": 75.801094
        },
        {
            "placeName": "Alipurduar, West Bengal, India",
            "latitude": 26.49189,
            "longitude": 89.5271
        },
        {
            "placeName": "Kollam, Kerala, India",
            "latitude": 8.893212,
            "longitude": 76.614143
        },
        {
            "placeName": "Medinipur, West Bengal, India",
            "latitude": 22.430889,
            "longitude": 87.321487
        },
        {
            "placeName": "Patan, Gujarat, India",
            "latitude": 23.849325,
            "longitude": 72.126625
        },
        {
            "placeName": "Mettur, Tamil Nadu, India",
            "latitude": 11.786253,
            "longitude": 77.800781
        },
        {
            "placeName": "Huliyar, Karnataka, India",
            "latitude": 13.583274,
            "longitude": 76.540154
        },
        {
            "placeName": "Harihar, Karnataka, India",
            "latitude": 14.530457,
            "longitude": 75.801094
        },
        {
            "placeName": "Rasayani, Maharashtra, India",
            "latitude": 18.901457,
            "longitude": 73.176132
        },
        {
            "placeName": "Haringhata, West Bengal, India",
            "latitude": 22.96051,
            "longitude": 88.567406
        },
        {
            "placeName": "Kushtagi, Karnataka, India",
            "latitude": 15.756595,
            "longitude": 76.192696
        },
        {
            "placeName": "Jadugora, Jharkhand, India",
            "latitude": 22.656015,
            "longitude": 86.352882
        },
        {
            "placeName": "Orai, Uttar Pradesh, India",
            "latitude": 25.989836,
            "longitude": 79.450035
        },
        {
            "placeName": "Surajpur, Chhattisgarh, India",
            "latitude": 23.223047,
            "longitude": 82.87056
        },
        {
            "placeName": "Ambernath, Maharashtra, India",
            "latitude": 19.186354,
            "longitude": 73.191948
        },
        {
            "placeName": "Malerkotla, Punjab, India",
            "latitude": 30.525005,
            "longitude": 75.890121
        },
        {
            "placeName": "Jorapokhar, Jharkhand, India",
            "latitude": 22.422455,
            "longitude": 85.760651
        },
        {
            "placeName": "Vizianagaram, Andhra Pradesh, India",
            "latitude": 18.106659,
            "longitude": 83.395554
        },
        {
            "placeName": "Durg, Chhattisgarh, India",
            "latitude": 21.190449,
            "longitude": 81.28492
        },
        {
            "placeName": "Himmatnagar, Gujarat, India",
            "latitude": 23.597969,
            "longitude": 72.969818
        },
        {
            "placeName": "Sambhal, Uttar Pradesh, India",
            "latitude": 28.590361,
            "longitude": 78.571762
        },
        {
            "placeName": "Harnaut, Bihar, India",
            "latitude": 25.369179,
            "longitude": 85.53006
        },
        {
            "placeName": "Port Blair, Andaman and Nicobar Islands, India",
            "latitude": 11.623377,
            "longitude": 92.726486
        },
        {
            "placeName": "Suti, West Bengal, India",
            "latitude": 24.618393,
            "longitude": 88.024338
        },
        {
            "placeName": "Banswara, Rajasthan, India",
            "latitude": 23.546757,
            "longitude": 74.43383
        },
        {
            "placeName": "Batumi, Adjara, Georgia",
            "latitude": 41.643414,
            "longitude": 41.6399
        },
        {
            "placeName": "Manikchak, West Bengal, India",
            "latitude": 25.077787,
            "longitude": 87.900375
        },
        {
            "placeName": "Roorkee, Uttarakhand, India",
            "latitude": 29.854263,
            "longitude": 77.888
        },
        {
            "placeName": "Kavali, Andhra Pradesh, India",
            "latitude": 14.913181,
            "longitude": 79.992981
        }
    ]

    return (
        <div className='header-container d-flex justify-content-between'>
            <div className="header">
                <Link className='links' to="/"> OLX </Link>
                <select className="form-select selectLoc" value={loc} onChange={(e) => {
                    localStorage.setItem('userLoc', e.target.value);
                    setloc(e.target.value);
                }}>
                    {
                        location.map((item, index) => {
                            return (
                                <option value={`${item.latitude}, ${item.longitude}`}> {item.placeName}</option>
                            )
                        })
                    }
                </select>
                <input className="search" type="text" value={props && props.search}
                    onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)} />
                <button className='search-btn' onClick={() => props.handleClick && props.handleClick()}> <FaSearch /> </button>
            </div>
            <div>

                <div style={{ display: "flex" }}>
                    <div style={{ margin: "3px" }}>
                        {!!localStorage.getItem('token') && <Link to="/add-product"> <button className="logout-btn" >SELL</button></Link>}
                    </div>



                    <div onClick={() => { setshowOver(!showOver) }}
                        style={{
                            display: "flex", justifyContent: "center"
                            , alignItems: "center", background: "#002f34", width: "40px", height: "40px"
                            , borderRadius: "50%", color: "#fff", fontSize: "40px", marginLeft : "10px"

                        }}>
                        
                        <CgProfile style={{cursor : "pointer"}}/>
                    </div>

                    {showOver && <div style={{
                        minHeight: "100px",
                        width: "200px",
                        background: "#002f34",
                        position: "absolute",
                        top: "0",
                        right: "0",
                        zIndex: 1,
                        marginTop: "50px",
                        marginRight: "50px",
                        color: "red",
                        fontSize: "14px",
                        borderRadius: "7px",

                    }}>
                        <div>
                            {!!localStorage.getItem('token') && <Link to="/my-profile"> <button className="logout-btn" >MY PROFILE</button></Link>}
                        </div>
                        <div>
                            {!!localStorage.getItem('token') && <Link to="/liked-products"> <button className="logout-btn" >FAVOURITES</button></Link>}
                        </div>
                        <div>
                            {!!localStorage.getItem('token') && <Link to="/my-products"> <button className="logout-btn" >My ADS</button></Link>}
                        </div>
                        <div>
                            {!localStorage.getItem('token') ? <Link className='ediDel' to="/login" style={{fontSize : "30px"}}> LOGIN </Link> : <button className='logout-btn' onClick={handleLogout}> LOGOUT</button>}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Header;


