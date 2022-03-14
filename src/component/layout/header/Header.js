import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../../actions/userAction'

function Header({ history }) {
  const [click, setClick] = useState(false)

  const handleClick = () => setClick(!click)
  const alert = useAlert()
  const dispatch = useDispatch()

  const { isAuthenticated, user } = useSelector((state) => state.user)
  const { cartItems } = useSelector((state) => state.cart)

  function logoutUser() {
    dispatch(logout())
    history.push('/login')
    alert.success('Logout Successfully')
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <NavLink exact to="/" className="nav-logo">
              Surprise
            </NavLink>
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/products"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/search"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <i className="fas fa-search"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/cart"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <i className="fa-solid fa-cart-arrow-down">
                  {' '}
                  {`${cartItems.length}`}
                </i>
              </NavLink>
            </li>
            {!isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  <i className="fa-solid fa-user-plus"></i>
                </NavLink>
              </li>
            )}

            {isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/orders"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Orders
                </NavLink>
              </li>
            )}
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/account"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Account
                </NavLink>
              </li>
            )}
            {isAuthenticated && user.role === 'admin' && (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/admin/dashboard"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/logout"
                  activeClassName="active"
                  className="nav-links"
                  onClick={logoutUser}
                >
                  <i class="fas fa-sign-out-alt"></i>
                </NavLink>
              </li>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
