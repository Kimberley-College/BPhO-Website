import { Heading, Flex, Slider, SliderTrack, SliderThumb, SliderFilledTrack, SliderMark } from "@chakra-ui/react";
import { Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, ZAxis } from "recharts";
import { useMemo, useState } from "react";

const xValues = new Array(111).fill(0).map((_, i) => i * 0.1);
function pressure(p0: number, t0: number, h: number) {
  return p0 * Math.exp(-34.17 * h / t0)
}

const labelStyles = {
  mt: '2',
  ml: '-0.5',
  fontSize: 'sm',
}

const Task2 = () => {
  const [p, pSet] = useState<number>(1013.25);
  const [t, tSet] = useState<number>(288);

  const currentData: { x: number, y: number }[] = useMemo(() => xValues.map((value) => ({ x: value, y: pressure(p, t, value) })), [p, t])

  return (
  <Flex flexFlow="column nowrap" align="center" gap={5}>
    <Heading as="h2" size="lg" fontWeight="bold">Task 2</Heading>
    
    <Flex flexFlow="column nowrap" align="center" w="100%">
      <Heading as="h3" size="md" fontWeight="bold">Pressure (KPa)</Heading>
      <Slider aria-label='Pressure' value={p} onChange={(val) => pSet(val)} min={800} max={1200} step={10} minWidth="250px" width="60%" my={3}>
        {new Array(9).fill(0).map((_, i) => (
          <SliderMark key={i} value={i * 50 + 800} {...labelStyles}>{i * 50 + 800 /* 50 = step size, 800 = min */}</SliderMark>
        ))}
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Flex>

    <Flex flexFlow="column nowrap" align="center" w="100%">
      <Heading as="h3" size="md" fontWeight="bold">Temperature (K)</Heading>
      <Slider aria-label='Temperature' value={t} onChange={(val) => tSet(val)} min={200} max={300} step={5} minWidth="250px" width="60%" my={3}>
        {new Array(11).fill(0).map((_, i) => (
          <SliderMark key={i} value={i * 10 + 200} {...labelStyles}>{i * 10 + 200  /* 10 = step size, 200 = min */}</SliderMark>
        ))}
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Flex>

    <ScatterChart width={500} height={500}>
      <CartesianGrid/>
      <XAxis type="number" dataKey="x" name="Altitude" unit="km"/>
      <YAxis type="number" dataKey="y" name="Pressure" unit="KPa" domain={[0,1200]}/>
      <ZAxis type="number" range={[0]}/>
      <Scatter name="TvA" data={currentData} fill="#711368" line/>
    </ScatterChart>
  </Flex>
)
}

export default Task2;