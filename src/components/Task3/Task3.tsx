import { Heading, Select, Spinner, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Flex } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, ZAxis, ResponsiveContainer } from "recharts";
import { rk4, euler } from 'wasm';

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
  mt: '2',
  ml: '-0.5',
  fontSize: 'sm',
}

const Task3 = () => {
  //const [currentData, setCurrentData] = useState<Float32Array | null>(null);
  const [switchState, setSwitchState] = useState<'rk4' | 'euler'>('rk4');
  const [humidity, setHumidity] = useState<number>(0.5);

  const currentData: Float32Array = useMemo(() => {
    if (switchState === 'rk4') {
      return rk4(humidity) 
    }
    return euler(humidity)
  }, [switchState, humidity])

  const data: Data | null = useMemo(() => {
    if (currentData) {
      const vals: Data = { p: [], t: [], l: [] };
      xValues.forEach((value, index) => vals.p.push({ x: value, y: currentData[index] }))
      xValues.forEach((value, index) => vals.t.push({ x: value, y: currentData[index + 111] }))
      xValues.forEach((value, index) => vals.l.push({ x: value, y: currentData[index + 222] }))
      return vals;
    }
    return null;
  }, [currentData])


  // setEulerData(euler(0.5)); // Pressure/Temperature/Lapse-rate (each 1101) 0-11km in step sizes of 0.01 -> CHANGED TO EACH 111 IN STEP SIZES OF 0.1
  // setRk4Data(rk4(0.5)); // Pressure/Temperature/Lapse-rate (each 111) 0-11km in step sizes of 0.1
  // Switch between rk4 and euler
  // Plot all of these three graphs for each against altitude, which is 0-11km in respective step sizes. Input = humidity
  // Three dynamic graphs
  // Slider for humidity
  // Either find a way to make correct step sizes or have another state object that we change when the switch is changed
  // One state object { p: Float32Array, t: Float32Array, l: Float32Array }


  if (!currentData || !data) return (
    <>
      <Heading as="h2" size="lg" fontWeight="bold">Task 3</Heading>
      <Spinner size="xl" />
    </>
  )

  const labelStyles = {
    ml: '0.7%',
    mt: '2',
    fontSize: 'sm',
  }


  return (
  <Flex flexFlow="column nowrap" align="center" gap={5}>
    <Heading as="h2" size="lg" fontWeight="bold">Task 3</Heading>

      <Flex flexFlow="column nowrap" align="center" w="100%">
        <Heading as="h3" size="md" fontWeight="bold">Calculation Method</Heading>
        <Select value={switchState} onChange={(e) => setSwitchState(e.currentTarget.value as 'rk4' | 'euler')} maxWidth="300px" my={3}>
          <option value="rk4">RK4</option>
          <option value="euler">Euler</option>
        </Select>
      </Flex>

      <Flex flexFlow="column nowrap" align="center" w="100%">
        <Heading as="h3" size="md" fontWeight="bold">Humidity</Heading>
        <Slider aria-label='slider-ex-1' value={humidity} onChange={(val) => setHumidity(val)} max={1} step={0.01} minWidth="250px" width="60%" my={3}>
          {new Array(11).fill(0).map((_, i) => (
            <SliderMark visibility={i % 2 === 0 ? 'visible' : ['hidden', null, 'visible']} key={i} value={i * 0.1} {...labelStyles}>{(i * 0.1).toFixed(1)}</SliderMark>
          ))}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>

  <Flex flexFlow="row wrap" justify="center" w="100%" mt={3}>
    <ResponsiveContainer minWidth="300px" width="33%" aspect={1}>
      <ScatterChart>
        <CartesianGrid/>
        <XAxis type="number" dataKey="x" name="Altitude" unit="km"/>
        <YAxis type="number" dataKey="y" name="Pressure" unit="K"/>
        <ZAxis type="number" range={[20]}/>
        <Scatter name="TvA" data={data.p} fill="#711368" line />
      </ScatterChart>
    </ResponsiveContainer>

    <ResponsiveContainer minWidth="300px" width="33%" aspect={1}>
      <ScatterChart>
        <CartesianGrid/>
        <XAxis type="number" dataKey="x" name="Altitude" unit="km"/>
        <YAxis type="number" dataKey="y" name="Temperature" unit="K"/>
        <ZAxis type="number" range={[20]}/>
        <Scatter name="TvA" data={data.t} fill="#711368" line />
      </ScatterChart>
    </ResponsiveContainer>

    <ResponsiveContainer minWidth="300px" width="33%" aspect={1}>
      <ScatterChart>
        <CartesianGrid/>
        <XAxis type="number" dataKey="x" name="Altitude" unit="km"/>
        <YAxis type="number" dataKey="y" name="Lapse Rate" unit="K"/>
        <ZAxis type="number" range={[20]}/>
        <Scatter name="TvA" data={data.l} fill="#711368" line />
      </ScatterChart>
    </ResponsiveContainer>
  </Flex>

  </Flex>
)
}

export default Task3;