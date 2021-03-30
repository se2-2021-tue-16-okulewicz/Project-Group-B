export type Config = {
  environment_name: string;
  backend: {
    ip: string;
    port: number;
  };
  defaultFilters: {
    size: number;
    page: number;
  };
  testTokens: {
    regular: string;
    admin: string;
    shelter: string;
  };
  cookies: {
    token: string;
    userType: string;
    userId: string;
  };
};

const configObject: Config = require("./development.json");

export default configObject;
