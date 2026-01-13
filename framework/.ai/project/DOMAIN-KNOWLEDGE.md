# Stayflo - Domain Knowledge

> **Business context, industry knowledge, and target audience insights**
>
> This file is part of the AI Framework v2.1

---

## Industry Overview

### Short-Term Rental Market

**Size (UK):**
- 660,000+ short-term rental listings
- 45,000+ hotels
- Growing 15%+ annually post-COVID

**Key Players:**
- Airbnb (dominant)
- VRBO / Booking.com
- Direct booking websites

**Trends:**
- Professionalization of hosting
- Guest experience differentiation
- Sustainability focus
- "Bleisure" (business + leisure) travel
- Longer stays / remote work

### Property Management Software (PMS) Landscape

**Major Players:**
- Hostaway (all-in-one)
- Guesty (enterprise focus)
- Lodgify (website + booking)
- Hospitable (automation)
- OwnerRez (US focused)

**Gap:** Most PMS include basic guidebooks but they're afterthoughts, not core products.

---

## Target User Deep Dive

### Primary: The "Superhost"

**Profile:**
- Manages 3-10 properties
- Full-time or serious side business
- Uses Airbnb primarily, maybe VRBO
- Tech-comfortable (uses smartphones, apps)
- Time-poor, efficiency-focused

**Day in the Life:**
- Morning: Check for new bookings, respond to messages
- Coordinate cleaners between guests
- Handle guest questions (same ones repeatedly)
- Evening: Review analytics, plan improvements

**Current Pain Points:**
1. "I answer the WiFi question 5x per week"
2. "My PDF handbook looks unprofessional"
3. "Guests don't read the information I provide"
4. "Updating info across properties takes forever"
5. "I have no idea what guests actually need help with"

**What They Value:**
- Time savings (automation)
- Professional appearance
- Guest satisfaction (reviews matter!)
- Competitive differentiation
- Easy setup (not another complex tool)

**Where They Hang Out:**
- Airbnb Host Community forums
- Facebook groups (Host Nation, etc.)
- VRMA conferences
- Local host meetups

### Secondary: Boutique Hotel / B&B Owner

**Profile:**
- 1 property, 4-12 rooms
- Owner-operated or small team
- Personal touch is the brand
- Less tech-savvy than Superhosts
- Traditional hospitality background

**Pain Points:**
1. "Our guest folder looks dated"
2. "We want to modernize without losing our character"
3. "Staff answers same questions repeatedly"
4. "Hard to keep physical materials current"

**What They Value:**
- Personal connection maintained
- Professional appearance
- Staff time savings
- Easy for older guests to use

### Tertiary: Property Management Company

**Profile:**
- Manages 50-500 properties for owners
- Professional operations team
- Multiple staff members
- Uses PMS software
- Brand consistency matters

**Pain Points:**
1. "Need consistent experience across portfolio"
2. "Different owners want different things"
3. "Training staff on each property's details"
4. "White-label requirement for our brand"

**What They Value:**
- Scalability
- Consistency
- API integrations
- White-label options
- Per-property customization

---

## Guest Handbook Best Practices

### What Guests Actually Need

**Immediately (Before/On Arrival):**
1. Address / directions
2. Key/access instructions
3. WiFi password
4. Parking information
5. Check-in time

**During Stay:**
1. How appliances work (heating, TV, coffee maker)
2. House rules (quiet hours, trash)
3. Emergency contacts
4. Local recommendations
5. Check-out instructions

**Nice to Have:**
- Area attractions
- Walking routes
- Restaurant bookings
- Event information
- Host's personal tips

### Content Hierarchy

```
Must Have (100%)     → Check-in, WiFi, Check-out, Emergency
Should Have (80%)    → House rules, Appliances, Parking
Nice to Have (50%)   → Local area, Restaurants, Activities
Delighters (20%)     → Hidden gems, Personal recommendations
```

### Common Mistakes

1. **Too much information** - Guests skim, don't read
2. **Hard to find essentials** - WiFi buried in page 5
3. **Outdated information** - Restaurant closed 6 months ago
4. **No search capability** - Can't find specific answer
5. **Mobile-unfriendly** - PDF doesn't work on phone
6. **Generic content** - Same as every other property

---

## Competitive Analysis

### Touch Stay

**Strengths:**
- Established (since 2014)
- Good template library
- Integration options

**Weaknesses:**
- Dated UI/UX
- Expensive ($99+/year per property)
- No AI capabilities
- Clunky editor

**Opportunity:** Modern, AI-powered alternative

### Hostaway Guidebook

**Strengths:**
- Included with PMS
- Automatic sync

**Weaknesses:**
- Basic features only
- Tied to Hostaway PMS
- Not a focus product

**Opportunity:** Better standalone option

### YourWelcome

**Strengths:**
- Tablet-first experience
- Upselling features

**Weaknesses:**
- Requires hardware purchase
- Complexity for simple use case
- Higher price point

**Opportunity:** Software-only, simpler solution

### Notion/Google Docs (DIY)

**Strengths:**
- Free
- Flexible

**Weaknesses:**
- Unprofessional appearance
- No guest-specific features
- No analytics
- Setup time

**Opportunity:** "Beautiful Notion for guest handbooks"

---

## Industry Terminology

| Term | Definition |
|------|------------|
| **PMS** | Property Management System (Hostaway, Guesty) |
| **OTA** | Online Travel Agency (Airbnb, Booking.com) |
| **ADR** | Average Daily Rate |
| **RevPAR** | Revenue Per Available Room |
| **LOS** | Length of Stay |
| **Superhost** | Airbnb designation for top hosts |
| **Direct booking** | Guest books without OTA |
| **Channel manager** | Syncs calendars across OTAs |
| **Turnover** | Cleaning/prep between guests |
| **Guest communication** | Messaging before/during/after stay |

---

## Pricing Psychology

### What Hosts Will Pay

**Reference points:**
- Touch Stay: $99-299/year per property
- PMS software: $20-50/month per property
- Cleaning per turnover: $50-150
- Airbnb commission: 3% of booking

**Value perception:**
- "If it saves me 1 hour/week, worth $50/month"
- "If it gets me better reviews, worth $100/month"
- "If it looks professional, I'll pay for it"

**Price sensitivity:**
- Hobbyist hosts: Very sensitive ($0-10/month)
- Serious hosts: Moderate ($15-30/month acceptable)
- Property managers: Low (value > cost)

### Pricing Anchors

Position against:
- Time cost: "Answer 5 fewer questions/week"
- Review impact: "Better reviews = more bookings"
- Professional appearance: "Look as good as big hotels"

---

## Integration Ecosystem

### Priority 1 (High Value)
- **Airbnb API** - Auto-send handbook link
- **VRBO API** - Auto-send handbook link
- **Hostaway** - Sync property data
- **Guesty** - Sync property data

### Priority 2 (Medium Value)
- **Zapier** - DIY integrations
- **Google Places** - Local recommendations
- **Stripe** - Already using for billing

### Priority 3 (Future)
- **Lodgify** - PMS integration
- **OwnerRez** - PMS integration
- **Hospitable** - Automation integration
- **WhatsApp Business** - Guest messaging

---

## Regulatory Considerations

### Data Privacy
- GDPR compliance (EU guests)
- Guest data minimization
- Data retention policies
- Right to deletion

### Accessibility
- WCAG 2.1 AA (good practice)
- ADA considerations (US)
- Equality Act (UK)

### Content Liability
- Local recommendations accuracy
- Emergency information correctness
- Terms of service clarity

---

## Success Metrics (Industry Benchmarks)

| Metric | Industry Average | Stayflo Target |
|--------|------------------|----------------|
| Guest handbook open rate | 40-60% | 70%+ |
| Time to find info | 30-60 seconds | < 15 seconds |
| Host time on questions | 30 min/week | < 10 min/week |
| Guest satisfaction (handbook) | 3.5/5 | 4.5/5 |

---

## Content Resources

### For AI Training
- Common guest questions database
- Local area recommendation templates
- Property description patterns
- House rules examples

### For Host Education
- "How to write better handbook content"
- "What guests actually want to know"
- "Photography tips for handbooks"
- "Getting more guests to use your handbook"

---

**Last Updated**: January 2025
