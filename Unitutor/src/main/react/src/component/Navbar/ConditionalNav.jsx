import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProtectedResource } from "../../redux/actions";
import { Spinner } from "react-bootstrap";
import NavLogin from "./NavLogin";
import MyNav from "./MyNav";

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
