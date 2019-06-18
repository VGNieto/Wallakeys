/* eslint-disable */
import React, { Component, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FiltersContext } from '../FiltersDispatch';

const Filters = (props) => {

    const [filters, setFilters] = useContext(FiltersContext);

    const [categories, setCategories] = useState({})
    const [platforms, setPlatforms] = useState({})
    const [filterCategories, setFilterCategories] = useState([])
    const [filterPlatforms, setFilterPlatforms] = useState([])
    const [filterPrice, setFilterPrice] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://api.imviczz.com/api/categories',

        })
            .then(res => {

                let data = (res.data);
                if (data !== false) {

                    setCategories(data.sort());
                }
            });

        axios({
            method: 'get',
            url: 'https://api.imviczz.com/api/platforms',

        })
            .then(res => {

                let data = (res.data);
                if (data !== false) {
                    setPlatforms(data.sort());
                }
            });
    }, [])


    const update_price = () => {

        let minPrice = document.getElementById("minPrice").value;
        let maxPrice = document.getElementById("maxPrice").value;

        if(minPrice=="" && maxPrice ==""){
            setFilterPrice([])
        } else if(minPrice == ""){
            setFilterPrice(["",maxPrice])
        } else if(maxPrice == ""){
            setFilterPrice([minPrice,])
        } else{
            setFilterPrice([minPrice,maxPrice]);
        }
    }

    const update_categories = (categorie) => {

        if (filterCategories.indexOf(categorie) >= 0) {
            setFilterCategories(
                filterCategories.filter((value) => {

                    return value !== categorie;
                })
            )
        } else {
            setFilterCategories([...filterCategories, categorie]);
        }



        return;
    }

    const update_platforms = (platform) => {

        if (filterPlatforms.indexOf(platform) >= 0) {
            setFilterPlatforms(
                filterPlatforms.filter((value) => {

                    return value !== platform;
                })
            )
        } else {
            setFilterPlatforms([...filterPlatforms, platform]);
        }


        return;
    }
    const show_categories = () => {
        return (

            <div className="row">
                <div className="boxes">
                    {categories.map((item) =>
                        <div key={item}>
                            <input type="checkbox" id={item} />
                            <label onClick={() => { update_categories(item) }} htmlFor={item}>{item}</label>
                        </div>

                    )}

                </div>
            </div>

        )

    }

    const show_platforms = () => {
        return (

            <div className="row">
                <div className="boxes">
                    {platforms.map((item) =>
                        <div key={item}>
                            <input type="checkbox" id={item} />
                            <label onClick={() => { update_platforms(item) }} htmlFor={item}>{item}</label>
                        </div>

                    )}

                </div>
            </div>

        )

    }


    useEffect(() => {
        setFilters({
            type: "changeFilters", filters: {
                filterPlatforms,
                filterCategories,
                filterPrice
            }
        })
    }, [filterPlatforms, filterCategories, filterPrice])


    return (
        <div className="accordion filters-bar" id="accordionExample">
            <div className="card">
                <div className="card-header  d-flex justify-content-center">
                    <span className=""><strong>Filter games</strong></span>
                </div>

                <div className="card-group-item"  >
                    <div className="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">

                        <span className="float-left">Platform</span>
                        <span className="d-flex justify-content-end"><i className="fas fa-angle-down "></i></span>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne">
                        <div className="card-body">
                            {platforms.length > 0 ? show_platforms() : null}

                        </div>
                    </div>
                </div>

                <div className="card-group-item">
                    <div className="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <span className="float-left">Categories</span>
                        <span className="d-flex justify-content-end"><i className="fas fa-angle-down "></i></span>
                    </div>
                    <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" >
                        <div className="card-body">
                            {categories.length > 0 ? show_categories() : null}
                        </div>
                    </div>
                </div>

                <div className="card-group-item">
                    <div className="card-header" id="headingThree" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <span className="float-left">Price</span>
                        <span className="d-flex justify-content-end"><i className="fas fa-angle-down "></i></span>
                    </div>
                    <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" >
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Min</label>
                                    <input type="number" onChange={update_price} className="form-control"  min="0" id="minPrice" placeholder="$0" />
                                </div>
                                <div className="form-group col-md-6 text-right">
                                    <label>Max</label>
                                    <input type="number" onChange={update_price} className="form-control" max="1000" min="0" id="maxPrice" placeholder="$1,0000" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>



    )

}

export default Filters