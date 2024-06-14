import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const router = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || "[]");

    const logout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router('/login')
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-white px-4">
            <Link class="navbar-brand" to="/">Product</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <Link class="nav-link" to="/">Home</Link>
                    </li>
                    <li class="nav-item active">
                        <Link class="nav-link" to="/product-filter">Product Filter</Link>
                    </li>
                    {user.length > 0 ? (
                        <li class="d-flex align-item-center mx-2">
                            <button class="btn btn-light pt-2 position-relative px-3 logout"
                            onMouseOver={(e) => e.currentTarget.innerHTML = "logout"}
                            onMouseOut={(e) => e.currentTarget.innerHTML = user[0].name}
                            onClick={()=>logout()}
                            >{user[0].name}</button>
                        </li>
                    ) : (
                        <div className='navbar-nav'>
                            <li class="nav-item active">
                                <Link class="nav-link" to="/login">Login</Link>
                            </li>
                            <li class="nav-item active">
                                <Link class="nav-link" to="/signup">Signup</Link>
                            </li>
                        </div>
                    )}
                    <li class="d-flex align-item-center">
                        <Link class="btn btn-info pt-2 position-relative" to="/my-cart">My Cart</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
