import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Loader,
  TextInput,
  Button,
  Container,
  Group,
  Checkbox,
  Center,
  Card,
  Title,
  Stack,
  Divider,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconEdit, IconCheck } from "@tabler/icons-react";
import config from "../../Config";
import UserAvatar from "../../helpers/UserAvatar";

const MyDetails = () => {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [isCollegeStudent, setIsCollegeStudent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    age: "",
    college: "",
    college_year: "",
    school: "",
    school_class: "",
  });

  const fetchProfile = useCallback(async () => {
    try {
      const res = await axios.get(`${config.API_PREFIX}/api/profile`, {
        withCredentials: true,
      });

      const profileData = {
        name: res.data.name || "",
        phone: res.data.phone || "",
        email: res.data.email || "",
        gender: res.data.gender || "",
        age: res.data.age || "",
        college: res.data.college || "",
        college_year: res.data.college_year || "",
        school: res.data.school || "",
        school_class: res.data.school_class || "",
      };

      setFormData(profileData);
      setIsCollegeStudent(!!profileData.college);
      setLoading(false);
    } catch (error) {
      showNotification({
        id: "fetch-profile-error",
        title: "Error",
        message: `Error fetching profile: ${error.response?.data?.message}`,
        color: "red",
      });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`${config.API_PREFIX}/api/profile`, formData, {
        withCredentials: true,
      });
      setEditing(false);
      showNotification({
        title: "Profile Updated!",
        message: "Your profile has been updated successfully",
        color: "green",
      });
    } catch (error) {
      showNotification({
        title: "Error!",
        message: `Error while updating profile! ${error}`,
        color: "red",
      });
    }
  };

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <Container size="md" py="lg">
      <Card shadow="md" padding="lg" radius="md" withBorder>
        <Stack spacing="lg">
          {/* Profile Picture */}
          <Center>
            <UserAvatar name={formData.name} size={100} />
          </Center>

          {/* Title */}
          <Title align="center" order={2}>
            My Details
          </Title>

          <Divider />

          {/* College Student Checkbox */}
          <Checkbox
            label="I am a college student"
            checked={isCollegeStudent}
            onChange={(e) => setIsCollegeStudent(e.currentTarget.checked)}
            disabled={!editing}
          />

          {/* Profile Fields */}
          {Object.entries(formData).map(([key, value]) => {
            if (
              (isCollegeStudent && (key === "school" || key === "school_class")) ||
              (!isCollegeStudent && (key === "college" || key === "college_year")) 
            ) {
              return null;
            }

            return (
              <TextInput
                key={key}
                label={key.replace("_", " ").toUpperCase()}
                name={key}
                value={value}
                onChange={handleInputChange}
                disabled={!editing || key === "email"}
                variant={editing ? "default" : "filled"}
                radius="md"
                size="md"
                styles={(theme) => ({
                  input: !editing
                    ? {
                        backgroundColor: theme.colors.gray[1],
                        fontWeight: 500,
                        color: theme.black,
                      }
                    : {},
                })}
              />
            );
          })}

          {/* Edit & Update Buttons */}
          <Group position="apart">
            <Button
              variant="outline"
              leftSection={<IconEdit size={18} />}
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Cancel" : "Edit"}
            </Button>
            {editing && (
              <Button leftSection={<IconCheck size={18} />} onClick={handleUpdateProfile}>
                Update Profile
              </Button>
            )}
          </Group>
        </Stack>
      </Card>
    </Container>
  );
};

export default MyDetails;
