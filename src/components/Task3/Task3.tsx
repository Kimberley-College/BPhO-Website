import { Heading, Select, Spinner, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Flex } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, ZAxis } from "recharts";
import { rk4, euler } from 'wasm';

const Task3 = () => {
  const [currentData, setCurrentData] = useState<Float32Array | null>(null);
  const [switchState, setSwitchState] = useState<'rk4' | 'euler'>('rk4');
  const [humidity, setHumidity] = useState<number>(0.5);
  const xValues = new Array(111).fill(0).map((_, i) => i * 0.1);

  useEffect(() => {
    if (switchState === 'rk4') {
      setCurrentData(rk4(humidity));
    } else {
      setCurrentData(euler(humidity))
    }
  }, [switchState, humidity])

  const data: { x: number, y: number }[] | null = useMemo(() => {
    if (currentData) {
      return xValues.map((value, index) => ({ x: value, y: currentData[index] }))
    }
    return null;
  }, [currentData, xValues])


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
    mt: '2',
    ml: '-0.5',
    fontSize: 'sm',
  }


  return (
  <Flex flexFlow="column nowrap" gap={10}>
    <Heading as="h2" size="lg" fontWeight="bold">Task 3</Heading>
    <Select value={switchState} onChange={(e) => setSwitchState(e.currentTarget.value as 'rk4' | 'euler')}>
      <option value="rk4">RK4</option>
      <option value="euler">Euler</option>
    </Select>

    <Slider aria-label='slider-ex-1' value={humidity} onChange={(val) => setHumidity(val)} max={1} step={0.1}>
      <SliderMark value={0} {...labelStyles}>0</SliderMark>
      <SliderMark value={0.1} {...labelStyles}>0.1</SliderMark>
      <SliderMark value={0.2} {...labelStyles}>0.2</SliderMark>
      <SliderMark value={0.3} {...labelStyles}>0.3</SliderMark>
      <SliderMark value={0.4} {...labelStyles}>0.4</SliderMark>
      <SliderMark value={0.5} {...labelStyles}>0.5</SliderMark>
      <SliderMark value={0.6} {...labelStyles}>0.6</SliderMark>
      <SliderMark value={0.7} {...labelStyles}>0.7</SliderMark>
      <SliderMark value={0.8} {...labelStyles}>0.8</SliderMark>
      <SliderMark value={0.9} {...labelStyles}>0.9</SliderMark>
      <SliderMark value={1} {...labelStyles}>1.0</SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>

    <ScatterChart width={500} height={500}>
      <CartesianGrid/>
      <XAxis type="number" dataKey="x" name="Altitude" unit="km"/>
      <YAxis type="number" dataKey="y" name="Temperature" unit="K" domain={[200,300]}/>
      <ZAxis type="number" range={[20]}/>
      <Scatter name="TvA" data={data} fill="#711368" line/>
    </ScatterChart>

  </Flex>
)
}

export default Task3;