import MyNav from "./MyNav";

const ConditionalNav = () => {
  // const dispatch = useDispatch();
  // const { loading, content } = useSelector((state) => state.authentication);

  // useEffect(() => {
  //   dispatch(fetchProtectedResource());
  // }, [dispatch]);

  return (
    <>
      {/* {loading && <Spinner animation="border" />} */}
      <MyNav />
      {/* {content ? <NavLogin username={content.username} /> : <MyNav />} */}
    </>
  );
};
export default ConditionalNav;
