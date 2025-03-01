import { useState, useEffect, useRef } from "react";
import { Tabs, Button, Container, Text, Paper, PasswordInput, TextInput, Stack, Group } from "@mantine/core";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { defaultJsons } from "./defaultJsons";
import config from "../Config";

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("addSlot");
  const [jsonData, setJsonData] = useState(defaultJsons.addSlot);
  const [adminId, setAdminId] = useState("");
  const [adminPwd, setAdminPwd] = useState("");

  // To keep track of the latest JSON value
  const jsonRef = useRef(defaultJsons.addSlot);

  const endpoint = {
    addSlot: "add-slot",
    addCourse: "add-course",
    addPlan: "add-plan",
    addPrice: "add-price",
    addUserPlan: "add-userplan",
  };

  useEffect(() => {
    axios
      .get(`${config.API_PREFIX}/admin/verify-admin-token`, { withCredentials: true })
      .then((res) => setIsAdmin(res.data.isAdmin))
      .catch(() => setIsAdmin(false));
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${config.API_PREFIX}/admin/admin-login`,
        { adminId, adminPwd },
        { withCredentials: true }
      );
      if (res.data.message === "Login successful") {
        setIsAdmin(true);
        notifications.show({ title: "Success", message: "Admin logged in!", color: "green" });
      }
    } catch (error) {
      notifications.show({ title: "Error", message: "Invalid credentials", color: "red" });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setJsonData(defaultJsons[tab]);
    jsonRef.current = defaultJsons[tab]; // Reset JSON editor value when tab changes
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${config.API_PREFIX}/admin/${endpoint[activeTab]}`,
        jsonRef.current, // Use the latest JSON value
        { withCredentials: true }
      );
      notifications.show({ title: "Success", message: res.data.message, color: "green" });
    } catch (error) {
      notifications.show({ title: "Error", message: "Failed to submit", color: "red" });
    }
  };

  if (!isAdmin) {
    return (
      <Container size="xs">
        <Paper withBorder p="lg" shadow="md">
          <Stack>
            <Text size="lg" weight={500} align="center">Admin Login</Text>
            <TextInput label="Admin ID" value={adminId} onChange={(e) => setAdminId(e.target.value)} />
            <PasswordInput label="Password" value={adminPwd} onChange={(e) => setAdminPwd(e.target.value)} />
            <Button onClick={handleLogin}>Login</Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Tab value="addSlot">Add Slot</Tabs.Tab>
          <Tabs.Tab value="addCourse">Add Course</Tabs.Tab>
          <Tabs.Tab value="addPlan">Add Plan</Tabs.Tab>
          <Tabs.Tab value="addPrice">Add Price</Tabs.Tab>
          <Tabs.Tab value="addUserPlan">Add User Plan</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={activeTab}>
          <JSONInput
            id="json-editor"
            locale={locale}
            height="300px"
            width="100%"
            placeholder={jsonData}
            onChange={(data) => {
              if (!data.error) {
                setJsonData(data.jsObject); // Update the state
                jsonRef.current = data.jsObject; // Update the ref
              }
            }}
            colors={{ background: "#f4f4f4" }}
          />
          <Group mt="md">
            <Button onClick={handleSubmit}>Submit</Button>
          </Group>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default AdminPanel;