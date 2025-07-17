const TestComponent = () => {
  return (
    <section className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🚀 Test Component</h2>
      <p className="text-gray-600 dark:text-gray-300">
        This is a live preview to confirm your Tailwind setup and theme switching.
      </p>
      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
        Click Me
      </button>
      <div className="flex gap-2 items-center">
        <span className="w-4 h-4 bg-green-500 rounded-full" />
        <span className="text-sm text-gray-500 dark:text-gray-400">Tailwind Status: Active</span>
      </div>
    </section>
  );
};

export default TestComponent;