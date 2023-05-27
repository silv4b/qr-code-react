import QRCode from 'react-qr-code';
import QRCodeLink from 'qrcode';
import { useState } from 'react';
import Base64Downloader from 'react-base64-downloader';
import './App.css';

export default function App() {
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [linkQrCode, setQrCodeLink] = useState('');

  function handleQrCode(evt) {
    setQrCodeValue(evt.target.value);
    handleGenerate(qrCodeValue);
  }

  function handleGenerate(linkUrl) {
    QRCodeLink.toDataURL(
      linkUrl, {
      width: 600,
      margin: 3
    }, function (err, url) {
      setQrCodeLink(url);
    }
    );
  }

  return (
    <div className='container'>
      <QRCode
        value={qrCodeValue}
        size={316}
      />

      <input
        className='input'
        placeholder='Digite seu texto aqui ...'
        value={qrCodeValue}
        onChange={(evt) => handleQrCode(evt)}
      />

      <Base64Downloader
        className='buttom'
        base64={linkQrCode}
        downloadName="qrcode"
        onDownloadSuccess={() => console.log('File download initiated')}
        onDownloadError={() => console.warn('Download failed to start')}
      >
        Salvar QRCode
      </Base64Downloader>
    </div >
  );
}

// export default App;
