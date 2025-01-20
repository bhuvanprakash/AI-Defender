import { Paper } from "@mui/material";
import { useState } from "react";
import LiveAlerts from "../components/LiveAlerts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ThreatChart from "../components/ThreatChart";

const Dashboard = () => {
    const [threats, setThreats] = useState([]);

    return (
        <div style={{ display: "flex", flexDirection: "row", height: "100vh", backgroundColor: "#f9f9f9" }}>
            {/* Sidebar */}
            <Sidebar
                style={{
                    width: "240px",
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0
                }}
            />

            {/* Main Content */}
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
                    <Paper className="dashboard-card">
                        {/* Live Alerts Section */}
                        <LiveAlerts setThreats={setThreats} />

                        {/* Threat Chart */}
                        <ThreatChart threats={threats} />

                        {/* SecureDash Embedded as an iFrame */}
                        <div style={{ marginTop: "20px", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
                            <h2 style={{ padding: "10px", backgroundColor: "#007bff", color: "white" }}>SecureDash</h2>
                            <iframe
                                src="/securedash/index.html"
                                width="100%"
                                height="600px"
                                style={{ border: "none", borderRadius: "5px" }}
                            ></iframe>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
