'use client';

type Task = {
  id: number;
  title: string;
  status: 'todo' | 'doing' | 'done';
};

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-500">ステータス: {task.status}</p>
    </div>
  );
}
