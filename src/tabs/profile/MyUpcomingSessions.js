import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Card, Container, Title, Loader, Text, Center } from "@mantine/core";
import config from "../../Config";

const MyUpcomingSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    try {
      const res = await axios.get(`${config.API_PREFIX}/session/get-user-sessions`, { withCredentials: true });
      setSessions(res.data.user_sessions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setLoading(false);
    }
  }, []); // Dependencies: Only re-create if API_PREFIX changes

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
    <Container>
      <Title mb="lg">My Upcoming Sessions</Title>
      {sessions.length === 0 ? <Text>No upcoming sessions found.</Text> :
        sessions.map((session, index) => (
          <Card key={index} shadow="sm" p="lg" mb="md">
            <Text><b>Course:</b> {session.course_type} - {session.course_name}</Text>
            <Text><b>Time:</b> {session.slot_time}</Text>
          </Card>
        ))
      }
    </Container>
  );
};

export default MyUpcomingSessions;
