import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import Spinner from '../components/shared/Spinner';
import Layout from '../components/shared/layout/Layout';
import Modal from '../components/shared/modal/Modal';
import axios from 'axios';


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
        console.log(data);
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
     <h4 type="button" class="btn btn-secondary m-3 pe" data-bs-toggle="modal" data-bs-target="#staticBackdrop">+ Add Inventory</h4>
   <table className="table table-sm align-items-center ">
  <thead>
    <tr className='d-flex gap-5 ms-5'>
      <th scope="col">BloodGroup</th>
      <th scope="col">Inventory Type</th>
      <th scope="col">Quantity</th>
      <th scope="col">Donar Email</th>
      <th scope="col">Time & Date</th>
    </tr>
    {data && data.map((item) => (
      <tr key={item._id} className=' '>
      <th >{item.bloodGroup}</th>
      <td>{item.inventoryType}</td>
      <td>{item.quantity}</td>
      <td>{item.donarEmail}</td>
      <td>{item.date}</td>
    </tr>
    ))}
  </thead>
  <tbody>
    
  </tbody>
</table>

     <Modal />


   </Layout>
   
  )
}

export default Home