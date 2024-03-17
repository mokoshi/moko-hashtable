import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
  Legend,
} from "recharts";
import { MokoMap2 } from "./moko-map2";

function makeMokoMap2Data(iterations: number) {
  const times: { [iterations: number]: number } = {};
  const mokoMap = new MokoMap2();

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

function ComparePerformance2() {
  const mokoMap2Data = makeMokoMap2Data(100000);
  const nativeMapData = makeNativeMapData(100000);
  const data = mokoMap2Data.map((mokoMap, i) => ({
    iterations: mokoMap.iterations,
    mokoMap2: mokoMap.mokoMap,
    nativeMap: nativeMapData[i].nativeMap,
  }));
  return (
    <div>
      <LineChart
        width={400}
        height={200}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="iterations" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Legend />
        <Line type="monotone" dataKey="mokoMap2" stroke="#ff7300" />
        <Line type="monotone" dataKey="nativeMap" stroke="#387908" />
      </LineChart>
    </div>
  );
}

export default ComparePerformance2;
