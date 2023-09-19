import { parse } from "https://deno.land/std@0.201.0/jsonc/mod.ts";

let json;

try {
  const localPath = "../deno.json";
  json = await import(localPath, { assert: { type: "json" } });
} catch { /* noop */ }

try {
  json = parse(await Deno.readTextFile("deno.jsonc"));
} catch { /* noop */ }

// @ts-ignore explicit null check here
if (!json || !json.imports) {
  console.error("No deno.json or deno.jsonc with imports found!");
  Deno.exit();
}

/* Generate a file we can use to preinstall deps */
let importString = "";
let count = 0;

// @ts-ignore assume imports exist
Object.values(json.imports).forEach((val: string) => {
  if (val.startsWith("npm:")) {
    count++;
    importString += `import "${val}";\n`;
  }
});
importString += `console.log("Installed ${count} npm modules")`;

const installFileName = "__npm_install.js";
await Deno.writeTextFile(installFileName, importString);

/* Run generated Deno module, which should preinstall deps */
const command = new Deno.Command("deno", {
  args: [
    "run",
    "-A",
    "--unstable",
    "--node-modules-dir",
    installFileName,
  ],
});
const output = await command.output();
console.log(new TextDecoder().decode(output.stdout));
console.log(new TextDecoder().decode(output.stderr));

/* Destroy generated import file */
await Deno.remove(installFileName);
