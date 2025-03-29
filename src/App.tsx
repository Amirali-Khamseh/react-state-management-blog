import { useReducer } from "react";
import { authenticate, User } from "./api/authenticate";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { authorize } from "./api/authorize";

type State = {
  user: undefined | User;
  permissions: undefined | string[];
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  user: undefined,
  permissions: undefined,
  loading: false,
  error: null,
};

type Action =
  | { type: "authenticate" }
  | { type: "authenticated"; user: User | undefined }
  | { type: "authorize" }
  | { type: "authorized"; permissions: string[] }
  | { type: "authentication_failed"; error: string }
  | { type: "authorization_failed"; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "authenticate":
      return { ...state, loading: true, error: null };
    case "authenticated":
      return { ...state, loading: false, user: action.user, error: null };
    case "authorize":
      return { ...state, loading: true, error: null };
    case "authorized":
      return {
        ...state,
        loading: false,
        permissions: action.permissions,
        error: null,
      };
    case "authentication_failed":
      return { ...state, loading: false, user: undefined, error: action.error };
    case "authorization_failed":
      return {
        ...state,
        loading: false,
        permissions: undefined,
        error: action.error,
      };
    default:
      return state;
  }
}

function App() {
  const [{ user, permissions, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function handleSignInClick() {
    dispatch({ type: "authenticate" });
    try {
      const authenticatedUser = await authenticate();
      dispatch({ type: "authenticated", user: authenticatedUser });
      if (authenticatedUser) {
        dispatch({ type: "authorize" });
        const authorizedPermissions = await authorize(authenticatedUser.id);
        dispatch({ type: "authorized", permissions: authorizedPermissions });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (authError: any) {
      console.error("Authentication failed:", authError);
      dispatch({
        type: "authentication_failed",
        error: authError.message || "Authentication failed",
      });
    }
  }

  return (
    <div className="bg-gray-100 min-h-scree py-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden w-full">
        <Header
          user={user}
          onSignInClick={handleSignInClick}
          loading={loading}
        />

        <div className="p-6 w-full">
          <Main user={user} permissions={permissions} />

          {error && (
            <div
              className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
