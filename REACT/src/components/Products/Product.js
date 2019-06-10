import React, { useContext, useEffect, useState } from 'react';
/* eslint-disable no-unused-vars */
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import Categories from '../Products/Categories'
import Carousel from '../MainComponents/Carousel'
import Filters from '../Products/Filters'
import Breadcrumbs from '../MainComponents/Breadcrumbs'


import { UserContext, UserReducer } from '../UserDispatch';
import axios from 'axios';
import { CartContext } from '../CartDispatch';


const images = require.context('../../img', true);



const Product = (props) => {

  const [user, setUser] = useContext(UserContext);
  const [game, setGame] = useState(null);
  const [cart, setCart] = useContext(CartContext)

  useEffect(() => {

    axios({
      method: "get",
      url: 'http://localhost:8080/api/product/info',
      params: {
        productID: props.location.state.productID,
      }
    }).then(res => {

      setGame(res.data[0]);

    })



  }, [])


  const addToCart = (game) =>{

    let actualQuantity = 1;
    cart.items.forEach(element => {
      if(element.id == game._id.$oid){
        actualQuantity = element.quantity+1;
      }
    });
    console.log(game);
    setCart({ type: 'add', text: {
      id: game._id.$oid,
      name: game.name,
      price: game.price,
      quantity: actualQuantity,
      stock: game.stock,
      subtotal: game.price,
      img: game.img,
      platforms: game.platforms
    } });

  }

  const show_categories = () => {
    return (
      <div>
        <ul className="product-categories">
          {game.categories.map((categorie) =>
            <li key={categorie}> {categorie} </li>
          )}
        </ul>
      </div>
    )
  }

  return (
    <div>

      <div className="main-section">

          <Categories />
          <Container style={{ backgroundColor: "#ffffff" }}>

            <Carousel />
            <Row className="top-section">
              <Col xs={12}>
              <Breadcrumbs />

              </Col>
              <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                <Filters />
              </Col>
              <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                {game != null ?
                  <div className="row">
                    <div className="col-sm-4 item-photo">
                      <img style={{ maxWidth: "100%" }} src={images(`./${game.img}`)} />
                    </div>

                    <div className="col-sm-8" style={{ border: "0px solid gray" }}>
                      <h3>{game.name}</h3>

                      <div className="section">
                        <h6 className="title-price"><small>Categories</small></h6>
                        {show_categories()}
                      </div>

                      <h6 className="title-price"><small>PRICE</small></h6>
                      <h3 style={{ marginTop: "0px" }}>{game.price}$</h3>




                      <div className="section" style={{ paddingBottom: "20px" }}>
                        <button className="btn btn-success" onClick={()=> {addToCart(game)}}><i className="fa fa-shopping-cart"></i>Add to Cart</button>
                        <h6 style={{ marginTop: "10px" }}><a href="#"><i className="fa fa-heart"></i> Add to Wishlist</a></h6>
                      </div>
                    </div>

                    <div className="col-sm-10" style={{ paddingTop: "10px" }}>

                      <div style={{ width: "100%", borderTop: "1px solid silver" }}>
                        <h5> Description </h5>
                        <p>
                          <small>
                            {game.description}
                          </small>
                        </p>
                        <small>

                        </small>
                      </div>
                    </div>
                  </div> : null}
              </Col>
            </Row>
          </Container>



      </div>

    </div>


  );


}

export default Product;