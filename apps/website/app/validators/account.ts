import vine from "@vinejs/vine";

vine.convertEmptyStringsToNull = true;

export const socialAccountLoginValidator = vine.compile(
  vine.object({
    id: vine
      .string()
      .parse((value) =>
        typeof value === "string" ? value : typeof value === "number" ? value.toString() : null,
      ),
  }),
);
