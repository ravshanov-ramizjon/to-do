export const runtime = "nodejs";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewPost() {
  async function createPost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1,
      },
    });

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8 font-[family-name:var(--font-geist-sans)]">
          Create a New Post
        </h1>
        <form action={createPost} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter the title of your post"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Write the content of your post..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
