export default (input: string): number => {
  const regex = /^(\d+)([dhms])$/i;
  const match = input.match(regex);

  if (!match) {
    throw new Error(
      "Invalid time format. Use formats like '7d', '5h', '30m', '45s'"
    );
  }

  const value = parseInt(match[1]!, 10);
  const unit = match[2]!.toLowerCase();

  switch (unit) {
    case "d":
      return value * 24 * 60 * 60;
    case "h":
      return value * 60 * 60;
    case "m":
      return value * 60;
    case "s":
      return value;
    default:
      throw new Error("Unsupported time unit");
  }
};
