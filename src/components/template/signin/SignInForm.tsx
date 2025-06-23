export default function LoginForm() {
  return (
    <form className="space-y-4 bg-white p-6 rounded-md shadow max-w-md w-full">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={onChange}
        className="w-full mb-2 px-3 py-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onChange}
        className="w-full mb-2 px-3 py-2 border rounded"
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="form-checkbox" />
          Remember this account
        </label>
        <a href="#" className="text-gray-600 hover:underline">
          Having trouble?
        </a>
      </div>

      <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
        Sign in
      </button>

      <div className="flex flex-col mt-4 gap-2">
        <button className="text-blue-600 hover:underline text-sm">
          Sign in using root user email
        </button>
        <button className="text-blue-600 hover:underline text-sm">Create a new AWS account</button>
      </div>
    </form>
  )
}
