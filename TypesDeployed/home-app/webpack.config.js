const path = require("path");
// home-app/webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
// import ModuleFederationPlugin from webpack
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
// import dependencies from package.json, which includes react and react-dom
const { dependencies } = require("./package.json");

const WebpackRemoteTypesPlugin = require("webpack-remote-types-plugin").default;

module.exports = {
  mode: "development",
  entry: "./entry.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new WebpackRemoteTypesPlugin({
      remotes: {
        HeaderApp: "app@http://localhost:3001/remoteEntry.js",
      },
      outputDir: ".wp_federation_publisher_types", // Output directory for types
      remoteFileName: "types.tgz", // default filename is [name]-dts.tgz where [name] is the remote name, for example, `app` with the above setup
    }),

    new ModuleFederationPlugin({
      name: "HomeApp", // This application named 'HomeApp'
      // This is where we define the federated modules that we want to consume in this app.
      // Note that we specify "Header" as the internal name
      // so that we can load the components using import("Header/").
      // We also define the location where the remote's module definition is hosted:
      // Header@[http://localhost:3001/remoteEntry.js].
      // This URL provides three important pieces of information: the module's name is "Header", it is hosted on "localhost:3001",
      // and its module definition is "remoteEntry.js".
      remotes: {
        HeaderApp: "HeaderApp@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        // and shared
        ...dependencies, // other dependencies
        react: {
          // react
          singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          // react-dom
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    historyApiFallback: true,
    port: 3000,
  },
};
