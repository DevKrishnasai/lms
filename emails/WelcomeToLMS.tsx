import { Role } from "@prisma/client";
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeToLMSProps {
  name: string;
  role: Role;
}

export const WelcomeToLMS = ({ name, role }: WelcomeToLMSProps) => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.BASE_URL;

  const isStudent = role === Role.STUDENT;

  return (
    <Html>
      <Head />
      <Preview>
        Welcome to YourLMS - Your Gateway to Learning Excellence!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerImageContainer}>
            <Img
              src={`${baseUrl}/banner.png`}
              width={600}
              height={200}
              alt="YourLMS Welcome Banner"
              style={headerImage}
            />
          </Section>
          <Section style={content}>
            <Heading style={heading}>Welcome to YourLMS, {name}!</Heading>
            <Text style={subheading}>
              Your journey to {isStudent ? "learning" : "teaching"} excellence
              starts here.
            </Text>
            <Section style={cardContainer}>
              <Row>
                <Column style={card}>
                  <Img
                    src={`${baseUrl}/icon-course.png`}
                    width={64}
                    height={64}
                    alt="Courses Icon"
                    style={icon}
                  />
                  <Text style={cardTitle}>
                    {isStudent ? "Access Courses" : "Create Courses"}
                  </Text>
                  <Text style={cardText}>
                    {isStudent
                      ? "Explore a wide range of courses tailored to your interests."
                      : "Design and manage engaging courses with our intuitive tools."}
                  </Text>
                </Column>
                <Column style={card}>
                  <Img
                    src={`${baseUrl}/icon-community.png`}
                    width={64}
                    height={64}
                    alt="Community Icon"
                    style={icon}
                  />
                  <Text style={cardTitle}>Join Our Community</Text>
                  <Text style={cardText}>
                    Connect with peers, share insights, and collaborate on
                    projects.
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column style={card}>
                  <Img
                    src={`${baseUrl}/icon-progress.png`}
                    width={64}
                    height={64}
                    alt="Progress Icon"
                    style={icon}
                  />
                  <Text style={cardTitle}>
                    {isStudent ? "Track Progress" : "Monitor Student Progress"}
                  </Text>
                  <Text style={cardText}>
                    {isStudent
                      ? "Visualize your learning journey and set achievable goals."
                      : "Gain insights into student performance and provide timely feedback."}
                  </Text>
                </Column>
                <Column style={card}>
                  <Img
                    src={`${baseUrl}/icon-support.png`}
                    width={64}
                    height={64}
                    alt="Support Icon"
                    style={icon}
                  />
                  <Text style={cardTitle}>Support</Text>
                  <Text style={cardText}>
                    Our dedicated team is here to assist you every step of the
                    way.
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section style={ctaContainer}>
              {isStudent ? (
                <Button href={`${baseUrl}/courses`} style={button}>
                  Get Started Now
                </Button>
              ) : (
                <Button href={`${baseUrl}/dashboard`} style={button}>
                  Create Your First Course
                </Button>
              )}
            </Section>
          </Section>
          <Section style={footerImageContainer}>
            <Img
              src={`${baseUrl}/footer.png`}
              width={600}
              height={100}
              alt="YourLMS Footer"
              style={footerImage}
            />
          </Section>
          <Text style={copyright}>
            © {new Date().getFullYear()} YourLMS | All Rights Reserved
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeToLMS;

const main = {
  backgroundColor: "#f0f4f8",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "100%",
  maxWidth: "600px",
};

const headerImageContainer = {
  marginBottom: "24px",
};

const headerImage = {
  borderRadius: "6px 6px 0 0",
  width: "100%",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "40px 24px",
  borderRadius: "6px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0 0 24px",
  color: "#1a202c",
};

const subheading = {
  fontSize: "18px",
  lineHeight: "26px",
  textAlign: "center" as const,
  margin: "0 0 40px",
  color: "#4a5568",
};

const cardContainer = {
  margin: "0 0 32px",
};

const card = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #e2e8f0",
  // margin: "0 0 16px",
  width: "50%",
};

const icon = {
  margin: "0 auto 16px",
  display: "block",
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: "bold",
  margin: "0 0 8px",
  textAlign: "center" as const,
  color: "#2d3748",
};

const cardText = {
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
  textAlign: "center" as const,
  color: "#4a5568",
};

const ctaContainer = {
  textAlign: "center" as const,
  margin: "32px 0 0",
};

const button = {
  backgroundColor: "#4F46E5",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "12px 24px",
  display: "inline-block",
};

const footerImageContainer = {
  marginTop: "24px",
};

const footerImage = {
  borderRadius: "0 0 6px 6px",
  width: "100%",
};

const copyright = {
  color: "#718096",
  fontSize: "12px",
  lineHeight: "24px",
  textAlign: "center" as const,
  marginTop: "24px",
};
