import {
  Heading, Flex, Button, useDisclosure, Checkbox,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import simplify from 'simplify-js';
import GraphKit from 'components/Shared/GraphKit';
import SliderKit from 'components/Shared/SliderKit';
import { PointList } from 'types';
import Task2Modal from './Modal';

const xValues = new Array(801).fill(0).map((_, i) => i * 0.1);

const pressure = (p0: number, t0: number, l: number, h: number) => {
  if (l === 0) {
    return p0 * Math.exp(-(34.17 * h) / t0);
  }
  return p0 * (1 - (l * h) / t0) ** (34.17 / l);
};

const Task2 = () => {
  const [p, pSet] = useState(1013);
  const [t, tSet] = useState(288);
  const [l, lSet] = useState(0);
  const modalDisc = useDisclosure();
  const [pointShown, setPointShown] = useState(false);

  const [p2, p3, p4, p5, p6, p7] = useMemo(() => {
    const p2Calc = pressure(p, t, 6.5, 11);
    const p3Calc = pressure(p2Calc, t, 0, 9);
    const p4Calc = pressure(p3Calc, t, -1, 12);
    const p5Calc = pressure(p4Calc, t, -2.8, 15);
    const p6Calc = pressure(p5Calc, t, 0, 4);
    const p7Calc = pressure(p6Calc, t, 2.8, 20);
    return [p2Calc, p3Calc, p4Calc, p5Calc, p6Calc, p7Calc];
  }, [p, t]);

  const variable: PointList = useMemo(() => simplify(xValues.map((value) => ({ x: value, y: pressure(p, t, l, value) })), 0.05), [p, t, l]);
  const troposphere: PointList = useMemo(() => simplify(xValues.slice(0, 111).map((value) => ({ x: value, y: pressure(p, t, 6.5, value) })), 0.05), [p, t]);
  const tropopause: PointList = useMemo(() => simplify(xValues.slice(110, 201).map((value) => ({ x: value, y: pressure(p2, t, 0, value - 11) })), 0.05), [p2, t]);
  const stratosphere: PointList = useMemo(() => {
    const section1 = xValues.slice(200, 321).map((value) => ({ x: value, y: pressure(p3, t, -1, value - 20) }));
    const section2 = xValues.slice(320, 471).map((value) => ({ x: value, y: pressure(p4, t, -2.8, value - 32) }));
    return simplify(section1.concat(section2), 0.1);
  }, [p3, p4, t]);
  const stratopause: PointList = useMemo(() => simplify(xValues.slice(470, 511).map((value) => ({ x: value, y: pressure(p5, t, 0, value - 47) })), 0.05), [p5, t]);
  const mesosphere: PointList = useMemo(() => {
    const section1 = xValues.slice(510, 711).map((value) => ({ x: value, y: pressure(p6, t, 2.8, value - 51) }));
    const section2 = xValues.slice(711, 801).map((value) => ({ x: value, y: pressure(p7, t, 2, value - 71) }));
    return simplify(section1.concat(section2), 0.05);
  }, [p6, p7, t]);

  return (
    <>
      <Flex flexFlow="column nowrap" align="center" gap={5}>
        <Flex flexFlow="column nowrap" w="100%" align="center">
          <Heading as="h2" size="lg" fontWeight="bold">Task 2</Heading>
          <Checkbox alignSelf={[null, 'flex-start']} pos="relative" top={[0, '-30px']} isChecked={pointShown} onChange={(e) => setPointShown(e.target.checked)}>
            Show Points?
          </Checkbox>
          <Button alignSelf={[null, 'flex-end']} pos="relative" top={[0, '-60px']} onClick={modalDisc.onOpen}>Explanation</Button>
        </Flex>

        <SliderKit title="Lapse Rate (K/km)" unit="K/km" domain={[-10, 10]} step={0.1} numTicks={5} tickFn={(i) => 5 * i - 10} value={l} onChange={lSet} labelLeft={-2} />

        <SliderKit title="Pressure (mbar)" unit="mbar" domain={[800, 1200]} step={1} numTicks={9} tickFn={(i) => i * 50 + 800} value={p} onChange={pSet} decimalPoints={0} />

        <SliderKit title="Temperature (K)" unit="K" domain={[200, 300]} step={1} numTicks={11} tickFn={(i) => i * 10 + 200} value={t} onChange={tSet} labelLeft={-3} decimalPoints={0} />

        <GraphKit
          title="Variation of pressure with altitude"
          yLabel="Pressure (mbar)"
          domain={[0, 1200]}
          data={[
            { name: 'Variable Plot', points: variable },
            { name: 'Troposphere', points: troposphere, colour: '#008080' },
            { name: 'Tropopause', points: tropopause, colour: '#00abad' },
            { name: 'Stratosphere', points: stratosphere, colour: '#32cd32' },
            { name: 'Stratopause', points: stratopause, colour: '#ff7f00' },
            { name: 'Mesosphere', points: mesosphere, colour: '#fc3003' }]}
          showPoints={pointShown}
          legend
        />
      </Flex>

      <Task2Modal disclosure={modalDisc} />
    </>
  );
};

export default Task2;
