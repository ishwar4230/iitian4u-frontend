import React, { useCallback, useState, useEffect } from "react";
import { Select, Button, Card, Text, Container, Grid, Loader, Modal, Center } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import config from "../../Config";

dayjs.extend(utc);
dayjs.extend(timezone);

const BookSlot = () => {
  const [plans, setPlans] = useState([]);
  const [courseType, setCourseType] = useState("");
  const [courseName, setCourseName] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchPlanLoading, setFetchPlanLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null); // Stores selected slot for confirmation
  const API_PREFIX = config.API_PREFIX;



  const fetchActivePlans = useCallback(async () => {
    try {
      setFetchPlanLoading(true);
      const response = await axios.get(`${config.API_PREFIX}/plan/get-active-plans`, { withCredentials: true });
      setPlans(response.data.activePlans);
      setFetchPlanLoading(false);
    } catch (error) {
      setFetchPlanLoading(false);
      console.error("Error fetching active plans:", error);
      setPlans([]);
    }
  }, []); // Empty dependency array ensures this function remains the same across renders

  useEffect(() => {
    fetchActivePlans();
  }, [fetchActivePlans]); // Runs only once when the component mounts

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_PREFIX}/slot/get-slots`, { withCredentials: true });
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
    setLoading(false);
  };

  const uniqueCourseTypes = [...new Set(plans.map(plan => plan.course_type.replace(/_/g, " ").toUpperCase()))];

  const filteredCourseNames = plans
    .filter(plan => plan.course_type.replace(/_/g, " ").toUpperCase() === courseType)
    .map(plan => plan.course_name.replace(/_/g, " ").toUpperCase());

  // Handle booking with modal confirmation
  const openBookingModal = (slot) => {
    setSelectedSlot(slot);
    setModalOpen(true);
  };

  const confirmBooking = async () => {
    if (!selectedSlot) return;
    try {
      const selectedCourseType = courseType.replace(/ /g, "_").toLowerCase();
      const selectedCourseName = courseName.replace(/ /g, "_").toLowerCase();

      await axios.post(
        `${API_PREFIX}/slot/book-slot`,
        { slot_id: selectedSlot._id, course_type: selectedCourseType, course_name: selectedCourseName },
        { withCredentials: true }
      );

      showNotification({ title: "Success", message: "Slot booked successfully!", color: "green" });
      setModalOpen(false);
      fetchSlots();
    } catch (error) {
      showNotification({ title: "Error", message: "Failed to book slot", color: "red" });
    }
  };
  if (fetchPlanLoading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <Container size="md">
      {/* Booking Confirmation Modal */}
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Confirm Booking" zIndex={2000}>
        {selectedSlot && (
          <Text>
            Are you sure you want to book this slot on{" "}
            <strong>{dayjs(selectedSlot.start_time).tz("Asia/Kolkata").format("DD MMM YYYY")}</strong> at{" "}
            <strong>{dayjs(selectedSlot.start_time).tz("Asia/Kolkata").format("hh:mm A")}</strong>?
          </Text>
        )}
        <Button color="green" fullWidth mt="md" onClick={confirmBooking}>
          Confirm Booking
        </Button>
      </Modal>

      {/* Check if user has an active plan */}
      {plans.length === 0 ? (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text weight={500} size="lg" align="center">No Active Plan</Text>
          <Text size="sm" align="center">Purchase a plan to book slots.</Text>
        </Card>
      ) : (
        <>
          {/* Course Type Dropdown */}
          <Select
            label="Select Course Type"
            placeholder="Choose a type"
            data={uniqueCourseTypes}
            value={courseType}
            onChange={setCourseType}
            mt="md"
          />

          {/* Course Name Dropdown */}
          {courseType && (
            <Select
              label="Select Course Name"
              placeholder="Choose a course"
              data={filteredCourseNames}
              value={courseName}
              onChange={setCourseName}
              mt="md"
            />
          )}

          {/* Fetch Slots Button */}
          {courseName && (
            <Button onClick={fetchSlots} mt="md" fullWidth>Get Available Slots</Button>
          )}

          {/* Show Slots */}
          {loading ? (
            <Center style={{ height: "40vh" }}>
              <Loader size="lg" />
            </Center>
          ) : (
            Object.entries(
              slots
                .sort((a, b) => new Date(a.start_time) - new Date(b.start_time)) // Sort slots by date
                .reduce((groupedSlots, slot) => {
                  const dateKey = dayjs(slot.start_time).tz("Asia/Kolkata").format("DD MMM YYYY");
                  if (!groupedSlots[dateKey]) groupedSlots[dateKey] = [];
                  groupedSlots[dateKey].push(slot);
                  return groupedSlots;
                }, {})
            ).map(([date, slotsForDate]) => (
              <div key={date}>
                <Text weight={600} size="md" mt="md">{date}</Text>
                <Grid>
                  {slotsForDate.map(slot => (
                    <Grid.Col span={6} key={slot._id}>
                      <Card shadow="sm" padding="sm" radius="md" withBorder>
                        <Text size="sm">{dayjs(slot.start_time).tz("Asia/Kolkata").format("hh:mm A")}</Text>
                        <Button mt="sm" fullWidth onClick={() => openBookingModal(slot)}>
                          Book Slot
                        </Button>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              </div>
            ))
          )}
        </>
      )}
    </Container>
  );
};

export default BookSlot;
