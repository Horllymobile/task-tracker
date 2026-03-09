# Task Application

Task Application is a simple task management application that allows users to create, update, and delete tasks.

---

## Setup Instructions

### Prerequisites

- Node.js >= 18.x
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator / Android Emulator or physical device with Expo Go

### Installation

1. **Clone the repository**

```bash
   git clone https://github.com/Horllymobile/aair-task-app
   cd aair-task-app
```

2. **Install dependencies**

```bash
   npm install
```

3. **Start the development server**

```bash
   npx expo start
```

4. **Run on device**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan the QR code with Expo Go on a physical device

---

## Libraries Used

| Library                                     | Purpose                                                                                                               |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `zustand`                                   | Lightweight global state management. Chosen over Redux for its minimal boilerplate and built-in `persist` middleware. |
| `zustand/middleware (persist)`              | Persists task state across app restarts without extra setup.                                                          |
| `@react-native-async-storage/async-storage` | Local storage adapter for Zustand's persist layer on React Native.                                                    |
| `react-native-paper`                        | Material Design UI components (Appbar, FAB, Menu). Chosen for its out-of-the-box theming and accessibility support.   |
| `expo-router`                               | File-based navigation. Chosen for its simplicity and alignment with modern React Native conventions.                  |

---

## What I Would Improve With More Time

- **Unit tests** — Add tests for the Zustand store actions (`addTask`, `deleteTask`, `updateStatus`) and key UI components using Jest and React Native Testing Library.
- **Optimistic UI updates** — Improve perceived performance when adding or deleting tasks.
- **Error boundaries** — Handle edge cases where AsyncStorage reads/writes fail gracefully.
- **Accessibility** — Add proper `accessibilityLabel` props to interactive elements.
- **Search functionality** — Allow users to search tasks by title or description in addition to filtering by status.
- **Due dates & reminders** — Extend the `Task` model to support scheduling and push notifications.

---

## Folder Structure

```
├── components/        # Reusable UI components
├── libs/store/        # Zustand store definitions
├── models/            # TypeScript types and enums
├── app/               # Expo Router screens
└── README.md
```
