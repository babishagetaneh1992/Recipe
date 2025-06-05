"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();
  console.log('Session:', session);
  const isLoading = status === "loading";

  if (isLoading) {
    return (
      <nav className="flex justify-between items-center bg-slate-700 px-8 py-3 w-full">
        <Link className="text-white hover:text-gray-300 font-bold" href="/">
          Home
        </Link>
        <div>Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="flex justify-between items-center bg-slate-700 px-8 py-3 w-full">
      <Link className="text-white hover:text-gray-300 font-bold" href="/">
        Home
      </Link>

      {session?.user ? (
        // User is logged in
   <div className="flex space-x-6 items-center">
  {/* Highlighted username */}
  <span className="bg-yellow-400 text-black font-semibold px-3 py-1 rounded-full shadow-sm">
    👋 {session.user.name || session.user.email}
  </span>

  <Link href={'/cartPage'}>
    <button className="text-white hover:text-gray-300">Cart</button>
  </Link>

  <Link href={'/UserOrder'}>
    <button className="text-white hover:text-gray-300">History</button>
  </Link>

  {session?.user?.role === 'admin' && (
    <Link href={'/admin'}>
      <button className="text-white hover:text-gray-300">Dashboard</button>
    </Link>
  )}

  <button
    className="text-white hover:text-gray-300"
    onClick={() => signOut({ callbackUrl: "/" })}
  >
    Logout
  </button>
</div>


      ) : (
        // User is not logged in
        <div className="flex space-x-6">
          <Link className="text-white hover:text-gray-300" href="/register">
            Sign Up
          </Link>
          <Link className="text-white hover:text-gray-300" href="/login">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;