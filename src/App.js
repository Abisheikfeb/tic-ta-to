import React, { useState } from 'react';
import Icon from './components/Icon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardBody, Container, Button, Col, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");
  const [itemArray, setItemArray] = useState(new Array(9).fill("empty"));

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    setItemArray(new Array(9).fill("empty"));
  }

  const winSituations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkIsWinner = () => {
    for (let i = 0; i < winSituations.length; i++) {
      if (itemArray[winSituations[i][0]] !== "empty" &&
        itemArray[winSituations[i][0]] === itemArray[winSituations[i][1]] &&
        itemArray[winSituations[i][0]] === itemArray[winSituations[i][2]]) {
        setWinMessage(`${itemArray[winSituations[i][0]]} wins!`);
        return; // Stop further checks once a winner is found
      }
    }
  }

  const changeItem = (itemNumber) => {
    if (winMessage) {
      return toast(winMessage, { type: "success" });
    }
    if (itemArray[itemNumber] === "empty") {
      const updatedArray = [...itemArray];
      updatedArray[itemNumber] = isCross ? "cross" : "circle";
      setItemArray(updatedArray);
      setIsCross(!isCross);
      checkIsWinner();
    } else {
      return toast("Please choose another box", { type: "error" });
    }
  }

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {
            winMessage ?
              (
                <div className="mb-2 mt-2">
                  <h1 className='text-success text-uppercase text-center'>{winMessage}</h1>
                  <Button color="success" block onClick={reloadGame}>Reload</Button>
                </div>
              )
              :
              (
                <h1 className='text-center text-warning'>It's the turn of {isCross ? "Cross" : "Circle"}</h1>
              )
          }
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card key={index} onClick={() => changeItem(index)} color="warning">
                <CardBody className="box">
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
