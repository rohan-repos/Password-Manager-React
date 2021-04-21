import React, { useEffect } from "react";
import Header from "./header/Header";
import Display from "./display/Display";
import DisplayStrength from "../passwordstrengthchecker/DisplayStrength";
import { Tabs, Tab, Container, Card, ListGroup } from "react-bootstrap";

const Main = () => {
  const contStyle = {
    display: "flex",
    // alignItems:"center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container style={contStyle}>
      <Card>
        <div style={{ maxWidth: "1200px" }}>
          <Tabs
            defaultActiveKey="generatepassword"
            id="uncontrolled-tab-example"
          >
            <Tab eventKey="generatepassword" title="Generate Password">
              <Header />
              <Display />
            </Tab>
            <Tab eventKey="passwordchecker" title="Password Checker">
              <DisplayStrength />
            </Tab>
            <Tab eventKey="passwordtips" title="Security Tips">
              <ListGroup>
                <ListGroup.Item>
                  Do not use the same password, security question and answer for
                  multiple important accounts.
                </ListGroup.Item>
                <ListGroup.Item>
                  Use a password that has at least 16 characters, use at least
                  one number, one uppercase letter, one lowercase letter and one
                  special symbol.
                </ListGroup.Item>
                <ListGroup.Item>
                  Do not use the names of your families, friends or pets in your
                  passwords.
                </ListGroup.Item>
                <ListGroup.Item>
                  Do not use postcodes, house numbers, phone numbers,
                  birthdates, ID card numbers, social security numbers, and so
                  on in your passwords.
                </ListGroup.Item>
                <ListGroup.Item>
                  Do not use any dictionary word in your passwords. Examples of
                  strong passwords: ePYHc~dS*)8$+V-' , qzRtC6rXN3N\RgL ,
                  zbfUMZPE6`FC%)sZ. Examples of weak passwords: qwert12345,
                  Gbt3fC79ZmMEFUFJ, 1234567890, 987654321, nortonpassword.
                </ListGroup.Item>
                <ListGroup.Item>
                  Do not use two or more similar passwords which most of their
                  characters are same, for example, ilovefreshflowersMac,
                  ilovefreshflowersDropBox, since if one of these passwords is
                  stolen, then it means that all of these passwords are stolen.
                </ListGroup.Item>
                <ListGroup.Item>
                  Do not use something that can be cloned( but you can't change
                  ) as your passwords, such as your fingerprints.
                </ListGroup.Item>
                <ListGroup.Item>
                  Do not let your Web browsers( FireFox, Chrome, Safari, Opera,
                  IE, Microsoft Edge ) to store your passwords, since all
                  passwords saved in Web browsers can be revealed easily.
                </ListGroup.Item>
                <ListGroup.Item>
                  Do not log in to important accounts on the computers of
                  others, or when connected to a public Wi-Fi hotspot, Tor, free
                  VPN or web proxy.
                </ListGroup.Item>
                <ListGroup.Item>
                  Do not send sensitive information online via unencrypted( e.g.
                  HTTP or FTP ) connections, because messages in these
                  connections can be sniffed with very little effort. You should
                  use encrypted connections such as HTTPS, SFTP, FTPS, SMTPS,
                  IPSec whenever possible.
                </ListGroup.Item>
                <ListGroup.Item>
                  It's recommended to change your passwords every 10 weeks.
                </ListGroup.Item>
                <ListGroup.Item>
                  Encrypt and backup your passwords to different locations, then
                  if you lost access to your computer or account, you can
                  retrieve your passwords back quickly.
                </ListGroup.Item>
                <ListGroup.Item>
                  Access important websites( e.g. Paypal ) from bookmarks
                  directly, otherwise please check its domain name carefully,
                  it's a good idea to check the popularity of a website with
                  Alexa toolbar to ensure that it's not a phishing site before
                  entering your password.
                </ListGroup.Item>
                <ListGroup.Item>
                  Access important websites in private or incognito mode, or use
                  one Web browser to access important websites, use another one
                  to access other sites. Or access unimportant websites and
                  install new software inside a virtual machine created with
                  VMware, VirtualBox or Parallels.
                </ListGroup.Item>
                <ListGroup.Item>
                  Do not click the link in an email or SMS message, do not reset
                  your passwords by clicking them, except that you know these
                  messages are not fake.
                </ListGroup.Item>
                <ListGroup.Item>
                  Do not tell your passwords to anybody in the email.
                </ListGroup.Item>
                <ListGroup.Item>
                  Be careful when using online paste tools and screen capture
                  tools, do not let them to upload your passwords to the cloud.
                </ListGroup.Item>
              </ListGroup>
            </Tab>
          </Tabs>
        </div>
      </Card>
    </Container>
  );
};

export default Main;
