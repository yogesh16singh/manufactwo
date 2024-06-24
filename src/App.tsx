import React, { useEffect, useState } from "react";
import "./App.css";
import TableViewer from "./pages/TableViewer";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("./Manufac_India_Agro_Dataset.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error("Error reading data", err);
      });
  }, []);

  return <TableViewer data={data} />;
}

export default App;
