import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// This safely grabs the exact folder path of the current file
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  plugins: {
    tailwindcss: {
      // This forces PostCSS to look for Tailwind right next to it
      config: resolve(__dirname, 'tailwind.config.js')
    },
    autoprefixer: {},
  },
}