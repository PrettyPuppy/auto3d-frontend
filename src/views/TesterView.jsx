import React, { useState } from "react";
import { useEffect } from "react";

const TesterView = () => {
  const [projectArray, setProjectArray] = useState([{}]);
  const getProject = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_ROOT}/v1/project/getAll`);
    const data = await res.json();
    setProjectArray(data)
  };
  
  useEffect(() => {
    getProject();
  }, []);

  const handleDownload = (url) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = localStorage.getItem('username') + '_' + url;
    a.click();
    // await sleep(2000);
    window.location.href = '/';
  }
  const handleEvaluate = async (idx) => {
    const inputValue = document.getElementById(`evaluate-${idx}`).value;
    const res = await fetch(`${import.meta.env.VITE_API_ROOT}/v1/project/edit-score`, { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({ idx, inputValue }) 
    });
    if (res.status === 200) {
      getProject();
    }
    console.log(res)
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "/";
  };
  const renderTableRows = () => {
    return projectArray.map((project, index) => (
      <tr key={index}>
        <td>{project.userid}</td>
        <td>{project.modeller}</td>
        <td>{project.mask_back}</td>
        <td><button onClick={() => handleDownload(project.gltf)}>Download</button></td>
        {project.score ? <td>{project.score}</td> : <input id={`evaluate-${project.id}`} type="number" />}
        <td>{project.score ? <p>Evaluated</p> : <button onClick={() => handleEvaluate(project.id)}>Evaluate</button>}</td>
        {/* Add more table columns for other project properties */}
      </tr>
    ));

  };

  return (
    <div className="tester-wrapper">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="table-wrapper">
        <table>
          <tr>
            <th>UserID</th>
            <th>Modeller</th>
            <th>MaskFront</th>
            <th>GLTF</th>
            <th>Score</th>
            {/* Add more table headers for other project properties */}
          </tr>
          {renderTableRows()}
        </table>
      </div>
    </div>
  );
}

export default TesterView;