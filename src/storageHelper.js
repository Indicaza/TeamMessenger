// storageHelper.js
export const getStorageItem = (key) => {
  return new Promise((resolve, reject) => {
    try {
      const isChromeStorageAvailable =
        typeof globalThis !== "undefined" &&
        globalThis.chrome &&
        globalThis.chrome.storage &&
        globalThis.chrome.storage.local;

      if (isChromeStorageAvailable) {
        globalThis.chrome.storage.local.get([key], (result) => {
          if (globalThis.chrome.runtime.lastError) {
            console.error(
              `Error getting storage item '${key}':`,
              globalThis.chrome.runtime.lastError
            );
            reject(globalThis.chrome.runtime.lastError);
          } else {
            console.log(
              `Retrieved storage item '${key}' from chrome.storage.local:`,
              result[key]
            );
            resolve(result[key]);
          }
        });
      } else if (typeof window !== "undefined" && window.localStorage) {
        // Fallback for development environment
        const data = localStorage.getItem(key);
        console.warn(
          `Using localStorage fallback for getStorageItem('${key}')`
        );
        resolve(data ? JSON.parse(data) : null);
      } else {
        console.error("No storage method available.");
        resolve(null);
      }
    } catch (error) {
      console.error(`Exception in getStorageItem('${key}'):`, error);
      reject(error);
    }
  });
};

export const setStorageItem = (key, value) => {
  return new Promise((resolve, reject) => {
    try {
      const isChromeStorageAvailable =
        typeof globalThis !== "undefined" &&
        globalThis.chrome &&
        globalThis.chrome.storage &&
        globalThis.chrome.storage.local;

      if (isChromeStorageAvailable) {
        globalThis.chrome.storage.local.set({ [key]: value }, () => {
          if (globalThis.chrome.runtime.lastError) {
            console.error(
              `Error setting storage item '${key}':`,
              globalThis.chrome.runtime.lastError
            );
            reject(globalThis.chrome.runtime.lastError);
          } else {
            console.log(
              `Set storage item '${key}' in chrome.storage.local:`,
              value
            );
            resolve();
          }
        });
      } else if (typeof window !== "undefined" && window.localStorage) {
        // Fallback for development environment
        localStorage.setItem(key, JSON.stringify(value));
        console.warn(
          `Using localStorage fallback for setStorageItem('${key}')`
        );
        resolve();
      } else {
        console.error("No storage method available.");
        resolve();
      }
    } catch (error) {
      console.error(`Exception in setStorageItem('${key}'):`, error);
      reject(error);
    }
  });
};

export const clearStorage = () => {
  return new Promise((resolve, reject) => {
    try {
      const isChromeStorageAvailable =
        typeof globalThis !== "undefined" &&
        globalThis.chrome &&
        globalThis.chrome.storage &&
        globalThis.chrome.storage.local;

      if (isChromeStorageAvailable) {
        globalThis.chrome.storage.local.clear(() => {
          if (globalThis.chrome.runtime.lastError) {
            console.error(
              "Error clearing storage:",
              globalThis.chrome.runtime.lastError
            );
            reject(globalThis.chrome.runtime.lastError);
          } else {
            console.log("Storage cleared");
            resolve();
          }
        });
      } else if (typeof window !== "undefined" && window.localStorage) {
        // Fallback for development environment
        localStorage.clear();
        console.log("localStorage cleared");
        resolve();
      } else {
        console.error("No storage method available.");
        resolve();
      }
    } catch (error) {
      console.error("Exception in clearStorage():", error);
      reject(error);
    }
  });
};
