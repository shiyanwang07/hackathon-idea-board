import { NextResponse } from 'next/server';

// In-memory storage (in real app, this would be a database)
const ideas = [
  { id: 1, title: 'AI Study Buddy', description: 'Help students learn with AI' }
];

export async function GET() {
  return NextResponse.json(ideas);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newIdea = {
    id: Date.now(),
    title: body.title,
    description: body.description
  };
  ideas.push(newIdea);
  return NextResponse.json(newIdea, { status: 201 });
}
