import { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import "./index.css";

class ChartData extends Component {
  // Utility function to map and transform chart data
  transformChartData = () => {
    const { chartData } = this.props;
    return chartData.map((each) => ({
      date: each.data,
      confirmed: each.value.confirmed,
      tested: each.value.tested,
      deceased: each.value.deceased,
      recovered: each.value.recovered,
      active: each.value.confirmed - each.value.deceased - each.value.recovered,
    }));
  };

  // Render Bar Chart View
  renderGraphView = () => {
    const { activeTab } = this.props;
    const barChartData = this.transformChartData();
    const data = barChartData.slice(-10); // Get last 10 entries

    const colorMapping = {
      confirmed: "#9A0E31",
      active: "#0A4FA0",
      recovered: "#216837",
      deceased: "#474C57",
    };

    const colortype = colorMapping[activeTab] || "#000";

    return (
      <div className="barCharts-container">
        <BarChart width={932} height={431} data={data} barSize={45}>
          <XAxis
            dataKey="date"
            stroke={colortype}
            style={{
              fontFamily: "Roboto",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
            dy={10}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={activeTab}
            fill={colortype}
            label={{ position: "top", fill: "#fff" }}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </div>
    );
  };

  // Render Line Chart for a specific type
  graph = (type, color, bgColor) => {
    const lineChartData = this.transformChartData();

    return (
      <div className="line-chart-container" style={{ backgroundColor: bgColor, marginBottom: "20px" }}>
        <ResponsiveContainer width={1032} height={328}>
          <LineChart
            data={lineChartData}
            margin={{ top: 55, right: 60, left: 20, bottom: 5 }}
            
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
        </ResponsiveContainer>
      </div>
    );
  };

  // Render all Line Charts
  renderLineChartView = () => (
    <>
      <div className="charts confirmed-background">
        {this.graph("confirmed", "#FF073A", "#331427")}
      </div>
      <div className="charts active-background">
        {this.graph("active", "#007BFF", "#132240")}
      </div>
      <div className="charts recovered-background">
        {this.graph("recovered", "#27A243", "#182829")}
      </div>
      <div className="charts deceased-background">
        {this.graph("deceased", "#6C757D", "#1C1C2B")}
      </div>
      <div className="charts tested-background">
        {this.graph("tested", "#9673B9", "#230F41")}
      </div>
    </>
  );

  render() {
    return (
      <div>
        {this.renderGraphView()}
        {this.renderLineChartView()}
      </div>
    );
  }
}

export default ChartData;
