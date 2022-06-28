import { PrismaClient, Prisma } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma:
    | PrismaClient<
        Prisma.PrismaClientOptions,
        "info" | "warn" | "error" | "query"
      >
    | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "stdout",
        level: "error",
      },
      {
        emit: "stdout",
        level: "info",
      },
      {
        emit: "stdout",
        level: "warn",
      },
    ],
  });
if (process.env.NODE_ENV !== "production") global.prisma = prisma;


prisma.$on("warn", (e) => {
  console.log("PRISMA: ", e);
});

prisma.$on("query", (e) => {
 console.log("PRISMA: ", e);
});


prisma.$on("info", (e) => {
  console.log("PRISMA: ", e);
});

prisma.$on("error", (e) => {
  console.log("PRISMA: ", e);
});
