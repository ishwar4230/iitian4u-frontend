import React, { useState } from "react";
import { Button, Group, Container, Title } from "@mantine/core";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import axios from "axios";
import config from "../Config";
import { notifications } from "@mantine/notifications";

const AdminDataViewer = () => {
    const [userData, setUserData] = useState({});
    const [paymentData, setPaymentData] = useState({});
    const [userPlanData, setUserPlanData] = useState({});

    const fetchData = async (endpoint, setData) => {
        try {
            const res = await axios.get(`${config.API_PREFIX}/admin/${endpoint}`, {
                withCredentials: true,
            });
            setData(res.data.data);
            notifications.show({
                title: "Success",
                message: `Fetched ${endpoint.replace(/-/g, " ")} successfully!`,
                color: "green",
            });
        } catch (error) {
            notifications.show({
                title: "Error",
                message: error.response?.data?.error || `Failed to fetch ${endpoint.replace(/-/g, " ")}`,
                color: "red",
            });
        }
    };

    return (
        <Container>
            <Title order={3} mb="md">Admin Data Viewer</Title>

            <Group mb="lg">
                <Button onClick={() => fetchData("get-all-users", setUserData)}>Fetch Users</Button>
                <Button onClick={() => fetchData("get-all-payments", setPaymentData)}>Fetch Payments</Button>
                <Button onClick={() => fetchData("get-all-userplans", setUserPlanData)}>Fetch User Plans</Button>
            </Group>

            {Object.keys(userData).length > 0 && (
                <>
                    <Title order={4} mb="md">Users Data</Title>
                    <JSONInput
                        id="user-data-viewer"
                        locale={locale}
                        height="300px"
                        width="100%"
                        viewOnly
                        placeholder={userData}
                    />
                </>
            )}

            {Object.keys(paymentData).length > 0 && (
                <>
                    <Title order={4} mt="xl" mb="md">Payments Data</Title>
                    <JSONInput
                        id="payment-data-viewer"
                        locale={locale}
                        height="300px"
                        width="100%"
                        viewOnly
                        placeholder={paymentData}
                    />
                </>
            )}

            {Object.keys(userPlanData).length > 0 && (
                <>
                    <Title order={4} mt="xl" mb="md">User Plans Data</Title>
                    <JSONInput
                        id="user-plan-data-viewer"
                        locale={locale}
                        height="300px"
                        width="100%"
                        viewOnly
                        placeholder={userPlanData}
                    />
                </>
            )}
        </Container>
    );
};

export default AdminDataViewer;
