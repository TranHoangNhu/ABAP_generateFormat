const LOCAL_STORAGE_KEY = "ABAP_GENERATE";

export default {
  get() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  },
  set(key) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(key));
  },
};
