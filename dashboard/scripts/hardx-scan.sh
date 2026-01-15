#!/bin/bash
# HARDX - Hardcoded Value Detection for Ancarraig

echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║              HARDX - Hardcoded Value Detection                    ║"
echo "╠═══════════════════════════════════════════════════════════════════╣"
echo "║  Scanning: Ancarraig Application                                  ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""

cd /Users/james/Projects/lostmonster/dashboard/apps/web/src

# Category 1: Colors (High Priority)
echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"
echo "┃ 1. HARDCODED COLORS (High Priority)                          ┃"
echo "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"
echo ""

COLOR_COUNT=$(grep -rn "#[0-9A-Fa-f]\{6\}" app/ancarraig components/ancarraig lib/ancarraig 2>/dev/null | \
  grep -v "node_modules" | grep -v ".next" | grep -v "tailwind.config" | wc -l | xargs)

echo "Found: $COLOR_COUNT instances"

if [ "$COLOR_COUNT" -gt 0 ]; then
  echo ""
  echo "Examples:"
  grep -rn "#[0-9A-Fa-f]\{6\}" app/ancarraig components/ancarraig lib/ancarraig 2>/dev/null | \
    grep -v "node_modules" | grep -v ".next" | grep -v "tailwind.config" | head -5
fi

echo ""

# Category 2: URLs & Endpoints (High Priority)
echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"
echo "┃ 2. HARDCODED URLs & ENDPOINTS (High Priority)                ┃"
echo "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"
echo ""

URL_COUNT=$(grep -rn "http[s]\?://" app/ancarraig components/ancarraig lib/ancarraig 2>/dev/null | \
  grep -v "node_modules" | grep -v ".next" | grep -v "// http" | wc -l | xargs)

echo "Found: $URL_COUNT instances"

if [ "$URL_COUNT" -gt 0 ]; then
  echo ""
  echo "Examples:"
  grep -rn "http[s]\?://" app/ancarraig components/ancarraig lib/ancarraig 2>/dev/null | \
    grep -v "node_modules" | grep -v ".next" | grep -v "// http" | head -5
fi

echo ""

# Category 3: API Keys / Secrets (Critical)
echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"
echo "┃ 3. HARDCODED SECRETS (Critical)                               ┃"
echo "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"
echo ""

SECRET_COUNT=$(grep -rn "sk-\|pk_\|API_KEY\|api[_-]key\|secret\|password" app/ancarraig lib/ancarraig 2>/dev/null | \
  grep -v "node_modules" | grep -v ".next" | grep -v "process.env" | grep -v "// " | wc -l | xargs)

echo "Found: $SECRET_COUNT potential issues"

if [ "$SECRET_COUNT" -gt 0 ]; then
  echo ""
  echo "⚠️  Check these manually for exposed secrets:"
  grep -rn "sk-\|pk_\|API_KEY\|api[_-]key\|secret\|password" app/ancarraig lib/ancarraig 2>/dev/null | \
    grep -v "node_modules" | grep -v ".next" | grep -v "process.env" | grep -v "// " | head -3
fi

echo ""

# Category 4: Magic Numbers (Medium Priority)
echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"
echo "┃ 4. MAGIC NUMBERS (Medium Priority)                           ┃"
echo "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"
echo ""

TIMEOUT_COUNT=$(grep -rn "setTimeout\|setInterval" app/ancarraig components/ancarraig lib/ancarraig 2>/dev/null | \
  grep -v "node_modules" | wc -l | xargs)

echo "setTimeout/setInterval calls: $TIMEOUT_COUNT"

if [ "$TIMEOUT_COUNT" -gt 0 ]; then
  echo ""
  echo "Examples:"
  grep -rn "setTimeout\|setInterval" app/ancarraig components/ancarraig lib/ancarraig 2>/dev/null | \
    grep -v "node_modules" | head -3
fi

echo ""

# Category 5: Hardcoded Text (Low Priority)
echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"
echo "┃ 5. HARDCODED TEXT (Low Priority - Content)                   ┃"
echo "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"
echo ""

EMAIL_COUNT=$(grep -rn "@.*\.com\|support@\|hello@\|contact@" app/ancarraig components/ancarraig 2>/dev/null | \
  grep -v "node_modules" | grep -v ".next" | grep -v "// " | wc -l | xargs)

echo "Hardcoded email addresses: $EMAIL_COUNT"

if [ "$EMAIL_COUNT" -gt 0 ]; then
  echo ""
  echo "Examples:"
  grep -rn "@.*\.com\|support@\|hello@\|contact@" app/ancarraig components/ancarraig 2>/dev/null | \
    grep -v "node_modules" | grep -v ".next" | grep -v "// " | head -3
fi

echo ""

# Summary
echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║                    HARDX SCAN SUMMARY                             ║"
echo "╠═══════════════════════════════════════════════════════════════════╣"
echo "║                                                                   ║"
echo "║  🔴 Critical: Hardcoded Secrets         $SECRET_COUNT issues                  ║"
echo "║  🟠 High: Hardcoded URLs                $URL_COUNT issues                   ║"
echo "║  🟡 High: Hardcoded Colors              $COLOR_COUNT issues                   ║"
echo "║  🟡 Medium: Magic Numbers (timeouts)    $TIMEOUT_COUNT issues                   ║"
echo "║  🟢 Low: Hardcoded Text (emails)        $EMAIL_COUNT issues                    ║"
echo "║                                                                   ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""

# Calculate score
TOTAL=$((SECRET_COUNT + URL_COUNT + COLOR_COUNT + TIMEOUT_COUNT + EMAIL_COUNT))

if [ "$TOTAL" -eq 0 ]; then
  echo "🎉 PERFECT! No hardcoded values found."
elif [ "$TOTAL" -lt 10 ]; then
  echo "✅ EXCELLENT! Very few hardcoded values found."
elif [ "$TOTAL" -lt 25 ]; then
  echo "⚠️  GOOD! Some hardcoded values to review."
else
  echo "❌ ATTENTION NEEDED! Many hardcoded values found."
fi

echo ""
echo "📄 Full report: HARDX-ANCARRAIG-REPORT.md"
