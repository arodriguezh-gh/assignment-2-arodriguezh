import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedText = text.trim()
    if (trimmedText === '') return

    onAddTask(trimmedText)
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="new-task">New task</label>
      <input
        id="new-task"
        type="text"
        placeholder="Add a task"
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  )
}

export default TaskForm
