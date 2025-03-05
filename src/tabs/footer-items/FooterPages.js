import React from 'react'
import { Card, Text, Title } from "@mantine/core";

export function About() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2}>About Us</Title>
      <Text mt="sm">We are committed to providing high-quality services...</Text>
      <Text mt="sm">Our team consists of experienced professionals...</Text>
    </Card>
  );
}

export function PrivacyPolicy() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2}>Privacy Policy</Title>
      <Text mt="sm">We value your privacy and ensure data security...</Text>
      <Text mt="sm">Our policy covers how we collect and use your data...</Text>
    </Card>
  );
}

export function RefundPolicy() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2}>Refund Policy</Title>
      <Text mt="sm">We offer refunds under specific conditions...</Text>
      <Text mt="sm">To request a refund, please contact support...</Text>
    </Card>
  );
}

export function FAQs() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2}>FAQs</Title>
      <Text mt="sm">Find answers to common questions...</Text>
      <Text mt="sm">For further assistance, reach out to our support team...</Text>
    </Card>
  );
}

export function TermsConditions() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2}>Terms & Conditions</Title>
      <Text mt="sm">By using our services, you agree to our terms...</Text>
      <Text mt="sm">Ensure to read and understand the policies...</Text>
    </Card>
  );
}

export function ContactUs() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2}>Contact Us</Title>
      <Text mt="sm">Feel free to reach out via email or phone...</Text>
      <Text mt="sm">Our support team is available 24/7...</Text>
    </Card>
  );
}
