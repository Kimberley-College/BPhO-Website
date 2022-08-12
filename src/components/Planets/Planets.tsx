import {
  Button, Checkbox, Flex, Heading, useDisclosure,
} from '@chakra-ui/react';
import GraphKit from 'components/Shared/GraphKit';
import { useMemo, useState } from 'react';
import PlanetPicker from './PlanetPicker';
import { pData, tData } from './Data';

const Planets = () => {
  const modalDisc = useDisclosure();
  const [activePlanets, setActivePlanets] = useState(['Earth']);
  const [pointShown, setPointShown] = useState(false);

  const activeTData = useMemo(() => tData.filter((d) => activePlanets.includes(d.name)), [activePlanets]);
  const activePData = useMemo(() => pData.filter((d) => activePlanets.includes(d.name)), [activePlanets]);

  return (
    <Flex flexFlow="column nowrap" align="center">
      <Heading as="h2" size="lg" fontWeight="bold">Planets</Heading>
      <Checkbox alignSelf={[null, 'flex-start']} pos="relative" top={[0, '-30px']} isChecked={pointShown} onChange={(e) => setPointShown(e.target.checked)}>
        Show Points?
      </Checkbox>
      <Button alignSelf={[null, 'flex-end']} pos="relative" top={[0, '-60px']} onClick={modalDisc.onOpen}>Explanation</Button>
      <PlanetPicker activePlanets={activePlanets} setActivePlanets={setActivePlanets} />

      <Flex flexFlow="row wrap" justify="center" w="100%" maxW="1500px" mt={3}>
        <GraphKit
          title="Temperature variation with altitude"
          yLabel="Temperature (K)"
          domain={[200, 300]}
          data={activeTData}
          showPoints={pointShown}
          legend
        />

        <GraphKit
          title="Variation of pressure with altitude"
          yLabel="Pressure (mbar)"
          data={activePData}
          showPoints={pointShown}
          legend
        />
      </Flex>
    </Flex>
  );
};

export default Planets;
