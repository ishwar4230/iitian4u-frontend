import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader, TextInput, Button, Avatar, Container, Group, Checkbox } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import config from "../../Config";
const MyDetails = () => {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [isCollegeStudent, setIsCollegeStudent] = useState(false);
  const API_PREFIX = config.API_PREFIX;
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
    image: "",
  });

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_PREFIX}/api/profile`, { withCredentials: true });

      // Extract only relevant fields, setting empty values if missing
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
        image: res.data.image || "",
      };

      setFormData(profileData);
      setIsCollegeStudent(profileData.college); // If college exists, set as college student
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`${API_PREFIX}/api/profile`, formData, { withCredentials: true });
      setEditing(false);
      notifications.show({
        title: 'Profile Updated!',
        message: 'Your Profile is updated successfully',
        color: 'green',
      })
    } catch (error) {
      notifications.show({
              title: 'Error!',
              message: `Error while updating profile! ${error}`,
              color: 'red',
            })
        }
  };

  if (loading) return <Loader size="xl" />;

  return (
    <Container size="sm">

      {/* Profile Picture */}
      <Group position="center" mb="lg">
        <Avatar src={formData.image || "https://via.placeholder.com/150"} size={100} />
      </Group>

      {/* Student Type Checkbox */}
      <Checkbox
        label="I am a college student"
        checked={isCollegeStudent}
        onChange={(e) => setIsCollegeStudent(e.currentTarget.checked)}
        disabled={!editing}
        mb="md"
      />

      {/* Profile Fields */}
      {Object.entries(formData).map(([key, value]) => {
        // Conditionally show college/school fields
        if ((isCollegeStudent && (key === "school" || key === "school_class")) ||
            (!isCollegeStudent && (key === "college" || key === "college_year")) || key==='image') {
          return null;
        }

        return (
          <Group key={key} position="apart" mb="md">
            <TextInput
              label={key.replace("_", " ").toUpperCase()} // Format field labels
              name={key}
              value={value}
              onChange={handleInputChange}
              disabled={!editing || key === "phone"}
              style={{ flex: 1 }}
              variant={editing ? "default" : "filled"} // Use filled variant for better visibility
              styles={(theme) => ({
                input: !editing
                  ? { backgroundColor: theme.colors.gray[1], fontWeight: 600, color: theme.black }
                  : {}, // Darker background, bold text for non-editing mode
              })}
            />

          </Group>
        );
      })}

      {/* Edit & Update Buttons */}
      <Group position="apart" mt="lg" mb="lg">
        <Button variant="outline" onClick={() => setEditing(!editing)}>
          {editing ? "Cancel" : "Edit"}
        </Button>
        {editing && <Button onClick={handleUpdateProfile}>Update Profile</Button>}
      </Group>
    </Container>
  );
};

export default MyDetails;
