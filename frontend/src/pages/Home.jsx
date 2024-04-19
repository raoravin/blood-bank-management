import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import Spinner from '../components/shared/Spinner';
import Layout from '../components/shared/layout/Layout';
import Modal from '../components/shared/modal/Modal';
import axios from 'axios'
import moment from "moment"


const Home = () => {
  const {loading,error} = useSelector((state) => state.auth);
  const [data, setData] = useState()
  
  const getBloodRecord= async() => {
    try {
      const config = {
        withCredentials: true, // Include this option to send credentials with the request
      };
      const {data} = await axios.get("http://localhost:8080/api/v1/inventory/get-inventory",config)
      if(data?.success) {
        setData(data?.inventories)
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getBloodRecord()
  },[])

  return (
   <Layout>
     <h4 type="button" className="btn btn-secondary m-3 pe" data-bs-toggle="modal" data-bs-target="#staticBackdrop">+ Add Inventory</h4>
    

     <Modal />


   </Layout>
   
  )
}

export default Home