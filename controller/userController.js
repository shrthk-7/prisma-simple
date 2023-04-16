const { prisma, catchAsync } = require("../utils");

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await prisma.user.findUnique({
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
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await prisma.user.findMany();
  return res.status(200).json({
    status: "success",
    users: allUsers,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
    },
  });
  return res.status(201).json({
    status: "success",
    user: user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedData = {
    name: req.body.name,
    email: req.body.email,
  };

  const updatedUser = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: updatedData,
  });

  return res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});
