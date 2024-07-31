import { useState } from "react";
import { Button, Col, ListGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import ProfessorModalAdd from "./ProfessorModalAdd";
import { BsFeather, BsXLg } from "react-icons/bs";
import ProfessorModalUpdate from "./ProfessorModalUpdate";
import ProfessorModalDelete from "./ProfessorModalDelete";

const ProfessorSection = ({ course, subject, content }) => {
  const [showModalProfessor, setShowModalProfessor] = useState(false);
  const handleCloseModalProfessor = () => setShowModalProfessor(false);
  const handleShowModalProfessor = () => setShowModalProfessor(true);
  const [showModalProfessorUpdate, setShowModalProfessorUpdate] = useState(false);
  const handleCloseModalProfessorUpdate = () => setShowModalProfessorUpdate(false);
  const handleShowModalProfessorUpdate = () => setShowModalProfessorUpdate(true);
  const [showModalProfessorDelete, setShowModalProfessorDelete] = useState(false);
  const handleCloseModalProfessorDelete = () => setShowModalProfessorDelete(false);
  const handleShowModalProfessorDelete = () => setShowModalProfessorDelete(true);
  const renderTooltip3 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clicca aggiungere un professore
    </Tooltip>
  );
  return (
    <>
      <Row className="flex-column">
        <Col className="mb-3">
          <div className="d-flex align-items-center justify-content-evenly mx-3">
            <p className="text-uppercase">Professori</p>
            <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip3}>
              <Button variant="btn" size="sm">
                <FaPlus className="text-secondary" size={24} onClick={handleShowModalProfessor} />
              </Button>
            </OverlayTrigger>
            {content && subject && (
              <ProfessorModalAdd show={showModalProfessor} handleClose={handleCloseModalProfessor} nameCourse={course.name} nameSubject={subject.name} />
            )}
          </div>
        </Col>
        <Col>
          <ListGroup className=" align-items-center">
            {subject &&
              subject.professorList.map((professor) => (
                <div key={professor.id}>
                  <ListGroup.Item variant="info" className="d-flex align-items-center ">
                    {professor.name} {professor.surname}
                    <div>
                      <BsFeather className="text-secondary mx-3" size={24} onClick={handleShowModalProfessorUpdate} />
                      <BsXLg className="text-secondary" size={24} onClick={handleShowModalProfessorDelete} />
                      <ProfessorModalUpdate
                        show={showModalProfessorUpdate}
                        handleClose={handleCloseModalProfessorUpdate}
                        nameCourse={course.name}
                        nameSubject={subject.name}
                        professorName={professor.name}
                        professorSurname={professor.surname}
                      />
                      <ProfessorModalDelete
                        show={showModalProfessorDelete}
                        handleClose={handleCloseModalProfessorDelete}
                        nameCourse={course.name}
                        nameSubject={subject.name}
                        idProfessor={professor.id}
                      />
                    </div>
                  </ListGroup.Item>
                </div>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};
export default ProfessorSection;
