import { Chart } from "@antv/g2";
import { useEffect } from "react";
import classnames from "classnames";
import moment from "moment";
import styles from "./index.module.css";

const defaultData = [
  { Date: "2021-01-01", value: 120 },
  { Date: "2021-02-02", value: 150 },
  { Date: "2021-03-03", value: 250 },
  { Date: "2021-04-04", value: 500 },
  { Date: "2021-05-05", value: 620 },
  { Date: "2021-06-06", value: 500 },
];

const initChart = ({
  data = defaultData,
  key = "业务量",
  axisColor = "#20424C",
  lineColor = "#55FAFE",
}) => {
  const chart = new Chart({
    container: "container",
    autoFit: true,
    padding: 0,
  });

  chart.scale("Date", {
    range: [0, 0.99], // 右侧留白
    type: "cat",
    formatter: (date) => moment(date).format("M月"),
  });

  chart.scale({
    range: {
      range: [0, 0.95],
      min: 0,
      nice: true,
      sync: true,
    },
    value: {
      range: [0, 0.95],
      min: 0,
      nice: true,
      sync: true,
      alias: key,
    },
  });

  chart.tooltip({
    showCrosshairs: true,
    shared: true,
  });

  // view1
  const view1 = chart.createView({
    padding: [8, 8, 48, 64],
  });
  view1.data(data);
  view1.tooltip(false);
  view1.axis(false);
  view1
    .area()
    .position("Date*value")
    .color(`l(90) 0:${lineColor} 1:${axisColor}`)
    .style({
      fillOpacity: 0.1,
    });

  // view2
  const view2 = chart.createView({
    padding: [8, 8, 48, 64],
  });

  view2.data(data);
  view2.axis("value", {
    tickLine: {
      style: {
        stroke: "transparent",
      },
      alignTick: true,
    },
    line: {
      style: { stroke: axisColor, lineWidth: 3 },
    },
    grid: null,
    label: {
      offset: 18,
      style: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Microsoft YaHei",
      },
    },
  });
  view2.axis("Date", {
    line: {
      style: { stroke: axisColor, lineWidth: 3 },
    },
    tickLine: null,
    label: {
      offset: 25,
      style: {
        fontSize: 20,
        fontWeight: "bold",
      },
    },
  });
  view2.line().color(lineColor).position("Date*value");
  view2.point().position("Date*value").color(lineColor).shape("circle");

  chart.removeInteraction("legend-filter"); // 关闭图例过滤交互

  chart.render();
  return chart;
};

/**
 *
 * @param {String} props.className 容器的 className ，默认 width: 400px;height: 400px;
 */

function Area(props) {
  const containerClass = classnames({
    [styles.container]: true,
    [props.className]: props.className,
  });
  // CDM
  useEffect(() => {
    const chart = initChart(props);
    return () => {
      chart.destroy();
    };
  });
  return <div id="container" className={containerClass}></div>;
}

export default Area;
