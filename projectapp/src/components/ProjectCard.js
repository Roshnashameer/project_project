import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProjectCard() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div><Card onClick={handleShow} style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://i.postimg.cc/tJKP3Wt5/f64932de-0a15-4ac5-95f3-6566b4f3fbf0.jpg" />
            <Card.Body>
                <Card.Title className='text-center'>Project Name</Card.Title>

            </Card.Body>
        </Card>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><h3 className='text-primary'>Project Name</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='p-3'>
            <Col>
            <img className='w-100' src="https://i.postimg.cc/2jwmJhqb/meistertask-capt-img-small.webp" alt="" />
            <p className='p-4'><span className='text-primary'>Technologies:</span>html,css,React</p>
            </Col>
            <Col>
            <p><span className='text-primary'>project description:</span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quis fugiat, 
            libero, blanditiis atque voluptatem in cum unde nihil deserunt,abo?</p>
            
            </Col>
            <hr/>
          </Row>
          <div className='p-3'>
              <Link>
                <i class="fa-solid fa-link text-primary fa-2x"></i>
                </Link>
                <Link>
                <i class="fa-brands fa-square-github text-primary fa-2x mx-3"></i>
                </Link>
          </div>
        </Modal.Body>
        
      </Modal>
        </div>
    )
}

export default ProjectCard