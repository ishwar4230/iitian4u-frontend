import React, { useState } from 'react';
import { Button, TextInput, Select, Table, Container, Title, Notification, Loader, Divider } from '@mantine/core';
import axios from 'axios';
import config from '../../Config';

const categories = ['OPEN', 'EWS', 'OBC-NCL', 'SC', 'ST', 'OPEN (PwD)', 'OBC-NCL (PwD)', 'SC (PwD)', 'EWS (PwD)', 'ST (PwD)'];
const genders = ['Gender-Neutral', 'Female-only (including Supernumerary)'];
const states = ['Punjab', 'Rajasthan', 'Madhya Pradesh', 'Uttar Pradesh', 'Tripura',
  'Kerala', 'Delhi', 'West Bengal', 'Goa ', 'Himachal Pradesh', 'Karnataka',
  'Meghalaya', 'Nagaland', 'Bihar', 'Puducherry', 'Chhattisgarh', 'Sikkim'
  , 'Arunachal Pradesh', 'Jharkhand', 'Haryana', 'Manipur', 'Mizoram', 'Odisha'
  , 'Assam', 'Jammu & Kashmir', 'Tamil Nadu', 'Uttarakhand', 'Telangana', 'Gujarat'
  , 'Maharashtra', 'Andhra Pradesh', 'Chandigarh']; // Add more as needed

const Predictor = () => {
  const [mobile, setMobile] = useState('');
  const [jeeMainsRank, setJeeMainsRank] = useState('');
  const [jeeAdvRank, setJeeAdvRank] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [results, setResults] = useState({ iits: [], iiits: [], nits: [], gftis: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePredict = async () => {

    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!jeeMainsRank && !jeeAdvRank) {
      setError('Please enter at least one of JEE Mains Rank or JEE Advanced Rank');
      return;
    }

    setError('');
    setLoading(true);
    const newResults = { iits: [], iiits: [], nits: [], gftis: [] };
    let allFailed = true;

    try {
      // Save the data before making predictions
      try {
        await axios.post(`${config.API_PREFIX}/predictor/save-predict-data`, {
          mobile,
          jee_main_rank: jeeMainsRank || null,
          jee_adv_rank: jeeAdvRank || null,
          category: category || null,
          gender: gender || null,
          state: state || null
        });
        console.log("Data saved successfully");
      } catch (err) {
        console.error("Error saving prediction data:", err);
        setError('Failed to save your data. Please try again.');
        setLoading(false);
        return;
      }

      // IITs (requires Advanced Rank, Category, and Gender)
      if (jeeAdvRank && category && gender) {
        try {
          const { data } = await axios.get(`${config.API_PREFIX}/predictor/predict-iits`, {
            params: { jee_rank: jeeAdvRank, category, gender }
          });
          newResults.iits = data.sort((a, b) => a.closing_rank - b.closing_rank);
          if (data.length) allFailed = false;
        } catch (err) {
          console.log("IITs Fetch Error:", err);
        }
      }

      // IIITs (requires Mains Rank, Category, and Gender)
      if (jeeMainsRank && category && gender) {
        try {
          const { data } = await axios.get(`${config.API_PREFIX}/predictor/predict-iiits`, {
            params: { jee_rank: jeeMainsRank, category, gender }
          });
          newResults.iiits = data.sort((a, b) => a.closing_rank - b.closing_rank);
          if (data.length) allFailed = false;
        } catch (err) {
          console.log("IIITs Fetch Error:", err);
        }

        // NITs and GFTIs (require State as well)
        if (state) {
          try {
            const { data } = await axios.get(`${config.API_PREFIX}/predictor/predict-nits`, {
              params: { jee_rank: jeeMainsRank, category, gender, state }
            });
            newResults.nits = data.sort((a, b) => a.closing_rank - b.closing_rank);
            if (data.length) allFailed = false;
          } catch (err) {
            console.log("NITs Fetch Error:", err);
          }

          try {
            const { data } = await axios.get(`${config.API_PREFIX}/predictor/predict-gftis`, {
              params: { jee_rank: jeeMainsRank, category, gender, state }
            });
            newResults.gftis = data.sort((a, b) => a.closing_rank - b.closing_rank);
            // console.log(data);
            if (data.length) allFailed = false;
          } catch (err) {
            console.log("GFTIs Fetch Error:", err);
          }
        }
      }

      // If all requests failed, show error
      if (allFailed) {
        setError('Please fill all required fields to make predictions');
      }

      setResults(newResults);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderTable = (data, title) => (
    data.length > 0 && (
      <>
        <Title order={3} mt="md" mb="sm">{title}</Title>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <Table striped highlightOnHover withTableBorder withRowBorders withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Institute</Table.Th>
                <Table.Th>Program</Table.Th>
                <Table.Th>State</Table.Th>
                <Table.Th>Quota</Table.Th>
                <Table.Th>Opening Rank</Table.Th>
                <Table.Th>Closing Rank</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((item, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{item.institute}</Table.Td>
                  <Table.Td>{item.program}</Table.Td>
                  <Table.Td>{item.state || '-'}</Table.Td>
                  <Table.Td>{item.quota || '-'}</Table.Td>
                  <Table.Td>{item.opening_rank}</Table.Td>
                  <Table.Td>{item.closing_rank}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
        <Divider my="lg" />
      </>
    )
  );

  return (
    <Container>
      <Title order={2} my="md">College and Branch Predictor</Title>
      <TextInput label="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} mb="sm" placeholder="Enter 10-digit mobile number" required />
      <TextInput label="JEE Mains Rank (Category Rank)" value={jeeMainsRank} onChange={(e) => setJeeMainsRank(e.target.value)} mb="sm" />
      <TextInput label="JEE Advanced Rank (Category Rank)" value={jeeAdvRank} onChange={(e) => setJeeAdvRank(e.target.value)} mb="sm" />
      <Select label="Category" data={categories} value={category} onChange={setCategory} mb="sm" required />
      <Select label="Gender" data={genders} value={gender} onChange={setGender} mb="sm" required />
      <Select label="State" data={states.sort()} value={state} onChange={setState} mb="sm" />
      <Button onClick={handlePredict} fullWidth disabled={loading}>
        {loading ? <Loader size="sm" /> : 'Predict Colleges'}
      </Button>

      {error && <Notification color="red" title="Error" mt="md">{error}</Notification>}

      {renderTable(results.iits, 'IITs')}
      {renderTable(results.iiits, 'IIITs')}
      {renderTable(results.nits, 'NITs')}
      {renderTable(results.gftis, 'GFTIs')}
    </Container>
  );
};

export default Predictor;
