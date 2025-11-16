export default function Unauthorized() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-900">
      <h1 className="text-white text-3xl font-bold">
        ❌ You are not authorized to view this page.
      </h1>
    </div>
  );
}
