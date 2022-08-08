import {

} from '@chakra-ui/react';
import type { UseDisclosureReturn } from '@chakra-ui/react';
import ModalKit from 'components/Shared/ModalKit';

interface Props {
  disclosure: UseDisclosureReturn;
}

const markdown = `# Test
test2
\`\`\`
pub fn euler_short(u: f32) -> Vec<[f32; 3]> {
  let es = |t: f32| 6.1121 *  ((18.678 - t / 234.5) * (t / (t + 257.14))).exp();
  let dp = |p: f32, ues: f32, tk: f32| -34.171 * (p - 0.37776 * ues) / tk;
  let l = |p: f32, ues: f32, tk: f32| 9.7734 * (tk + 5420.3 * ues / (p - ues)) / (tk * tk + 8400955.5 * ues / (p - ues)) * tk;
  let next = |u: f32, x: [f32; 3]| [x[0] + 0.01 * dp(x[0], u * es(x[1]), x[1] + 273.15), x[1] - 0.01 * x[2], l(x[0], u * es(x[1]), x[1] + 273.15)];
  let mut soln = vec![[1013.25, 15.0, l(1013.25, u * 17.051727, 288.15)]];
  for _ in 1..1101 { soln.push(next(u, *soln.last().unwrap())); }
  soln
}
\`\`\`
`;

const Task3Modal = ({ disclosure }: Props) => (
  <ModalKit
    disclosure={disclosure}
    title="Task 3 Explanation"
    markdown={markdown}
  />
);

export default Task3Modal;
