import React from 'react';
import { Col} from 'react-bootstrap'

const Breadcrumbs = () => {



    return (

        <div className="breadcrumb-container breadcrumb">

            <Col xs={12} sm={8} className="d-flex align-self-center justify-content-xs-center">
                <li className="breadcrumb-item"></li>
                <li className="breadcrumb-item"></li>
                <li className="breadcrumb-item active" aria-current="page">Page</li>
            </Col>
            <Col xs={12} sm={12} md={4} className="d-flex justify-content-end">

                <select className="form-control">
                    <option value="0" defaultValue disabled>Order by</option>
                    <option value="1">Featured</option>
                    <option value="2">Most popular</option>
                    <option value="3">Top rated</option>
                    <option value="4">Most commented</option>
                </select>

            </Col>

        </div>
        
    )



}

export default Breadcrumbs