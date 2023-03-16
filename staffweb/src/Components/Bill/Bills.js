import { useContext, useEffect } from "react";
import { Spinner, Row, Card } from "react-bootstrap";

import { BillContext } from "../../contexts/BillContext";
import BillList from "../BillList/BillList";
import InfoBar from "../InfoBar/InfoBar";

const Bills = () => {
  // const {
  //   authState: { user },
  // } = useContext(AuthContext);
  const {
    billState: { billLoading, bill },
    getBills,
  } = useContext(BillContext);

  useEffect(() => {
    getBills();
  }, [billLoading]);

  let body = null;
  let loadData = () => {
    if (billLoading) {
      body = (
        <div className="spinner-container">
          <Spinner animation="border" variant="info" />
        </div>
      );
    } else {
      if (bill.length === 0) {
        body = (
          <>
            <Card className="text-center mx-5 my-5">
              <Card.Header as="h1">Doesn't have any order yet!</Card.Header>
            </Card>
          </>
        );
      } else {
        body = (
          <>
            <Row className="row-cols-4 row-cols-md-3 g-4 mx-auto mt-3">
              {bill.map((billdetail) => {
                return <BillList bills={billdetail} />;
              })}
            </Row>
          </>
        );
      }
    }
  };
  loadData();

  return (
    <div>
      {bill && <InfoBar bills={bill} />}
      {body}
    </div>
  );
};

export default Bills;
