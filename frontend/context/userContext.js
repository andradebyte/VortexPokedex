import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem("@user_data");
        if (json) setUser(JSON.parse(json));
      } catch (e) {
        console.error("Erro ao carregar usuário:", e);
      }
      setLoading(false);
    })();
  }, []);

  async function saveUser(userData) {
    try {
      setUser(userData);
      await AsyncStorage.setItem("@user_data", JSON.stringify(userData));
    } catch (e) {
      console.error("Erro ao salvar usuário:", e);
    }
  }

  async function logout() {
    try {
      setUser(null);
      await AsyncStorage.removeItem("@user_data");
    } catch (e) {
      console.error("Erro ao remover usuário:", e);
    }
  }

  return (
    <UserContext.Provider value={{ user, saveUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext) || { user: null, logout: () => {} };
}
