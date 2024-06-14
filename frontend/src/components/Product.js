// import React from 'react'
import { useEffect, useState, React } from 'react'
// import { Link } from 'react-router-dom'
import { getProductsDetails } from '../services/home.service';
import { useParams } from 'react-router-dom';

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Product() {
    const [product, setProduct] = useState([]);
    let [qnt, setQnt] = useState(0);
    let { id } = useParams()
    
    useEffect(() => {
        getProductsDetails(id).then((r) => {
            setProduct(r.data);
            let qntData = JSON.parse(localStorage.getItem('items'));
            if (qntData) {
                qntData.find((o, i) => {
                    if (o.product_id === id) {
                        setQnt(o.quantity);
                    }
                });
            }
        });

    }, []);


    var data = []
    let items = JSON.parse(localStorage.getItem('items'));

    const addQnt = () => {
        setQnt(++qnt)
        let item = {
            product_id: id,
            name:product[0].name,
            price:product[0].price,
            image:product[0].image,
            quantity: qnt
        }
        data = items
        let obj = data.find((o, i) => {

            if (o.product_id === id) {
                if (qnt === 0) {
                    data.splice(i, 1)
                    return true
                }
                return true;
            }
        });

        if (obj !== undefined) {
            data.find((o, i) => {
                if (o.product_id === id) {
                    data[i].quantity = qnt;
                }
            });

        } else {
            data.push(item);
        }

        localStorage.setItem('items', JSON.stringify(data));
    }

    const removeQnt = () => {
        setQnt(--qnt)
        let item = {
            product_id: id,
            name:product[0].name,
            price:product[0].price,
            image:product[0].image,
            quantity: qnt
        }
        data = items
        let obj = data.find((o, i) => {

            if (o.product_id === id) {
                if (qnt === 0) {
                    data.splice(i, 1)
                    return true
                }
                return true;
            }
        });

        if (obj !== undefined) {
            data.find((o, i) => {
                if (o.product_id === id) {
                    data[i].quantity = qnt;
                }
            });

        } else {
            data.push(item);
        }

        localStorage.setItem('items', JSON.stringify(data));
    }

    const addCart = () => {
        setQnt(qnt + 1)
        let item = {
            product_id: id,
            name:product[0].name,
            price:product[0].price,
            image:product[0].image,
            quantity: qnt + 1
        }
        if (!items) {
            data.push(item)
            localStorage.setItem('items', JSON.stringify(data));
        } else {
            data = items
            data.push(item);
            localStorage.setItem('items', JSON.stringify(data));
        }

        toast.success(`Item successfully added in your cart.`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }


    return (
        <div className="row my-0 mx-0 p-0 d-flex justify-content-center">
            <ToastContainer />
            {product.length > 0 ? (
                product.map((v, i) => (
                    <div className='col-md-6 d-flex flex-row  align-items-center bg-white mt-4 p-3'>
                        <div className="row m-0 w-100">
                            <div className="col-md-6 p-3 text-center">
                                <img src={`/assets/images/${v.image}`} alt='category' className='product-img' />
                            </div>
                            <div className="col-md-6 p-3">
                                <h2 className='h2 title mb-0'>{v.name}</h2>
                                <h4 className='h4 text-success w-100 price mt-3 mb-0 '>₹{v.price}</h4>
                                {qnt === 0 ? (
                                    <div className="row m-0 w-100 mt-3">
                                        <div className="col-5 p-0"><button className='btn btn-warning w-100' onClick={() => addCart()}>Add To Cart</button></div>
                                    </div>
                                ) : (
                                    <div className="row m-0 w-100 mt-3">
                                        <div className="col-2 p-0"><button className='btn btn-light w-100' onClick={() => removeQnt()}>-</button></div>
                                        <div className="col-2 p-0"><input className='form-control w-100 text-center' value={qnt} /></div>
                                        <div className="col-2 p-0"><button className='btn btn-light w-100' onClick={() => addQnt()}>+</button></div>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-12 p-3">
                                <p className='h5 w-100 m-0'>{v.description}</p>
                            </div>
                        </div>
                        {/* <img src={`/assets/images/${v.image}`} alt='category' className='product-img' />
                        <p className='text-success p-1 w-100 price mt-2 mb-0 '>{v.price}</p>
                        <h5 className='h5 my-2 title px-3 py-2'>{v.name}</h5>
                        <p className='pb-4 pe-4 ps-5 pt-1 w-100 m-0 title'>{v.description}</p> */}
                    </div>
                ))
            ) : (
                <div className="alert alert-warning">No Product Found!</div>
            )
            }

        </div >
    )
}

export default Product
