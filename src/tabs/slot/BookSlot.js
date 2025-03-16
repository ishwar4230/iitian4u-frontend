import React, { useCallback, useState, useEffect } from "react";
import { Select, Button, Card, Text, Container, Grid, Loader, Modal, Center, Title, Stack } from "@mantine/core";
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
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const API_PREFIX = config.API_PREFIX;

  const fetchActivePlans = useCallback(async () => {
    try {
      setFetchPlanLoading(true);
      const response = await axios.get(`${config.API_PREFIX}/plan/get-active-plans`, { withCredentials: true });
      setPlans(response.data.activePlans);
    } catch (error) {
      showNotification({ title: "Error", message: `Error fetching active plans: ${error.response?.data?.message}`, color: "red" });
      setPlans([]);
    } finally {
      setFetchPlanLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivePlans();
  }, [fetchActivePlans]);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_PREFIX}/slot/get-slots`, { withCredentials: true });
      setSlots(response.data);
    } catch (error) {
      showNotification({ title: "Error", message: `Error fetching slots: ${error}`, color: "red" });
    } finally {
      setLoading(false);
    }
  };

  const uniqueCourseTypes = [...new Set(plans.map(plan => plan.course_type.replace(/_/g, " ").toUpperCase()))];
  const filteredCourseNames = [...new Set(plans
    .filter(plan => plan.course_type.replace(/_/g, " ").toUpperCase() === courseType)
    .map(plan => plan.course_name.replace(/_/g, " ").toUpperCase())
  )];

  const openBookingModal = (slot) => {
    setSelectedSlot(slot);
    setModalOpen(true);
  };

  const confirmBooking = async () => {
    if (!selectedSlot) return;
    setBookingLoading(true);
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
    } finally {
      setBookingLoading(false);
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
      <Title align="center" order={2} mt="md" mb="lg">Book Your Slot</Title>

      {/* Booking Confirmation Modal */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={<Title order={4}>Confirm Booking</Title>}
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        {selectedSlot && (
          <Text align="center" size="md">
            Are you sure you want to book this slot on <strong>{dayjs(selectedSlot.start_time).tz("Asia/Kolkata").format("DD MMM YYYY")}</strong> at <strong>{dayjs(selectedSlot.start_time).tz("Asia/Kolkata").format("hh:mm A")}</strong>?
          </Text>
        )}
        <Stack mt="md">
          <Button color="green" fullWidth onClick={confirmBooking} disabled={bookingLoading} loading={bookingLoading}>
            Confirm Booking
          </Button>
          <Button variant="outline" fullWidth color="gray" onClick={() => setModalOpen(false)}>Cancel</Button>
        </Stack>
      </Modal>

      {plans.length === 0 ? (
        <Card shadow="lg" padding="xl" radius="lg" withBorder align="center">
          <Text weight={600} size="lg">No Active Plan</Text>
          <Text size="sm">Purchase a plan to book slots.</Text>
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
            radius="md"
            withAsterisk
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
              radius="md"
              withAsterisk
            />
          )}

          {/* Fetch Slots Button */}
          {courseName && (
            <Button onClick={fetchSlots} mt="md" fullWidth radius="md" variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
              Get Available Slots
            </Button>
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
                <Title order={4} mt="lg" mb="sm">{date}</Title>
                <Grid>
                  {slotsForDate.map(slot => (
                    <Grid.Col span={6} key={slot._id}>
                      <Card shadow="md" padding="md" radius="md" withBorder style={{ transition: "transform 0.2s", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                        <Text size="sm">{dayjs(slot.start_time).tz("Asia/Kolkata").format("hh:mm A")}</Text>
                        <Button mt="sm" fullWidth variant="light" onClick={() => openBookingModal(slot)}>
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
