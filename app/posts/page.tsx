import { getServerSession } from "next-auth";
import { GET as handler } from "../api/auth/[...nextauth]/route"; 
import ErrorAuth from "@/components/ErrorAuth";
import prisma from "@/lib/prisma";
import Link from "next/link";

const { authOptions } = handler;

export default async function Posts() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return <ErrorAuth />; 
	}

	const posts = await prisma.post.findMany({
		include: {
			author: true,
		},
	});

	return (
		<div className="min-h-screen bg-gray-100 py-16 px-4">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-5xl font-extrabold text-gray-900 text-center mb-12 font-[family-name:var(--font-geist-sans)]">
					Latest Posts
				</h1>
				<ul className="flex flex-col space-y-8">
					{posts.map((post) => (
						<Link href={`/posts/${post.id}`} key={post.id}>
							<li className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
								<span className="text-3xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
									{post.title}
								</span>
								<p className="text-sm text-gray-500 mt-2">
									by <span className="font-medium text-indigo-600">{post.author.name}</span>
								</p>
							</li>
						</Link>
					))}
				</ul>
			</div>
		</div>
	);
}
