import React, { useEffect } from 'react'
import './home.css'
import MetaData from '../layout/MetaData'
import { clearErrors, getProduct } from '../../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import ProductCard from './ProductCard'

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()

  const { loading, error, products } = useSelector((state) => state.products)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct())
  }, [dispatch, error, alert])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Home Page" />
          <div className="banner">
            <h3>
              <span className="surprise">"Surprise"</span> your loved one
            </h3>

            <h1>
              With the opportunity to choose all the great gifts for you beloved
              one.
            </h1>

            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  )
}

export default Home
