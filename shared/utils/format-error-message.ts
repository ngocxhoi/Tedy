export default (error: string) => {
  return error.split(":")[1]?.trim() || "An error occurred";
};
