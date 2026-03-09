import { Task, TASK_STATUS } from 'models/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TaskState = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
  updateStatus: (task: Task, status: TASK_STATUS) => void;
  refetchTask: boolean;
  setRefetch: (status: boolean) => void;
  setTaskData: (data: Omit<TaskState, 'setTaskData'>) => void;
};

export const useTaskStore = create(
  persist<TaskState>(
    (set) => ({
      tasks: [],
      addTask: (item) =>
        set((state) => {
          const tasks = [...state.tasks];
          tasks.push(item);
          return {
            ...state,
            tasks: tasks,
            refetchTask: true,
          };
        }),
      refetchTask: false,
      setRefetch: (status) =>
        set((state) => {
          return {
            ...state,
            refetchTask: status,
          };
        }),
      deleteTask: (item) =>
        set((state) => {
          const tasks = [...state.tasks];
          const position = tasks.findIndex((to) => to.id === item.id);
          tasks.splice(position, 1);
          return {
            ...state,
            tasks: tasks,
            refetchTask: true,
          };
        }),
      updateStatus: (item, status: TASK_STATUS) => {
        return set((state) => {
          const tasks = [...state.tasks];
          const position = tasks.findIndex((to) => to.id === item.id);
          tasks[position].status = status;
          return {
            ...state,
            tasks: tasks, // ✅ was `Tasks` (capital T)
            refetchTask: true,
          };
        });
      },
      setTaskData: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),
    }),
    {
      name: 'tasks',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
