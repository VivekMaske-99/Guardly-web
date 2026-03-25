export default function RiskExplanationModal({ explanation }) {
  return (
    <div className="mt-8 bg-gray-900 p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl mb-4">Why This Risk Score?</h2>

      <p className="text-gray-300 mb-4">
        {explanation.explanation}
      </p>

      {explanation.recentEvents.map((event, index) => (
        <div
          key={index}
          className="mb-2 p-3 bg-gray-800 rounded"
        >
          {event.category} | Risk: {event.riskLevel}
        </div>
      ))}
    </div>
  );
}
