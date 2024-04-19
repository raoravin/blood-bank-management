import React, { useEffect, useState } from 'react'

import Layout from "../components/shared/layout/Layout"
import moment from 'moment'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Donation = () => {
    const [data,setData] = useState("");

    const {user} = useSelector(state => state.auth)

    const getDonars = async () => {
        try {
          const config = {
            withCredentials: true, // Include this option to send credentials with the request
          };
          const {data} = await axios.post("http://localhost:8080/api/v1/inventory/get-inventory-hospital",{
            filters:{
                inventoryType:'in',
                donar: user?._id,
            }
          },config)
         setData(data.inventories)
        } catch (error) {
          console.log(error)
        }
      }
    
      useEffect(() => {
        getDonars();
      },[])
  return (
    <Layout>
    {
  data ? 
 <div>
     <table className="table align-items-center ">

<tbody>
<tr className=''>
    <th className='ps-5 p-3' scope="col">Blood Group</th>
    <th className='ps-5 p-3' scope="col">Inventory Type</th>
    <th className='ps-5 p-3' scope="col">Quantity</th>
    <th className='ps-5 p-3' scope="col">email</th>
    <th className='ps-5 p-3' scope="col">Time & Date</th>
  </tr>
{data && data.map((item) => (
    <tr key={item._id} className='text-center'>
    <td className='ps-5 p-3' >{item.bloodGroup|| item.organisationName + "(ORG)"}</td>
    <td className='ps-5 p-3'>{item.inventoryType}</td>
    <td className='ps-5 p-3'>{item?.quantity}</td>
    <td className='ps-5 p-3'>{item?.email}</td>
    <td className='ps-5 p-3'>{moment(item.createdAt).format("DD/MM/YY hh:mm A")}</td>
  </tr>
  ))}
</tbody>
</table> 
 </div>:
(<p className='m-3'>Loading...</p>)
 }
</Layout>
  )
}

export default Donation