import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/grids';
import useLatestData from '../utils/useLatestData';


function CurrentlySlicing({slicemasters}){
  return <div>
    <h2 className="center">
      <span className="mark tilt"> Slicemasters On</span>
      <p>Standing by ready to slice you up!</p>
    </h2>
    {!slicemasters && <LoadingGrid count={4}></LoadingGrid> }
    {slicemasters && !slicemasters?.length && <p>No one is working right now</p>}
    {slicemasters?.length && <ItemGrid items={slicemasters}/>}
    
  </div>
}

function HotSlices({hotSlices}) {
  return <div>
    <h2 className="center">
      <span className="mark tilt"> Hot Slices On</span>
      <p>Come on by, buy the slice</p>
    </h2>
    {!hotSlices && <LoadingGrid count={4}></LoadingGrid>}
    {hotSlices && !hotSlices?.length && <p>Nothing in the case</p>}
    {hotSlices?.length && <ItemGrid items={hotSlices} />}
  </div>
}

export default function HomePage(){
  const {slicemasters, hotSlices} = useLatestData();
  
  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters}></CurrentlySlicing>
        <HotSlices hotSlices={hotSlices}></HotSlices>
      </HomePageGrid>
    </div>
  )
}


