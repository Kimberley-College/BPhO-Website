import {
  Heading, Select, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Flex, useDisclosure, Button, Checkbox,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { rk4, euler } from 'wasm';
import simplify from 'simplify-js';
import GraphKit from 'components/Shared/GraphKit';
import Task3Modal from './Modal';

const xValues = new Array(111).fill(0).map((_, i) => i * 0.1);
const tolerance = 0.02;
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

const labelStyles = {
  ml: '0',
  mt: '2',
  fontSize: 'sm',
};

const Task3 = () => {
  // const [currentData, setCurrentData] = useState<Float32Array | null>(null);
  const [switchState, setSwitchState] = useState<'rk4' | 'euler'>('rk4');
  const [humidity, setHumidity] = useState<number>(0.5);
  const modalDisc = useDisclosure();
  const [pointShown, setPointShown] = useState<boolean>(false);

  const currentData: Float32Array = useMemo(() => {
    if (switchState === 'rk4') {
      return rk4(humidity);
    }
    return euler(humidity);
  }, [switchState, humidity]);

  const data: Data = useMemo(() => {
    const p = simplify(xValues.map((value, index) => ({ x: value, y: currentData[index] })), tolerance); // Using the Ramer–Douglas–Peucker algorithm to simplify amount of points required
    const t = simplify(xValues.map((value, index) => ({ x: value, y: currentData[index + 111] })), tolerance);
    const l = simplify(xValues.map((value, index) => ({ x: value, y: currentData[index + 222] })), tolerance);
    const tdew = simplify(xValues.map((value, index) => ({ x: value, y: currentData[index + 333] })), tolerance);
    const tboil = simplify(xValues.map((value, index) => ({ x: value, y: currentData[index + 444] })), tolerance);
    return {
      p, t, l, tdew, tboil,
    };
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

        <Flex flexFlow="column nowrap" align="center" w="100%">
          <Heading as="h3" size="md" fontWeight="bold" mb={7}>Humidity</Heading>
          <Slider aria-label="slider-ex-1" value={humidity} onChange={(val) => setHumidity(val)} max={1} step={0.01} minWidth="250px" width="60%" my={3}>
            {new Array(11).fill(0).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
              <SliderMark visibility={i % 2 === 0 ? 'visible' : ['hidden', null, 'visible']} key={i} value={i * 0.1} {...labelStyles}>{(i * 0.1).toFixed(1)}</SliderMark>
            ))}
            <SliderMark
              value={humidity}
              textAlign="center"
              bg="brand.kimberley"
              color="white"
              mt="-9"
              ml="-5"
              w="12"
            >
              {humidity}
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>

        <Flex flexFlow="row wrap" justify="center" w="100%" maxW="1500px" mt={3}>

          <GraphKit title="Variation of pressure with altitude" yLabel="Pressure (KPa)" domain={[0, 1200]} data={data.p} showPoints={pointShown} />

          <GraphKit title="Variation of temperature with altitude" yLabel="Temperature (°C)" domain={[-130, 30]} data={data.t} data2={data.tdew} showPoints={pointShown} />

          <GraphKit title="Variation of lapse rate with altitude" yLabel="Lapse Rate (K/km)" domain={[0, 12]} data={data.l} showPoints={pointShown} />

          <GraphKit title="Variation of boiling point with altitude" yLabel="Temperature (°C)" domain={[0, 120]} data={data.tboil} showPoints={pointShown} />
        </Flex>

      </Flex>

      <Task3Modal disclosure={modalDisc} />
    </>
  );
};

export default Task3;
