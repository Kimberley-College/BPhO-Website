/* eslint-disable react/require-default-props */
import { Flex, Heading, Text } from '@chakra-ui/react';
import {
  ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, ZAxis, Scatter, Legend,
} from 'recharts';
import { type PointList } from 'types';

interface Props {
  title: string;
  yLabel: string;
  domain?: [number, number];
  data: { name: string, points: PointList, colour?: string }[];
  showPoints: boolean;
  legend?: boolean;
}

const GraphKit = ({
  title, yLabel, domain, data, showPoints, legend = false,
}: Props) => (
  <Flex flexFlow="column nowrap" align="center" mt={3} maxW="500px" width={['80%', null, '70%']} pos="relative">
    <Heading textAlign="center" as="h4" size="md" fontWeight="normal" ml={12}>{title}</Heading>
    <ResponsiveContainer minWidth="300px" width="90%" aspect={1}>
      <ScatterChart>
        <CartesianGrid />
        {legend && (
          <Legend
            align={'right' /* @ts-expect-error Typescript */}
            verticalAlign="insideTop"
            iconSize={8}
            layout="horizontal"
            wrapperStyle={{
              display: 'flex', flexFlow: 'row-reverse wrap', width: '70%', maxWidth: '400px',
            }}
          />
        )}
        <XAxis type="number" dataKey="x" name="Altitude" />
        <YAxis type="number" dataKey="y" name="Pressure" domain={domain} />
        <ZAxis type="number" range={showPoints ? [25] : [0]} />
        {data.map((plot) => (
          <Scatter key={plot.name} name={plot.name} data={plot.points} fill={plot.colour ?? '#711368'} line={{ strokeWidth: 2 }} isAnimationActive={false} />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
    <Text size="md" fontWeight="normal" mt={-3} ml={12}>Altitude (km)</Text>
    <Text size="md" fontWeight="normal" transform="rotate(-90deg)" pos="absolute" left={[-75, -10]} top="40%">{yLabel}</Text>
  </Flex>
);

export default GraphKit;
