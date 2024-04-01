import { flatRoutes } from "remix-flat-routes";
/** @type {import('@remix-run/dev').AppConfig} */

export default {
  ignoredRouteFiles: ["**/*.css"],
  tailwind: true,
  postcss: true,
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes);
  },
};
