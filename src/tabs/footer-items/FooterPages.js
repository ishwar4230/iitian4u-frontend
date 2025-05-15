import React from 'react'
import { Card, Text } from "@mantine/core";


export function About() {
  return (
    <Card shadow="sm" radius="md" withBorder style={{ width: "80%", margin: "0 auto" }} padding="5%">
      <Text size="xl" ta="center" fw={1000}>About Us</Text>
      <Text mt="sm">
        At <b>IITians4u</b>, we are a team of <b>IITians</b> committed to guiding JEE aspirants, engineering
        students, and college applicants at every stage. From <b>strategic JEE preparation</b> and
        <b> personalized JoSAA counselling</b> to <b>career mentorship in specialized domains</b>, we
        provide expert support to help you make informed decisions. Whether you’re striving for
        a top JEE rank, selecting the right college, or shaping your career, <b>we’ve been there
          and we’re here to help you succeed</b>.
      </Text>
    </Card>
  );
}

export function PrivacyPolicy() {
  return (
    <Card shadow="sm" radius="md" withBorder style={{ width: "80%", margin: "0 auto" }} padding="5%">
      <Text size="xl" ta="center" fw={1000}>Privacy Policy</Text>
      <Text mt="sm">
        At IITians4u, we prioritize your privacy and are committed to safeguarding your personal
        information. Any data you provide, including your name, contact details, and
        preferences, is collected solely to enhance your mentorship experience. We do not sell,
        trade, or share your information with third parties without your consent. Our platform
        follows strict security protocols to ensure your data remains protected.
      </Text>
      <Text mt="sm">
        We may use your information to personalize your experience, improve our services, and
        communicate important updates. By using our website, you agree to our privacy
        practices. If you have any concerns or questions regarding data protection, please feel
        free to reach out to us.
      </Text>
    </Card>
  );
}

export function RefundPolicy() {
  return (
    <Card shadow="sm" radius="md" withBorder style={{ width: "80%", margin: "0 auto" }} padding="5%">
      <Text size="xl" ta="center" fw={1000}>Refund Policy</Text>
      <Text mt="sm">
        At IITians4u, we strive to provide the best mentorship experience. However, we
        understand that circumstances may require you to cancel your subscription.
      </Text>
      <Text mt="sm">
        For short-term plans (less than monthly plans), no refunds will be provided. In
        exceptional cases, refund requests may be considered at the discretion of our admin
        team, whose decision will be final.
      </Text>
      <Text mt="sm">
        For long-term plans, if you cancel before completing 50% of your plan, the remaining
        amount will be refunded after deducting a convenience fee. If you cancel after completing
        50% but before 75% of your plan, 50% of the remaining fees will be refunded after
        deducting the convenience fee. If you cancel after completing 75% of your plan, only 10%
        of the remaining fees will be refunded after deducting the convenience fee.
      </Text>
      <Text mt="sm">
        All refunds will be processed within <b>14 business days</b> post refund request. For any refund-related
        queries, please contact our support team.
      </Text>
    </Card>
  );
}


export function TermsConditions() {
  return (
    <Card shadow="sm" radius="md" withBorder style={{ width: "80%", margin: "0 auto" }} padding="5%">
      <Text size="xl" ta="center"  fw={1000}>Terms and Conditions</Text>
      <Text mt="sm">
        Welcome to IITians4u. By accessing and using our website and services, you agree to
        comply with the following terms and conditions. Please read them carefully.
      </Text>
      <Text mt="sm">
        1. Use of Services<br />
        Our platform provides mentorship for JEE aspirants, JoSAA counselling, and career
        guidance. The information and advice shared are based on expert insights but should not
        be considered absolute guarantees of success. Users are responsible for their own
        decisions and actions.
      </Text>
      <Text mt="sm">
        2. Account and Payment
        <br />
        To access certain services, users may be required to create an account and provide
        accurate information. Subscription fees must be paid as per the selected plan, and
        refunds will be processed according to our Refund Policy. Any unauthorized use of
        another person’s account is strictly prohibited.
      </Text>
      <Text mt="sm">
        3. Code of Conduct
        <br />
        Users must interact respectfully with mentors and other community members. Any
        misuse, harassment, or inappropriate behavior will result in account suspension or
        termination without a refund. We reserve the right to take necessary actions in case of
        violations.
      </Text>
      <Text mt="sm">
        4. Intellectual Property <br />
        All content, including study materials, strategies, and counseling insights provided on
        this platform, is the intellectual property of IITians4u. Unauthorized sharing,
        reproduction, or distribution of this content without permission is prohibited.
      </Text>
      <Text mt="sm">
        5. Limitation of Liability
        <br />
        While we aim to provide accurate and effective guidance, IITians4u is not responsible for
        any personal, academic, or financial consequences arising from the use of our services.
        Our platform serves as a support system, and ultimate success depends on the user's
        effort and execution.
      </Text>
      <Text mt="sm">
        6. Modifications to Services and Terms
        <br />
        We reserve the right to modify or discontinue any part of our services without prior
        notice. Terms and conditions may also be updated, and continued use of the platform
        signifies acceptance of any changes.
      </Text>
      <Text mt="sm">
        For any queries regarding these terms, please contact our support team.
      </Text>
    </Card>
  );
}

export function ContactUs() {
  return (
    <Card shadow="sm" radius="md" withBorder ta="center" style={{ width: "80%", margin: "0 auto" }} padding="5%">
      <Text size="xl" fw={1000}>Contact Us</Text>
      <Text mt="sm">
        For support and queries, feel free to reach out to us through the platforms below!
      </Text>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "80%", margin: "auto", maxWidth: "250px" }}>
        <a href="https://www.instagram.com/iitians_4_u/" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width="50" />
        </a>
        <a href="https://www.youtube.com/@IITians_4_u" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" width="60" />            </a>
        <a href="mailto:admin@iitians4u.in" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png" alt="Mail" width="60" />
        </a>
        
      </div>
      <div>
        <p>Or Feel Free to reach out to us at</p>
        <p> <b>Mob No.</b> : +91 8114325164, +91 8092775996</p>
        <p><b>Email ID</b> : admin@iitians4u.in</p>
        <p><b>Address</b> : IIT Kharagpur campus, Kharagpur, West Bengal, 721302</p>
      </div>
    </Card>
  );
}
