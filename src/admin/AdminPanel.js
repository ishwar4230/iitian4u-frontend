import { useState, useEffect, useRef } from "react";
import { Tabs, Button, Container, Text, Paper, PasswordInput, TextInput, Stack, Group } from "@mantine/core";
import JSONInput from "react-json-editor-ajrm";
import { IconSkull } from "@tabler/icons-react";
import locale from "react-json-editor-ajrm/locale/en";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { defaultJsons } from "./defaultJsons";
import config from "../Config";
import PredictorData from "./predictorData";
import UserDataViewer from "./UserDataViewer";

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("addSlot");
  const [jsonData, setJsonData] = useState(defaultJsons.addSlot);
  const [fetchedData, setFetchedData] = useState(null);
  const [adminId, setAdminId] = useState("");
  const [adminPwd, setAdminPwd] = useState("");
  const jsonRef = useRef(defaultJsons.addSlot);

  const endpoint = {
    addSlot: "add-slot",
    addCourse: "add-course",
    addPlan: "add-plan",
    addPrice: "add-price",
    addUserPlan: "add-userplan",
    viewData: "get-upcoming-sessions",
    deleteOldSlots: "delete-old-slots"
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
    setJsonData(defaultJsons[tab] || {});
    jsonRef.current = defaultJsons[tab] || {};
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${config.API_PREFIX}/admin/${endpoint[activeTab]}`,
        jsonRef.current,
        { withCredentials: true }
      );
      notifications.show({ title: "Success", message: res.data.message, color: "green" });
    } catch (error) {
      notifications.show({ title: "Error", message: error.response?.data?.error || "Failed to submit", color: "red" });
    }
  };

  const handleFetchData = async () => {
    try {
      const res = await axios.get(`${config.API_PREFIX}/admin/${endpoint.viewData}`, { withCredentials: true });
      setFetchedData(res.data);
    } catch (error) {
      notifications.show({ title: "Error", message: "Failed to fetch data", color: "red" });
    }
  };
  const handleDeleteUnusedSlots = async () => {
    try {
      const res = await axios.delete(`${config.API_PREFIX}/admin/${endpoint.deleteOldSlots}`, { withCredentials: true });
      notifications.show({ title: "Success", message: `${res.data.deletedCount} Unused slots deleted successfully!`, color: "green" });
    } catch (error) {
      notifications.show({ title: "Error", message: "Failed to delete unused slots", color: "red" });
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
          <Tabs.Tab value="viewData">View Data</Tabs.Tab>
          <Tabs.Tab value="dangerousActions">Dangerous Actions</Tabs.Tab>
          <Tabs.Tab value="predictorData">Predictor Data</Tabs.Tab>
          <Tabs.Tab value="getUserData">Get User Data</Tabs.Tab>
        </Tabs.List>

        {activeTab === "viewData" ? (
          <Tabs.Panel value="viewData">
            <Button onClick={handleFetchData}>Fetch Data</Button>
            {fetchedData && (
              <JSONInput
                id="view-json-editor"
                locale={locale}
                height="300px"
                width="100%"
                viewOnly
                placeholder={fetchedData}
              />
            )}
          </Tabs.Panel>
        ) :activeTab === "predictorData" ? (
          <Tabs.Panel value="predictorData">
            <PredictorData />
          </Tabs.Panel>
        ) : activeTab === "getUserData" ? (
          <Tabs.Panel value="getUserData">
            <UserDataViewer />
          </Tabs.Panel>
        ) : activeTab === "dangerousActions" ? (
          <Tabs.Panel value="dangerousActions">
            <Group mt="md">
              <Button color="red" leftSection={<IconSkull />} onClick={handleDeleteUnusedSlots}>
                Delete Unused Slots
              </Button>
            </Group>
          </Tabs.Panel>
        ) : (
          <Tabs.Panel value={activeTab}>
            <JSONInput
              id="json-editor"
              locale={locale}
              height="300px"
              width="100%"
              placeholder={jsonData}
              onBlur={(data) => {
                if (!data.error) {
                  setJsonData(data.jsObject);
                  jsonRef.current = data.jsObject;
                }
              }}
              colors={{
                background: "#f4f4f4",  // Light gray background
                default: "#333",        // Default text color (dark gray)
                keys: "#1E1E1E",        // Darker color for keys
                string: "#007acc",      // Blue for strings
                number: "#098658",      // Green for numbers
                colon: "#000",          // Black for colons
                keys_whiteSpace: "#1E1E1E" // Ensure key spacing is also dark
              }}
              style={{
                body: { fontSize: "18px" }, // Adjust the font size here
                labelColumn: { fontSize: "18px" }, // For the keys
                valueColumn: { fontSize: "18px" }, // For the values
              }}
            />
            <Group mt="md">
              <Button onClick={handleSubmit}>Submit</Button>
            </Group>
          </Tabs.Panel>
        )}
      </Tabs>
    </Container>
  );
};

export default AdminPanel;
