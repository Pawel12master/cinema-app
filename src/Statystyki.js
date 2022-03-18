import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Legend } from "recharts";
import SelectData from "./SelectData";
import { Badge } from "react-bootstrap";

const Statystyki = () => {
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [seanse, setSeanse] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7777/seanse?day=${day}&month=${month}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => preparedData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, month]);
  const preparedData = (data) => {
    const chartData = [];
    data.forEach((seans) => {
      const tytul = seans.seansfilm.filmname;
      const Liczba_Sprzedanych_Biletow = seans.seansliczbasprzedanychbiletow;
      const seansdata = seans.seansdata;
      const idx = chartData.findIndex((x) => {
        return x.tytul.toLowerCase() === tytul.toLowerCase();
      });
      if (idx === -1) {
        chartData.push({
          tytul,
          Liczba_Sprzedanych_Biletow,
          seansdata,
        });
      } else {
        chartData[idx].Liczba_Sprzedanych_Biletow += Liczba_Sprzedanych_Biletow;
      }
    });

    setSeanse(chartData);
  };
  return (
    <div>
      <br />
      <h1 style={{ textAlign: "center" }}>
        <Badge bg="secondary">Popularność filmów według danego dnia</Badge>
      </h1>
      <br />
      <BarChart
        style={{ margin: "auto" }}
        width={550}
        height={550}
        data={seanse}
      >
        <XAxis dataKey="tytul" />
        <YAxis />
        <Legend />
        <Bar dataKey="Liczba_Sprzedanych_Biletow" barSize={20} fill="#8884d8" />
      </BarChart>
      <SelectData
        setMonth={setMonth}
        setDay={setDay}
        currentDay={day}
        currentMonth={month}
      />
    </div>
  );
};
export default Statystyki;
