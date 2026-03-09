import { formatDate } from 'date-fns';
import { Task, TASK_STATUS } from 'models/Task';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, IconButton, List, MD3Colors, Menu } from 'react-native-paper';

type TasktaskProps = {
  task: Task;
  deleteTask: (task: Task) => void;
  updateStatus: (task: Task, status: TASK_STATUS) => void;
};

export default function TaskItem({ task, deleteTask, updateStatus }: TasktaskProps) {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const getStatusColor = (task: Task) => {
    if (task.status === TASK_STATUS.ACTIVE) return '#b4f1cb';
    if (task.status === TASK_STATUS.COMPLETED) return '#6b6e6c';
    else return '#f0d69b';
  };

  const updateTaskStatus = () => {
    switch (task.status) {
      case TASK_STATUS.PENDING:
        updateStatus(task, TASK_STATUS.ACTIVE);
        break;
      case TASK_STATUS.ACTIVE:
        updateStatus(task, TASK_STATUS.COMPLETED);
        break;
      case TASK_STATUS.COMPLETED:
        updateStatus(task, TASK_STATUS.PENDING);
        break;
    }
  };

  const getNextTaskStatus = () => {
    switch (task.status) {
      case TASK_STATUS.PENDING:
        return `Mark as ${TASK_STATUS.ACTIVE}`;
      case TASK_STATUS.ACTIVE:
        return `Mark as ${TASK_STATUS.COMPLETED}`;
      case TASK_STATUS.COMPLETED:
        return `Mark as ${TASK_STATUS.PENDING}`;
    }
  };

  return (
    <View
      style={{
        backgroundColor: getStatusColor(task),
        // paddingVertical: 2,
        marginTop: 5,
      }}>
      <List.Item
        title={task.title}
        description={() => (
          <View style={{ gap: 5 }}>
            {task.description ? <Text>{task.description}</Text> : null}

            {task.status ? (
              <Text className="text-xs" style={{ fontSize: 12 }}>
                Status: {task.status}
              </Text>
            ) : null}
          </View>
        )}
        right={() => (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                icon="dots-horizontal"
                iconColor={MD3Colors.error50}
                size={20}
                onPress={() => openMenu()}
              />
            }>
            <Menu.Item onPress={() => deleteTask(task)} leadingIcon={'delete'} title="Delete" />
            <Divider />
            <Menu.Item onPress={() => updateTaskStatus()} title={getNextTaskStatus()} />
          </Menu>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 550,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  trigger: {
    marginTop: 8,
  },
});
