
import { useEffect, useState, React } from 'react'
// import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { getCategories } from '../services/home.service';

const Home = () => {
  const [cats, setCats] = useState([]);
  const [cat, setCat] = useState([]);

  useEffect(() => {
    getCategories().then((r) => {
      setCats(r.data);
      setCat(r.data);
    });
  }, []);

  const getSearchData = (value) => {
    let data = cat.filter((item) => {
      if (item.name.toLowerCase().includes(value.toLowerCase())) {
        return item;
      }
    })

    setCats(data)
  }

  return (
    <div className="container w-75 p-0">
      <h3 className='h3 my-4 text-center'>Categories</h3>
      <input className='form-control w-50 mx-auto py-2 px-4' type='text' placeholder='Search category...' onKeyUp={(e) => getSearchData(e.target.value)} />
      <div className="row my-3 mx-0 p-0 d-flex justify-content-center">
        {cats.length > 0 ? (
          cats.map((v, i) => (
            <Link to={`sub-cat/${v.id}`} className='text-link col-md-3 d-flex flex-column  align-items-center flex-wrap py-3 m-3'
              key={"cat" + v.id}
            >
              <img src={'/assets/images/' + v.image} alt='category' className='cat-img' />
              <h5 className='h5 mt-2'>{v.name}</h5>
            </Link>
          ))
        ) : (
          <div className="alert alert-warning mt-4">No Categories Found!</div>
        )}
      </div>
    </div>
  )
}

export default Home
