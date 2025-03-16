import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Title,
  Loader,
  Text,
  Center,
  Badge,
  Group,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconClock, IconBook } from "@tabler/icons-react";
import config from "../../Config";

const MyUpcomingSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    try {
      const res = await axios.get(
        `${config.API_PREFIX}/session/get-user-sessions`,
        { withCredentials: true }
      );
      setSessions(res.data.user_sessions);
      setLoading(false);
    } catch (error) {
      showNotification({
        id: "fetch-session-error",
        title: "Error",
        message: `Error fetching sessions: ${error.response?.data?.message}`,
        color: "red",
      });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <Container size="md" py="lg">
      <Title order={2} mb="lg" align="center">
        My Upcoming Sessions
      </Title>

      {sessions.length === 0 ? (
        <Center>
          <Text c="dimmed" size="lg">
            No upcoming sessions found.
          </Text>
        </Center>
      ) : (
        <Group spacing="md">
          {sessions.map((session, index) => (
            <Card
              key={index}
              shadow="md"
              radius="md"
              padding="lg"
              withBorder
              sx={{
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Group position="apart">
                <Badge
                  color="blue"
                  size="lg"
                  variant="filled"
                  leftSection={<IconBook size={16} />}
                >
                  {session.course_type} - {session.course_name}
                </Badge>
                <Badge color="green" size="lg" leftSection={<IconClock size={16} />}>
                  {session.slot_time}
                </Badge>
              </Group>
            </Card>
          ))}
        </Group>
      )}
    </Container>
  );
};

export default MyUpcomingSessions;
