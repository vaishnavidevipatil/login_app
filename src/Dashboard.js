import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard  = () => {
    return (
      <div className="dashboard-container">
        <h1>Dashboard</h1>
       
        <div className='container'>
        <p style={{fontFamily:"Poppins", marginLeft:"10%"}}>Welcome to the Dashboard</p>
          <div className='new_card'>
              {/* <button id="add-new-btn">
                <img src="/assests/pngtree-minimal-work-space-creative-flat-lay-photo-of-workspace-picture-image_3421158.jpg" />
                 <> </> CREATE A BLOG
              </button> */}

              <div className='card_1'>
              <p>Hello</p>

            </div>

              
            </div>
    
          </div>  
      </div>

    );
  };
  
  
export default Dashboard ; // ✅ Ensure this is present