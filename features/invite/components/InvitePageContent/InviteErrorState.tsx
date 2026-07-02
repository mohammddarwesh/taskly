export function InviteErrorState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-xl font-bold text-red-600 mb-2">
          Invalid Invitation Link
        </h1>
        <p className="text-text-secondary">
          This invitation link is missing or malformed. Please check your email
          for the correct link.
        </p>
      </div>
    </div>
  );
}
