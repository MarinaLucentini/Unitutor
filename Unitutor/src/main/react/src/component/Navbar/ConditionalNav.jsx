import { useDispatch, useSelector } from "react-redux";
import MyNav from "./MyNav";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import NavLogin from "./NavLogin";
import { fetchProtectedResource } from "../../redux/actions";

const ConditionalNav = () => {
  const dispatch = useDispatch();
  const { loading, content } = useSelector((state) => state.authentication);

  useEffect(() => {
    dispatch(fetchProtectedResource());
  }, [dispatch]);

  return (
    <>
      {loading && <Spinner animation="border" />}

      {content ? <NavLogin username={content.username} /> : <MyNav />}
    </>
  );
};
export default ConditionalNav;
