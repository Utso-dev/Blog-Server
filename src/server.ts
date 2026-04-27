import app from "./app";
import { prisma } from "./lib/prisma";

const port = process.env.PORT || 4000;

const main = async () => {
  try {
    await prisma.$connect();
    console.log("Database Connected Successfuly");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
