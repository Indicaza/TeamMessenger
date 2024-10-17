// src/storageHelper.js
export const getStorageItem = (key) => {
  return new Promise((resolve, reject) => {
    if (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.local
    ) {
      chrome.storage.local.get([key], (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result[key]);
        }
      });
    } else {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }
  });
};

export const setStorageItem = (key, value) => {
  return new Promise((resolve, reject) => {
    if (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.local
    ) {
      chrome.storage.local.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        resolve();
      } catch (error) {
        reject(error);
      }
    }
  });
};
