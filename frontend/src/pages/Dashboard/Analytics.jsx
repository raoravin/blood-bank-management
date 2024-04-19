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
      const response = await axios.get(
        "http://localhost:8080/api/v1/analytics/blood-group-data",
        config
      );
      setBloodGroupData(response.data.bloodGroupData);
      console.log(response);
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

  console.log("Data:", data);

  return (
    <>
      <Header />
      <div className="card">
        <h5 className="card-header">Featured</h5>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
        </div>
      </div>

      <div>
        <h2>Blood Group Analytics</h2>
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
