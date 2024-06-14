import { useEffect, useState, React } from 'react'

function Cart() {

    const [cartData, setCartData] = useState([])

    useEffect(() => {
        let items = JSON.parse(localStorage.getItem('items'));
        setCartData(items)
    }, []);

    const addQnt = (qnt, id) => {
        const updatedData = cartData.map((item) => {
            if (item.product_id === id) {
                return { ...item, quantity: qnt + 1 };
            }
            return item;
        });

        localStorage.setItem('items', JSON.stringify(updatedData));
        setCartData(updatedData);
    };

    const removeQnt = (qnt, id) => {
        console.log(qnt);
        if (qnt > 1) {
            const updatedData = cartData.map((item,i) => {
                if (item.product_id === id) {
                    return { ...item, quantity: qnt - 1 };
                }
                return item;
            });

            localStorage.setItem('items', JSON.stringify(updatedData));
            setCartData(updatedData);
        } else {
            const updatedData = cartData.filter((item) => item.product_id !== id);
            localStorage.setItem('items', JSON.stringify(updatedData));
            setCartData(updatedData);
        }
    };


    return (
        <div className="row my-0 mx-0 p-0 d-flex justify-content-center">
            <h3 className='h3 text-center w-100 mt-4'>My Cart</h3>
            <div className='col-md-8 bg-white mt-3 p-3'>
                {cartData.length > 0 ? (
                    cartData.map((v, i) => (
                        <div className="row m-0 w-100">
                            <div className="col-2 p-3 d-flex align-items-center justify-content-center">
                                <img src={`/assets/images/${v.image}`} alt={`${v.image}`} className='cart-img' />
                            </div>
                            <h5 className='h5 col-3 m-0 my-auto align-items-center text-center text-con'>{v.name}</h5>
                            <h5 className='h5 text-secondary m-0 col-2 d-flex align-items-center justify-content-center'>₹{v.price}</h5>
                            <div className="col-1 p-0 d-flex align-items-center justify-content-center"><button className='btn btn-light w-100' onClick={() => addQnt(v.quantity, v.product_id)}>+</button></div>
                            <div className="col-1 p-0 d-flex align-items-center justify-content-center"><input className='form-control w-100 text-center' value={v.quantity} /></div>
                            <div className="col-1 p-0 d-flex align-items-center justify-content-center"><button className='btn btn-light w-100' onClick={() => removeQnt(v.quantity, v.product_id)}>-</button></div>
                            <h5 className='h5 text-primary m-0 col-2 d-flex align-items-center justify-content-center'><b>₹{v.price * v.quantity}</b></h5>
                        </div>
                    ))

                ) : (
                    <div className="alert alert-warning">No Cart Item Found!</div>
                )}
            </div>

        </div>
    )
}

export default Cart
