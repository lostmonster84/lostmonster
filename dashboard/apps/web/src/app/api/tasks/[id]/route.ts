import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@lostmonster/database/client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sql = createClient();

    const result = await sql`
      SELECT * FROM tasks WHERE id = ${id}
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('GET /api/tasks/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sql = createClient();
    const body = await request.json();

    // Check if task exists
    const existing = await sql`SELECT id FROM tasks WHERE id = ${id}`;
    if (existing.length === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Build update query dynamically
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (body.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(body.title.trim());
    }
    if (body.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(body.description || null);
    }
    if (body.priority !== undefined) {
      updates.push(`priority = $${paramIndex++}`);
      values.push(body.priority);
    }
    if (body.assignee !== undefined) {
      updates.push(`assignee_name = $${paramIndex++}`);
      values.push(body.assignee || null);
    }
    if (body.dueDate !== undefined) {
      updates.push(`due_date = $${paramIndex++}`);
      values.push(body.dueDate || null);
    }
    if (body.status !== undefined) {
      updates.push(`status = $${paramIndex++}`);
      values.push(body.status);

      // Set completed_at when status changes to done
      if (body.status === 'done') {
        updates.push(`completed_at = NOW()`);
      } else {
        updates.push(`completed_at = NULL`);
      }
    }
    if (body.position !== undefined) {
      updates.push(`position = $${paramIndex++}`);
      values.push(body.position);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    // Always update updated_at (handled by trigger)
    values.push(id);

    const query = `
      UPDATE tasks
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await sql(query, values);

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('PATCH /api/tasks/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sql = createClient();

    const result = await sql`
      DELETE FROM tasks WHERE id = ${id} RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/tasks/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
