import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return Response.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }
    const blob = await put(
      `uploads/${Date.now()}-${file.name}`,
      file,
      {
        access: "public",
      }
    );
    return Response.json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return Response.json(
      {
        success: false,
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}