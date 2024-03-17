import ComparePerformance from "./ComparePerformance";
import ComparePerformanceZuru from "./ComparePerformance2";

function App() {
  return (
    <div>
      <h1>性能悪化</h1>
      <ComparePerformance />

      <h1>２分探索を利用</h1>
      <ComparePerformanceZuru />
    </div>
  );
}

export default App;
