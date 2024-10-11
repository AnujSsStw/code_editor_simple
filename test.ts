import { writeFile } from "fs/promises";

const data = await fetch("http://localhost:3000/api/hello");

await writeFile("data.json", JSON.stringify(await data.json(), null, 2));
