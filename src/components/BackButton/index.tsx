
export function BackButton() {
    return (
      <button 
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
      >
        ← Back
      </button>
    );
  }