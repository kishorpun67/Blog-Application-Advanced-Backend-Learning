// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "../../prisma/client.js";
// import { database } from "../config/config.js";
// import {Pool} from "pg"

// const pool = new Pool({
//     connectionString: database,
//     // max: 10,                    // ← connection limit
//     // idleTimeoutMillis: 30000,   // close idle connections
//     // connectionTimeoutMillis: 10000,
// })
// const adapter = new PrismaPg(pool)

// export const prisma = new PrismaClient({ adapter })


import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";
import { DATABASE_URL } from "../config/config.js";
const connectionString = DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
export { prisma };
