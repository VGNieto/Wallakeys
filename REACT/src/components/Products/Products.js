/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { UserContext } from '../UserDispatch';
import { CartContext } from '../CartDispatch';
const images = require.context('../../img', true);

const Products = () => {

    const [games, setGames] = useState(null);
    const [user, setUser] = useContext(UserContext);
    const [cart,setCart] = useContext(CartContext);

    useEffect(() => {
        const token = 'Bearer ' + user.token;
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/products',
            headers: {
                Authorization: token,
            }
        })
            .then(res => {

                let data = (res.data);
                if (data !== false) {

                   
                    setGames(data);


                }
            });
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

    const show_games = () => {
        return (
               <div className="container row">
                {games.map((game) =>
                    <div className="col-sm-6 col-md-4 col-lg-3" key={game._id.$oid}>
                        <div className="product-grid3">
                            <div className="product-image3">
                                <Link 
                                to={{
                                    pathname: "/product/"+game.name.split(" ").join("-").toLowerCase(),
                                    state: { 
                                      productID: game._id.$oid,
                                     
                                    }
                                  }}
                                >
                                <img src={images(`./${game.img}`)}/>

                                </Link>
                                <ul className="social">
                                    <li><a href="#"><i className="fa fa-shopping-bag"></i></a></li>
                                    <li onClick={()=> {addToCart(game)}}><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                    
                                </ul>
                                <span className="product-new-label">New</span>
                            </div>
                            <div className="product-content">
                                <h3 className="title"><a href="#">{game.name}</a></h3>
                                <div className="price">
                                    {game.price}
                                    <span>$75.00</span>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </div>  
        )



    }



    return (

        games != null ? show_games() : 0 

    )

}

export default Products





