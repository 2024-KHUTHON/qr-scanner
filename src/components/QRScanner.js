import React from "react";
import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";
import "../index.css";

const QRScanner = (props) => {
  const videoElementRef = useRef(null);
  const [userHash, setUserHash] = useState("");

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
    };
  }, []);

  return (
    <div>
      <div className="videoWrapper">
        <video className="qrVideo" ref={videoElementRef} />
      </div>
      <p className="scannedText">SCANNED: {userHash}</p>
    </div>
  );
};

export default QRScanner;
