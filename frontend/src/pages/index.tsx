import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <Sidebar
        style={{
          width: "240px",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0
        }}
      />
      <div
        className="container"
        style={{
          marginLeft: "240px",
          flex: 1,
          overflow: "auto",
          padding: "20px"
        }}
      >
        <Navbar />
        <div className="dashboard-container">
          <h1>Welcome to AI-Defender SecureDash</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

