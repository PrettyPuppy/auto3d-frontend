import { useEffect, useRef, useState } from "react";
import axios from "axios";
import FileUpload from "../Components/FileUpload";
import Progress from "../Components/Progress";
import Preview from "../Components/Preview";

const ClientView = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [enhanceState, setEnhanceState] = useState(false);
  const [maskState, setMaskState] = useState(false);
  const [kaedimState, setKaedimState] = useState(false);
  const [projectionState, setProjectionState] = useState(false);

  const totalSteps = 5;
  const [currentStep, setCurrentStep] = useState(-1);

  const ref = useRef(null);

  const onStart = async () => {
    if (frontImage && backImage) {
      if (currentStep < 0) {
        setCurrentStep(0);
      }
      const response = await axios({
        method: 'POST',
        url: `${import.meta.env.VITE_API_ROOT}/v1/kaedim/enhance`,
        headers: {
          "Content-Type" : "application/json"
        },
        data: JSON.stringify({
          frontUrl: window.localStorage.getItem('frontUrl'),
          backUrl: window.localStorage.getItem('backUrl'),
        })
      });
      if (response.status === 200) {
        console.log(response.data);
        setEnhanceState(true);
      } else {
        console.log("Error", response.status);
      }
    } else {
      alert("Upload Front and Back Image!");
    }
  };

  useEffect(() => {
    if (enhanceState) {
      setCurrentStep(currentStep + 1);
      setMaskState(true);
      // setCurrentStep(4);
      // setProjectionState(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enhanceState]);

  useEffect(() => {
    console.log('Mask State');

    if (maskState && !ref.current) {
      console.log(1);
      ref.current = true;
      console.log(2);

      setCurrentStep(currentStep + 1);
      const startKaedim = async () => {
        console.log('>>> startKaedim()')

        const res = await axios({
          method: 'POST',
          url: `${import.meta.env.VITE_API_ROOT}/v1/kaedim/process`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            jwt: window.localStorage.getItem('jwt'),
            url1: 'https://i.etsystatic.com/34890740/r/il/19754a/3790229567/il_1080xN.3790229567_ps88.jpg',
            url2: window.localStorage.getItem('backUrl')
          })
        });
        if (res.status == 200) {
          console.log(res);
          window.localStorage.setItem('requestID', res.data.requestID);
        } else {
          console.error(res);
        }
      };

      const refreshToken = async () => {
        console.log('>>> refreshToken()');
        
        const res = await axios({
          method: 'GET',
          url: `${import.meta.env.VITE_API_ROOT}/v1/kaedim/refreshJWT`,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (res.status == 200) {
          console.log(res);
          window.localStorage.setItem('jwt', res.data.jwt);
          startKaedim();
        }
      }

      const fetchData = async () => {
        console.log('>>> fetchData()');
        const res = await axios({
          method: 'GET',
          url: `${import.meta.env.VITE_API_ROOT}/v1/kaedim/registerHook`,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.status == 200) {
          console.log(res);
          window.localStorage.setItem('jwt', res.data.jwt);
          refreshToken();
        } else {
          console.error(res);
        }
      }
      fetchData();
    }
  }, [maskState]);

  useEffect(() => {
    if (maskState) {
      const getProcessStatus = async () => {
        const res = await axios({
          url: `${import.meta.env.VITE_API_ROOT}/v1/kaedim/fetchRequest`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jwt: window.localStorage.getItem('jwt'),
            requestID: window.localStorage.getItem('requestID')
          })
        });
        if (res.status == 200) {
          const data = await res.json();
          console.log(data);
          setKaedimState(true);
        } else {
          console.error(res);
        }
      };

      setInterval(() => {
        // getProcessStatus();
      }, 10000);
    }
  });

  useEffect(() => {
    if (kaedimState) {
      setProjectionState(true);
    }
  }, [kaedimState]);

  useEffect(() => {
    if (projectionState) {
      setCurrentStep(currentStep + 1);
    }
  }, [projectionState]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="client-wrapper">
      <button className='head-container' onClick={handleLogout}>Logout</button>
      <div className="main-wrapper">
        <div className="left-section">

          <FileUpload setFrontImage={setFrontImage} setBackImage={setBackImage} />
          <button onClick={onStart}>Start</button>
          <Progress
            steps={["Enhance", "Mask", "Kaedim", "Warp", "Projection"]}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        </div>
        <Preview visible={currentStep} model={'old_man.fbx'} />
      </div>
    </div>
  );
};

export default ClientView;
