import LearningItem from "./LearningItem";

const LearningPath = ({ items }: { items: any[] }) => (
  <div className="w-full border-1 border-gray-200 rounded-lg p-6">
    <h2 className="text-xl font-medium text-slate-600 mb-4">Learning Path</h2>
    <div className="space-y-4">
      {items.map((item, index) => (
        <LearningItem key={index} item={item} />
      ))}
    </div>
  </div>
);

export default LearningPath;
