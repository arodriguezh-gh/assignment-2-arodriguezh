import TaskItem from './TaskItem'

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p>No tasks to display.</p>
  }
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} />
      ))}
    </ul>
  )
}

export default TaskList



