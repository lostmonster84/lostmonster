import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // For demo purposes, skip authentication
    // In production, this would check user authentication

    // Parse multipart form data
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    // Read file content
    const fileContent = await file.text();

    // Parse based on file type
    let parsedContent: string;

    if (file.name.endsWith('.csv') || file.type === 'text/csv') {
      // CSV file - simple parsing
      parsedContent = parseCSV(fileContent);
    } else if (
      file.name.endsWith('.xlsx') ||
      file.name.endsWith('.xls') ||
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel'
    ) {
      // Excel file - for now, return error asking for CSV
      return NextResponse.json(
        { error: 'Excel files not yet supported. Please convert to CSV and try again.' },
        { status: 400 }
      );
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      filename: file.name,
      content: parsedContent,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Simple CSV parser - converts CSV to formatted text
 */
function parseCSV(content: string): string {
  const lines = content.trim().split('\n');

  if (lines.length === 0) {
    return 'Empty file';
  }

  // Parse header
  const header = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));

  // Parse rows
  const rows = lines.slice(1).map((line) => {
    return line.split(',').map((cell) => cell.trim().replace(/^"|"$/g, ''));
  });

  // Format as readable text
  let formatted = `CSV Data (${rows.length} rows):\n\n`;
  formatted += `Columns: ${header.join(', ')}\n\n`;

  // Format as table
  rows.forEach((row, idx) => {
    formatted += `Row ${idx + 1}:\n`;
    header.forEach((col, colIdx) => {
      if (row[colIdx]) {
        formatted += `  ${col}: ${row[colIdx]}\n`;
      }
    });
    formatted += '\n';
  });

  return formatted;
}
