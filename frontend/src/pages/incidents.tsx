import { Paper } from "@mui/material";
import { useState } from "react";

export default function IncidentsPage() {
  const [incidents] = useState([]);

  return (
    <div className="container" style={{ marginLeft: "240px", flex: 1, overflow: "auto", padding: "20px" }}>
      <h1>Incidents</h1>
      <Paper style={{ padding: "20px", marginBottom: "20px" }}>
        {incidents.length === 0 ? <p>No incidents yet</p> : null}
        {/* ...list incidents... */}
      </Paper>
    </div>
  );
}