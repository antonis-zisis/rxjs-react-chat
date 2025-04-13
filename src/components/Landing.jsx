export function Landing({ setEntered, setUsername, username }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.trim()) {
      setEntered(true);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-md dark:bg-slate-800"
      >
        <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-white">
          Enter your name to join
        </h2>

        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none dark:border-slate-700 dark:bg-slate-700 dark:text-white"
        />

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-teal-500 py-2 text-white transition hover:bg-teal-600"
        >
          Join Chat
        </button>
      </form>
    </div>
  );
}
