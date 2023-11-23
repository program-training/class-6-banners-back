import cors, { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin:"*",
};

const corsHandler = cors(corsOptions);

export default corsHandler;
