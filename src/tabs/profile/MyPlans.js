import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, Container, Title, Loader, Text } from "@mantine/core";
import config from "../../Config";

const MyPlans = () => {
  const [activePlans, setActivePlans] = useState([]);
  const [expiredPlans, setExpiredPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_PREFIX = config.API_PREFIX;

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const activeRes = await axios.get(`${API_PREFIX}/plan/get-active-plans`, { withCredentials: true });
      setActivePlans(activeRes.data.activePlans);

      const expiredRes = await axios.get(`${API_PREFIX}/plan/get-expired-plans`, { withCredentials: true });
      setExpiredPlans(expiredRes.data.expiredPlans);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setLoading(false);
    }
  };

  if (loading) return <Loader size="xl" />;

  return (
    <Container>
      <Title mb="lg">My Plans</Title>
      <Accordion>
        <Accordion.Item value="active">
          <Accordion.Control>Active Plans</Accordion.Control>
          <Accordion.Panel>
            {activePlans.length === 0 ? <Text>No active plans.</Text> : 
              activePlans.map((plan, index) => (
                <Text key={index}>{plan.course_type} - {plan.course_name} ({plan.plan_type}) - {plan.remaining_slots} slots left</Text>
              ))
            }
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="expired">
          <Accordion.Control>Expired Plans</Accordion.Control>
          <Accordion.Panel>
            {expiredPlans.length === 0 ? <Text>No expired plans.</Text> : 
              expiredPlans.map((plan, index) => (
                <Text key={index}>{plan.course_type} - {plan.course_name} ({plan.plan_type})</Text>
              ))
            }
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default MyPlans;
