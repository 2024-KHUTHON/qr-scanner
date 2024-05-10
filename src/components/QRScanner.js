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
      async (result) => {
        console.log("decoded qr code:", result);
        console.log("decoded:", result.data);
        setUserHash(result.data);
        console.log("해시", userHash);
        await handleDecodeHash(result.data);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );
    qrScanner.start();
    console.log("start");
    console.log("해시", userHash);
    return () => {
      console.log(qrScanner);
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, [userHash]);

  const handleDecodeHash = async () => {
    try {
      console.log("해시", userHash);
      const endpoint = "http://moomu.iptime.org:8855/qr/read";

      const response = await axios.post(
        endpoint,
        { qr_hash: userHash },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("해시", userHash);
      console.log(response.data);
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
      <div className="container">
        <div>
          <input type="radio" />
          <label>대중교통 이용</label>
        </div>
        <div>
          <input type="radio" />
          <label>텀블러 사용</label>
        </div>
        <div>
          <input type="radio" />
          <label>지역 농산물 구매</label>
        </div>
      </div>
      <p className="scannedText">사용자 정보: {userId}</p>
    </div>
  );
};

export default QRScanner;
