import React, { useContext, useEffect} from 'react';
import 'react-bootstrap/dist/react-bootstrap'

import { UserContext } from '../UserDispatch';
import { CartContext } from '../CartDispatch';
const images = require.context('../../img', true);


const Cart = (props) => {

  const [user, setUser] = useContext(UserContext);
  const [cart, setCart] = useContext(CartContext)

  console.log(cart)
  useEffect(() => {
    setCart({type:'loadData',text:"true"})
  }, [])

  const addOne = (game) => {
    setCart({
      type: 'addOne', text: {
        id: game.id,
        name: game.name,
        price: game.price,
        quantity: 1,
        stock: game.stock,
        subtotal: game.price,
        img: game.img,
      }
    });

  }

  const removeOne = (game) => {
    setCart({
      type: 'removeOne', text: {
        id: game.id,
        name: game.name,
        price: game.price,
        quantity: 1,
        stock: game.stock,
        subtotal: game.price,
        img: game.img,
      }
    });

  }

  const deleteGame = (game) => {
    setCart({
      type: 'remove', text: {
        id: game.id,
        name: game.name,
        price: game.price,
        quantity: 1,
        stock: game.stock,
        subtotal: game.price,
        img: game.img,
      }
    });

  }


  const showProducts = () => {
    return (
      <div class="container" style={{ paddingTop: "25px" }}>
        <div className="card" >
          <div className="card-header"> Cart</div>
          <div className="card-body"></div>

          {cart.items.length > 0 ? cart.items.map((game) =>
            <div className="row cart-product-row">
              <div className="col-sm-12 col-md-12 col-lg-5 col-12 row cart-product-title">
                <img src={images(`./${game.img}`)} alt="..." class="img-responsive cart-product-image" />
                <h5> {game.name}</h5>
                <h6> {game.platform}</h6>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-2 col-6">
                <h6> Price</h6>
                <h5 class="">{game.price}$</h5>
              </div>
              <div className="col-sm-6 col-md-4 col-lg-2 col-6">
                <h6>Quantity</h6>
                <div className="cart-modify-product">
                  <div class="form-control text-center" style={{ width: "60px" }}>{game.quantity} </div>

               
                    <button class="btn btn-success btn-sm" onClick={() => { addOne(game) }}><i class="fa fa-plus"></i></button>
                  {game.quantity > 1 ?
                  <button class="btn btn-danger btn-sm" onClick={() => { removeOne(game) }}><i class="fa fa-minus"></i></button>
                  :<button class="btn btn-danger btn-sm" disabled><i class="fa fa-minus"></i></button>

                  }
                </div>
              </div>
              <div className="col-sm-6 col-md-3 col-lg-2 col-6">
                <h6> Subtototal</h6>
                <h5 class="">{game.subtotal}$</h5>
              </div>

              <div className="col-sm-6 col-md-1 col-lg-1 col-6">
                <button class="btn btn-danger btn-sm" onClick={() => {deleteGame(game)}}><i class="fa fa-trash-alt"></i></button>
              </div>
            </div>
          ) : <h5 className="center-align">Cart is Empty!</h5>}

          {cart.length > 0 ?
            <div className="row cart-end-row">

              <div className="col-md-8"><a href="#" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></div>
              <div className="col-md-2"><strong>Total $150.00</strong></div>
              <div className="col-md-2"><button class="btn btn-success btn-block"> Checkout <i class="fa fa-angle-right"></i></button></div>


            </div>
            : <div className="col-md-8"><a href="#" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></div>
          }

        </div>
      </div>
    )
  }


  return (

    showProducts()
  );


}



export default Cart;
