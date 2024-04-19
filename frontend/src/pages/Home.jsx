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
     {
      data ? 
      <table className="table align-items-center ">

      <tbody>
      <tr className=''>
          <th className='ps-5 p-3' scope="col">BloodGroup</th>
          <th className='ps-5 p-3' scope="col">Inventory Type</th>
          <th className='ps-5 p-3' scope="col">Quantity</th>
          <th className='ps-5 p-3' scope="col">Email</th>
          <th className='ps-5 p-3' scope="col">Time & Date</th>
        </tr>
      {data && data.map((item) => (
          <tr key={item._id} className='text-center'>
          <td className='ps-5 p-3' >{item.bloodGroup}</td>
          <td className='ps-5 p-3'>{item.inventoryType}</td>
          <td className='ps-5 p-3'>{item.quantity} (ml)</td>
          <td className='ps-5 p-3'>{item?.email}</td>
          <td className='ps-5 p-3'>{moment(item.createdAt).format("DD/MM/YY hh:mm A")}</td>
        </tr>
        ))}
      </tbody>
    </table> :
    (<p className='m-3'>Loading...</p>)
     }

     <Modal />


   </Layout>
   
  )
}

export default Home