import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Header from "../../components/shared/layout/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BloodGroupAnalytics = () => {
  const [bloodGroupData, setBloodGroupData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/analytics/blood-group-data",
        config
      );
      setBloodGroupData(data.bloodGroupData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Blood Group Analytics",
      },
    },
  };

  const labels = bloodGroupData.map((data) => data.bloodGroup);
  const totalInData = bloodGroupData.map((data) => data.totalIn);
  const totalOutData = bloodGroupData.map((data) => data.totalOut);
  const availableBloodData = bloodGroupData.map((data) => data.availableBlood);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total In",
        data: totalInData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Out",
        data: totalOutData,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Available Blood",
        data: availableBloodData,
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Header />
      
         <div className="flex flex-row flex-wrap w-full ms-28 mb-5">
        {Array.isArray(bloodGroupData) ? (
          bloodGroupData.map((records) => (
            <div className="w-full max-w-sm m-3 p-3 bg-stone-500 border border-gray-200 rounded-lg shadow  dark:border-gray-700">
              <div className="flex flex-col items-center ">
                <div className="w-60 h-10 mt-2 bg-red-500 text-white mb-3 d-flex items-center justify-center shadow-sm">
                  <h1>{records.bloodGroup}</h1>
                </div>
                {/* <p class="text-sm font-medium text-gray-900 truncate ">
                  blood In : {records.totalIn} ml
                </p>
                <p class="text-sm font-medium text-gray-900 truncate ">
                  blood In : {records.totalOut}
                </p> */}
                <div className="flex mt-4 md:mt-6">
                  <a
                    href="#"
                    className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-green-500 rounded-lg border border-gray-200  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 "
                  >
                    Blood Available : {records.availableBlood} ml
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>

      <div className=" flex flex-col items-center justify-center">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>

    </>
  );
};

export default BloodGroupAnalytics;
