import { MokoMap } from "./moko-map";
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
  Legend,
} from "recharts";

function makeMokoMapData(iterations: number) {
  const times: { [iterations: number]: number } = {};
  const mokoMap = new MokoMap();

  const start = performance.now();
  for (let i = 0; i <= iterations; i++) {
    const rnd = crypto.randomUUID();

    mokoMap.set(rnd, rnd);
    if (mokoMap.get(rnd) !== rnd) {
      throw new Error();
    }

    if (i % (iterations / 10) === 0) {
      times[i] = performance.now() - start;
    }
  }

  return Object.entries(times).map(([i, time]) => ({
    iterations: Number(i),
    mokoMap: time,
  }));
}

function makeNativeMapData(iterations: number) {
  const times: { [iterations: number]: number } = {};
  const map = new Map();

  const start = performance.now();
  for (let i = 0; i <= iterations; i++) {
    const rnd = crypto.randomUUID();

    map.set(rnd, rnd);
    if (map.get(rnd) !== rnd) {
      throw new Error();
    }

    if (i % (iterations / 10) === 0) {
      times[i] = performance.now() - start;
    }
  }
  return Object.entries(times).map(([i, time]) => ({
    iterations: Number(i),
    nativeMap: time,
  }));
}

function ComparePerformance() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 1 }}>
        <h2>MokoMapの性能</h2>
        <LineChart
          width={400}
          height={200}
          data={makeMokoMapData(10000)}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="iterations" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Legend />
          <Line type="monotone" dataKey="mokoMap" stroke="#ff7300" />
          {/* <Line type="monotone" dataKey="nativeMap" stroke="#387908" /> */}
        </LineChart>
      </div>
      <div style={{ flex: 1 }}>
        <h2>NaitiveのMapの性能</h2>
        <LineChart
          width={400}
          height={200}
          data={makeNativeMapData(100000)}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="iterations" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Legend />
          <Line type="monotone" dataKey="nativeMap" stroke="#387908" />
        </LineChart>
      </div>
    </div>
  );
}

export default ComparePerformance;
