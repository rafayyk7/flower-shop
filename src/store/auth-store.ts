import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types/user";

// ============================================================
// Auth Store — Mock authentication with localStorage
// ============================================================
// In production, replace with real API calls to your backend.
// This mock version stores users in localStorage for demo.
// ============================================================

interface StoredUser extends User {
  password: string; // In real app, NEVER store passwords client-side
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

// Helper to get/set mock user database
const USERS_KEY = "petal-bloom-users";

const getStoredUsers = (): StoredUser[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

const saveStoredUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });

        // Simulate API delay
        await new Promise((r) => setTimeout(r, 800));

        const users = getStoredUsers();
        const user = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (user) {
          const { password: _, ...safeUser } = user;
          set({ user: safeUser, isAuthenticated: true, isLoading: false });
          return { success: true };
        }

        set({ isLoading: false });
        return { success: false, error: "Invalid email or password" };
      },

      register: async (data) => {
        set({ isLoading: true });

        // Simulate API delay
        await new Promise((r) => setTimeout(r, 800));

        const users = getStoredUsers();

        // Check if email already exists
        if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
          set({ isLoading: false });
          return { success: false, error: "An account with this email already exists" };
        }

        // Create new user
        const newUser: StoredUser = {
          id: crypto.randomUUID(),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        saveStoredUsers(users);

        const { password: _, ...safeUser } = newUser;
        set({ user: safeUser, isAuthenticated: true, isLoading: false });
        return { success: true };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const updatedUser = { ...currentUser, ...data };
        set({ user: updatedUser });

        // Also update in storage
        const users = getStoredUsers();
        const index = users.findIndex((u) => u.id === currentUser.id);
        if (index !== -1) {
          users[index] = { ...users[index], ...data };
          saveStoredUsers(users);
        }
      },
    }),
    {
      name: "petal-bloom-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
