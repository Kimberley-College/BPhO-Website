import {
  Flex, Heading, Image, Text,
} from '@chakra-ui/react';
import { useState } from 'react';

const planets = [
  { name: 'Earth', img: '/planets/earth.png' },
  { name: 'Mercury', img: '/planets/earth.png' },
  { name: 'Venus', img: '/planets/earth.png' },
  { name: 'Mars', img: '/planets/earth.png' },
];

const PlanetPicker = () => {
  const [activePlanets, setActivePlanets] = useState<string[]>([]);
  const togglePlanet = (planet: string) => (activePlanets.includes(planet) ? setActivePlanets(activePlanets.filter((p) => p !== planet)) : setActivePlanets([...activePlanets, planet]));

  return (
    <Flex flexFlow="column nowrap" align="center" border="1px solid" borderRadius="5px" borderColor="brand.kimberley" p={3}>
      <Heading as="h3" size="sm" fontWeight="bold" mb={2}>Planet Selector</Heading>
      <Flex flexFlow="row nowrap">
        {planets.map((planet) => (
          <Flex flexFlow="column nowrap" align="center" p={2} mx={2} borderRadius="5px" bgColor={activePlanets.includes(planet.name) ? 'green.400' : 'gray.300'} onClick={() => togglePlanet(planet.name)}>
            <Image src={planet.img} alt={planet.name} w="50px" />
            <Text>{planet.name}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
export default PlanetPicker;