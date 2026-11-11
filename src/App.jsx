import { useState } from 'react'
import './App.css'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import TaskCounter from './components/TaskCounter'

function App() {
  // React remembers tasks between renders and updates the screen when they change.
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Call family', completed: false },
    { id: 2, text: 'Buy groceries', completed: false },
    { id: 3, text: 'Meal prepping', completed: false },
    { id: 4, text: 'PubPol homework', completed: false },
    { id: 5, text: 'Track job applications', completed: false }
  ])

  function handleAddTask(text) {
    const newTask = { id: crypto.randomUUID(), text, completed: false }
    setTasks(previousTasks => [...previousTasks, newTask])
  }

  function handleToggleTask(id) {
    setTasks(previousTasks => previousTasks.map(task => (
      task.id === id ? { ...task, completed: !task.completed } : task
    )))
  }

  function handleDeleteTask(id) {
    setTasks(previousTasks => previousTasks.filter(task => task.id !== id))
  }

  const [activeFilter, setActiveFilter] = useState('all')
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ]

  // Calculate the visible list from state; do not store a second task array.
  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'active') return !task.completed
    if (activeFilter === 'completed') return task.completed
    return true
  })

  const completedCount = tasks.filter(task => task.completed).length

  return (
    <div className="page">
      <header className="site-header">
        <button type="button" className="menu-button">
          <img src={menuIcon} alt="Menu" />
        </button>

        <div className="search-box">
          <img src={searchIcon} alt="" />
          <input type="text" placeholder="Quick find" aria-label="Quick find" />
        </div>

        <TaskCounter total={tasks.length} completed={completedCount} />
      </header>

      <main className="site-main">
        <nav className="navbar" aria-label="Task categories">
          <ul className="nav-list">
            <li className="nav-item">
              <img src={inboxIcon} alt="" />
              <span>Inbox</span>
              <span className="task-count">{tasks.length}</span>
            </li>
            <li className="nav-item">
              <img src={calendarIcon} alt="" />
              <span>Today</span>
              <span className="task-count">5</span>
            </li>
            <li className="nav-item">
              <img src={upcomingIcon} alt="" />
              <span>Upcoming</span>
            </li>
          </ul>
        </nav>

        <section className="main-content">
          <h1>Inbox</h1>
          <div className="filter-buttons" role="group" aria-label="Filter tasks">
            {filters.map(filter => (
              <button
                key={filter.value}
                type="button"
                className={activeFilter === filter.value ? 'filter-btn active' : 'filter-btn'}
                aria-pressed={activeFilter === filter.value}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <TaskForm onAddTask={handleAddTask} />
          <TaskList tasks={filteredTasks} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} />
        </section>
      </main>
    </div>
  )
}

export default App
