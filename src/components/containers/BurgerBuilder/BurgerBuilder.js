import React, {Component,Fragment} from 'react';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import axios from '../../../axios-orders';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component{

  state = {
    ingredients: null,
    totalPrice: 4,
    buyable: false,
    purchasing: false
  }

  componentDidMount(){
    axios.get('/ingredients.json')
    .then(res => {
      this.setState({ingredients: res.data});
    })
    .catch(err => err)
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIng = {
      ...this.state.ingredients
    };
    
    updatedIng[type] = newCount;
    const priceAddition = INGREDIENT_PRICES[type];

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIng});
    this.updatePurchaseState(updatedIng)
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    let newCount = oldCount - 1;

    if(newCount < 0){
      newCount = 0;
    }

    const priceReduction = INGREDIENT_PRICES[type];

    const oldPrice = this.state.totalPrice;
    let newPrice = oldPrice - priceReduction;

    if (newPrice < 4){
      newPrice = 4;
    }

    const updatedIng = {
      ...this.state.ingredients
    };

    updatedIng[type] = newCount;

    this.setState({totalPrice: newPrice, ingredients: updatedIng});
    this.updatePurchaseState(updatedIng)
  }

  updatePurchaseState = (ingredients) => {

    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((curr, el) => {
        return curr+ el
      }, 0)

    this.setState({buyable: sum > 0})
  }

  updatePurchasing = () => {
    this.setState({purchasing: !this.state.purchasing})
  }

  purchaseContinue = () => {

    this.setState({loading: true});
    
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      customer: {
        name: 'Nibba Johnson',
        address:{
          street: 'The bronx 166',
          zipCode: '66666',
          country :'USA'
        },
        email: 'nibba@hood.com',
        deliveryMethod: 'chevere'
      }
    }

    axios.post('/orders.json', order)
    .then(res => {
      this.setState({loading: false, purchasing: false});
      console.log(res)})
    .catch(err => {
      this.setState({loading: false, purchasing: false});
      console.log(err)})
    
  }
  

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    };

  

    let orderSummary = null;

    if(this.state.purchasing){
     orderSummary = <OrderSummary
      price={this.state.totalPrice.toFixed(2)}
      ingredients={this.state.ingredients} 
      purchaseCancel={this.updatePurchasing}
      purchaseContinue={this.purchaseContinue}/>;
    }

    if(this.state.loading){
      orderSummary = <Spinner />
    }

    let burger = (
      <Fragment>
        <Burger ingredients={this.state.ingredients}/>

        <BuildControls 
        ingredientAdded={this.addIngredientHandler} 
        ingredientRemoved={this.removeIngredientHandler} 
        disabled={disabledInfo}
        price={this.state.totalPrice}
        buyable={this.state.buyable}
        purchasing={this.updatePurchasing} />
      </Fragment>
    )

    if(!this.state.ingredients){
      burger = <Spinner />
    }
  
  
    return (
      <Fragment>
        <div>Burger</div>        
        {burger}
        <Modal show={this.state.purchasing} closeModal={this.updatePurchasing}>
          {orderSummary}
        </Modal>
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);