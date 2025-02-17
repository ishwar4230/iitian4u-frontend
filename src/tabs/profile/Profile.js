import React from "react";
import { Container, Title, Tabs } from "@mantine/core";
import MyDetails from "./ProfileTabs/MyDetails";
import MyUpcomingSessions from "./ProfileTabs/MyUpcomingSessions";
import MyPlans from "./ProfileTabs/MyPlans";

const Profile = () => {
  return (
    <Container size="md">
      <Title align="center" mb="lg">Profile</Title>

      <Tabs defaultValue="details" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="details">My Details</Tabs.Tab>
          <Tabs.Tab value="sessions">My Upcoming Sessions</Tabs.Tab>
          <Tabs.Tab value="plans">My Plans</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="details">
          <MyDetails />
        </Tabs.Panel>
        <Tabs.Panel value="sessions">
          <MyUpcomingSessions />
        </Tabs.Panel>
        <Tabs.Panel value="plans">
          <MyPlans />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default Profile;
