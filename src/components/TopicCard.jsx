export default function TopicCard({ title, color }) {
  return (
    <div
      className={`rounded-xl p-6 ${color} text-white hover:scale-[1.03] transition-transform duration-300 cursor-pointer`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-90">Xem chủ đề →</p>
    </div>
  );
}
