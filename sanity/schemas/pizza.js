import {MdLocalPizza as icon} from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  // computer name 
  name: 'pizza',
  // visible title 
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {name: 'name',
     title: 'Pizza Name',
     type: 'string',
     description: 'Name of Pizza'
    },
    {name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: {
      source: 'name'
      }
    },
    {name: 'image',
    title: 'Image',
    type: 'image',
    options: {
      hotspot: true,
      }
    },
    {name:'price',
    title: 'Price',
    type: 'number',
    inputComponent: PriceInput,
    description: 'Price of pizza in cents',
    validation: Rule => Rule.min(1000).max(50000)
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{type: 'reference', to: [{type:'topping'}]}],
    }
  ],
  preview:{
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({title, media, ...toppings}) =>{
      // filter away undefined toppings 
      const tops = Object.values(toppings).filter(Boolean)
      return {
        title,
        media,
        subtitle: tops.join(', '),
      }
    }
  }
};