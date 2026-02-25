import dynamic from "next/dynamic";

const DashboardChart = dynamic(
  () => import("@/components/dashboard/DashboardChart"),
  {
    loading: () => <p>Loading chart...</p>,
    ssr: false,
  }
);

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardChart />
    </div>
  );
}