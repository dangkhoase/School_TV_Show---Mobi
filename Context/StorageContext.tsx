import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

// Kiểm tra nếu nền tảng là Web
const isWeb = typeof window !== 'undefined' && window.localStorage;

interface StorageContextType {
  storage: { [key: string]: any }; // Chúng ta sẽ lưu trữ bất kỳ kiểu dữ liệu nào
  storeData: (key: string, value: any) => Promise<void>;
  removeData: (key: string) => Promise<void>;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const useStorage = (): StorageContextType => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
};

interface StorageProviderProps {
  children: ReactNode;
}

export const StorageProvider: React.FC<StorageProviderProps> = ({ children }) => {
  const [storage, setStorage] = useState<{ [key: string]: any }>({});

  // Lấy dữ liệu khi component được mount
  useEffect(() => {
    const getStorageData = async () => {
      try {
        const storageData: { [key: string]: any } = {};

        // Kiểm tra các item trong SecureStore hoặc localStorage
        if (isWeb) {
          // Web: Lấy dữ liệu từ localStorage
          Object.keys(localStorage).forEach((key) => {
            const storedValue = localStorage.getItem(key);
            storageData[key] = storedValue ? JSON.parse(storedValue) : null; // Parse lại thành kiểu ban đầu
          });
        } else {
          // Di động: Lấy dữ liệu từ SecureStore
          const keys = ['userToken', 'userSettings']; // Cập nhật với các keys bạn đang sử dụng
          for (const key of keys) {
            const value = await SecureStore.getItemAsync(key);
            storageData[key] = value ? JSON.parse(value) : null; // Parse lại thành kiểu ban đầu
          }
        }

        setStorage(storageData);
      } catch (error) {
        console.error('Error retrieving storage data:', error);
      }
    };

    getStorageData();
  }, []);

  // Lưu trữ dữ liệu (bao gồm cả mảng và đối tượng)
  const storeData = async (key: string, value: any): Promise<void> => {
    try {
      const newStorage = { ...storage, [key]: value };
      setStorage(newStorage);

      const valueToStore = JSON.stringify(value); // Chuyển đổi mảng/đối tượng thành chuỗi

      if (isWeb) {
        // Web: Lưu vào localStorage
        localStorage.setItem(key, valueToStore);
      } else {
        // Di động: Lưu vào SecureStore
        await SecureStore.setItemAsync(key, valueToStore);
      }
    } catch (error) {
      console.error(`Error saving data for key ${key}:`, error);
    }
  };

  // Xóa dữ liệu
  const removeData = async (key: string): Promise<void> => {
    try {
      const newStorage = { ...storage };
      delete newStorage[key];
      setStorage(newStorage);

      if (isWeb) {
        // Web: Xóa khỏi localStorage
        localStorage.removeItem(key);
      } else {
        // Di động: Xóa khỏi SecureStore
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.error(`Error removing data for key ${key}:`, error);
    }
  };

  return (
    <StorageContext.Provider value={{ storage, storeData, removeData }}>
      {children}
    </StorageContext.Provider>
  );
};
