import calculatePizzaPrice from "./calculatePizzaPrice";


export default function CalculateOrderTotal(order,pizzas){

  // loop over each item in order
  return order.reduce((runningTotal, singleOrder)=>{
    const pizza = pizzas.find((singlePizza) => singlePizza.id === singleOrder.id);
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
 
  // calc toal for that pizza 
  // add total to running total 
}