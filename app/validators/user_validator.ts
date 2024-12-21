import vine from "@vinejs/vine";

export const updateAvatarValidator = vine.compile(
  vine.object({
    avatar: vine.file({
      size: "20mb",
      extnames: ["jpg", "png", "pdf"],
    }),
  }),
);
