import React, { useState } from "react";
import QRScanner from "./components/QRScanner";

function App() {
  const [response, setResponse] = useState();

  const postData = async () => {
    try {
      const url = "http://moomu.iptime.org:8855/point/get/23";
      const requestBody = {
        content: "텀블러 이용",
        point: 5,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      setResponse(responseData);
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <QRScanner />
      <button onClick={postData}>클릭</button>
    </div>
  );
}

export default App;
