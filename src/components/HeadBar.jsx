import { useEffect } from "react";

const HeadBar = () => {
    // useEffect(() => {
    //     setUserName(localStorage.getItem("username"))    
    // },)
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/";
      };
    const islogin = localStorage.getItem('username');
    return(
        <div className="headbar">
            {islogin ? (<div className="headbar-wrapper">
                <h3>{localStorage.getItem('username')}</h3>
                <button onClick={handleLogout}>Logout</button>
            </div>) : (<div>
                
            </div>)}
        </div>
    )
}

export default HeadBar;