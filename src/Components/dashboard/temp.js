import React from 'react'

function temp() {
    return (
        <div>
            <Accordion>
            <Form>
          {/* <Row> */}
          {coData &&
            coData.map((item, index) => {
              const dataItem = item.data();
              return (
                <Row className="py-3" key={item.id} id={item.id}>
                  {/* // <div key={item.id} id={item.id}> */}

                  <Col xs="1">{index + 1}</Col>
                  <Col sm="3"> {dataItem.username}</Col>
                  <Col sm="3"> {dataItem.email}</Col>
                  <Col sm="3">
                    <Form.Control
                      placeholder="password"
                      type={showPass[index] ? "text" : "password"}
                      // name={`form${index+1}`.toString()}
                      value={dataItem.password}
                      readOnly
                      ref={tablePassRef.current[index]}
                    />
                  </Col>
                  <Col xs="0" className="m-0 pt-1">
                    <div onClick={() => handleToggle(index)}>
                      {showPass[index] ? <FaToggleOn /> : <FaToggleOff />}
                    </div>
                  </Col>
                  <Col xs="0" className="m-0 pt-1">
                    <div onClick={handleDelShow} className="pl-2">
                      <AiTwotoneDelete />
                    </div>
                    <Modal
                      show={delConfirmShow}
                      onHide={handleDelClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Username/Password</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Card>
                          <Card.Body>
                            {/* <h2 className="text-center mb-4">Profile</h2> */}
                            <Alert variant="danger">
                              Please note that this is permanent!
                            </Alert>
                            <p>
                              <strong>Username:</strong> {dataItem.username}
                            </p>
                            <p>
                              <strong>email:</strong> {dataItem.email}
                            </p>
                          </Card.Body>
                        </Card>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={() => handleDelete(item.id)}
                        >
                          Confirm Delete
                        </Button>
                        <Button variant="secondary" onClick={handleDelClose}>
                          Close
                        </Button>

                        {/* <Button variant="primary" >Understood</Button> */}
                      </Modal.Footer>
                    </Modal>
                  </Col>
                </Row>
              );
            })}
        </Form>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Click me!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Click me!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        
        </div>
    )
}

export default temp
