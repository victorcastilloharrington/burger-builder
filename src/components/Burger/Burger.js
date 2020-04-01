import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

  let transIngredients = Object.keys(props.ingredients).map(igKey => {
    //maps each ingredient received and creates an array with n amount of objects
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      //maps into each array element and returns as many ingredients as elements are, and sets key to name + index
      return <BurgerIngredient key={igKey + i} type={igKey} />
    });
  }).reduce((arr,el) => {
    return arr.concat(el);
  },[]);


  if(transIngredients.length === 0)
    transIngredients=<p>Please start adding ingredients</p>

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;