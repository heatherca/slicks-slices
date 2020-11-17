import React from 'react';
import {graphql} from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingFilter from '../components/ToppingFilter';
import SEO from '../components/SEO';

export default function PizzasPage({data, pageContext}) {
  const pizzas = data.pizzas.nodes
  return <>
    <SEO title={pageContext.topping ? `Pizzas with ${pageContext.topping}` : `All Pizzas`}/>
    <ToppingFilter activeTopping={pageContext.topping} />
    <PizzaList pizzas={pizzas} />
  </>
}

export const query = graphql`
  query PizzaQuery($toppingRegex: String){
    pizzas: allSanityPizza(filter:{
      toppings:{
        elemMatch:{
          name:{
            regex: $toppingRegex
          }
        }
      }
    }){
      nodes{
        name
        id
        slug{
          current
        }
        toppings{
          id
          name
        }
        image{
          asset{
            fluid(maxWidth: 400){
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;