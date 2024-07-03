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

interface StudentPortalAccessEmailProps {
  studentFirstName?: string;
  email?: string;
  password?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const StudentPortalAccessEmailAndPassword = ({
  studentFirstName,
  email,
  password,
}: StudentPortalAccessEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Student Portal Access Information</Preview>
      <Body style={main}>
        <Container>
          {/* <Section style={logo}>
            <Img src={`${baseUrl}/banner.png`} />
          </Section> */}

          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                // src={`${baseUrl}/banner.png`}
                src="https://static.vecteezy.com/system/resources/previews/009/671/503/original/lms-banner-web-illustration-concept-for-learning-management-system-with-icon-vector.jpg"
              />
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
                  Hi {studentFirstName},
                </Heading>
                <Text style={paragraph}>
                  Here are your credentials to access the student portal:
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Email: </b>
                  {email}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Password: </b>
                  {password}
                </Text>
                <Text style={paragraph}>
                  Please use the provided credentials to log in and access your
                  portal.
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button style={button}>Log In to Portal</Button>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              src="https://react-email-demo-7c9zprjny-resend.vercel.app/static/yelp-footer.png"
              // src={`${baseUrl}/footer.png`}
            />
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © {new Date().getFullYear()} | LMS | Remote | www.localhost.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default StudentPortalAccessEmailAndPassword;

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
