export default function ProgressBar({ progress }) {
    return (
        <div className="w-full bg-gray-200 rounded-full mt-4">
            <div
                className="bg-blue-500 text-xs text-white text-center p-1 rounded-full"
                style={{ width: `${progress}%` }}
            >
                {progress}%
            </div>
        </div>
    );
}