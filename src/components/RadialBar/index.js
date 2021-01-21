import { useEffect } from "react";
import { Chart } from "@antv/g2";

const initChart = () => {
  const data = [
    { term: "test3", count: 9, max: 100 },
    { term: "test2", count: 8, max: 100 },
    { term: "test1", count: 8, max: 100 },
  ];

  const chart = new Chart({
    container: "container",
    autoFit: true,
    height: 500,
    padding: 50,
  });

  chart.data(data);

  chart.coordinate("theta", {
    innerRadius: 0.2,
  });

  chart.axis("term", {
    tickLine: null,
    grid: null,
    line: null,
  });

  chart.scale({
    max: {
      min: 0,
      max: 100,
    },
    count: {
      min: 0,
      max: 100,
    },
  });

  chart.scale("term", {
    formatter: () => "",
  });

  chart
    .interval()
    .position("term*max")
    .shape("line")
    .color("term", (term) => {
      switch (term) {
        case "test1":
          return "rgba(104,233,252,.5)";
        case "test2":
          return "rgba(37,85,235,.5)";
        case "test3":
          return "rgba(238,168,74,.5)";
      }
    })
    .style({
      lineWidth: 10,
      lineCap: "round",
    }); // 线状柱状图

  chart
    .interval()
    .position("term*count")
    .shape("line")
    .color("term", (term) => {
      switch (term) {
        case "test1":
          return "rgb(104,233,252)";
        case "test2":
          return "rgb(37,85,235)";
        case "test3":
          return "rgb(238,168,74)";
      }
    })
    .style({
      lineWidth: 10,
      lineCap: "round",
    }); // 线状柱状图

  chart.annotation().text({
    position: ["50%", "50%"],
    style: {
      textAlign: "center",
      fontSize: 24,
    },
  });

  chart.render();
  return chart;
};

function App() {
  useEffect(() => {
    const chart = initChart();
    return () => {
      chart.destroy();
    };
  });
  return <div id="container" className="container"></div>;
}

export default App;
