import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Stack';

const Home = (props) => {
  
  return (
    <Container className='home'>
    <Card className="text-center">
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Welcome to Book Den</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Login</Button>
      </Card.Body>
      
    </Card>
    </Container>
  )
}

export default Home