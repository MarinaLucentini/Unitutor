import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteSubject } from "../../redux/actions/subject";

const SubjectModalDelete = ({ show, handleClose, name, nameCourse }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.subject);

  const handleDelete = () => {
    dispatch(DeleteSubject(name, nameCourse));
    if (!error) {
      navigate("/profile");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Sei sicuro di voler eliminare la materia ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button variant="secondary" onClick={handleClose} className="mx-3">
          Torna indietro
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Elimina
        </Button>
      </Modal.Body>
    </Modal>
  );
};
export default SubjectModalDelete;
