import { pgTable, pgEnum, text, timestamp, integer } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const pricingPlanEnum = pgEnum("pricingPlan", ["free", "pro", "custom"]);

export const userApiLimit = pgTable("user_api_limit", {
  id: text("id").primaryKey(),
  count: integer().default(5),
  pricingPlan: pricingPlanEnum().default("free"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
