import {
  Button, Flex, Heading, useDisclosure,
} from '@chakra-ui/react';
import GraphKit from 'components/Shared/GraphKit';
import { useMemo, useState } from 'react';
import PlanetPicker from './PlanetPicker';

const t1Data = [
  {
    name: 'Earth',
    points: [
      { x: 0, y: 288 },
      { x: 11, y: 216.5 },
      { x: 20, y: 216.5 },
      { x: 32, y: 228.5 },
      { x: 47, y: 270.5 },
      { x: 51, y: 270.5 },
      { x: 71, y: 214.5 },
      { x: 80, y: 196.5 },
    ],
  },
  {
    name: 'Mercury',
    points: [
      { x: 0, y: 288 },
    ],
  },
  {
    name: 'Venus',
    points: [
      { x: 0, y: 288 },
    ],
  },
  {
    name: 'Mars',
    points: [
      { x: 0, y: 288 },
    ],
  },
];

const Planets = () => {
  const modalDisc = useDisclosure();
  const [activePlanets, setActivePlanets] = useState(['Earth']);

  const activeT1Data = useMemo(() => t1Data.filter((d) => activePlanets.includes(d.name)), [activePlanets]);

  return (
    <Flex flexFlow="column nowrap" align="center">
      <Heading as="h2" size="lg" fontWeight="bold">Planets</Heading>
      <Button alignSelf={[null, 'flex-end']} pos="relative" top={[0, -9]} onClick={modalDisc.onOpen}>Explanation</Button>
      <PlanetPicker activePlanets={activePlanets} setActivePlanets={setActivePlanets} />

      <Flex flexFlow="row wrap" justify="center" w="100%" maxW="1500px" mt={3}>
        <GraphKit
          title="Temperature variation with altitude"
          yLabel="Temperature (K)"
          domain={[200, 300]}
          data={activeT1Data}
          showPoints
          legend
        />

        <GraphKit
          title="Variation of pressure with altitude"
          yLabel="Pressure (KPa)"
          domain={[0, 1200]}
          data={activeT1Data}
          showPoints={false}
          legend
        />
      </Flex>
    </Flex>
  );
};

export default Planets;
