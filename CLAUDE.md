# AI Makers - Workshop Planning

## Event Details
- **Event:** AI Makers - Build AI tools together
- **Host:** MakersLounge Toronto (500+ member community)
- **Date:** Monday, March 2, 2026, 7:00–8:30 PM ET
- **Location:** Google Meet (virtual)
- **Ticket:** $10 CAD
- **Organizer:** Robert Mill (bertmill19@gmail.com)

## Workshop Format
- Hands-on building session — no lectures, no slides
- ~20 participants building together on one shared project
- Audience: developers, founders, makers (no experience required)

## The Build: MakersLounge Community Wall
- Everyone builds their own "maker profile" page in v0
- All pages live in the same repo under `/makers/[name]`
- Each person's page: name, what they're building, skills, links, personality
- PRs merge each page into the shared community wall
- The more people build, the better it gets for everyone

## Key Resources
- **v0 coupon code:** `AI-MAKERS-V0-1` (30 credits per person)
- **Presentation:** Next.js app in this repo (`components/slides.tsx`)

## Project Structure
- `components/slides.tsx` — All presentation slides
- `components/timer.tsx` — Session timer component
- `components/links-panel.tsx` — Resource links panel
- `app/` — Next.js app (layout, page, globals)
- `public/makerslounge-community.png` — Community photo for slides
- `about-makerslounge.md` — About MakersLounge (founders, values, story)
- `luma-event-description.md` — Event listing copy from Luma

## TODO
- [x] Define the specific project participants will build (Community Wall)
- [x] Prepare v0-based presentation
- [ ] Create the community wall starter repo/template for participants to fork
- [ ] Create participant guide (setup instructions, v0 credit redemption)
- [ ] Test the full flow: redeem credits → fork repo → build page → open PR
