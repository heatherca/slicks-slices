import { useContext, useState } from "react";
import OrderContext from "../components/OrderContext";
import attachNamesAndPrices from "./attachNamesAndPrices";
import CalculateOrderTotal from "./calculateOrderTotal";
import formatMoney from "./formatMoney";


export default function usePizza({ pizzas, values}){
  // create a state to hold order 
  // this line moved up to providier 
  // const [order, setOrder] = useState([]);
  const [order,setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // make function to add things to order 
  function addToOrder(orderedPizza){
    setOrder([...order, orderedPizza])
  }
  // remove things from order 
  function removeFromOrder(index){
    setOrder([
      // everything before remove item 
      ...order.slice(0, index),
      // everything after 
      ...order.slice(index + 1)
    ])
  }

  // function that is run when someone submits a form 
  async function submitOrder(e){
    e.preventDefault();
    console.log(e);
    setLoading(true);
    setError('NO WAYYY');
    // setMessage("go eat");



    // gather all the data 
    const body = {
      order: attachNamesAndPrices(order,pizzas),
      total: formatMoney(CalculateOrderTotal(order,pizzas)),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    }
    console.log(body)
    // send this data to a serverless function on checkout 
    const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })

    const text = await JSON.parse(await res.text());

    // check if everything works 
    if (res.status >= 400 && res.status < 600){
      setLoading(false);
      setError(text.message);
    } else{
      setLoading(false);
      setMessage('Success! Huzzah!')
    }
  }



  return {
    order, 
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder
  }
}