const args = process.argv.slice(2);

const x = {
  potato: "🥔",
  carrot: "🥕",
  local: "🌍",
};

if (args.length === 0) {
  console.log("No arguments passed");
  process.exit(0);
}

args.forEach((arg) => {
    if(x[arg]) {
      console.log(x[arg]);
    }
})
