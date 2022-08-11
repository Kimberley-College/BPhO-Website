import {
  Heading, Flex, Button, useDisclosure,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import simplify from 'simplify-js';
import GraphKit from 'components/Shared/GraphKit';
import SliderKit from 'components/Shared/SliderKit';
import { PointList } from 'types';
import Task2Modal from './Modal';

const xValues = new Array(321).fill(0).map((_, i) => i * 0.1);

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

  const [p2, p3] = useMemo(() => {
    const p2Calc = pressure(p, t, 6.5, 11);
    const p3Calc = pressure(p2Calc, t, 0, 9);
    return [p2Calc, p3Calc];
  }, [p, t]);

  const variable: PointList = useMemo(() => simplify(xValues.map((value) => ({ x: value, y: pressure(p, t, l, value) })), 0.01), [p, t, l]);
  const troposphere: PointList = useMemo(() => simplify(xValues.slice(0, 111).map((value) => ({ x: value, y: pressure(p, t, 6.5, value) })), 0.01), [p, t]);
  const tropopause: PointList = useMemo(() => simplify(xValues.slice(110, 201).map((value) => ({ x: value, y: pressure(p2, t, 0, value - 11) })), 0.01), [p2, t]);
  const stratosphere: PointList = useMemo(() => simplify(xValues.slice(200, 321).map((value) => ({ x: value, y: pressure(p3, t, -1, value - 20) })), 0.01), [p3, t]);

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

        <GraphKit
          title="Variation of pressure with altitude"
          yLabel="Pressure (KPa)"
          domain={[0, 1200]}
          data={[
            { name: 'Variable Plot', points: variable },
            { name: 'Troposphere', points: troposphere, colour: '#008080' },
            { name: 'Tropopause', points: tropopause, colour: '#32cd32' },
            { name: 'Stratosphere', points: stratosphere, colour: '#ff7f00' }]}
          showPoints={false}
          legend
        />
      </Flex>

      <Task2Modal disclosure={modalDisc} />
    </>
  );
};

export default Task2;
