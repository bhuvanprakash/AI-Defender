import { useEffect, useState } from "react";
import { fetchThreats } from "../services/api";
import { Paper } from "@mui/material";

export default function ThreatsPage() {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchThreats();
      setThreats(data);
    })();
  }, []);

  return (
    <div className="container" style={{ marginLeft: "240px", flex: 1, overflow: "auto", padding: "20px" }}>
      <h1>Threats</h1>
      <Paper style={{ padding: "20px", marginBottom: "20px" }}>
        {threats.map((t: any, i) => (
          <div key={i} className="dashboard-card">
            <p>{t.name}</p>
            {/* ...additional info... */}
          </div>
        ))}
      </Paper>
    </div>
  );
}
