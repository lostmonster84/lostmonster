import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@lostmonster/database/client';

export async function GET() {
  try {
    const sql = createClient();

    // Get all tasks grouped by status
    const tasks = await sql`
      SELECT
        id,
        title,
        description,
        status,
        priority,
        assignee_id,
        assignee_name,
        due_date,
        completed_at,
        position,
        created_at,
        updated_at
      FROM tasks
      ORDER BY position ASC, created_at DESC
    `;

    // Group tasks by status
    const grouped = {
      todo: tasks.filter((t) => t.status === 'todo'),
      'in-progress': tasks.filter((t) => t.status === 'in-progress'),
      review: tasks.filter((t) => t.status === 'review'),
      done: tasks.filter((t) => t.status === 'done'),
    };

    return NextResponse.json(grouped);
  } catch (error) {
    console.error('GET /api/tasks error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const sql = createClient();
    const body = await request.json();

    const { title, description, priority, assignee, dueDate, columnId } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Get max position for the status column
    const maxPositionResult = await sql`
      SELECT COALESCE(MAX(position), -1) as max_position
      FROM tasks
      WHERE status = ${columnId || 'todo'}
    `;
    const maxPosition = maxPositionResult[0]?.max_position ?? -1;

    // Create task
    const result = await sql`
      INSERT INTO tasks (
        title,
        description,
        status,
        priority,
        assignee_name,
        due_date,
        position
      )
      VALUES (
        ${title.trim()},
        ${description || null},
        ${columnId || 'todo'},
        ${priority || 'medium'},
        ${assignee || null},
        ${dueDate || null},
        ${maxPosition + 1}
      )
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/tasks error:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
