import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/layout/Layout";
import axios from "axios";
import moment from "moment";

  const Hospital = () => {
    const [data, setData] = useState("");
    const getHospital = async () => {
      try {
        const config = {
          withCredentials: true, // Include this option to send credentials with the request
        };
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/inventory/get-hospital",
          config
        );

        setData(data.hospital);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getHospital();
    }, []);

    return (
      <Layout>
        {data ? (
          <table className="table align-items-center ">
            <tbody>
              <tr className="">
                <th className="ps-5 p-3" scope="col">
                  Name
                </th>
                <th className="ps-5 p-3" scope="col">
                  email
                </th>
                <th className="ps-5 p-3" scope="col">
                  phone
                </th>
                <th className="ps-5 p-3" scope="col">
                  Time & Date
                </th>
              </tr>
              {data &&
                data.map((item) => (
                  <tr key={item._id} className="text-center">
                    <td className="ps-5 p-3">
                      {item.hospitalName || item.organisationName + "(ORG)"}
                    </td>
                    <td className="ps-5 p-3">{item.email}</td>
                    <td className="ps-5 p-3">{item?.phone}</td>
                    <td className="ps-5 p-3">
                      {moment(item.createdAt).format("DD/MM/YY hh:mm A")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className="m-3">Loading...</p>
        )}
      </Layout>
    );
  };

export default Hospital;
