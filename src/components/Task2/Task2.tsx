import {
  Heading, Flex, Button, useDisclosure,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import simplify from 'simplify-js';
import GraphKit from 'components/Shared/GraphKit';
import SliderKit from 'components/Shared/SliderKit';
import Task2Modal from './Modal';

const xValues = new Array(111).fill(0).map((_, i) => i * 0.1);

const pressure = (p0: number, t0: number, l: number, h: number) => {
  if (l === 0) {
    return p0 * Math.exp(-(34.17 * h) / t0);
  }
  return p0 * (1 - (l * h) / t0) ** (34.17 / l);
};

const Task2 = () => {
  const [p, pSet] = useState<number>(1013);
  const [t, tSet] = useState<number>(288);
  const [l, lSet] = useState<number>(0);
  const modalDisc = useDisclosure();

  const currentData: { x: number, y: number }[] = useMemo(() => simplify(xValues.map((value) => ({ x: value, y: pressure(p, t, l, value) })), 0.01), [p, t, l]);

  return (
    <>
      <Flex flexFlow="column nowrap" align="center" gap={5}>
        <Flex flexFlow="column nowrap" w="100%" align="center">
          <Heading as="h2" size="lg" fontWeight="bold">Task 2</Heading>
          <Button alignSelf={[null, 'flex-end']} pos="relative" top={[0, -9]} onClick={modalDisc.onOpen}>Explanation</Button>
        </Flex>

        <SliderKit title="Lapse Rate (K/km)" unit="K/km" domain={[-10, 10]} step={0.1} numTicks={5} tickFn={(i) => 5 * i - 10} value={l} onChange={lSet} labelLeft={-2} />

        <SliderKit title="Pressure (KPa)" unit="KPa" domain={[800, 1200]} step={1} numTicks={9} tickFn={(i) => i * 50 + 800} value={p} onChange={pSet} decimalPoints={0} />

        <SliderKit title="Temperature (K)" unit="K" domain={[200, 300]} step={1} numTicks={11} tickFn={(i) => i * 10 + 200} value={t} onChange={tSet} labelLeft={-3} decimalPoints={0} />

        <GraphKit title="Variation of pressure with altitude" yLabel="Pressure (KPa)" domain={[0, 1200]} data={currentData} showPoints={false} />
      </Flex>

      <Task2Modal disclosure={modalDisc} />
    </>
  );
};

export default Task2;
