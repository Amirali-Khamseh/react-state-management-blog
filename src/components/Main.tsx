import { User } from "../api/authenticate";
import { Content } from "./Content";

type Props = {
  user: undefined | User;
  permissions: undefined | string[];
};

export function Main({ user, permissions }: Props) {
  return (
    <main className="py-10 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-4xl text-center font-extrabold text-blue-700 mb-6 border-b-4 border-blue-300 pb-2 inline-block">
          React State Management Demo
        </h1>

        <p className="mt-6 text-lg text-center text-gray-700">
          {user ? (
            <span className="font-semibold text-green-600">
              Welcome, {user.name}!
            </span>
          ) : (
            <span className="font-semibold text-blue-500">
              Please Sign In to See More
            </span>
          )}
        </p>

        <div className="mt-8">
          <Content permissions={permissions} />
        </div>
      </div>
    </main>
  );
}
