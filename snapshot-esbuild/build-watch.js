const esbuild = require("esbuild");

esbuild.build({
  // pass any options to esbuild here...
  entryPoints: ["src/index.jsx"],
  outdir: "public",
  bundle: true,
  inject: ["./react-shim.js"],
  define: { "process.env.NODE_ENV": '"production"' },
  sourcemap: false,
  minify: true,
  watch: {
    onRebuild(error, result) {
      if (error) console.error('Watch build failed:', error)
      else console.log('Watch build succeeded:', result)
    },
  },
});

console.log("Started ES build in watch mode...")
