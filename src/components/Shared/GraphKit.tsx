/* eslint-disable react/require-default-props */
import { Flex, Heading, Text } from '@chakra-ui/react';
import {
  ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, ZAxis, Scatter, Legend,
} from 'recharts';
import { type PointList } from 'types';

interface Props {
  title: string;
  yLabel: string;
  domain: [number, number];
  data: PointList;
  data2?: PointList;
  showPoints: boolean;
  legend?: boolean;
}

const GraphKit = ({
  title, yLabel, domain, data, data2, showPoints, legend = false,
}: Props) => (
  <Flex flexFlow="column nowrap" align="center" mt={3} maxW="500px" width="70%" pos="relative">
    <Heading textAlign="center" as="h4" size="md" fontWeight="normal" ml={12}>{title}</Heading>
    <ResponsiveContainer minWidth="250px" width="90%" aspect={1}>
      <ScatterChart>
        <CartesianGrid />
        {/* @ts-expect-error They don't know how to TypeScript */}
        {legend && <Legend verticalAlign="insideTop" align="right" iconSize={8} />}
        <XAxis type="number" dataKey="x" name="Altitude" />
        <YAxis type="number" dataKey="y" name="Pressure" domain={domain} />
        <ZAxis type="number" range={showPoints ? [25] : [0]} />
        <Scatter name={yLabel.slice(0, -5)} data={data} fill="#711368" line={{ strokeWidth: 2 }} isAnimationActive={false} />
        {data2 && <Scatter name="Dew Point" data={data2} fill="#0096FF" line={{ strokeWidth: 2 }} isAnimationActive={false} />}
      </ScatterChart>
    </ResponsiveContainer>
    <Text size="md" fontWeight="normal" mt={-3} ml={12}>Altitude (km)</Text>
    <Text size="md" fontWeight="normal" transform="rotate(-90deg)" pos="absolute" left={[-70, -5]} top="40%">{yLabel}</Text>
  </Flex>
);

export default GraphKit;
