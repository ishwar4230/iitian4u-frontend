import React from "react";
import { Carousel } from "@mantine/carousel";
import { Card, Text, Button, Image, Center, Stack} from "@mantine/core";
import {IconArrowUpRight  } from '@tabler/icons-react'

const TeamSlider = ({ teamHome }) => {
  return (
    <div style={{ maxWidth: "95%", margin: "auto", padding: "20px" }}>
      <Carousel
        slideSize={{ base: "80%", sm: "40%", md: "25%" }} // Responsive size
        slideGap="md"
        loop
        height={500}
        withIndicators
        withControls
        styles={{
          indicator: {
            backgroundColor: "blue", // Change indicator color to blue
          },
        }}
      >
        {teamHome.map((member, index) => (
          <Carousel.Slide key={index}>
            <Card shadow="lg" radius="md" padding="md" withBorder style={{ textAlign: "center" }}>
              {/* Circular Image */}
              <Center>
                <Image
                  src={member.image}
                  alt={member.name}
                  radius="100%"
                  width={100}
                  height={100}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              </Center>

              {/* Details */}
              <Stack spacing="xs" mt="md">
                <Text fw={700} size="lg">
                  {member.name}
                </Text>
                <Text fw={500} color="dimmed">
                  {member.college}
                </Text>
                <Text size="sm">{member.description}</Text>
              </Stack>

              {/* Button */}
              <Button
                mt="md"
                fullWidth
                component="a"
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                color="blue"
                rightSection ={<IconArrowUpRight />}
              >
                Linkdin
              </Button>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default TeamSlider;
