interface ProjectsErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ProjectsErrorState({ message, onRetry }: ProjectsErrorStateProps) {
  return (
    <div className="text-center py-12 text-red-500">
      <p>{message}</p>
      <button onClick={onRetry} className="mt-2 text-sm underline">
        Try again
      </button>
    </div>
  );
}