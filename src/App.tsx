import { Box, Flex, Heading, Image, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Task1 from 'components/Task1/Task1';
import Task2 from 'components/Task2/Task2';
import Task3 from 'components/Task3/Task3';
import React from 'react';

function App() {

  return (
    <div className="App">
      <>
        <Flex h="600px" pos="relative" direction="column" p="5vw" pt={['150px', null, null, '100px', '150px']} bgImg="/KimberleyBg.png" bgRepeat="no-repeat" bgSize="cover" bgPosition="top" backdropFilter="blur(5px)" backgroundColor="rgba(0,0,0,0.6)" align="center" justify="center" maxH="100vh" gap={10}>
        <Box h="640px" w="100%" pos="absolute" bottom={0} left={0} backdropFilter="blur(5px)" bgColor="rgba(255,255,255,0.2)" zIndex={-1} />
        <Image alignSelf="flex-start" src="/kimberley_logo.png" pos="absolute" top={5} height={110} width={110} alt="Logo" />
        <Heading color="brand.kimberley" as="h1" size="3xl" fontWeight="bold">Kimbo BPhO</Heading>
        <Heading w="80%" minW="300px">Our entry for the maiden BPhO Computational Physics Challenge - 2022</Heading>
        <Heading w="80%" minW="300px">By Jamie Whiting and Nicholas Gregory</Heading>
        </Flex>
      </>

      <Flex flexFlow="column nowrap" align="center">
        <Box minW="300px" w="80%" mt={5} borderRadius="5px" border="1px solid gray">
          <Tabs>
            <TabList>
              <Tab>Task 1</Tab>
              <Tab>Task 2</Tab>
              <Tab>Task 3</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Task1 />
              </TabPanel>
              <TabPanel>
                <Task2 />
              </TabPanel>
              <TabPanel>
                <Task3 />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </div>
  );
}

export default App;
