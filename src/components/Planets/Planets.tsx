import {
  Button, Flex, Heading, useDisclosure,
} from '@chakra-ui/react';
import PlanetPicker from './PlanetPicker';

const Planets = () => {
  const modalDisc = useDisclosure();
  return (
    <Flex flexFlow="column nowrap" align="center">
      <Heading as="h2" size="lg" fontWeight="bold">Planets</Heading>
      <Button alignSelf={[null, 'flex-end']} pos="relative" top={[0, -9]} onClick={modalDisc.onOpen}>Explanation</Button>
      <PlanetPicker />
    </Flex>
  );
};

export default Planets;
