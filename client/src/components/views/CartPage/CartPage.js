import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems} from '../../../_actions/user_actions';
import UserCartBlock from "./Sections/UserCartBlock";


function CartPage(props) {

    console.log(props)
    const dispatch = useDispatch()
   
    useEffect(() => {

        let cartItems = []
         // Redux User State의 Cart안에 상품이 들어있는지 체크
        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0 ) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
            }
        }
    }, [props.user.userData])
    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>

            <div>
                <UserCartBlock products={props.user.cartDetail}/>
            </div>
        </div>
    )
}

export default CartPage
