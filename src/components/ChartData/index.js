import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import "./index.css";

const ChartData = ({ activeTab, chartData }) => {
  const barChartData = useMemo(
    () =>
      chartData.map((each) => ({
        date: each.data,
        confirmed: each.value.confirmed,
        tested: each.value.tested,
        deceased: each.value.deceased,
        recovered: each.value.recovered,
        active: each.value.confirmed - each.value.deceased - each.value.recovered,
      })),
    [chartData]
  );

  const data = useMemo(() => barChartData.slice(barChartData.length - 10), [
    barChartData,
  ]);

  const getColor = (activeTab) => {
    switch (activeTab) {
      case "confirmed":
        return "#9A0E31";
      case "active":
        return "#0A4FA0";
      case "recovered":
        return "#216837";
      case "deceased":
        return "#474C57";
      default:
        return "#9A0E31";
    }
  };

  const renderBarChart = () => (
    <div className="barCharts-container">
      <BarChart width={1032} height={431} data={data} barSize={45}>
        <XAxis
          dataKey="date"
          stroke={getColor(activeTab)}
          style={{
            fontFamily: "Roboto",
            fontWeight: 500,
            textTransform: "uppercase",
          }}
          dy={10} // Adjusts vertical spacing
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={activeTab}
          fill={getColor(activeTab)}
          label={{ position: "top", fill: "#fff" }}
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </div>
  );

  const renderLineChart = (type, color, bgColor) => {
    const lineChartData = barChartData;
    return (
      <div style={{ backgroundColor: bgColor }}>
        <LineChart
          width={1018}
          height={328}
          data={lineChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            style={{
              fontFamily: "Roboto",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={type} stroke={color} />
        </LineChart>
      </div>
    );
  };

  const renderLineChartView = () => (
    <>
      <div className="charts confirmed-background">
        {renderLineChart("confirmed", "#FF073A", "#331427")}
      </div>
      <div className="charts active-background">
        {renderLineChart("active", "#007BFF", "#132240")}
      </div>
      <div className="charts recovered-background">
        {renderLineChart("recovered", "#27A243", "#182829")}
      </div>
      <div className="charts deceased-background">
        {renderLineChart("deceased", "#6C757D", "#1C1C2B")}
      </div>
      <div className="charts tested-background">
        {renderLineChart("tested", "#9673B9", "#230F41")}
      </div>
    </>
  );

  return (
    <div>
      {renderBarChart()}
      {renderLineChartView()}
    </div>
  );
};

export default ChartData;
