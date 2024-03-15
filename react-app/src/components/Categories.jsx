import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import categories from './categoriesList';

function Categories(props) {
    
    const navigate = useNavigate();
    return (
        <div className='cat-container'>
            <div>
            <span className='pr-3'>ALL Categories</span>
                {categories && categories.concat.length > 0 && 
                categories.map((item, index)=>{
                    return (
                        <span onClick={()=> navigate('/category/' + item)} key = {index} className='category'> {item} </span>
                    )
                })}
            </div>
        </div>
    )
}

export default Categories;