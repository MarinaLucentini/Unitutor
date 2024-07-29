import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCourse } from "../../redux/actions/course";
import { useNavigate } from "react-router-dom";

const CourseModalDelete = ({ show, handleClose, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.course);
  const handleDelete = () => {
    dispatch(DeleteCourse(name));
    if (!error) {
      navigate("/profile");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sei sicuro di voler eliminare il corso?</Modal.Title>
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
    </>
  );
};
export default CourseModalDelete;
