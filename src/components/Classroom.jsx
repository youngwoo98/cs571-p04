import { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Student from "./Student"
 
const Classroom = () => {

    const [backup, setBackup] = useState([]);
    const [studs, setStuds] = useState([]);
    
    const[searchName, setSearchName] = useState("");
    const[searchMajor, setSearchMajor] = useState("");
    const[searchInterest, setSearchInterest] = useState("");

    let nameIn = searchName.toUpperCase().trim();
    let majorIn = searchMajor.toUpperCase().trim();
    let interestIn = searchInterest.toUpperCase().trim(); 
    
    
    useEffect(() => {
        const filtered = () => backup.filter((stud) => {
            let full = stud.name.first + " " + stud.name.last;
            return(
                full.toUpperCase().includes(nameIn) &&
                stud.major.toUpperCase().includes(majorIn) &&
                stud.interests.some(i => i.toUpperCase().includes(interestIn))
            );
        })
        setStuds(filtered);
    }, [nameIn, majorIn, interestIn, backup])

    useEffect(() => {
        fetch('https://cs571.org/s23/hw4/api/students', {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_c49825b5bd469d794555"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setBackup(data);
            setStuds(data);
        })
        .catch(error => console.error(error));
    }, [])
    


    return <div>
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control 
                id="searchName"
                value = {searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control 
                id="searchMajor"
                value = {searchMajor}
                onChange={(e) => setSearchMajor(e.target.value)}
            />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control 
                id="searchInterest"
                value = {searchInterest}
                onChange={(e) => setSearchInterest(e.target.value)}
            />
            <br />
            <Button 
                variant="neutral"
                onClick={(e) => {
                    setStuds(backup);
                    setSearchName("");
                    setSearchMajor("");
                    setSearchInterest("");
                }}
            >Reset Search</Button>
        </Form>
        <Container fluid>
            <Row>
                {
                    studs.map(student => {
                        return <Col xs={12} sm={6} md={4} lg={3} xl={2} key = {student.id}>
                        <Student {...student}/>
                        </Col>
                    }
                    )
                }
            </Row>
        </Container>
    </div>

}

export default Classroom;