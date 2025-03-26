import React from 'react';
import '../src/DashboardPage/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="container">
        
        {/* Card 1 - Post */}
        <div className="card-1">
          <div className="image">
            <img 
              src="https://i.pinimg.com/originals/a4/7b/a5/a47ba59b4a353e0928ef0551ca44f980.jpg" 
              alt="Post" 
            />
          </div>
          <div className="content">
            <h3>Post</h3>
            <p>
              Share your thoughts, stories, and updates with your followers through 
              engaging and interactive posts.
            </p>
          </div>
        </div>

        {/* Card 2 - Collections */}
        <div className="card-2">
          <div className="image">
            <img 
              src="C:\bindu\login_app\public\istockphoto-1405973719-1024x1024.jpg" 
              alt="Collections" 
            />
          </div>
          <div className="content">
            <h3>Collections</h3>
            <p>
              Organize your favorite projects, posts, and resources into 
              categorized collections for easy access.
            </p>
          </div>
        </div>

        {/* Card 3 - Projects */}
        <div className="card-3">
          <div className="image">
            <img 
              src="https://i.pinimg.com/originals/8c/9d/4e/8c9d4e4e8db9b4b7a9f2a89b6b58c9a3.jpg" 
              alt="Projects" 
            />
          </div>
          <div className="content">
            <h3>Projects</h3>
            <p>
              Showcase your creative work, track progress, and collaborate with 
              others on new and exciting projects.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
