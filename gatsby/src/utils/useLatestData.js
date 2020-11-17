
import { useState, useEffect } from 'react';



export default function useLatestData(){
  // hot slices 
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSlicemasters] = useState();
  // use a side effect to fetch the data from the graphql endpoint 
  useEffect(function(){
    console.log('fetching data')
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query:`
          query{
            StoreSettings(id: "downtown"){
              name
              slicemaster {
                name
                _id
                image{
                  asset{
                    url
                    metadata{
                      lqip
                    }
                  }
                }
              }
              hotSlices {
                name
                _id
                image{
                  asset{
                    url
                    metadata{
                      lqip
                    }
                  }
                }
              }
            }
          }
        `
      })
    }).then((res)=>res.json()).then((res)=>{
      setHotSlices(res.data.StoreSettings.hotSlices);
      setSlicemasters(res.data.StoreSettings.slicemaster)
    })
  }, []);
  return {
    hotSlices, 
    slicemasters
  }
}