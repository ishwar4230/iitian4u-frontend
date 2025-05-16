import React, { useState } from 'react';
import { Button, TextInput, Select, Container, Title, Loader } from '@mantine/core';
import axios from 'axios';
import config from '../../Config';
import PredictorResults from './PredictorResults';
import { notifications } from "@mantine/notifications";
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

  const handlePredict = async () => {

    if (!/^\d{10}$/.test(mobile)) {
      notifications.show({
        title: "Error!",
        message: `Please enter a valid 10-digit mobile number`,
        color: "red",
      });
      return;
    }

    if (!jeeMainsRank && !jeeAdvRank) {
      notifications.show({
        title: "Error!",
        message: `Please enter at least one of JEE Mains Rank or JEE Advanced Rank`,
        color: "red",
      });
      return;
    }

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
        notifications.show({
          title: "Error!",
          message: `Failed to save your data. Please try again.`,
          color: "red",
        });
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
        notifications.show({
          title: "Error!",
          message: `Please fill all required fields to make predictions`,
          color: "red",
        });
      }

      setResults(newResults);
    } catch (err) {
      notifications.show({
        title: "Error!",
        message: `Something went wrong. Please try again.`,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  // const renderTable = (data, title) => (
  //   data.length > 0 && (
  //     <>
  //       <Title order={3} mt="md" mb="sm">{title}</Title>
  //       <div style={{ overflowX: 'auto', width: '100%' }}>
  //         <Table striped highlightOnHover withTableBorder withRowBorders withColumnBorders>
  //           <Table.Thead>
  //             <Table.Tr>
  //               <Table.Th>Institute</Table.Th>
  //               <Table.Th>Program</Table.Th>
  //               <Table.Th>State</Table.Th>
  //               <Table.Th>Quota</Table.Th>
  //               <Table.Th>Opening Rank</Table.Th>
  //               <Table.Th>Closing Rank</Table.Th>
  //             </Table.Tr>
  //           </Table.Thead>
  //           <Table.Tbody>
  //             {data.map((item, index) => (
  //               <Table.Tr key={index}>
  //                 <Table.Td>{item.institute}</Table.Td>
  //                 <Table.Td>{item.program}</Table.Td>
  //                 <Table.Td>{item.state || '-'}</Table.Td>
  //                 <Table.Td>{item.quota || '-'}</Table.Td>
  //                 <Table.Td>{item.opening_rank}</Table.Td>
  //                 <Table.Td>{item.closing_rank}</Table.Td>
  //               </Table.Tr>
  //             ))}
  //           </Table.Tbody>
  //         </Table>
  //       </div>
  //       <Divider my="lg" />
  //       <SimplePromoCard />
  //     </>
  //   )
  // );

  return (
    <Container>
      <Title order={2} my="md">College and Branch Predictor</Title>
      <TextInput label="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} mb="sm" placeholder="Enter Your mobile number" required />
      <Select label="Category" data={categories} value={category} onChange={setCategory} mb="sm" placeholder="Select Your Category" required />
      <TextInput label={category === 'OPEN' ? 'JEE Mains Rank (All India Rank)' : 'JEE Mains Rank (Category Rank)'} value={jeeMainsRank} onChange={(e) => setJeeMainsRank(e.target.value)} placeholder="Enter Your JEE Mains Rank" mb="sm" />
      <TextInput label={category === 'OPEN' ? 'JEE Advanced Rank (All India Rank)' : 'JEE Advanced Rank (Category Rank)'} value={jeeAdvRank} onChange={(e) => setJeeAdvRank(e.target.value)} placeholder="Enter Your JEE Advanced Rank" mb="sm" />
      <Select label="Gender" data={genders} value={gender} onChange={setGender} mb="sm" placeholder="Select Your Gender" required />
      <Select label="State" data={states.sort()} value={state} onChange={setState} mb="sm" placeholder="Select Your State" />
      <Button onClick={handlePredict} fullWidth disabled={loading}>
        {loading ? <Loader size="sm" /> : 'Predict Colleges'}
      </Button>


      {/* {renderTable(results.iits, 'IITs')}
      {renderTable(results.iiits, 'IIITs')}
      {renderTable(results.nits, 'NITs')}
      {renderTable(results.gftis, 'GFTIs')} */}
      <PredictorResults data={results.iits} title="IITs"
        imageSrc="https://media.licdn.com/dms/image/v2/D4D03AQH0wD2pgsOryA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724587407207?e=1752710400&v=beta&t=WrcMI3bUIqv2D9qGHCpYRcwAjaFa9dIrEIsp6JabuMU"
        mentorName="Sonu Kumar Rai"
        college="IIT Kharagpur"
      />
      <PredictorResults data={results.iiits} title="IIITs"
        imageSrc="https://media.licdn.com/dms/image/v2/C4D03AQFCSg78ospHXg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1620881056089?e=1752710400&v=beta&t=UsTMCr_lLd_oiZsvfkvAVQapDDOdwWaPFcvJzpTT6XY"
        mentorName="Preetish Behera"
        college="IIT Delhi"
      />
      <PredictorResults data={results.nits} title="NITs"
        imageSrc="https://media.licdn.com/dms/image/v2/D4D03AQEFg5NnevrZsw/profile-displayphoto-shrink_400_400/B4DZZrU1TrGgAk-/0/1745557346546?e=1752710400&v=beta&t=dveBogcrKIYheCjdZB4HFgoZDugAjJoPIFXSHfBzd_Q"
        mentorName="Apoorva"
        college="IIT Bombay"
      />
      <PredictorResults data={results.gftis} title="GFTIs"
        imageSrc="https://media.licdn.com/dms/image/v2/D5603AQE3VFdOsvwHzw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1665303466063?e=1752710400&v=beta&t=qYjrot-DPfB2MlFMlkI7fU6fI995wizWSfwSsLjpy7U"
        mentorName="Biswa Ranjan"
        college="IIT Kharagpur"
      />
    </Container>
  );
};

export default Predictor;
