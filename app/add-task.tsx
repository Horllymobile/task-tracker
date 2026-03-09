import { Appbar, Button, PaperProvider, TextInput } from 'react-native-paper';
import { Alert, View } from 'react-native';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useTaskStore } from 'libs/store/taskStore';
import { TASK_STATUS } from 'models/Task';
import { router } from 'expo-router';

export default function AddTask() {
  const { addTask } = useTaskStore();

  const [taskForm, setTaskForm] = useState<{
    title: string;
    description: string;
  }>({ title: '', description: '' });

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Action
          icon="arrow-left"
          onPress={() => {
            router.back();
          }}
        />
        <Appbar.Content title="Create" />
      </Appbar.Header>

      <View
        className="flex flex-col gap-y-5 p-5"
        style={{ display: 'flex', rowGap: 20, padding: 10 }}>
        <TextInput
          label="Title"
          value={taskForm.title}
          onChangeText={(text) => setTaskForm({ ...taskForm, title: text })}
        />
        <TextInput
          label="Description(Optional)"
          value={taskForm.description}
          onChangeText={(text) => setTaskForm({ ...taskForm, description: text })}
        />

        <Button
          mode="contained"
          onPress={() => {
            if (taskForm.title) {
              addTask({
                title: taskForm.title,
                description: taskForm.description,
                id: Date.now().toString(),
                status: TASK_STATUS.PENDING,
              });
              router.back();
            } else {
              Alert.alert('Error', 'Enter task title');
            }
          }}>
          Create
        </Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
