const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const { user: User } = prisma;
const { catchAsync } = require("./catchAsync");

app.use((req, res, next) => {
  console.log(`${req.method} : ${req.originalUrl}`);
  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get(
  "/users",
  catchAsync(async (req, res, next) => {
    const allUsers = await User.findMany();
    return res.status(200).json({
      status: "success",
      users: allUsers,
    });
  })
);

app.post(
  "/users/new",
  catchAsync(async (req, res, next) => {
    const { name, email } = req.body;
    const user = await User.create({
      data: {
        name: name,
        email: email,
      },
    });
    return res.status(201).json({
      status: "success",
      user: user,
    });
  })
);

app.patch(
  "/users/:id",
  catchAsync(async (req, res, next) => {
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
    };

    const updatedUser = await User.update({
      where: {
        id: req.params.id,
      },
      data: updatedData,
    });

    return res.status(200).json({
      status: "success",
      user: updatedUser,
    });
  })
);

app.get(
  "/users/:id",
  catchAsync(async (req, res, next) => {
    const user = await User.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        name: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "no user found",
      });
    }
    return res.status(200).json({
      status: "success",
      user: user,
    });
  })
);

app.post("*", (req, res, next) => {
  return res.status(404).json({
    status: "fail",
    message: "endpoint not found",
  });
});

app.use((err, req, res, next) => {
  console.log({
    err,
  });
  return res.status(500).json({
    error: err,
  });
});

app.listen(5000, () => {
  console.log("listening on localhost:5000");
});
