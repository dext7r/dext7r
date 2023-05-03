import axios from "axios";

export function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

const NPM_SEARCH_URL_REGEX = /^https:\/\/registry\.npmjs\.org\/(-\/v1\/search\?text=author:[a-zA-Z0-9\-\_]+(&scope=[a-zA-Z0-9\-\_]+)?)$/;

interface NpmPackageObject {
  package: {
    name: string;
  };
}

interface NpmPackageResponse {
  objects: NpmPackageObject[];
}

export async function syncNpmScope(url: string): Promise<string[]> {
  if (!NPM_SEARCH_URL_REGEX.test(url)) {
    console.log("URL 不符合规则");
    return [];
  }
  let pkgname: string[] = [];
  try {
    const { data: { objects } } = await axios.get<NpmPackageResponse>(url);
    pkgname = objects.map((item) => {
      const packageName = item.package.name;
      return packageName;
    });
    return pkgname;
  } catch (error) {
    console.log(error);
    pkgname = [];
  };
  return pkgname;
}
