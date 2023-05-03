import { syncNpmMirrorPackage } from "../src";
import { syncNpmScope } from "../src/utils";

syncNpmScope('https://registry.npmjs.org/-/v1/search?text=author:h7ml&scope=dext7r').then((list: string[]) => {
  if (list?.length > 0) {
    const result = list.filter(item => item.includes('dext7r'));
    syncNpmMirrorPackage(result, 10);
  }
}).catch((err) => {
  console.log(err);
});
