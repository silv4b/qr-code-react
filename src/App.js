import QRCode from "react-qr-code";
import QRCodeLink from "qrcode";
import { useState } from "react";
import Base64Downloader from "react-base64-downloader";
import "./App.css";

export default function App() {
    const [qrCodeValue, setQrCodeValue] = useState("");
    const [linkQrCode, setQrCodeLink] = useState("");
    const [hideDownloadButton, setHideDownloadButton] = useState(false);

    function handleQrCode(evt) {
        const qr_code_aux = evt.target.value.trim();
        setQrCodeValue(qr_code_aux);

        if (qr_code_aux === "") {
            setHideDownloadButton(false);
        } else {
            setHideDownloadButton(true);
        }
        handleGenerate(qrCodeValue);
    }

    function handleGenerate(linkUrl) {
        QRCodeLink.toDataURL(
            linkUrl,
            {
                width: 600,
                margin: 3,
            },
            function (err, url) {
                setQrCodeLink(url);
            }
        );
    }

    return (
        <div className="container">
            <QRCode value={qrCodeValue} size={316} />
            <input
                className="input"
                placeholder="Digite seu texto ou link aqui ..."
                value={qrCodeValue}
                onChange={(evt) => handleQrCode(evt)}
            />
            {hideDownloadButton && (
                <Base64Downloader
                    base64={linkQrCode}
                    downloadName="my_qr_code_Base64Downloader"
                >
                    Salvar QR Code
                </Base64Downloader>
            )}
        </div>
    );
}

