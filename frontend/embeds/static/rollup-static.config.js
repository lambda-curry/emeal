import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './embeds/static/emeal-embed.tsx',
  output: {
    file: './public/static/dist/emeal-embed.min.js',
    banner:
      "/*! Not sure why this copyright below is getting added. The code in it's entirety is copyrighted so please do not use it in it's entirety, but feel free to copy and use patterns that you like! */",
  },
  plugins: [typescript(), terser()],
};
