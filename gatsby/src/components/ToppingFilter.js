import React from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a{
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    background: var(--grey);
    border-radius: 2px;
    .count{
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page']{
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas){
  // return pizzas with counts 
  const counts = pizzas.map((pizza)=>pizza.toppings).flat().reduce((acc,topping)=>{
    // check if exists if does inc by one otherwise create a new entrance and set to one 
    const existingTopping = acc[topping.id];
    if(existingTopping){
      existingTopping.count += 1;
    }
    else{
    acc[topping.id] ={
      id: topping.id,
      name: topping.name,
      count: 1,
      };
    }
    return acc;
  }, {});
  // sort based on count 
  const sortedToppings = Object.values(counts).sort((a,b)=> b.count - a.count);
  return sortedToppings;
}

export default function ToppingsFilter({activeTopping}){
  // get a list of all the toppings
  const {toppings, pizzas} = useStaticQuery(graphql`
  query{
    toppings: allSanityTopping{
      nodes{
        name
        id
        vegetarian
      }
    }
    pizzas: allSanityPizza{
      nodes{
        toppings{
          name
          id
        }
      }
    }
  }
  `);
  
  // get a list of all the pizzars with their toppings 
  // count how many pizzas are in each topping 
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes)
  // loop over the list of toppings and display the topping and the count of pizzasa in that topping
  
  return(
    <ToppingsStyles>
    <Link to="/pizzas">
      <span className="name">All</span>
      <span className="count">{pizzas.nodes.length}</span>
    </Link>
    {toppingsWithCounts.map((topping) => (
      <Link key={topping.id} to={`/topping/${topping.name}`} className={topping.name === activeTopping ? 'active' : ''}>
        <span className="name">{topping.name}</span>
        <span className="count">{topping.count}</span>
      </Link>
    ))}
    </ToppingsStyles>
  )
}