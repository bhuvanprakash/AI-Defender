import { Paper } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <Sidebar />
      <div className="container" style={{ marginLeft: "240px", flex: 1, overflow: "auto", padding: "20px" }}>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <Paper style={{ padding: "20px" }}>
            <h1>Settings</h1>
            <p>Configure your preferences here.</p>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Settings;
