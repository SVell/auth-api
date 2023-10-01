const mongoose = require("mongoose");

export const createDbConnection = async (app, body) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }

  app.use(
    body.json({
      limit: "500kb",
    })
  );
};
