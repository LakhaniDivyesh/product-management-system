// import React from 'react'
import { useEffect, useState, React } from 'react'
import { getSubCategories } from '../services/home.service';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
// import Product from './Product';
import { getProducts } from '../services/home.service';

function Sub_cats() {

    const [sub_cats, setCats] = useState([]);
    const [sub_cat, setCat] = useState([]);
    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [category_id, setCategory_id] = useState();
    // const [sub_cat_id, setSub_cat_id] = useState();
    var { id } = useParams();

    useEffect(() => {
        getSubCategories(id).then((r) => {
            setCats(r.data);
            setCat(r.data);
            // await setSub_cat_id(r.data[0].id)
            getProducts(r.data[0].id).then((r) => {
                setProduct(r.data);
                setProducts(r.data)
                setCategory_id(r.data[0].category_id);
            });
        });
    }, []);

    const getProductsData = (sub_cat_id) => {
        getProducts(sub_cat_id).then((r) => {
            setProduct(r.data);
            setProducts(r.data);
            setCategory_id(r.data[0].category_id);
        });
    }

    const getSearchData = (value) => {
        let data = sub_cat.filter((item) => {
            if (item.name.toLowerCase().includes(value.toLowerCase())) {
                return item;
            }
        })

        setCats(data)
    }

    const getSearchProduct = (value) => {
        let data = products.filter((item) => {
            if (item.name.toLowerCase().includes(value.toLowerCase())) {
                return item;
            }
        })

        setProduct(data)
    }

    return (
        <div className="container-fluid p-0">
            <div className="row m-0 d-flex">
                <div className="col-md-3 p-4 left-bar">
                    <input className='form-control w-100 mx-auto py-2 px-4 mb-3' type='text' placeholder='Search sub category...' onKeyUp={(e) => getSearchData(e.target.value)} />
                    <div className="row m-0 p-0">
                        {sub_cats.length > 0 ? (
                            sub_cats.map((v, i) => (
                                <div className={`text-link-sub col-md-12 p-3 mb-3 ${category_id === v.id ? 'btn btn-primary active' : ''}`}
                                    key={"cat" + v.id}
                                    onClick={() => getProductsData(v.id)}
                                >
                                    <img src={`/assets/images/${v.image}`} alt={v.image} className='sub-cat-img' />
                                    <h5 className='h5'>{v.name}</h5>
                                </div>
                            ))
                        ) : (
                            <div className="alert alert-warning">No Categories Found!</div>
                        )}

                    </div>
                </div>
                <div className="col-md-9 p-3 right-con">
                <input className='form-control w-50 mx-auto py-2 px-4 mb-3 mt-2' type='text' placeholder='Search Product...' onKeyUp={(e) => getSearchProduct(e.target.value)} />
                    <div className="row my-0 mx-0 p-0 d-flex justify-content-center">
                        {product.length > 0 ? (
                            product.map((v, i) => (
                                <Link to={`../product-detail/${v.id}`} className='text-link col-md-3 d-flex flex-column  align-items-center flex-wrap pt-3 pb-3 m-3'
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
                    {/* {<Product data={sub_cat_id} onChange={handleChange}/>} */}
                </div>
            </div>
        </div>
    )
}

export default Sub_cats
