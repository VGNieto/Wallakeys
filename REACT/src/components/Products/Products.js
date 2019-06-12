/* eslint-disable */
import React, { useState, useEffect, useContext, useLayoutEffect, forceUpdate, setState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserDispatch';
import { CartContext } from '../CartDispatch';
import { GamesContext } from '../GamesDispatch';
import { FiltersContext } from '../FiltersDispatch';

const images = require.context('../../img', true);

const Products = () => {

    const [games, setGames] = useContext(GamesContext);
    const [filters, setFilters] = useContext(FiltersContext);
    const [cart, setCart] = useContext(CartContext);

    useEffect(() => {

        axios({
            method: 'get',
            url: 'http://localhost:8080/api/products',
        })
            .then(res => {

                let data = (res.data);
                if (data !== false) {
                    setGames(
                        { type: "addGames", games: data }
                    );
                }
            });
    }, [])

    useEffect(() => {

        for (const key in filters.filters) {
            if (filters.filters.hasOwnProperty(key)) {
                const element = filters.filters[key];
                if (element.length > 0) {
                    updateGames();
                    return;
                } 
            }
        }
        loadAllGames();


    }, [filters])


    const updateGames = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/products/filter',
            params: {
                filterCategories: filters.filters.filterCategories.toString(),
                filterPlatforms: filters.filters.filterPlatforms.toString(),
                filterPrice: filters.filters.filterPrice.toString(),
            }
        })
            .then(res => {

                let data = (res.data);
                if (data !== false) {
                    setGames(
                        { type: "addGames", games: data }
                    );
                }
            });
    }

    const loadAllGames = () =>{
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/products',
        })
            .then(res => {

                let data = (res.data);
                if (data !== false) {
                    setGames(
                        { type: "addGames", games: data }
                    );
                }
            });
    }

    const addToCart = (game) => {

        let actualQuantity = 1;
        cart.items.forEach(element => {
            if (element.id == game._id.$oid) {
                actualQuantity = element.quantity + 1;
            }
        });
        setCart({
            type: 'add', text: {
                id: game._id.$oid,
                name: game.name,
                price: game.price,
                quantity: actualQuantity,
                stock: game.stock,
                subtotal: game.price,
                img: game.img,
                platforms: game.platforms
            }
        });

    }




    return (

        <div className="container row">
            {games.items.map((game) =>

                <div className="col-sm-6 col-md-4 col-lg-3" key={game._id.$oid}>
                    <div className="product-grid3">
                        <div className="product-image3">
                            <Link
                                to={{
                                    pathname: "/product/" + game.name.split(" ").join("-").toLowerCase(),
                                    state: {
                                        productID: game._id.$oid,

                                    }
                                }}
                            >
                                <img src={images(`./${game.img}`)} />

                            </Link>
                            <ul className="social">
                                <li><a href="#"><i className="fa fa-shopping-bag"></i></a></li>
                                <li onClick={() => { addToCart(game) }}><a href="#"><i className="fa fa-shopping-cart"></i></a></li>

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

export default Products





