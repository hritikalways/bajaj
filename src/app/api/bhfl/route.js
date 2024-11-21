import { NextRequest, NextResponse } from 'next/server';
import { isPrime } from 'mathjs';

export async function POST(req) {
  try {
    const body = await req.json();
    const { data = [], file_b64 } = body;

    // Static user details
    const userId = 'john_doe_17091999';
    const email = 'john@xyz.com';
    const rollNumber = 'ABCD123';

    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = null;
    let isPrimeFound = false;

    if (Array.isArray(data)) {
      for (const item of data) {
        if (!isNaN(item)) {
          numbers.push(item);
          if (isPrime(parseInt(item, 10))) isPrimeFound = true;
        } else if (typeof item === 'string') {
          alphabets.push(item);
          if (
            item >= 'a' &&
            item <= 'z' &&
            (!highestLowercaseAlphabet || item > highestLowercaseAlphabet)
          ) {
            highestLowercaseAlphabet = item;
          }
        }
      }
    }

    // File handling
    let fileValid = false;
    let fileMimeType = null;
    let fileSizeKb = null;

    if (file_b64) {
      try {
        const buffer = Buffer.from(file_b64, 'base64');
        fileValid = true;
        fileSizeKb = (buffer.length / 1024).toFixed(2);

        // Detect MIME type (basic example, not exhaustive)
        const mime = buffer.toString('utf8', 0, 4);
        fileMimeType = mime.startsWith('\x89PNG') ? 'image/png' : 'unknown';
      } catch {
        fileValid = false;
      }
    }

    // Prepare response
    return NextResponse.json({
      is_success: true,
      user_id: userId,
      email,
      roll_number: rollNumber,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
      is_prime_found: isPrimeFound,
      file_valid: fileValid,
      file_mime_type: fileMimeType,
      file_size_kb: fileSizeKb,
    });
  } catch (error) {
    return NextResponse.json(
      {
        is_success: false,
        message: 'Internal Server Error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  return NextResponse.json({ message: 'Hello, World!' });
}
