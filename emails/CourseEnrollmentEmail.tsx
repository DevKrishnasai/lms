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

interface CourseEnrollmentEmailProps {
  name: string;
  courseUrl: string;
  authorName: string;
  chapterCount: number;
  courseName: string;
}

const defaultCourseEnrollmentEmailProps: CourseEnrollmentEmailProps = {
  name: "John Doe",
  courseUrl: "https://yourlms.com/courses/123",
  authorName: "Jane Smith",
  chapterCount: 10,
  courseName: "Introduction to React",
};

export const CourseEnrollmentEmail = ({
  authorName,
  chapterCount,
  courseName,
  courseUrl,
  name,
}: CourseEnrollmentEmailProps) => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.BASE_URL;

  return (
    <Html>
      <Head />
      <Preview>You're enrolled! Start your learning journey now.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerImageContainer}>
            <Img
              src={`${baseUrl}/banner.png`}
              width={600}
              height={200}
              alt="YourLMS Course Enrollment"
              style={headerImage}
            />
          </Section>
          <Section style={content}>
            <Heading style={heading}>
              Welcome to Your New Course, {name}!
            </Heading>
            <Text style={subheading}>
              You've taken a great step towards expanding your knowledge. Let's
              get started!
            </Text>
            <Section style={courseInfoContainer}>
              <Row>
                <Column style={courseInfoColumn}>
                  <Img
                    src={`${baseUrl}/icon-course.png`}
                    width={64}
                    height={64}
                    alt="Course Icon"
                    style={icon}
                  />
                  <Text style={courseInfoTitle}>Course</Text>
                  <Text style={courseInfoText}>{courseName}</Text>
                </Column>
                <Column style={courseInfoColumn}>
                  <Img
                    src={`${baseUrl}/icon-author.png`}
                    width={64}
                    height={64}
                    alt="Author Icon"
                    style={icon}
                  />
                  <Text style={courseInfoTitle}>Instructor</Text>
                  <Text style={courseInfoText}>{authorName}</Text>
                </Column>
              </Row>
              <Row>
                <Column style={courseInfoColumn}>
                  <Img
                    src={`${baseUrl}/icon-chapters.png`}
                    width={64}
                    height={64}
                    alt="Chapters Icon"
                    style={icon}
                  />
                  <Text style={courseInfoTitle}>Chapters</Text>
                  <Text style={courseInfoText}>{chapterCount}</Text>
                </Column>
                <Column style={courseInfoColumn}>
                  <Img
                    src={`${baseUrl}/icon-certificate.png`}
                    width={64}
                    height={64}
                    alt="Certificate Icon"
                    style={icon}
                  />
                  <Text style={courseInfoTitle}>Certificate</Text>
                  <Text style={courseInfoText}>Upon Completion</Text>
                </Column>
              </Row>
            </Section>
            <Section style={ctaContainer}>
              <Button href={`${baseUrl}/${courseUrl}`} style={button}>
                Start Learning Now
              </Button>
            </Section>
            <Text style={encouragementText}>
              Remember, consistency is key in online learning. We recommend
              setting aside regular time for your studies. Happy learning!
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

export default CourseEnrollmentEmail;

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

const courseInfoContainer = {
  margin: "0 0 32px",
};

// const courseInfoRow = {
//   marginBottom: "24px",
// };

const courseInfoColumn = {
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

const courseInfoTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  margin: "0",
  textAlign: "center" as const,
  color: "#2d3748",
};

const courseInfoText = {
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
