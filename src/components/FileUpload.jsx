import { useRef, useState } from "react";
const FileUpload = ({ setFrontImage, setBackImage }) => {
  const frontInput = useRef(null);
  const backInput = useRef(null);

  const [frontImageUrl, setFrontImageUrl] = useState(null);
  const [backImageUrl, setBackImageUrl] = useState(null);

  const onFrontImageChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url);

    setFrontImage(file);
    setFrontImageUrl(url);
    window.localStorage.setItem('frontUrl', url);
  };
  const onBackImageChnage = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url);

    setBackImage(file);
    setBackImageUrl(url);
    window.localStorage.setItem('backUrl', url);
  };
  const onFrontHandle = () => {
    frontInput.current.click();
  };
  const onBackHandle = () => {
    backInput.current.click();
  };

  return (
    <div className="upload-section">
      <div className="upload-front">
        {frontImageUrl ? (
          <img src={frontImageUrl} alt="None" onClick={onFrontHandle} />
        ) : (
          <img src="Upload_front.png" alt="None" onClick={onFrontHandle} />
        )}
        <input
          type="file"
          ref={frontInput}
          onChange={onFrontImageChange}
          style={{ display: "none" }}
          accept=".png, .jpg, .jpeg"
        />
      </div>
      <div className="upload-front">
        {backImageUrl ? (
          <img src={backImageUrl} alt="None" onClick={onBackHandle} />
        ) : (
          <img src="Upload_back.png" alt="None" onClick={onBackHandle} />
        )}
        <input
          type="file"
          ref={backInput}
          onChange={onBackImageChnage}
          style={{ display: "none" }}
          accept=".png, .jpg, .jpeg"
        />
      </div>
    </div>
  );
};

export default FileUpload;
