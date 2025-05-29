import {
  dirname
  , resolve
} from 'node:path'
import {
  fileURLToPath
} from 'node:url'
import { defineConfig } from "vite";

// https://vite.dev/config/

const __dirname
  = dirname
    (fileURLToPath
      (import.meta.url
      ))

export default defineConfig({
  build
    : {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        ds_btns_ds: resolve(__dirname, 'ds_btns_ds.html'),
        ds_btns_front_ds:resolve(__dirname, 'ds_btns_front_ds.html'),
        ds_screen_front_ds:resolve(__dirname, 'ds_screen_front_ds.html'),
        ds_slots_ds:resolve(__dirname, 'ds_slots_ds.html'),
        ds_wire_front_ds:resolve(__dirname, 'ds_wire_front_ds.html'),
      },
    },
  },
  server: {
    port: 8080,
    open: true,
  },
});
