import { createApp } from "vue";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles"
createApp(App).use(ElementPlus).use(Particles, {
    init: async engine => {
        await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
        // await loadSlim(engine); // or you can load the slim version from "tsparticles-slim" if don't need Shapes or Animations
    },
}).use(store).use(router).mount("#app");

