import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { city, days, interests } = await req.json();

    if (!city || !days) {
      return NextResponse.json({ error: 'City and days are required.' }, { status: 400 });
    }

    const prompt = [
      'Create a detailed ' + days + '-day travel plan for ' + city + '.',
      interests ? 'The traveler is interested in: ' + interests + '.' : '',
      '',
      'Respond ONLY with a JSON object in this exact structure, no extra text, no markdown:',
      '{',
      '  "city": "CITY_NAME",',
      '  "days": [',
      '    {',
      '      "day": 1,',
      '      "title": "Day title",',
      '      "morning": { "activity": "name", "description": "details", "tip": "useful tip" },',
      '      "afternoon": { "activity": "name", "description": "details", "tip": "useful tip" },',
      '      "evening": { "activity": "name", "description": "details", "tip": "useful tip" }',
      '    }',
      '  ]',
      '}',
    ].join('\n');

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const clean = text.replace(/```json|```/g, '').trim();
    const plan = JSON.parse(clean);
    return NextResponse.json(plan);

  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: err.message || 'Something went wrong.' }, { status: 500 });
  }
}