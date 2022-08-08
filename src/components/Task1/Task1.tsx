import {
  Heading, Flex, Box, useDisclosure, Button,
} from '@chakra-ui/react';
import {
  Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, ZAxis, ResponsiveContainer,
} from 'recharts';
import Task1Modal from './Modal';

const data = [
  { x: 0, y: 288 },
  { x: 11, y: 216.5 },
  { x: 20, y: 216.5 },
  { x: 32, y: 228.5 },
  { x: 47, y: 270.5 },
  { x: 51, y: 270.5 },
  { x: 71, y: 214.5 },
  { x: 80, y: 196.5 },
];

const Task1 = () => {
  const modalDisc = useDisclosure();
  return (
    <>
      <Flex flexFlow="column nowrap" align="center">
        <Heading as="h2" size="lg" fontWeight="bold">Task 1</Heading>
        <Button alignSelf={[null, 'flex-end']} pos="relative" top={[0, -9]} onClick={modalDisc.onOpen}>Explanation</Button>

        <Box maxW="500px" width="100%">
          <ResponsiveContainer minWidth="300px" width="100%" aspect={1}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Altitude" unit="km" />
              <YAxis type="number" dataKey="y" name="Temperature" unit="K" domain={[200, 300]} />
              <ZAxis type="number" range={[20]} />
              <Scatter name="TvA" data={data} fill="#711368" line />
            </ScatterChart>
          </ResponsiveContainer>
        </Box>
      </Flex>
      <Task1Modal disclosure={modalDisc} />
    </>
  );
};

export default Task1;
