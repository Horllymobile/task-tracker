import { Appbar, FAB, PaperProvider, Menu, Divider } from 'react-native-paper';
import { Dimensions, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';

import { useTaskStore } from 'libs/store/taskStore';
import { Task, TASK_STATUS } from 'models/Task';
import { router } from 'expo-router';
import EmptyState from 'components/EmptyState';
import { useEffect, useState } from 'react';
import TaskItem from 'components/TaskItem';

export default function TaskList() {
  const { tasks, deleteTask, updateStatus } = useTaskStore();
  const [filter, setFilter] = useState<String>('');
  const [filteredTask, setFilteredTask] = useState<Task[]>(tasks);

  useEffect(() => {
    if (filter === '') {
      setFilteredTask(tasks);
    } else {
      setFilteredTask(tasks.filter((task) => task.status === filter));
    }
  }, [filter, tasks]);

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Tasks" />

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="filter" onPress={openMenu} />}>
          <Menu.Item
            onPress={() => {
              setFilter('');
            }}
            title="All"
          />
          <Menu.Item onPress={() => setFilter(TASK_STATUS.ACTIVE)} title="Active" />
          <Divider />
          <Menu.Item onPress={() => setFilter(TASK_STATUS.COMPLETED)} title="Completed" />
        </Menu>
      </Appbar.Header>

      {filteredTask.length > 0 ? (
        <FlatList
          data={filteredTask}
          keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
          renderItem={({ item }) => (
            <TaskItem task={item} deleteTask={deleteTask} updateStatus={updateStatus} />
          )}
        />
      ) : (
        <EmptyState label="No Tasks, Click + to create" />
      )}
      <FAB icon="plus" style={styles.plusFab} onPress={() => router.navigate('/add-task')} />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  plusFab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
