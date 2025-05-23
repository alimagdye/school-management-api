import express from "express";

export const globalMiddleware = [
  express.json(), // Parse incoming JSON requests
  express.urlencoded({ extended: true }),
];

// error handler middleware for global errors. It should be the last middleware in the app. this only can catch errors that are thrown synchronously.
export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(400).json({ msg: "unexpected error" });
};
