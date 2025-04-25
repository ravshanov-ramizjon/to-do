// import { useSession } from "next-auth/react";
import { PrismaClient, Prisma } from "../src/app/generated/prisma";

const prisma = new PrismaClient();
// const { data: session } = useSession();

const userData: Prisma.UserCreateInput[] = [
	{
		name: "Alice",
		email: "alice@prisma.io",
		posts: {
			create: [
				{
					title: "Join the Prisma Discord",
					content: "https://pris.ly/discord",
					published: true,
				},
				{
					title: "Prisma on YouTube",
					content: "https://pris.ly/youtube",
				},
			],
		},
	},
	{
		name: "Bob",
		email: "bob@prisma.io",
		posts: {
			create: [
				{
					title: "Follow Prisma on Twitter",
					content: "https://www.twitter.com/prisma",
					published: true,
				},
			],
		},
	},
	{
		name: "Charlie",
		email: "charlie@prisma.io",
		posts: {
			create: [
				{
					title: "Read the Prisma Docs",
					content: "https://pris.ly/docs",
					published: true,
				},
			],
		},
	},
	// {
	// 	name: session?.user?.name,
	// 	email: session?.user?.email || `${session?.user?.name}@example.com`,
	// 	posts: {
	// 		create: [
	// 			{
	// 				title: "Welcome Post",
	// 				content: "This is a welcome post for the user.",
	// 				published: true,
	// 			},
	// 		],
	// 	},
	// },
	{
		name: "Tom",
		email: "tom@prisma.io",
		posts: {
			create: [
				{
					title: "Follow Prisma on TikTok",
					content: "https://www.tiktok.com/@prisma",
					published: true,
				},
			],
		},
	},
];

export async function main() {
	for (const u of userData) {
		await prisma.user.create({ data: u });
	}
}

main();
