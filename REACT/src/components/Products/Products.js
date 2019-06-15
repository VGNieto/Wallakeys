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
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {

        axios({
            method: 'get',
            url: 'https://api.imviczz.com/api/products',
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
            url: 'https://api.imviczz.com/api/products/filter',
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

    const loadAllGames = () => {
        axios({
            method: 'get',
            url: 'https://api.imviczz.com/api/products',
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

    const addToWishList = (game) => {
        if (user.token) {
            const token = "Bearer " + user.token;

            axios({
                method: 'post',
                url: 'https://api.imviczz.com/api/user/wishlist/add',
                headers: {
                    Authorization: token,
                },
                params: {
                    game: game._id.$oid,
                }
            })
                .then(res => {
                    console.log(game._id.$oid);
                    let data = (res.data);
                    if (data !== false) {

                    }
                });

        }
    }

    const orderGames = (e) => {
        console.log(e.currentTarget.value);
        switch (e.currentTarget.value) {
            case "1": setGames(
                { type: "addGames", games: games.items.sort((a, b) => a.price - b.price) }
            );
                break;
            case "2": setGames(
                { type: "addGames", games: games.items.sort((a, b) => b.price - a.price) }
            ); break;
            case "3": setGames(
                { type: "addGames", games: games.items.sort((a, b) => a.name.localeCompare(b.name)) }
            );

                
        }

    }


    return (

        <div className="container row">
            <select className="form-control" onChange={orderGames} style={{ marginBottom: "30px" }}>
                <option value="0" defaultValue>Order by...</option>
                <option value="1" >Cheapest first</option>
                <option value="2">Most expensive first</option>
                <option value="3" >Alphabetical Order </option>
            </select>

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
                                {user.token ? <li onClick={() => { addToWishList(game) }}><a href="#"><i className="fa fa-heart"></i></a></li>
                                    :
                                    <li><a href="#" data-toggle="modal" data-target="#login-overlay"><i className="fa fa-heart"></i></a></li>
                                }

                                {user.token ? <li onClick={() => { addToCart(game) }}><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                    :
                                    <li><a href="#" data-toggle="modal" data-target="#login-overlay"><i className="fa fa-shopping-cart"></i></a></li>
                                }

                            </ul>
                            <span className="product-new-label">New</span>
                        </div>
                        <div className="product-content">
                            <Link
                                to={{
                                    pathname: "/product/" + game.name.split(" ").join("-").toLowerCase(),
                                    state: {
                                        productID: game._id.$oid,

                                    }
                                }}
                            >
                                <h3 className="title">{game.name}</h3>

                            </Link>
                            <div className="price">
                                {game.price + " "}
                                <span> $75.00</span>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>

    )

}

export default Products





