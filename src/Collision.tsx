import {
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import { MokoMap2 } from "./moko-map2";

function makeMokoMap2(iterations: number) {
  const mokoMap = new MokoMap2();

  for (let i = 0; i <= iterations; i++) {
    const rnd = crypto.randomUUID();

    mokoMap.set(rnd, rnd);
    if (mokoMap.get(rnd) !== rnd) {
      throw new Error();
    }
  }

  return mokoMap;
}

function Collision() {
  const mokoMap = makeMokoMap2(100000);
  const { stats, tierDiv } = mokoMap.getStats();
  const data = Object.keys(stats).map((tier) => ({
    tier: Number(tier),
    count: stats[Number(tier)] / tierDiv,
  }));
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <AreaChart
        width={400}
        height={200}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="tier" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Legend />
        <Area type="monotone" dataKey="count" stroke="#ff7300" />
      </AreaChart>
    </div>
  );
}

export default Collision;
