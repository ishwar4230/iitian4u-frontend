import React, { useState, useEffect, useCallback } from "react";
import { Card, Text, Badge, Button, Container, Title, Stack, Loader, Center, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../Config";

const MyPlans = () => {
  const [activePlans, setActivePlans] = useState([]);
  const [expiredPlans, setExpiredPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPlans = useCallback(async () => {
    try {
      const activeRes = await axios.get(`${config.API_PREFIX}/plan/get-active-plans`, { withCredentials: true });
      setActivePlans(activeRes.data.activePlans);

      const expiredRes = await axios.get(`${config.API_PREFIX}/plan/get-expired-plans`, { withCredentials: true });
      setExpiredPlans(expiredRes.data.expiredPlans);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <Container size="lg" mx="auto">
      <Title mb="lg">My Plans</Title>
      <Group spacing="lg" wrap="wrap" justify="center">
        {[...activePlans, ...expiredPlans].map((plan, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md" withBorder >
            <Stack spacing="sm" style={{ height: "100%", display: "flex", justifyContent: "space-between" }}>
              {/* Course Name & Active/Expired Badge */}
              <Group justify="flex-start">
                <Text fw={500} style={{ textTransform: "capitalize" }}>
                  {plan.course_type} - {plan.course_name.charAt(0).toUpperCase() + plan.course_name.slice(1)}
                </Text>
                <Badge
                  radius="sm"
                  c={activePlans.includes(plan) ? "black" : "white"}
                  color={activePlans.includes(plan) ? "green" : "#E01F1F"}
                >
                  {activePlans.includes(plan) ? "Active" : "Expired"}
                </Badge>
                <Badge radius="sm" color="grey">
                  {plan.plan_type.replace("_", " ")}
                </Badge>
              </Group>

              {/* Remaining Slots (Only for Active Plans) */}
              {activePlans.includes(plan) ? (
                <Text size="sm">Remaining Slots: {plan.remaining_slots}</Text>
              ):(
                <Text size="sm">Text TBD</Text>
              )}

              {/* Action Buttons */}
              {activePlans.includes(plan) ? (
                <Button
                  color="teal"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() => navigate(`/book-slot`)}
                >
                  Book Now
                </Button>
              ) : (
                <Button
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                  onClick={() =>
                    navigate(`/checkout?course_type=${plan.course_type}&course_name=${plan.course_name}&plan_type=${plan.plan_type}`)
                  }
                >
                  Renew Plan
                </Button>
              )}
            </Stack>
          </Card>
        ))}
      </Group>
    </Container>
  );
};

export default MyPlans;
