"use client";

export default function RankingPage() {
  // Giả sử đây là dữ liệu từ API
  const currentRank = "Gold";
  const currentPoints = 2500;
  const nextRankPoints = 3000;
  const requiredPoints = nextRankPoints - currentPoints;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Khung rank hiện tại */}
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-center border border-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-white">Rank Hiện Tại</h2>
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="w-32 h-12 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white drop-shadow-md">{currentRank}</span>
            </div>
          </div>
        </div>
      </div>

          <div className="grid grid-cols-2 gap-6">
        {/* Khung điểm tích lũy hiện tại */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">Điểm Tích Lũy Hiện Tại</h3>
          <div className="text-3xl font-bold text-yellow-400">
            {currentPoints} điểm
          </div>
        </div>

        {/* Khung điểm cần để lên rank tiếp theo */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
          <h3 className="text-xl font-semibold mb-3 text-gray-200">
            Điểm Cần Để Lên Rank Tiếp Theo
          </h3>
          <div className="text-3xl font-bold text-yellow-400">
            {requiredPoints} điểm
          </div>
        </div>
      </div>

      {/* Thanh tiến trình */}
      <div className="mt-6">
        <p className="text-sm text-gray-400 mb-2">
          Tiến độ đạt rank tiếp theo:
        </p>
        <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
          <div 
            className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full transition-all duration-300"
            style={{ width: `${(currentPoints / nextRankPoints) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>{currentPoints} điểm</span>
          <span>{nextRankPoints} điểm</span>
        </div>
      </div>
    </div>
  );
}
