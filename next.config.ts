/* eslint-disable @typescript-eslint/no-explicit-any */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure webpack to handle ES modules properly
  webpack: (
    config: {
      resolve: { extensionAlias: { ".js": string[] } };
      externals: {
        shiki: string;
        "vscode-oniguruma": string;
        "vscode-textmate": string;
      }[];
      module: { rules: { test: RegExp; use: string }[] };
    },
    { isServer }: any
  ) => {
    // Handle ES modules
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
    };

    // Exclude problematic packages from webpack bundling on server side
    if (isServer) {
      config.externals.push({
        shiki: "shiki",
        "vscode-oniguruma": "vscode-oniguruma",
        "vscode-textmate": "vscode-textmate",
      });
    }

    // Handle .node files and native modules
    config.module.rules.push({
      test: /\.node$/,
      use: "raw-loader",
    });

    return config;
  },

  // Configure transpilation for ES modules
  transpilePackages: [
    "unified",
    "remark-parse",
    "remark-rehype",
    "rehype-stringify",
    "rehype-pretty-code",
    "shiki",
    "micromark",
    "micromark-util-character",
    "micromark-util-chunked",
    "micromark-util-classify-character",
    "micromark-util-combine-extensions",
    "micromark-util-decode-numeric-character-reference",
    "micromark-util-decode-string",
    "micromark-util-encode",
    "micromark-util-html-tag-name",
    "micromark-util-normalize-identifier",
    "micromark-util-resolve-all",
    "micromark-util-sanitize-uri",
    "micromark-util-subtokenize",
    "micromark-util-symbol",
    "micromark-util-types",
  ],
};

module.exports = nextConfig;
