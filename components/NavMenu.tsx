"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; 
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

const Auth = () => {
	const { data: session } = useSession();
	const pathname = usePathname(); 

	const [isClient, setIsClient] = useState(false); 

	useEffect(() => {
		setIsClient(true); 
	}, []);

	if (!isClient) {
		return null; 
	}

	const isOnPostsPage = pathname === "/posts"; 

	if (session) {
		return (
			<div className="flex items-center space-x-6">
				<p className="text-xl font-semibold text-gray-800">
					{session?.user?.image ? (
						<Image
							src={session.user?.image || "/default-avatar.png"}
							alt="User Avatar"
							width={50}
							height={50}
							className="rounded-full cursor-pointer"
						/>
					) : (
						<FaUserCircle className="text-gray-500 text-4xl" />
					)}
				</p>
				<p className="text-xl font-semibold text-gray-800">{session.user?.name}</p>

				<Link href={isOnPostsPage ? "/" : "/posts"}>
					<button className="cursor-pointer ml-4 px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full shadow-lg hover:from-green-500 hover:to-green-700 transition-all duration-300 ease-in-out transform hover:scale-105">
						{isOnPostsPage ? "Users" : "Posts"}
					</button>
				</Link>

				<Link href="/posts/new">
					<button className="cursor-pointer ml-4 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105">
						Create New Post
					</button>
				</Link>

				<button
					className="cursor-pointer ml-4 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 ease-in-out transform hover:scale-105"
					onClick={() => {
						signOut();
						setTimeout(() => {
							window.location.href = "/";
						}, 1000);
					}}
				>
					Sign Out
				</button>
			</div>
		);
	}

	return (
		<div className="flex items-center space-x-6">
			<p className="text-xl font-semibold text-gray-800">Not Signed In</p>
			<button
				className="ml-4 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-full shadow-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 ease-in-out transform hover:scale-105"
				onClick={() => signIn()}
			>
				Sign In
			</button>
		</div>
	);
};

export default function NavMenu() {
	return (
		<header className="bg-white shadow-xl p-6 flex items-center justify-between">
			<div className="flex items-center space-x-4">
				<h1 className="text-4xl font-extrabold text-gray-900 tracking-wide font-sans">
					<Link href="/" className="cursor-pointer">
						Superblog
					</Link>
				</h1>
			</div>
			<Auth />
		</header>
	);
}
