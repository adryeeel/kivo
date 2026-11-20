import { fileURLToPath } from 'node:url';
import shared from '@kivo/config/oxfmt';

export default {
  ...shared,
  sortTailwindcss: {
    stylesheet: fileURLToPath(new URL('./apps/web/src/styles.css', import.meta.url)),
  },
};
