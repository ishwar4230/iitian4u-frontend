import React from "react";
import { Carousel } from "@mantine/carousel";
import { Card, Text, Button, Image, Center, Stack } from "@mantine/core";
import { IconArrowUpRight, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useMediaQuery } from "@mantine/hooks";
import linkedinLogo from '../tabs/data/linkdinLogo.png';

const TeamSlider = ({ teamHome }) => {
  
  const isMobile = useMediaQuery('(max-width: 768px)');
  const cardHeight = isMobile ? 600 : 570;

  return (
    <div style={{ maxWidth: "95%", margin: "auto" }}>
      <Carousel
        slideSize={{ base: "80%", sm: "40%", md: "25%" }}
        slideGap="md"
        loop
        height={cardHeight}
        withIndicators
        withControls
        nextControlIcon={
          <div style={controlStyle}>
            <IconChevronRight size={24} color="white" />
          </div>
        }
        previousControlIcon={
          <div style={controlStyle}>
            <IconChevronLeft size={24} color="white" />
          </div>
        }
        styles={{
          control: {
            background: "transparent",
            boxShadow: "none",
          },
          indicator: {
            backgroundColor: "grey",
          },
        }}
      >
        {teamHome.map((member, index) => (
          <Carousel.Slide key={index}>
            <Card
              shadow="lg"
              radius="md"
              padding="md"
              withBorder
              style={{
                textAlign: "center",
                height: cardHeight,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Center>
                <Image
                  src={member.image}
                  alt={member.name}
                  radius="100%"
                  width={150}
                  height={150}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              </Center>

              <Stack spacing="xs" mt="md">
                <Text fw={700} size="lg">
                  {member.name}
                </Text>
                <Text fw={500} color="dimmed">
                  {member.college}
                </Text>
                <Text size="sm">{member.description}</Text>
              </Stack>

              <Button
                mt="md"
                fullWidth
                component="a"
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                color="blue"
                leftSection={
                  <Image src={linkedinLogo} width={30} height={25} alt="LinkedIn" />
                }
                rightSection={<IconArrowUpRight />}
              />
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

// Circle style for arrows
const controlStyle = {
  backgroundColor: "blue",
  borderRadius: "50%",
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default TeamSlider;
