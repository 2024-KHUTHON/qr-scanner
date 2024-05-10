import React from "react";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import "../index.css";
import axios from "axios";

const QRScanner = (props) => {
  const videoElementRef = useRef(null);
  const [userHash, setUserHash] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const video = videoElementRef.current;
    const qrScanner = new QrScanner(
      video,
      (result) => {
        console.log("decoded qr code:", result);
        setUserHash(result.data);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );
    qrScanner.start();
    console.log("start");

    return () => {
      console.log(qrScanner);
      qrScanner.stop();
      qrScanner.destroy();
      handleDecodeHash();
    };
  }, []);

  const handleDecodeHash = async () => {
    try {
      const endpoint = "http://moomu.iptime.org:8855/qr/read";

      const requestBody = {
        qr_hash: userHash,
      };

      const response = await axios.get(endpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.user_id);
      setUserId(response.data.user_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="videoWrapper">
        <video className="qrVideo" ref={videoElementRef} />
      </div>
      <p className="scannedText">사용자 정보: {userId}</p>
    </div>
  );
};

export default QRScanner;
