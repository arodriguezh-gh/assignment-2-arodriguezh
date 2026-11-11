function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className={task.completed ? 'task-item completed' : 'task-item'}>
      <input
        type="checkbox"
        id={`task-${task.id}`}
        checked={task.completed}
        onChange={() => onToggleTask(task.id)}
      />
      <label htmlFor={`task-${task.id}`}>{task.text}</label>
      <button type="button" aria-label={`Delete ${task.text}`} onClick={() => onDeleteTask(task.id)}>
        Delete
      </button>
    </li>
  )
}

export default TaskItem
