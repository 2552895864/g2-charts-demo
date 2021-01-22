import "./App.css";
import styles from "./App.module.css";
import RadialBar from "@/components/RadialBar";
import HorizontalBar from "@/components/HorizontalBar";
import Area from "@/components/Area";

const data = [
  { date: "2018-01-01", value: 1231231 },
  { date: "2019-01-01", value: 3734512 },
  { date: "2020-01-01", value: 856987 },
];

function App() {
  return (
    <div className="App">
      <HorizontalBar
        data={data}
        axisColor="#FF0000"
        barColors={["#00FF00", "#0000FF"]}
      ></HorizontalBar>
    </div>
  );
}

export default App;
