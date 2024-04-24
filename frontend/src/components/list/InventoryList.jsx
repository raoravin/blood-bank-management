import React from 'react'

const InventoryList = () => {
  const getDonars = async () => {
    try {
      const config = {
        withCredentials: true, // Include this option to send credentials with the request
      };
      const {data} = await axios.post("http://localhost:8080/api/v1/inventory/get-inventory-hospital",{
        filters:{
            inventoryType:'out',
            hospital: user?._id,
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
    <div>
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
    </div>
  )
}

export default InventoryList