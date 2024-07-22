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

interface CourseCompletionEmailProps {
  studentName: string;
  courseName: string;
  instructorName: string;
  certificateUrl: string;
  instructorPic: string;
}

// const defaultCourseCompletionEmailProps: CourseCompletionEmailProps = {
//   studentName: "John Doe",
//   courseName: "Introduction to React",
//   instructorName: "Jane Smith",
//   certificateUrl: "https://yourlms.com/certificates/123",
// };

export const CourseCompletionEmail = ({
  studentName,
  courseName,
  instructorName,
  certificateUrl,
  instructorPic,
}: CourseCompletionEmailProps) => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.BASE_URL;

  return (
    <Html>
      <Head />
      <Preview>Congratulations on completing your course!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerImageContainer}>
            <Img
              src={`${baseUrl}/banner.png`}
              width={600}
              height={200}
              alt="YourLMS Course Completion"
              style={headerImage}
            />
          </Section>
          <Section style={content}>
            <Heading style={heading}>Congratulations, {studentName}!</Heading>
            <Text style={subheading}>
              You've successfully completed your course. Here's your
              certificate!
            </Text>
            <Section style={certificateInfoContainer}>
              <Row>
                <Column style={certificateInfoColumn}>
                  <Img
                    src={`${baseUrl}/icon-course.png`}
                    width={64}
                    height={64}
                    alt="Course Icon"
                    style={icon}
                  />
                  <Text style={certificateInfoTitle}>Course</Text>
                  <Text style={certificateInfoText}>{courseName}</Text>
                </Column>
                <Column style={certificateInfoColumn}>
                  <Img
                    src={
                      instructorPic
                        ? `${instructorPic}`
                        : `${baseUrl}/icon-author.png`
                    }
                    width={64}
                    height={64}
                    alt="Instructor Icon"
                    style={icon}
                  />
                  <Text style={certificateInfoTitle}>Instructor</Text>
                  <Text style={certificateInfoText}>{instructorName}</Text>
                </Column>
              </Row>
            </Section>
            <Section style={ctaContainer}>
              <Button href={`${baseUrl}/${certificateUrl}`} style={button}>
                Download Your Certificate
              </Button>
            </Section>
            <Text style={encouragementText}>
              Your hard work and dedication have paid off. We hope this course
              has been valuable to you and wish you continued success in your
              learning journey!
            </Text>
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

export default CourseCompletionEmail;

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

const certificateInfoContainer = {
  margin: "0 0 32px",
};

const certificateInfoColumn = {
  padding: "16px",
  borderRadius: "6px",
  border: "1px solid #e2e8f0",
  margin: "0 8px",
  width: "50%",
};

const icon = {
  margin: "0 auto 16px",
  display: "block",
};

const certificateInfoTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0",
  textAlign: "center" as const,
  color: "#2d3748",
};

const certificateInfoText = {
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
  textAlign: "center" as const,
  color: "#4a5568",
};

const ctaContainer = {
  textAlign: "center" as const,
  margin: "32px 0 24px",
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

const encouragementText = {
  fontSize: "14px",
  lineHeight: "22px",
  textAlign: "center" as const,
  color: "#4a5568",
  fontStyle: "italic",
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
