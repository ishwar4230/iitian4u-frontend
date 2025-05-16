import React, { useState, useEffect } from 'react';
import { Button } from '@mantine/core';
import axios from 'axios';
import * as XLSX from 'xlsx';
import config from "../Config"

const PredictorData = () => {
  const [predictorData, setPredictorData] = useState([]);

  // Fetch Predictor Data on Load
  useEffect(() => {
    const fetchPredictorData = async () => {
      try {
        const response = await axios.get(`${config.API_PREFIX}/admin/get-predictor-data`, {
          withCredentials: true, // to send cookies for authentication
        });
        setPredictorData(response.data.data);
      } catch (error) {
        console.error("Error fetching predictor data:", error);
      }
    };

    fetchPredictorData();
  }, []);

  // Function to export data to Excel
  const exportToExcel = () => {
    if (predictorData.length === 0) {
      alert("No data available to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(predictorData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Predictor Data");

    // Generate the Excel file
    XLSX.writeFile(workbook, `Predictor_Data_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div>
      <Button variant="gradient" gradient={{ from: 'teal', to: 'blue' }} onClick={exportToExcel}>
        Export to Excel
      </Button>
    </div>
  );
};

export default PredictorData;
