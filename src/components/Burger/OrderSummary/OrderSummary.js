import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    
    const ingredientSummary = Object.keys(props.ingredients).map (ing => {
        return <li><span style={{textTransform: 'capitalize'}}>{ing}</span>: {props.ingredients[ing]}</li>
    });

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>Your burger summary:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{props.price}</strong></p>
            <p>Continue To Checkout?</p>
            <Button clicked={props.purchaseCancel} btnType="Danger">Cancel</Button>
            <Button clicked={props.purchaseContinue} btnType="Success">Continue</Button>
        </Fragment>
    )
}

export default orderSummary