import "./App.css";
import styles from "./App.module.css";
import RadialBar from "@/components/RadialBar";

const data = [{ term: "test", count: 70, max: 100 }];

const colors = {
  test: {
    backgroundColor: "rgba(104,233,252,.5)",
    foregroundColor: "rgb(104,233,252)",
  },
};

function App() {
  return (
    <div className="App">
      <RadialBar
        data={data}
        colors={colors}
        className={styles["radial-bar"]}
        lineWidth={5}
      ></RadialBar>
    </div>
  );
}

export default App;
