import type { Session, User } from "better-auth";
import type {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
} from "vue-router";

// Định nghĩa kiểu cho giá trị trả về từ API, ví dụ khi đăng nhập/đăng ký
export type ApiResponse<T> = {
  data?: T;
  message?: string; // Tùy chọn: nếu API trả về thông báo
  error?: any;
};

export type SidebarLists = {
  id: string;
  title: string;
  text: string;
  createdAt: string;
  target?: boolean;
};

export type SessionGlobal = {
  session: Session;
  user: User;
};

export type SidebarItem = {
  id: string;
  label: string;
  icon: string;
  href?: string | RouteLocationAsPathGeneric | RouteLocationAsRelativeGeneric;
};

export type LocationPoint = {
  label: string;
  lat: number;
  long: number;
};

export type ChatMessage = {
  role: "user" | "system";
  content: string;
  time?: string;
};
