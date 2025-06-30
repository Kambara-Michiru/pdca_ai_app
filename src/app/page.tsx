import Header from '@/components/Header';
import TaskList from '@/components/TaskList';



export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-12 flex flex-col items-center justify-start gap-12">
      <Header />

      <section className="text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-indigo-700">
          Start your <span className="underline decoration-indigo-400">Plan → Do → Check → Action</span> journey here.
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Organize your thoughts, reflect daily, and stay on track with your goals.
        </p>
      </section>

      <section className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">📝 今日のタスク</h2>
        <TaskList />
      </section>
    </main>
  );
}
