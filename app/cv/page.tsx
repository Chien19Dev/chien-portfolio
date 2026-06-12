"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CvPage() {
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/profile/cv')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch CV');
        }
        return res.json();
      })
      .then(data => {
        if (data.cvUrl) {
          setCvUrl(data.cvUrl);
        } else {
          setError('No CV found');
        }
      })
      .catch(err => {
        setError(err.message || 'Failed to load CV');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Đang tải CV...</p>
        </div>
      </div>
    );
  }

  if (error || !cvUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Không tìm thấy CV'}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">CV - Nguyễn Đình Chiến</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
          >
            Quay lại
          </button>
        </div>
        <div className="w-full h-[calc(100vh-200px)]">
          <iframe
            src={cvUrl}
            className="w-full h-full border rounded-lg"
            title="CV"
          />
        </div>
      </div>
    </div>
  );
}
