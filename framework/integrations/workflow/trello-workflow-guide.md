# Trello Workflow: Fix → Commit → Update Trello

> **The Standard Workflow for All Projects**
>
> This workflow ensures all work is tracked, documented, and visible to the team.

---

## 🎯 The Golden Rule

**After completing any significant work, ALWAYS follow this workflow:**

1. **Fix/Build** - Complete the task or feature
2. **Test** - Verify it works correctly
3. **Commit** - Commit changes with clear message
4. **Push** - Push to remote repository
5. **Update Trello** - Create or move card to Done with summary

---

## Setup: Trello API Credentials

### Getting Your Credentials

1. **Get API Key**: Visit https://trello.com/app-key
2. **Generate Token**: Click "Token" link on same page, then "Allow"
3. **Save Credentials**: You'll use these for all machines

### Environment Variables (One-Time Setup Per Machine)

Add to your shell profile (`~/.zshrc` or `~/.bash_profile`):

```bash
# Trello API Credentials
export TRELLO_API_KEY="your_api_key_here"
export TRELLO_TOKEN="your_token_here"
```

Then reload: `source ~/.zshrc`

### Cursor/Claude Code MCP Setup (For AI-Powered Updates)

Edit `~/.cursor/mcp.json` or your editor's MCP configuration:

```json
{
  "mcpServers": {
    "trello": {
      "command": "npx",
      "args": ["-y", "@delorenj/mcp-server-trello"],
      "env": {
        "TRELLO_API_KEY": "your_api_key_here",
        "TRELLO_TOKEN": "your_token_here"
      }
    }
  }
}
```

**Restart your editor** after editing this file.

---

## Project Board Setup

### Finding Your Board & List IDs

1. **Go to your Trello board** in browser
2. **Open any card** on the board
3. **Add ".json"** to the URL
4. **Find IDs** in the JSON:
   - Board ID: Look for `"idBoard"`
   - List IDs: Look for `"idList"` for each card

Example board setup:

```bash
# Project: [Your Project Name]
PROJECT_BOARD_ID="[your_board_id]"
PROJECT_FEATURE_REQUEST="[feature_request_list_id]"
PROJECT_TODO="[todo_list_id]"
PROJECT_UP_NEXT="[up_next_list_id]"
PROJECT_DOING="[doing_list_id]"
PROJECT_HOLD="[hold_list_id]"
PROJECT_DONE="[done_list_id]"
```

---

## Workflow Methods

### Method 1: AI-Powered (Recommended)

**After completing work and pushing to GitHub:**

```
"Update Trello: I just fixed the admin authentication issue.
Create a card in Done with details about the session persistence fix."
```

**When creating cards for future work:**

```
"Create a Trello card in Up Next for [task]. Add checklists breaking down all the tasks."
```

**IMPORTANT**: Always ask AI to add checklists when creating cards with multiple tasks. The AI will automatically organize tasks into logical checklist categories.

The AI will:
- Detect the correct board
- Create card in Done list
- Add comprehensive description
- **Create checklists** with all tasks broken down by category
- Include commit references

### Method 2: Manual Script

Create a helper script for quick updates:

```bash
# ~/bin/trello-done (make executable: chmod +x ~/bin/trello-done)
#!/bin/bash
TITLE="$1"
DESC="$2"
BOARD_ID="[your_board_id]"  # Your project board
DONE_LIST="[your_done_list_id]"   # Done list

curl -X POST "https://api.trello.com/1/cards" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"✅ $TITLE\",
    \"desc\": \"$DESC\",
    \"idList\": \"$DONE_LIST\",
    \"pos\": \"top\",
    \"key\": \"$TRELLO_API_KEY\",
    \"token\": \"$TRELLO_TOKEN\"
  }"
```

**Usage:**
```bash
trello-done "Fixed authentication" "Session persistence working, 4+ uploads verified"
```

### Method 3: Node.js Script

```javascript
// scripts/update-trello.mjs
import https from 'https';

const API_KEY = process.env.TRELLO_API_KEY;
const TOKEN = process.env.TRELLO_TOKEN;
const BOARD_ID = '[your_board_id]';
const DONE_LIST = '[your_done_list_id]';

function createCard(title, description) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      name: `✅ ${title}`,
      desc: description,
      idList: DONE_LIST,
      pos: 'top'
    });

    const options = {
      hostname: 'api.trello.com',
      path: `/1/cards?key=${API_KEY}&token=${TOKEN}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Usage
const title = process.argv[2];
const desc = process.argv[3];

if (!title) {
  console.error('Usage: node update-trello.mjs "Title" "Description"');
  process.exit(1);
}

const card = await createCard(title, desc || '');
console.log('✅ Card created:', card.shortUrl);
```

**Usage:**
```bash
node scripts/update-trello.mjs "Fixed authentication" "Session working"
```

---

## Common Scenarios

### Scenario 1: Bug Fixed

```bash
# 1. Fix the bug
# 2. Test it
# 3. Commit
git add . && git commit -m "Fix navigation menu bug on mobile Safari"
git push

# 4. Update Trello (AI method)
"Create a Trello card in Done: Fixed navigation menu bug on mobile Safari.
The menu now closes properly on tap outside. Tested on iPhone 14."
```

### Scenario 2: Feature Completed

```bash
# 1. Build feature
# 2. Test thoroughly
# 3. Commit
git add . && git commit -m "Add dark mode toggle to admin dashboard"
git push

# 4. Update Trello (script method)
trello-done "Implemented dark mode for admin" "Added toggle, localStorage persistence, works across all admin pages"
```

### Scenario 3: Multiple Related Fixes

```bash
# 1. Complete all fixes
# 2. Test everything
# 3. Commit
git add . && git commit -m "Fix authentication system: session persistence, image uploads, gallery bug"
git push

# 4. Update Trello with comprehensive card
"Create a detailed Trello card in Done about the authentication fixes:
- Session persistence (Set-Cookie header)
- Image uploads working (4+ verified)
- Gallery bug fixed (duplicate IDs)
- Dark mode scoped properly"
```

---

## Best Practices

### ✅ DO

- **Always update Trello** after pushing code
- **Always add checklists** when creating cards with multiple tasks - break down work into actionable checklist items organized by category
- **Be specific** in card descriptions
- **Include commit hashes** when relevant
- **Add testing notes** (what was tested, results)
- **Link to documentation** if created
- **Use checklists** for multi-part tasks (not just checkboxes in description)
- **Add screenshots/GIFs** for UI changes

### ❌ DON'T

- Don't update Trello before testing
- Don't use vague descriptions ("fixed stuff")
- Don't forget to push code first
- Don't create duplicate cards (search first)
- Don't skip Trello updates for "small" fixes

---

## Card Description Template

Use this template for consistency:

```markdown
**Problem**: [What was broken/needed]

**Solution**: [What you did to fix it]

**Testing**: [How you verified it works]

**Files Changed**:
- path/to/file1.ts (description)
- path/to/file2.tsx (description)

**Commits**:
- abc1234 - Main fix
- def5678 - Additional improvements

**Notes**: [Any important context, gotchas, or follow-up needed]
```

---

## Quick Reference

### Create Card in Done

**AI Method:**
```
"Create a Trello card in Done: [title]. [description]"
```

**Bash Method:**
```bash
trello-done "Title" "Description"
```

**Node Method:**
```bash
node scripts/update-trello.mjs "Title" "Description"
```

### Move Existing Card

**AI Method:**
```
"Move the '[card name]' Trello card to Done and add a comment that it's completed"
```

### Search for Cards

**AI Method:**
```
"Show me all Trello cards related to authentication"
```

---

## Troubleshooting

### "Authentication failed"

Check environment variables are set:
```bash
echo $TRELLO_API_KEY
echo $TRELLO_TOKEN
```

If empty, add to `~/.zshrc` and reload.

### "Board not found"

Verify board ID is correct. Get it from:
1. Open Trello board in browser
2. Open any card
3. Add ".json" to URL
4. Find `"idBoard"` in JSON

### "MCP not working in editor"

1. Check `~/.cursor/mcp.json` exists and has credentials
2. Restart editor completely
3. Try a simple test: "Show me my Trello boards"

---

## Integration with Git Hooks (Advanced)

Auto-update Trello on commit:

```bash
# .git/hooks/post-commit
#!/bin/bash
COMMIT_MSG=$(git log -1 --pretty=%B)

# Only auto-update for certain commit patterns
if [[ $COMMIT_MSG =~ ^(Fix|Add|Update) ]]; then
  node scripts/update-trello.mjs "$COMMIT_MSG" "Auto-created from commit"
fi
```

---

## Multi-Machine Setup Checklist

When setting up a new machine:

- [ ] Add Trello credentials to shell profile
- [ ] Configure editor MCP configuration
- [ ] Restart editor
- [ ] Test: "Show me my Trello boards"
- [ ] Verify correct board IDs for each project
- [ ] Create helper scripts if using manual method

---

## Benefits of This Workflow

✅ **Team Visibility** - Everyone knows what's done
✅ **Documentation** - Every fix is documented
✅ **Progress Tracking** - Clear view of velocity
✅ **Context Preservation** - Future you remembers why
✅ **Client Communication** - Easy to share progress
✅ **No Mental Load** - Automatic part of workflow

---

## Summary

**The workflow is simple:**

1. Fix something
2. Test it
3. Commit it
4. Push it
5. Update Trello

**Never skip step 5.** It takes 30 seconds and saves hours of "what did we do?" later.

---

**Make this muscle memory. Fix → Commit → Trello. Every time.** 🎯
