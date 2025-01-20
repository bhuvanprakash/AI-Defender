const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Threat {
  id: number;
  name: string;
  severity: "low" | "medium" | "high";
}

export async function fetchThreats(): Promise<Threat[]> {
  // TODO: Implement actual API call
  // For now return mock data
  return [
    { id: 1, name: "Suspicious Network Activity", severity: "high" },
    { id: 2, name: "Potential Data Breach", severity: "medium" },
    { id: 3, name: "Failed Login Attempts", severity: "low" }
  ];
  try {
    const response = await fetch('/api/threats');
    if (!response.ok) {
      throw new Error("Failed to fetch threats");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
