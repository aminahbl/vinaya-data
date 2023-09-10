import data from "../src";
import { sleep } from "../utils";
import updaters from "./updateFns";

const args = process.argv.slice(2);

if (args.length === 0) {
  Object.keys(updaters).forEach((key) => {
    console.log("Updating: ", key);
    // Sleep limits the occurrences of requests stalling due to hitting Xata limits
    data[key].forEach(sleep(updaters[key], 200));
  });
} else {
  args.forEach((arg) => {
    if (updaters[arg]) {
      console.log("Updating: ", arg);
      data[arg].forEach(sleep(updaters[arg], 200));
    } else {
      console.error("Invalid data key passed.");
      process.exit(1);
    }
  });
}
