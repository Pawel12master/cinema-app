import React, { useState, useEffect } from "react";
import { Table, Button, Badge } from "react-bootstrap";
import "./App.css";
import moment from "moment";
import { FiShoppingCart } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import SelectData from "./SelectData";

const getTime = () => {
  const currentTime = new Date();
  return {
    day: currentTime.getDay(),
    month: currentTime.getMonth(),
  };
};
const Seanse = () => {
  const [time, setTime] = useState(getTime());
  const [seanse, setSeanse] = useState([]);
  const [filmy, setFilmy] = useState([]);
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:7777/seansee?day=${day}&month=${month}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setSeanse(data));
  }, [day, month]);
  useEffect(() => {
    fetch("http://localhost:7777/filmy", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setFilmy(data));
  }, []);

  const getInSeans = (data, godzina, name) => {
    const datatime = moment(`${data} ${godzina}`, "YYYY-MM-DD HH:mm"); //formatowanie daty do obiektu
    const currentDate = moment();
    const currentFilm = filmy.find((x) => {
      //szukanie filmy po tytule
      return x.tytul.toLowerCase() === name.toLowerCase();
    });
    if (!currentFilm) {
      return "NIE";
    }
    const czasTrwania = parseInt(currentFilm.czas_trwania);
    const x = currentDate.diff(datatime, "minutes");
    if ((x) <= czasTrwania && x>0) {
      return "TAK";
    }
    return "NIE";
  };

  var stylee = 0;

  return (
    <div>
      <br />
      <h1 style={{ textAlign: "center" }}>
        <Badge bg="secondary">Rozkład seansów</Badge>
      </h1>
      <br />
      <SelectData
        setMonth={setMonth}
        setDay={setDay}
        currentDay={day}
        currentMonth={month}
      />
      {Array.from(seanse).map((Seans, idx) =>
        getInSeans(
          Seans.seansdata,
          Seans.seanshour,
          Seans.seansfilm.filmname
        ) === "NIE" ? (
          <Table striped bordered hover key={idx}>
            <thead>
              <tr>
                <th>Data:</th>
                <th>Godzina:</th>
                <th>Film:</th>
                <th>Nr sali:</th>
                <th>Sprzedane bilety:</th>
                <th>Dostepne bilety:</th>
                <th>W trakcie :</th>
                <th>Akcje:</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: "center" }}>
                <td>{Seans.seansdata}</td>
                <td>{Seans.seanshour}</td>
                <td>{Seans.seansfilm.filmname}</td>
                <td>{Seans.seanssala.nr_sali}</td>
                <td>{Seans.seansliczbasprzedanychbiletow}</td>
                <td>{Seans.seansliczbadostepnychbiletow}</td>
                <td>
                  {getInSeans(
                    Seans.seansdata,
                    Seans.seanshour,
                    Seans.seansfilm.filmname
                  )}
                </td>
                <td>
                  <Button
                    style={{ float: "left", margin: "5px" }}
                    href={`/seanse/edytuj/${Seans.seansId}`}
                    variant="secondary"
                    size="sm"
                  >
                    Edytuj <BiEdit size={20} />
                  </Button>
                  {Seans.seansliczbadostepnychbiletow !== 0 &&
                  getInSeans(
                    Seans.seansdata,
                    Seans.seanshour,
                    Seans.seansfilm.filmname
                  ) === "NIE" ? (
                    <Button
                      style={{ float: "left", margin: "5px" }}
                      href={`/seanse/kupbilet/${Seans.seansId}`}
                      variant="success"
                      size="sm"
                    >
                      Kup bilet <FiShoppingCart size={20} />
                    </Button>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <Table
            style={{ backgroundColor: "#f29494" }}
            striped
            bordered
            hover
            key={idx}
          >
            <thead>
              <tr>
                <th>Data:</th>
                <th>Godzina:</th>
                <th>Film:</th>
                <th>Nr sali:</th>
                <th>Sprzedane bilety:</th>
                <th>Dostepne bilety:</th>
                <th>W trakcie :</th>
                <th>Akcje:</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: "center" }}>
                <td>{Seans.seansdata}</td>
                <td>{Seans.seanshour}</td>
                <td>{Seans.seansfilm.filmname}</td>
                <td>{Seans.seanssala.nr_sali}</td>
                <td>{Seans.seansliczbasprzedanychbiletow}</td>
                <td>{Seans.seansliczbadostepnychbiletow}</td>
                <td>
                  {getInSeans(
                    Seans.seansdata,
                    Seans.seanshour,
                    Seans.seansfilm.filmname
                  )}
                </td>
                <td>
                  <Button
                    style={{ float: "left", margin: "5px" }}
                    href={`/seanse/edytuj/${Seans.seansId}`}
                    variant="secondary"
                    size="sm"
                  >
                    Edytuj <BiEdit size={20} />
                  </Button>
                  {Seans.seansliczbadostepnychbiletow !== 0 &&
                  getInSeans(
                    Seans.seansdata,
                    Seans.seanshour,
                    Seans.seansfilm.filmname
                  ) === "NIE" ? (
                    <Button
                      style={{ float: "left", margin: "5px" }}
                      href={`/seanse/kupbilet/${Seans.seansId}`}
                      variant="success"
                      size="sm"
                    >
                      Kup bilet <FiShoppingCart size={20} />
                    </Button>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </Table>
        )
      )}
    </div>
  );
};

export default Seanse;
