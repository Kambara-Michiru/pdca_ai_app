'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type Props = {
  onAdd: () => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('ユーザー取得失敗:', userError?.message);
      return;
    }

    const { error } = await supabase.from('task_table_inbox').insert([
      {
        task_name: title,
        task_kind: 'todo',
        user_id: user.id,
      },
    ]);

    if (error) {
      console.error('タスク追加に失敗:', error.message);
      return;
    }

    onAdd(); // 親で fetchTasks 実行
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-center w-full max-w-xl">
      <input
        type="text"
        placeholder="タスクを入力"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-2 rounded border border-gray-300"
      />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        追加
      </button>
    </form>
  );
}
