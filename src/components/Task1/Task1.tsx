import {
  Heading, Flex, useDisclosure, Button,
} from '@chakra-ui/react';
import GraphKit from 'components/Shared/GraphKit';
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

        <GraphKit title="Temperature variation with altitude" yLabel="Temperature (K)" domain={[200, 300]} data={[{ name: 'Temperature', points: data }]} showPoints />
      </Flex>
      <Task1Modal disclosure={modalDisc} />
    </>
  );
};

export default Task1;
