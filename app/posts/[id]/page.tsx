export const runtime = "nodejs";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 py-20 flex justify-center">
      <article className="max-w-3xl w-full text-[#1c1c1c] font-serif leading-relaxed">
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          {post.title}
        </h1>

        <p className="text-lg text-gray-600 mb-12 border-b border-gray-200 pb-6">
          by <span className="font-medium text-gray-800">{post.author.name}</span>
        </p>

        <div className="prose prose-lg prose-neutral max-w-none">
          {post.content || "No content available."}
        </div>
      </article>
    </div>
  );
}
