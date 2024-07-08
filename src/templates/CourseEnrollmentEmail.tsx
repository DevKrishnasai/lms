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
  studentName?: string;
  email?: string;
  courseName?: string;
  dashboardLink?: string;
}

const baseUrl = process.env.BASE_URL ? process.env.BASE_URL : "";
export const CourseEnrollmentEmail = ({
  studentName,
  email,
  courseName,
  dashboardLink,
}: CourseEnrollmentEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Course Enrollment Confirmation</Preview>
      <Body style={main}>
        <Container>
          {/* <Section style={logo}>
            <Img src={`${baseUrl}/your-logo.png`} />
          </Section> */}

          <Section style={content}>
            <Row>
              <Img style={image} width={620} src={`${baseUrl}/banner.png`} />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Hi {studentName},
                </Heading>
                <Text style={paragraph}>
                  You have successfully enrolled in the course{" "}
                  <b>{courseName}</b>. Here are your enrollment details:
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Email: </b>
                  {email}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Course Name: </b>
                  {courseName}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  You can access the course dashboard using the following link:
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <a href={dashboardLink} style={{ color: "#007bff" }}>
                    {dashboardLink}
                  </a>
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0", textAlign: "center" }}>
              <Column style={containerButton} colSpan={2}>
                <a href={dashboardLink} style={button}>
                  Go to Dashboard
                </a>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img style={image} width={620} src={`${baseUrl}/footer.png`} />
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © {new Date().getFullYear()} | LMS | All Rights Reserved
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default CourseEnrollmentEmail;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
  textDecoration: "none",
  display: "inline-block",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
