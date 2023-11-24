import React, { useState, useRef } from "react";
import { useEffect } from "react";
import HeadBar from "../components/HeadBar";
import axios from "axios";

const ModellerView = () => {
  const [projectArray, setProjectArray] = useState([{}]);
  const kaedimInput = useRef(null);
  const [kaedimComplete, setKaedimComplete] = useState(null);

  const getProject = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_ROOT}/v1/project/getAll`);
    const data = await res.json();
    setProjectArray(data);
  };
  useEffect(() => {
    getProject();
  }, []);

  const handleDownload = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = localStorage.getItem("username") + "_" + url;
    a.click();
    // await sleep(2000);
    window.location.href = "/";
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const handleApply = async (url) => {
    const username = localStorage.getItem('username');
    const res = await fetch(`${import.meta.env.VITE_API_ROOT}/v1/project/get-apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, url })
    });
    if (res.status === 200) {
      console.log('SUccess')
      getProject();
      // renderTableRows();
    }
    else {
      console.log("Error", res.status);
    }
  }

  const onKaedimChange = (e) => {
    setKaedimComplete(e.target.files[0])
  }

  const onStartUpload = () => {
    kaedimInput.current.click();
  };
  const handleUpload = async (e, url) => {
    const file = e.target.files[0]
    const formData = new FormData();
    formData.append("imageFile", file);
    formData.append("kaedim", url)
    const response = await axios.post(
      `${import.meta.env.VITE_API_ROOT}/v1/project/upload-file/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response)
    if (response.status === 200) {
      // console.log(response.data);
      getProject();
      console.log('Kaedim Upload Success')
    } else {
      console.log("Error", response.status);
    }
  };
  const renderTableRows = () => {
    return projectArray.map((project, index) => (
      <tr key={index}>
        <td>{index}</td>
        <td>{project.userid}</td>
        <td>{project.modeller}</td>
        <td>{project.created_time}</td>
        <td>{project.kaedim_status}</td>
        {project.kaedim_status === "tostart" && (
          <td style={{ cursor: "pointer" }}>
            <button onClick={() => handleApply(project.kaedim)}>
              Apply
            </button>
          </td>
        )}
        {project.kaedim_status === "progress" &&
          project.modeller === localStorage.getItem("username") && (
            <td style={{ cursor: "pointer" }}>
              <input
                type="file"
                ref={kaedimInput}
                onChange={(event) => handleUpload(event, project.kaedim)}
                style={{ display: "none" }}
                accept=".png, .jpg, .jpeg"
              />
              <button onClick={onStartUpload}>Upload</button>
            </td>
          )}
        {/* Add more table columns for other project properties */}
      </tr>
    ));
  };

  return (
    <div className="worker-wrapper">
      <div className="head-container">
        <p>{localStorage.getItem('username')}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="table-wrapper">
        <table>
          <tr>
            <th>ID</th>
            <th>UserID</th>
            <th>Modeller</th>
            <th>Time</th>
            <th>KaedimStatus</th>
            <th>Operate</th>
            {/* Add more table headers for other project properties */}
          </tr>
          {renderTableRows()}
        </table>
      </div>
    </div>
  );
};

export default ModellerView;
