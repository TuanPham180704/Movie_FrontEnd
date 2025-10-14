export default function Login() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-gray-800 p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
        <form className="flex flex-col space-y-4">
          <input
            className="p-2 rounded bg-gray-700 text-white"
            placeholder="Username"
          />
          <input
            className="p-2 rounded bg-gray-700 text-white"
            type="password"
            placeholder="Password"
          />
          <button className="bg-yellow-500 py-2 rounded font-bold hover:bg-yellow-400">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
