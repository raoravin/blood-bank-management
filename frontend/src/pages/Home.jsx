import React from 'react'
import { useSelector } from 'react-redux';
import Spinner from '../components/shared/Spinner';


const Home = () => {

  const {loading} = useSelector((state) => state.auth);

  return (
   <>
   {
    loading ? <Spinner /> : (
      <h1>HomePage</h1>
    )
   }
   </>
   
  )
}

export default Home