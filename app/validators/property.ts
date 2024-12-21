import vine from "@vinejs/vine";

export const createPropertyValidator = vine.compile(
  vine.object({
    street: vine.string(),
    postalCode: vine.string(),
    city: vine.string(),
    price: vine.number(),
    avatarProperty: vine.file({
      size: "20mb",
      extnames: ["jpg", "png", "pdf"],
    }),
    type: vine.enum(["house", "apartment", "condo"]),
  }),
);
