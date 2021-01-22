import { useEffect } from "react";
import { Chart } from "@antv/g2";
import moment from "moment";
import classnames from "classnames";
import styles from "./index.module.css";

const defaultData = [
  { date: "2018-01-01", value: 34000 },
  { date: "2019-01-01", value: 80005 },
  { date: "2020-01-01", value: 100003 },
];

const initChart = ({
  data = defaultData,
  axisColor = "#20424C",
  barColors = ["#69E9FC", "#2555EB"],
}) => {
  const chart = new Chart({
    container: "container",
    autoFit: true,
  });
  chart.data(data);
  chart.scale({
    value: {
      range: [0, 0.95],
      nice: true,
      formatter: (value) =>
        value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"),
    },
    date: {
      formatter: (date) => moment(date).format("YYYY"),
    },
  });
  chart.axis("date", {
    title: null,
    tickLine: {
      alignTick: true,
      style: {
        stroke: "transparent",
      },
    },
    line: {
      style: {
        lineWidth: 3,
        stroke: axisColor,
      },
    },
    label: {
      offset: 20,
      style: {
        fontSize: 20,
        fontFamily: "Microsoft YaHei",
        fontWeight: "bold",
        fill: axisColor,
      },
    },
  });

  chart.axis("value", {
    grid: null,
    title: null,
    tickLine: {
      alignTick: true,
      style: {
        stroke: "transparent",
      },
    },
    line: {
      style: {
        lineWidth: 3,
        stroke: axisColor,
      },
    },
    label: {
      offset: 20,
      style: {
        fontSize: 20,
        fontFamily: "Microsoft YaHei",
        fontWeight: "bold",
        fill: axisColor,
      },
    },
  });
  chart.legend(false);
  chart.coordinate().transpose();
  chart
    .interval()
    .position("date*value")
    .size(24)
    .style({ radius: [20, 20, 0, 0] })
    .color("date", (date) =>
      moment(date).year() % 2 ? barColors[0] : barColors[1]
    )
    .label("value", {
      style: {
        fontSize: 20,
        fontFamily: "Microsoft YaHei",
        fontWeight: "bold",
        fill: "#FFFFFF",
      },
      offset: 18,
    });
  chart.interaction("element-active");
  chart.render();

  return chart;
};

/**
 *
 * @param {String} props.className 容器的 className ，默认 width: 1000px;height: 300px;
 * @param {Array} props.data 图表数据，Array Item 参考： { date: "2018-01-01", value: 34000 }
 * @param {String} props.axisColor 坐标轴颜色，默认值：'#20424C'
 * @param {Array} props.barColors 柱子颜色，分别为[奇数柱子颜色,偶数柱子颜色]，默认值：["#69E9FC", "#2555EB"]
 */
function HorizontalBar(props) {
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

export default HorizontalBar;
