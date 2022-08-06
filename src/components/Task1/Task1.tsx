import { Heading } from "@chakra-ui/react";
import { Line, LineChart } from "recharts";

// const series = [
//   {
//     name: 
//   }
// ]

const Task1 = () => (
  <>
    <Heading as="h2" size="lg" fontWeight="bold">Task 1</Heading>
    <LineChart width={500} height={500}>
      <Line type="monotone" dataKey="pv" stroke="#8884d8" />
    </LineChart>
  </>
)

export default Task1;