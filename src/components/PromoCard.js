import React from 'react';
import { Card, Image, Text, Button, Flex, Title, Divider } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import iit_image_mobile from "../tabs/data/iit_image_mobile.jpg";
import iit_image_laptop from "../tabs/data/iit_image_laptop.svg";
const PromoCard = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detect mobile screens
  return (
    <Card shadow="md" radius="md" withBorder p="lg" style={{ maxWidth: '100%', margin: 'auto' }}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        gap="md"
        style={{ minHeight: 300 }}
      >
        {/* Image Section */}
        <Image
          src={isMobile?iit_image_mobile:iit_image_laptop}
          height={300}
          width="100%"
          alt="Predict your future"
          style={{ objectFit: 'cover', flex: 1 }}
        />

        {/* Text and Button Section */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          p="md"
          style={{ flex: 1 }}
        >
          <Title order={3} align="center" mb="sm">
            Discover Your Future with Our College-Predictor
          </Title>
          
          <Divider my="md" style={{ width: '80%' }} />

          <Text size="sm" align="center" color="dimmed" mb="md">
            Take control of your future. Use our JEE College and Branch Predictor to find the best options for your rank and category.
            Explore the possibilities and plan your next big move!
          </Text>

          <Button 
            variant="gradient" 
            gradient={{ from: 'teal', to: 'blue' }} 
            size="md" 
            onClick={() => navigate('/predictor')}
            fullWidth
            style={{ maxWidth: 200 }}
          >
            College Predictor
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default PromoCard;
