type Props = {
  permissions: undefined | string[];
};

export function Content({ permissions }: Props) {
  if (permissions === undefined) {
    return null;
  }

  const isAdmin = permissions.includes("admin");

  return isAdmin ? (
    <div
      className="mt-4 text-lg text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Admin Access Granted!</strong>
      <span className="block sm:inline">
        Some important stuff that only an admin can do.
      </span>
    </div>
  ) : (
    <div
      className="mt-4 text-lg text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Access Denied!</strong>
      <span className="block sm:inline">
        Insufficient permissions to view this content.
      </span>
    </div>
  );
}
