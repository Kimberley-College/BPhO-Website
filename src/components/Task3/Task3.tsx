import {
  Heading, Select, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Flex, useDisclosure, Button,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import {
  Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, ZAxis, ResponsiveContainer,
} from 'recharts';
import { rk4, euler } from 'wasm';
import simplify from 'simplify-js';
import Task3Modal from './Modal';

const xValues = new Array(111).fill(0).map((_, i) => i * 0.1);

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

  const currentData: Float32Array = useMemo(() => {
    const now = performance.now();
    let vals: Float32Array;
    if (switchState === 'rk4') {
      vals = rk4(humidity);
    }
    vals = euler(humidity);
    console.log(performance.now() - now);
    return vals;
  }, [switchState, humidity]);

  const data: Data = useMemo(() => {
    const p = simplify(xValues.map((value, index) => ({ x: value, y: currentData[index] })), 0.01); // Using the Ramer–Douglas–Peucker algorithm to simplify amount of points required
    const t = simplify(xValues.map((value, index) => ({ x: value, y: currentData[index + 111] })), 0.01);
    const l = simplify(xValues.map((value, index) => ({ x: value, y: currentData[index + 222] })), 0.01);
    return { p, t, l };
  }, [currentData]);

  return (
    <>
      <Flex flexFlow="column nowrap" align="center">
        <Heading as="h2" size="lg" fontWeight="bold">Task 3</Heading>
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
          <ResponsiveContainer minWidth="300px" width="33%" aspect={1}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Altitude" unit="km" />
              <YAxis type="number" dataKey="y" name="Pressure" unit="K" domain={[0, 1200]} />
              <ZAxis type="number" range={[1]} />
              <Scatter name="TvA" data={data.p} fill="#711368" />
            </ScatterChart>
          </ResponsiveContainer>

          <ResponsiveContainer minWidth="300px" width="33%" aspect={1}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Altitude" unit="km" />
              <YAxis type="number" dataKey="y" name="Temperature" unit="K" domain={[-100, 30]} />
              <ZAxis type="number" range={[1]} />
              <Scatter name="TvA" data={data.t} fill="#711368" />
            </ScatterChart>
          </ResponsiveContainer>

          <ResponsiveContainer minWidth="300px" width="33%" aspect={1}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Altitude" unit="km" />
              <YAxis type="number" dataKey="y" name="Lapse Rate" unit="K" domain={[0, 12]} />
              <ZAxis type="number" range={[1]} />
              <Scatter name="TvA" data={data.l} fill="#711368" />
            </ScatterChart>
          </ResponsiveContainer>
        </Flex>

      </Flex>

      <Task3Modal disclosure={modalDisc} />
    </>
  );
};

export default Task3;
