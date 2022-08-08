import {

} from '@chakra-ui/react';
import type { UseDisclosureReturn } from '@chakra-ui/react';
import ModalKit from 'components/Shared/ModalKit';

interface Props {
  disclosure: UseDisclosureReturn;
}

const markdown = `
Task 3 requires the solving a coupled pair of first order differential equations.


A simple implementation of Euler's method (as requested) for the task is shown here, though we ended up going with a 
different way to encode the data more nicely for use in TypeScript/JavaScript, 
incorporate the dew point and boiling point temperatures, and achieve better performance (using Runge Kutta 4th Order).
This, however, is still a fully working rust-wasm implementation, and using it in the website
is a simple case of a map from the returned Float32Array to the form required by whatever graphing API you want (we used 'recharts').
\`\`\`rust
#[wasm_bindgen(js_name = eulerScheme)]
pub fn euler_scheme(u: f32, p0: f32, t0: f32) -> Box<[f32]> {
    let es = |t: f32| 6.1121 *  ((18.678 - t / 234.5) * (t / (t + 257.14))).exp();
    let dp = |p: f32, ues: f32, tk: f32| -34.171 * (p - 0.37776 * ues) / tk;
    let l = |p: f32, ues: f32, tk: f32| 9.7734 * (tk + 5420.3 * ues / (p - ues)) / (tk * tk + 8400955.5 * ues / (p - ues)) * tk;
    let next = |u: f32, x: [f32; 3]| [x[0] + 0.01 * dp(x[0], u * es(x[1]), x[1] + 273.15), x[1] - 0.01 * x[2], l(x[0], u * es(x[1]), x[1] + 273.15)];
    let mut soln = vec![[p0, t0, l(p0, u * es(t0), t0 + 273.15)]];
    for _ in 1..1101 { soln.push(next(u, *soln.last().unwrap())); }
    soln.concat().into_boxed_slice()
}
\`\`\`
Some naive code in TypeScript to format this data appropriately for recharts could be as follows:
\`\`\`typescript
interface Data {
  p: Array<{ x: number; y: number }>;
  t: Array<{ x: number; y: number }>;
  l: Array<{ x: number; y: number }>;
}

const xValues = new Array(111).fill(0).map((_, i) => i * 0.1);
const currentData: Float32Array = useMemo(() => {
  // Memoization means this only recalculates when a change is detected in 'u'
  eulerScheme(u, 1013.15, 15.0) // Value of 'u' is controlled by the slider
}, [u]);
const data: Data = useMemo(() => {
  // Similarly to above, this only recalculates when a change is detected
  const vals: Data = { p: [], t: [], l: [] };
  // We are only taking every 10th point, because plotting 1101 points
  // over 111 points has no visible benefit, but is significantly more 
  // impactful on time and memory usage
  xValues.forEach((value, index) => vals.p.push({ x: value, y: currentData[30 * index] }));
  xValues.forEach((value, index) => vals.t.push({ x: value, y: currentData[30 * index + 1] }));
  xValues.forEach((value, index) => vals.l.push({ x: value, y: currentData[30 * index + 2] }));
  return vals;
}, [currentData]);
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
