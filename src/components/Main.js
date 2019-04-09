import React, { Component } from 'react';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Button, ButtonGroup, Dropdown, DropdownButton, Container } from 'react-bootstrap';

class Main extends Component {

    constructor(props) {

        super(props);
        this.state = {
            posts: [],
        }
        
    }

    componentDidMount(){
        axios.get('https://www.imviczz.com/ajax')
        .then(res => {
            let data = (res.data);
            this.setState({ posts:  data });
        });
    }

    showData(){
        var items = this.state.posts.map((data,i) => {
            return <li key={data.id}>{data.title}
            <button onClick={()=>this.deleteItem(i)} > Borrar</button>
            </li>;
        })
        return(
            
            <div> {items} </div>

        )
    }

    deleteItem = (key) =>{
        var itemId;
        this.setState({
            posts: this.state.posts.filter((data,index) => {
                itemId = data.id;
                return index!== key;
            })
        }) 

        axios.post('https://www.imviczz.com/delete/'+itemId);
        

    }


    render() {
        return (
            <div>
                { this.showData() }
            </div>
        )
    }

}

export default Main