import {
  Heading, Flex, Slider, SliderTrack, SliderThumb, SliderFilledTrack, SliderMark, Button, useDisclosure, NumberInput, NumberInputField,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import simplify from 'simplify-js';
import GraphKit from 'components/Shared/GraphKit';
import Task2Modal from './Modal';

const xValues = new Array(111).fill(0).map((_, i) => i * 0.1);

const pressure = (p0: number, t0: number, l: number, h: number) => {
  if (l === 0) {
    return p0 * Math.exp(-(34.17 * h) / t0);
  }
  return p0 * (1 - (l * h) / t0) ** (34.17 / l);
};

const labelStyles = {
  ml: '-1',
  mt: '2',
  fontSize: 'sm',
};

const Task2 = () => {
  const [p, pSet] = useState<number>(1013.25);
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

        <Heading as="h3" size="md" fontWeight="bold" mb={2}>Lapse Rate (K/km)</Heading>
        <Slider aria-label="Lapse Rate" value={l} focusThumbOnChange={false} onChange={(val) => lSet(val)} min={-10} max={10} step={0.1} minWidth="250px" width="60%" my={3}>
          {new Array(5).fill(0).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <SliderMark key={5 * i - 10} visibility={i % 2 === 0 ? 'visible' : ['hidden', null, 'visible']} value={5 * i - 10} {...labelStyles}>{5 * i - 10}</SliderMark>
          ))}
          <SliderMark
            value={l}
            textAlign="center"
            bg="brand.kimberley"
            color="white"
            mt="-9"
            ml="-5"
            w="15"
          >
            {l.toFixed(1)}K/km
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>

        <Flex flexFlow="column nowrap" align="center" w="100%">
          <Flex flexFlow="row nowrap" align="center" mb={5}>
            <Heading as="h3" size="md" fontWeight="bold" mr={3}>Initial Pressure (KPa)</Heading>
            <NumberInput value={p} onChange={(v) => pSet(Number(v))} size="sm" maxW="100px">
              <NumberInputField />
            </NumberInput>
          </Flex>

          <Slider aria-label="Pressure" value={p} focusThumbOnChange={false} onChange={(val) => pSet(val)} min={800} max={1200} step={1} minWidth="250px" width="60%" my={3}>
            {new Array(9).fill(0).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <SliderMark key={i} visibility={i % 2 === 0 ? 'visible' : ['hidden', null, 'visible']} value={i * 50 + 800} {...labelStyles}>{i * 50 + 800 /* 50 = step size, 800 = min */}</SliderMark>
            ))}
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>

        <Flex flexFlow="column nowrap" align="center" w="100%">
          <Heading as="h3" size="md" fontWeight="bold" mb={7}>Initial Temperature (K)</Heading>
          <Slider aria-label="Temperature" value={t} onChange={(val) => tSet(val)} min={200} max={300} step={1} minWidth="250px" width="60%" my={3}>
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

        <GraphKit title="Variation of pressure with altitude" yLabel="Pressure (KPa)" domain={[0, 1200]} data={currentData} showPoints={false} />
      </Flex>

      <Task2Modal disclosure={modalDisc} />
    </>
  );
};

export default Task2;
