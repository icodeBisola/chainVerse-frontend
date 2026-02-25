export default function SkeletonCard() {
    return (
      <div className="animate-pulse p-4 border rounded-lg">
        <div className="h-4 bg-gray-300 mb-2 rounded" />
        <div className="h-4 bg-gray-300 w-1/2 rounded" />
      </div>
    );
  }