import { writable } from 'svelte/store'

const createWritableStore = (key, startValue) => {
  const { subscribe, set } = writable(startValue);

  return {
    subscribe,
    set,
    useLocalStorage: () => {
      const json = localStorage.getItem(key);
      if(json) {
        set(JSON.parse(json));
      }
      
      subscribe(current => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}

export const user = createWritableStore('user', {
});
export const schoolsStore = createWritableStore('schools', []);
export const staffStore = createWritableStore('staff', []);
export const notificationsStore = createWritableStore('notifications', []);
export const singleStaff = writable({});
export const queries = writable([]);
export const leaves = writable([]);
export const transferStores = writable([]);