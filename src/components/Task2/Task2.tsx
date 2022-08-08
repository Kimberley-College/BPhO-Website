import {
  Heading, Flex, Slider, SliderTrack, SliderThumb, SliderFilledTrack, SliderMark, Button, Box, useDisclosure,
} from '@chakra-ui/react';
import {
  Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, ZAxis, ResponsiveContainer,
} from 'recharts';
import { useMemo, useState } from 'react';
import Task2Modal from './Modal';

const xValues = new Array(111).fill(0).map((_, i) => i * 0.1);

const pressure = (p0: number, t0: number, h: number) => p0 * Math.exp((-34.17 * h) / t0);

const labelStyles = {
  ml: '-2.5',
  mt: '2',
  fontSize: 'sm',
};

const Task2 = () => {
  const [p, pSet] = useState<number>(1013.25);
  const [t, tSet] = useState<number>(288);
  const modalDisc = useDisclosure();

  const currentData: { x: number, y: number }[] = useMemo(() => xValues.map((value) => ({ x: value, y: pressure(p, t, value) })), [p, t]);

  return (
    <>
      <Flex flexFlow="column nowrap" align="center" gap={5}>
        <Flex flexFlow="column nowrap" w="100%" align="center">
          <Heading as="h2" size="lg" fontWeight="bold">Task 2</Heading>
          <Button alignSelf={[null, 'flex-end']} pos="relative" top={[0, -9]} onClick={modalDisc.onOpen}>Explanation</Button>
        </Flex>

        <Flex flexFlow="column nowrap" align="center" w="100%">
          <Heading as="h3" size="md" fontWeight="bold" mb={7}>Pressure (KPa)</Heading>
          <Slider aria-label="Pressure" value={p} onChange={(val) => pSet(val)} min={800} max={1200} step={10} minWidth="250px" width="60%" my={3}>
            {new Array(9).fill(0).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <SliderMark key={i} visibility={i % 2 === 0 ? 'visible' : ['hidden', null, 'visible']} value={i * 50 + 800} {...labelStyles}>{i * 50 + 800 /* 50 = step size, 800 = min */}</SliderMark>
            ))}
            <SliderMark
              value={p}
              textAlign="center"
              bg="brand.kimberley"
              color="white"
              mt="-9"
              ml="-5"
              w="20"
            >
              {p} KPa
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>

        <Flex flexFlow="column nowrap" align="center" w="100%">
          <Heading as="h3" size="md" fontWeight="bold" mb={7}>Temperature (K)</Heading>
          <Slider aria-label="Temperature" value={t} onChange={(val) => tSet(val)} min={200} max={300} step={5} minWidth="250px" width="60%" my={3}>
            {new Array(11).fill(0).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <SliderMark key={i} visibility={i % 2 === 0 ? 'visible' : ['hidden', null, 'visible']} value={i * 10 + 200} {...labelStyles}>{i * 10 + 200 /* 10 = step size, 200 = min */}</SliderMark>
            ))}
            <SliderMark
              value={t}
              textAlign="center"
              bg="brand.kimberley"
              color="white"
              mt="-9"
              ml="-5"
              w="12"
            >
              {t}K
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>

        <Box maxW="500px" width="100%">
          <ResponsiveContainer minWidth="300px" width="100%" aspect={1}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Altitude" unit="km" />
              <YAxis type="number" dataKey="y" name="Pressure" unit="KPa" domain={[0, 1200]} />
              <ZAxis type="number" range={[0]} />
              <Scatter name="TvA" data={currentData} fill="#711368" line />
            </ScatterChart>
          </ResponsiveContainer>
        </Box>
      </Flex>

      <Task2Modal disclosure={modalDisc} />
    </>
  );
};

export default Task2;
