import path from 'path';
import fetch from 'isomorphic-fetch';


async function turnPizzasIntoPages({graphql,actions}){
  // get a template for this page
   const pizzaTemplate = path.resolve('./src/templates/Pizza.js')
  // query all pizzas 
  const {data} = await graphql(`
    query{
      pizzas: allSanityPizza{
        nodes{
          name
          slug{
            current
          }
        }
      }
    }
  `);
  // loop over each and create page for each 
  data.pizzas.nodes.forEach(pizza => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        wes: 'is cool',
        slug: pizza.slug.current,
      }
    });
  });
}


async function turnToppingsIntoPages({graphql, actions}){
  
  // get a template 
  const toppingTemplate = path.resolve('./src/pages/pizzas.js')
  // query all the toppings 
  const {data} = await graphql(`
    query{
      toppings: allSanityTopping{
        nodes{
          name
          id
        }
      }
    }
  `)
  // create page for that topping 
  data.toppings.nodes.forEach((topping) =>{
    
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context:{
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      }
    })
  })
  // pass topping data to pizza.js 
}

async function fetchBeersAndTurnIntoNodes({actions,createNodeId, createContentDigest}){
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // loop over each beer 
  for(const beer of beers){
    // create node for each beer 
    // const nodeContent = JSON.stringify(beer);
    const nodeMeta ={
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      }
    };
    actions.createNode({
      ...beer, ...nodeMeta
    })
  }
}


async function turnSliceMastersIntoPages({graphql,actions}){
  // query all slicemasters 
  const {data} = await graphql(`
    query{
      slicemasters: allSanityPerson{
        totalCount
        nodes{
          name
          id
          slug{
            current
          }
        }
      }
    }
  `);
  // turn each slicemaster into own page 
  data.slicemasters.nodes.forEach((slicemaster)=>{
    actions.createPage({
      component: path.resolve('./src/templates/Slicemaster.js'),
      path: `/slicemaster/${slicemaster.slug.current}`,
      context:{
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      }
    })
  })
  // figure out how many pages there are based on how many slicemasters there are and how many per page 
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount/ pageSize)
  
  // loop from 1 to n and create the pages for them 
  Array.from({length: pageCount}).forEach((_,i)=>{
    
    actions.createPage({
      path: `/slicemaster/${i + 1}`,
      component: path.resolve('./src/pages/slicemaster.js'),
      context:{
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      }
    })
  })

}


export async function sourceNodes(params) {
  await Promise.all([
    fetchBeersAndTurnIntoNodes(params)
  ]);
}


export async function createPages(params){
  // create pages dynamically pizza toppings slicemasters
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSliceMastersIntoPages(params)
  ])
  
}

