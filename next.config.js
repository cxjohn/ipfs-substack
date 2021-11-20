module.exports = {
  target: "serverless",
  async rewrites() {
    return [
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
  exportTrailingSlash: true,
};
