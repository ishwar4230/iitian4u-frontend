import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, Text, Button, Stack, Center } from "@mantine/core";

const ThankYou = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const courseType = searchParams.get("course_type");
    const courseName = searchParams.get("course_name");
    const planType = searchParams.get("plan_type");

    return (
        <Center style={{ height: "100vh" }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: 400, textAlign: "center" }}>
                <Stack>
                    <Text size="lg" fw={700} style={{ textTransform: "uppercase", color: "green" }}>
                        Payment Successful 🎉
                    </Text>
                    <Text fw={500}>Your purchase was successful. Below are your plan details:</Text>
                    <Text fw={600} style={{ textTransform: "uppercase" }}>
                        Course Type: {courseType}
                    </Text>
                    <Text fw={600} style={{ textTransform: "uppercase" }}>
                        Course Name: {courseName}
                    </Text>
                    <Text fw={600} style={{ textTransform: "uppercase" }}>
                        Plan Type: {planType}
                    </Text>
                    <Button fullWidth color="blue" size="md" onClick={() => navigate("/")}>
                        Go Back to Home
                    </Button>
                </Stack>
            </Card>
        </Center>
    );
};

export default ThankYou;
