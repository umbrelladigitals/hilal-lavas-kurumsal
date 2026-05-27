import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/src/lib/auth';
import { uploadFile } from '@/src/lib/r2';

export async function POST(req: NextRequest) {
  try {
    // 1. Secure authorization check
    const sessionUser = await getSession();
    if (!sessionUser) {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz bulunmamaktadır.' }, { status: 401 });
    }

    // 2. Parse multipart form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'Görsel dosyası bulunamadı.' }, { status: 400 });
    }

    // Check file size (e.g. 5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Görsel boyutu çok büyük (Maksimum 5MB).' }, { status: 400 });
    }

    // 3. Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Upload file using R2 Client (with Local fallback)
    const publicUrl = await uploadFile(buffer, file.name, file.type);

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Dosya yükleme sırasında bir hata oluştu: ' + error.message }, { status: 500 });
  }
}
