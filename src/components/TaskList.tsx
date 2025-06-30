'use client';

import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { supabase } from '../../lib/supabaseClient';

type Task = {
  id: number;
  title: string;
  status: 'todo' | 'doing' | 'done';
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('ユーザー取得失敗:', userError?.message);
      return;
    }

    const { data, error } = await supabase
      .from('task_table_inbox')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('タスクの取得に失敗:', error);
    } else {
      setTasks(
        data.map((t) => ({
          id: t.id,
          title: t.task_name,
          status: t.task_kind,
        }))
      );
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    fetchTasks(); // タスク追加後に再取得
  };

  return (
    <div className="space-y-6 w-full max-w-2xl">
      <TaskForm onAdd={handleAddTask} />
      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
