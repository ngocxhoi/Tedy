import { defineStore } from "pinia";

export const useMyStateStore = defineStore("states", {
  state: () => ({
    verify: false,
    loginForm: true,
    chatId: null,
    openSetting: false,
  }),

  actions: {
    setVerify(value: boolean) {
      this.verify = value;
    },
  },
});
