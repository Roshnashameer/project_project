import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../service/baseUrl';

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div><Card onClick={handleShow} style={{ width: '20rem' }}>
            <Card.Img variant="top" src={project?`${BASE_URL}/uploads/${project?.projectImage}`:"https://i.postimg.cc/tJKP3Wt5/f64932de-0a15-4ac5-95f3-6566b4f3fbf0.jpg"} />
            <Card.Body>
                <Card.Title className='text-center'>{project?.title}</Card.Title>

            </Card.Body>
        </Card>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><h3 className='text-primary'>{project?.title}</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='p-3'>
            <Col>
            <img className='w-100' src={project?`${BASE_URL}/uploads/${project?.projectImage}`:"https://i.postimg.cc/tJKP3Wt5/f64932de-0a15-4ac5-95f3-6566b4f3fbf0.jpg"} alt="" />
            <p className='p-4'><span className='text-primary'>Technologies:</span>{project?.languages}</p>
            </Col>
            <Col>
            <p><span className='text-primary'>project description:</span>
            {project?.overView}</p>
            
            </Col>
            <hr/>
          </Row>
          <div className='p-3'>
              <Link to={project?.website}>
                <i class="fa-solid fa-link text-primary fa-2x"></i>
                </Link>
                <Link to={project?.gitHub}>
                <i class="fa-brands fa-square-github text-primary fa-2x mx-3"></i>
                </Link>
          </div>
        </Modal.Body>
        
      </Modal>
        </div>
    )
}

export default ProjectCard