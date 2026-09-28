import { useState } from 'react'
import Sidebar from './Sidebar.jsx'

export default function App() {
  const [open, setOpen] = useState(true)
  const [active, setActive] = useState('Dashboard')

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar
        open={open}
        onToggle={() => setOpen((o) => !o)}
        active={active}
        onSelect={setActive}
      />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-neutral-900">{active}</h1>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-32 rounded-xl border border-neutral-200 bg-white"
            />
          ))}
        </div>
      </main>
    </div>
  )
}
