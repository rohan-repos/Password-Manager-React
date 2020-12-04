import React ,{useEffect} from 'react'
import HomeContentSection from '../HomeContentSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';


function Home() {
  
  useEffect(() => {
    window.scrollTo(0,0)
   
  }, [])
  
  return (
    <>
    {/* Display the homepage content based on description from Data.js */}
      <HomeContentSection {...homeObjOne} />
      <HomeContentSection {...homeObjThree} />
      <HomeContentSection {...homeObjTwo} />
      <HomeContentSection {...homeObjFour} />
      
    </>
  );
}

export default Home;
