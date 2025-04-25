import prisma from "@/lib/prisma";

export default async function Home() {
	const users = await prisma.user.findMany();

	return (
		<div className="min-h-screen bg-gray-100 py-16 px-4">
			<div className="max-w-3xl mx-auto">
				<h1 className="text-5xl font-extrabold text-gray-900 text-center mb-12 font-[family-name:var(--font-geist-sans)]">
					Superblog
				</h1>
				<ol className="space-y-6">
					{users.map((user) => (
						<li key={user.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
							<p className="text-2xl font-semibold text-gray-800">{user.name}</p>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
}
