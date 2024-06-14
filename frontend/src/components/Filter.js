import { useEffect, useState, React } from 'react'
import { Link } from 'react-router-dom'
import { getCategories, getMultiCate, getProductFilter, getProducts, getSubCategories } from '../services/home.service';

import Select from 'react-select';


function Filter() {

    const [product, setProduct] = useState([]);
    const [cats, setCats] = useState([]);
    const [catsID, setCatsID] = useState([]);
    const [subCats, setSubCats] = useState([]);
    const [subCatsID, setSubCatsID] = useState([]);

    useEffect(() => {
        getCategories().then((r) => {
            setCats(r.data);
        });

    }, []);

    useEffect(() => {
        
        getMultiCate(catsID).then((r) => {
            setSubCats(r.data)
        });

    }, [catsID]);

    useEffect(() => {
        getProductFilter(catsID,subCatsID).then((r) => {
            setProduct(r.data)
        });

    }, [catsID,subCatsID]);

    return (
        <div className="container w-75 p-0">
            <div className="row mx-0 mt-5 mb-4 d-flex align-items-center justify-content-center">
                <div className="col-md-10 p-3 bg-white">
                    <div className="row m-0 d-flex align-items-center justify-content-between">
                        <div className="col-md-5 p-0">
                            <Select
                                isMulti
                                options={cats.map((cat) => ({ value: cat.id, label: cat.name }))}
                                onChange={setCatsID}
                                placeholder="Select Category"
                                className='w-100'
                            />

                        </div>
                        <div className="col-md-6 p-0">
                            <Select
                                isMulti
                                options={subCats.map((subCat) => ({ value: subCat.id, label: subCat.name }))}
                                onChange={setSubCatsID}
                                placeholder="Select Sub Category"
                                className='w-100'
                            />
                        </div>
                    </div>
                    {/* <div className="row m-0 d-flex align-items-center justify-content-between">
                        <button className='btn btn-outline-primary col-12 mt-2'>Apply Filter</button>
                    </div> */}
                </div>
            </div>
            <div className="row my-3 mx-0 p-0 d-flex justify-content-center">

                {product.length > 0 ? (
                    product.map((v, i) => (
                        <Link to={`../product-detail/${v.id}`} className='text-link col-md-3 pt-3 pb-3 m-3'
                            key={"product" + v.id}
                        >
                            <img src={`/assets/images/${v.image}`} alt='category' className='cat-img' />
                            <p className='p text-success p-1 w-100 price mt-2 mb-0'>₹{v.price}</p>
                            <h5 className='h5 title px-3 py-2'>{v.name}</h5>
                        </Link>
                    ))
                ) : (
                    <div className="alert alert-warning">No Product Found!</div>
                )}

            </div>
        </div>
    )
}

export default Filter
