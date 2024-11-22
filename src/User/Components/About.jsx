import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSpring, useSprings, animated } from 'react-spring';


const About = () => {
  // Animation for the title and subtitle
  const titleAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(-20px)' },
    delay: 100,
  });

  // Staggered animations for each card
  const cardSprings = useSprings(
    teamMembers.length,
    teamMembers.map((_, index) => ({
      opacity: 1,
      transform: 'translateY(0px)',
      from: { opacity: 0, transform: 'translateY(20px)' },
      delay: 300 + index * 150,
    }))
  );

  return (
    <Container fluid className="about-page my-5">
      {/* Title Section */}
      <Row className="text-center mb-5">
        <Col>
          <animated.div style={titleAnimation}>
            <h1 className="about-title">About the Attendance Management System</h1>
            <p className="text-muted">
              A comprehensive solution to manage, monitor, and analyze student attendance in real-time, improving data accuracy and accessibility for students, teachers, and administrators.
            </p>
          </animated.div>
        </Col>
      </Row>

      {/* Purpose Section */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={10} lg={8}>
          <Card className="mb-4 shadow-lg">
            <Card.Body>
              <h3 className="card-title">Purpose of the Project</h3>
              <p className="card-text">
                The primary goal of the Attendance Management System is to streamline the attendance process, reducing the time and effort required to record, store, and review attendance data. This system empowers educators by providing insights into student engagement and identifying attendance trends, ultimately aiding in better decision-making and academic planning.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* System Features Section */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={10} lg={8}>
          <Card className="mb-4 shadow-lg">
            <Card.Body>
              <h3 className="card-title">Key Features</h3>
              <ul className="card-text">
                <li>Automated attendance marking with real-time updates</li>
                <li>Easy filtering and sorting based on department, year, and section</li>
                <li>Detailed attendance reports with monthly and yearly analytics</li>
                <li>Integrated OTP-based login for secure access</li>
                <li>Email notifications for students and administrators on absences</li>
                <li>Responsive, user-friendly interface for seamless access on all devices</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Benefits Section */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={10} lg={8}>
          <Card className="mb-4 shadow-lg">
            <Card.Body>
              <h3 className="card-title">Benefits of the Attendance Management System</h3>
              <p className="card-text">
                This system provides various benefits, including:
              </p>
              <ul className="card-text">
                <li><strong>Improved Efficiency:</strong> Reduces the manual effort required for attendance tracking.</li>
                <li><strong>Data Accuracy:</strong> Minimizes errors, ensuring accurate records for each student.</li>
                <li><strong>Enhanced Engagement:</strong> Allows teachers and administrators to quickly identify patterns and address attendance issues.</li>
                <li><strong>Accessibility:</strong> Students and teachers can access attendance information from any device at any time.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Team Section */}
      <Row className="text-center mb-5">
        <Col>
          <h3 className="team-title">Project Team</h3>
        </Col>
      </Row>

      {/* Team Members */}
      <Row className="justify-content-center">
        {teamMembers.map((member, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-4">
            <animated.div style={cardSprings[index]}>
              <Card className="team-card shadow-lg">
                <Card.Img variant="top" src={member.image} className="team-image" />
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Text>{member.role}</Card.Text>
                </Card.Body>
              </Card>
            </animated.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

// Sample team members data (replace with actual images and names)
const teamMembers = [
  { name: 'Ajay Siva Kishore Nowdasari', role: 'Developer', image: 'https://via.placeholder.com/150' },
  { name: 'Mr. Prashanth Kumar', role: 'Project Guide', image: 'https://via.placeholder.com/150' },
  { name: 'Smt. G. Sri Devi', role: 'Senior Lecturer', image: 'https://via.placeholder.com/150' },
];

export default About;
