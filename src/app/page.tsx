"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";

type Task = {
  id: string;
  title: string;
  description?: string;
  column: string;
};

const initialTasks: Task[] = [
  { id: "1", title: "Build landing page", description: "Make it look sexy AF", column: "todo" },
  { id: "2", title: "Add dark mode toggle", column: "todo" },
  { id: "3", title: "Make it draggable", description: "Today’s task 🔥", column: "inprogress" },
  { id: "4", title: "Set up Next.js app", column: "done" },
  { id: "5", title: "Make hero look insane", column: "done" },
];

function SortableTask({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 rounded-xl shadow-lg cursor-grab active:cursor-grabbing touch-none
        ${task.column === "done" ? "line-through opacity-80" : ""}
        ${task.id === "1" || task.id === "3" || task.id === "4" || task.id === "5"
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          : task.id === "3" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
          : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
        }`}
    >
      <p className="font-medium">{task.title}</p>
      {task.description && <p className="text-sm opacity-90 mt-1">{task.description}</p>}
    </Card>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [tasks, setTasks] = useState(initialTasks);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => setMounted(true), []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    const overTask = tasks.find(t => t.id === over.id);

    if (!activeTask) return;

    // If dropped on a column (not a task), move to that column
    if (over.id === "todo" || over.id === "inprogress" || over.id === "done") {
      setTasks(tasks => tasks.map(t =>
        t.id === activeTask.id ? { ...t, column: over.id } : t
      ));
    } else if (overTask && activeTask.column === overTask.column) {
      // Reorder within same column
      const columnTasks = tasks.filter(t => t.column === activeTask.column);
      const newColumnTasks = arrayMove(
        columnTasks,
        columnTasks.findIndex(t => t.id === active.id),
        columnTasks.findIndex(t => t.id === over.id)
      );
      const newOrder = tasks.map(t => {
        if (t.column === activeTask.column) {
          return newColumnTasks.find(nt => nt.id === t.id) || t;
        }
        return t;
      });
      setTasks(newOrder);
    } else if (overTask && activeTask.column !== overTask.column) {
      // Move to different column and reorder
      setTasks(tasks => tasks.map(t =>
        t.id === activeTask.id ? { ...t, column: overTask.column } : t
      ));
    }
  }

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black transition-all duration-500">
          {/* Dark mode toggle */}
          <div className="fixed top-6 right-6 z-50">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 transition-all"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
          </div>

          {/* Hero */}
          <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TaskFlow Pro
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The most beautiful way to organize your life. Drag, drop, and dominate your day.
            </p>
          </div>

          {/* KANBAN BOARD */}
          <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* To Do */}
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-6 flex justify-between items-center">
                  To Do <span className="bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 px-4 py-2 rounded-full">5</span>
                </h3>
                <SortableContext items={tasks.filter(t => t.column === "todo").map(t => t.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4 min-h-96" id="todo">
                    {tasks.filter(t => t.column === "todo").map(task => (
                      <SortableTask key={task.id} task={task} />
                    ))}
                    {tasks.filter(t => t.column === "todo").length === 0 && (
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl h-32 flex items-center justify-center text-gray-400">
                        Drop tasks here
                      </div>
                    )}
                  </div>
                </SortableContext>
              </div>

              {/* In Progress */}
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-6 flex justify-between items-center">
                  In Progress <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-4 py-2 rounded-full">2</span>
                </h3>
                <SortableContext items={tasks.filter(t => t.column === "inprogress").map(t => t.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4 min-h-96" id="inprogress">
                    {tasks.filter(t => t.column === "inprogress").map(task => (
                      <SortableTask key={task.id} task={task} />
                    ))}
                  </div>
                </SortableContext>
              </div>

              {/* Done */}
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6 flex justify-between items-center">
                  Done <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-2 rounded-full">8</span>
                </h3>
                <SortableContext items={tasks.filter(t => t.column === "done").map(t => t.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4 min-h-96" id="done">
                    {tasks.filter(t => t.column === "done").map(task => (
                      <SortableTask key={task.id} task={task} />
                    ))}
                  </div>
                </SortableContext>
              </div>
            </div>
          </div>
        </div>
      </DndContext>
    </>
  );
}