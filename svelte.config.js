import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';


/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sequence([
    vitePreprocess(),
    preprocessMeltUI() // add to the end!
  ]),

  kit: {
    adapter: adapter(),
    alias: {
      "$lib": "./src/lib/*",
      "$utils": "./src/utils/*",
      "$components": "./src/components/*",
      "$layout": "./src/layout/*",
      "$store": "./src/store/*",
      "$assets": "./src/assets/*",
    }
  },

};

export default config;

