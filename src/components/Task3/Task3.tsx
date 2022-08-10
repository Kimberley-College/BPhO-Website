import {
  Heading, Select, Flex, useDisclosure, Button, Checkbox,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { rkScheme, eulerScheme } from 'wasm';
import GraphKit from 'components/Shared/GraphKit';
import SliderKit from 'components/Shared/SliderKit';
import Task3Modal from './Modal';

// const xValues = new Array(111).fill(0).map((_, i) => i * 0.1);
const tolerance = 0.025;
interface Data {
  p: {
    x: number;
    y: number;
  }[];
  t: {
    x: number;
    y: number;
  }[];
  l: {
    x: number;
    y: number;
  }[];
  tdew: {
    x: number;
    y: number;
  }[];
  tboil: {
    x: number;
    y: number;
  }[];
}

const Task3 = () => {
  // const [currentData, setCurrentData] = useState<Float32Array | null>(null);
  const [switchState, setSwitchState] = useState<'rk4' | 'euler'>('rk4');
  const [humidity, setHumidity] = useState<number>(0.5);
  const modalDisc = useDisclosure();
  const [pointShown, setPointShown] = useState<boolean>(false);

  const currentData = useMemo(() => {
    if (switchState === 'rk4') {
      return Array.from(rkScheme(humidity, tolerance));
    }
    return Array.from(eulerScheme(humidity, tolerance));
  }, [switchState, humidity]);

  const data: Data = useMemo(() => {
    const vals: Data = {
      p: [], t: [], l: [], tdew: [], tboil: [],
    };
    let idx = 1;
    Object.keys(vals).forEach((key) => {
      const len = currentData[idx - 1];
      vals[key] = currentData.slice(idx, idx + len).map((value, index) => ({ x: value, y: currentData[idx + index + len] }));
      idx += 2 * len + 1;
    });
    return vals;
  }, [currentData]);

  return (
    <>
      <Flex flexFlow="column nowrap" align="center">
        <Heading as="h2" size="lg" fontWeight="bold">Task 3</Heading>
        <Checkbox alignSelf={[null, 'flex-start']} pos="relative" top={[0, 0]} isChecked={pointShown} onChange={(e) => setPointShown(e.target.checked)}>
          Show Points?
        </Checkbox>
        <Button alignSelf={[null, 'flex-end']} pos="relative" top={[0, -9]} onClick={modalDisc.onOpen}>Explanation</Button>

        <Flex flexFlow="column nowrap" align="center" w="100%">
          <Heading as="h3" size="md" fontWeight="bold">Calculation Method</Heading>
          <Select value={switchState} onChange={(e) => setSwitchState(e.currentTarget.value as 'rk4' | 'euler')} maxWidth="300px" my={3}>
            <option value="rk4">RK4</option>
            <option value="euler">Euler</option>
          </Select>
        </Flex>

        <SliderKit title="Relative Humidity" unit="" domain={[0, 1]} step={0.01} numTicks={11} tickFn={(i) => i * 0.1} value={humidity} onChange={setHumidity} labelLeft={-0.5} tooltipLeft={-8} />

        <Flex flexFlow="row wrap" justify="center" w="100%" maxW="1500px" mt={3}>

          <GraphKit title="Variation of pressure with altitude" yLabel="Pressure (KPa)" domain={[0, 1200]} data={data.p} showPoints={pointShown} />

          <GraphKit title="Variation of temperature with altitude" yLabel="Temperature (°C)" domain={[-130, 30]} data={data.t} data2={data.tdew} showPoints={pointShown} legend />

          <GraphKit title="Variation of lapse rate with altitude" yLabel="Lapse Rate (K/km)" domain={[0, 12]} data={data.l} showPoints={pointShown} />

          <GraphKit title="Variation of boiling point with altitude" yLabel="Temperature (°C)" domain={[0, 120]} data={data.tboil} showPoints={pointShown} />
        </Flex>

      </Flex>

      <Task3Modal disclosure={modalDisc} />
    </>
  );
};

export default Task3;
