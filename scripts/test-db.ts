import { connectToDatabase } from "../database/mongoose";
// Diagnostics for driver/bson versions to help with BSON mismatch errors
// These imports are safe even if not otherwise used in the app runtime
import * as mongodb from "mongodb";
// @ts-ignore – type package may not export version; we guard at runtime
import * as bson from "bson";

async function main() {
    try {
        const driverVersion = (mongodb as any)?.version || (mongodb as any)?.MongoClient?.length ? "(unknown)" : "(unknown)";
        const bsonVersion = (bson as any)?.BSON_MAJOR_VERSION || (bson as any)?.version || "(unknown)";
        console.log(`Diagnostics: mongodb driver=${driverVersion}, bson=${bsonVersion}`);
        await connectToDatabase();
        // If connectToDatabase resolves without throwing, connection is OK
        console.log("OK: Database connection succeeded");
        process.exit(0);
    } catch (err) {
        console.error("ERROR: Database connection failed");
        console.error(err);
        process.exit(1);
    }
}

main();