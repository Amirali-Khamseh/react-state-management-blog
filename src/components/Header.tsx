import { User } from "../api/authenticate";

type Props = {
  user: undefined | User;
  onSignInClick: () => void;
  loading: boolean;
};

export function Header({ user, onSignInClick, loading }: Props) {
  return (
    <header className="flex justify-between items-center border-b-2 border-gray-200 bg-gray-50 py-4 px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          React state Management
        </h1>
      </div>
      <div>
        {user ? (
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-gray-700">{user.name}</span>
          </div>
        ) : (
          <button
            onClick={onSignInClick}
            className={`inline-flex items-center justify-center rounded-md text-lg p-4 padding font-medium ${
              loading
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition ease-in-out duration-150"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              "Sign In"
            )}
          </button>
        )}
      </div>
    </header>
  );
}
