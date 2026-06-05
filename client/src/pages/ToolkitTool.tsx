import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "wouter";
import { ArrowLeft, Wrench } from "lucide-react";

// Tool content embedded directly from Gemini HTML pack
const toolContent: Record<string, { title: string; badge: string; content: string }> = {
  "producer-startup-checklist": {
    title: "Producer Startup Checklist",
    badge: "Checklist",
    content: `
<h2>Before Any Production</h2>
<p>Before you shoot a single frame, these items must be in place. Skipping any of them creates legal, financial, or platform risk that is difficult to unwind later.</p>
<ul>
  <li>Confirm the legal age of every performer using government-issued photo ID. Retain copies securely.</li>
  <li>Obtain signed consent and release documentation from every performer before any content is created.</li>
  <li>Confirm that all planned activities are legal in your jurisdiction and the jurisdiction of your intended distribution platforms.</li>
  <li>Establish a secure, access-controlled folder system for performer records. Never store these on shared drives or public cloud without encryption.</li>
  <li>Identify which platforms you intend to distribute on and read their terms of service in full. Platform rules change — subscribe to their policy update emails.</li>
</ul>

<h2>Business Setup</h2>
<p>Running adult content as a sole trader without a formal business structure exposes your personal assets. A properly structured entity also makes banking, tax, and investor conversations significantly easier.</p>
<ul>
  <li>Register a legal business entity (company, LLC, or equivalent in your jurisdiction).</li>
  <li>Open a dedicated business bank account. Do not mix personal and business funds.</li>
  <li>Engage an accountant familiar with adult content businesses. Tax treatment of content creation, equipment, and performer payments varies.</li>
  <li>Apply for an ABN or equivalent business registration number.</li>
  <li>Obtain appropriate insurance: public liability, professional indemnity, and if applicable, production insurance.</li>
  <li>Draft a privacy policy and terms of service for any website or subscription platform you operate.</li>
  <li>Create a takedown and dispute policy. Document how you will handle requests to remove content.</li>
</ul>

<h2>Platform Accounts</h2>
<p>Platform verification takes time. Apply early and do not assume approval is automatic.</p>
<ul>
  <li>Apply for creator accounts on your target platforms (OnlyFans, Fansly, Clips4Sale, etc.) with full business documentation.</li>
  <li>Complete identity verification on every platform before you need it urgently.</li>
  <li>Set up payment processing. Understand that adult businesses face higher friction with standard processors. Research adult-friendly payment options.</li>
  <li>Create a content watermarking workflow to protect your IP from piracy.</li>
  <li>Set up a dedicated email address and social media accounts for your brand, separate from personal accounts.</li>
</ul>

<h2>Launch Sequence</h2>
<p>A structured launch builds audience before you need revenue, rather than hoping revenue appears immediately.</p>
<ol>
  <li>Build a content backlog of at least 4–6 weeks before going live. Do not launch empty.</li>
  <li>Create a non-explicit teaser presence on safe-for-social platforms (Instagram, TikTok, X/Twitter) to drive traffic.</li>
  <li>Set your initial pricing deliberately. Starting too low trains subscribers to expect low prices permanently.</li>
  <li>Define your content calendar for the first 90 days before launch day.</li>
  <li>Identify your first 10 potential collaborators or cross-promotion partners.</li>
  <li>Set up analytics tracking from day one. You cannot improve what you do not measure.</li>
</ol>

<h2>Useful Metrics to Track From Day One</h2>
<ul>
  <li><strong>Subscriber count and monthly change</strong></li>
  <li><strong>Churn rate</strong> — percentage of subscribers who cancel each month</li>
  <li><strong>Average revenue per subscriber</strong></li>
  <li><strong>Message response rate</strong> — a proxy for engagement quality</li>
  <li><strong>Content engagement rate</strong> — likes, comments, tips per post</li>
  <li><strong>Traffic source breakdown</strong> — where new subscribers are coming from</li>
</ul>
    `,
  },
  "finance-pitch-guide": {
    title: "Finance Pitch Guide for Adult Producers",
    badge: "Finance",
    content: `
<h2>What Finance Partners Actually Fund</h2>
<p>Most adult content pitches fail not because the business is adult content, but because the pitch looks like every other creative business pitch that has no defensible moat. Finance partners — whether angel investors, family offices, or specialist media funds — fund systems, not content.</p>
<p>They fund:</p>
<ul>
  <li>Repeatable audience acquisition channels with measurable cost-per-subscriber</li>
  <li>Retention systems that demonstrate subscribers stay and spend more over time</li>
  <li>Compliance infrastructure that reduces platform, banking, and regulatory risk</li>
  <li>Brand IP with licensing, merchandise, or cross-platform potential</li>
  <li>Differentiated niche positioning that makes head-on competition with large platforms irrelevant</li>
  <li>Founder capability — evidence you can execute, not just create</li>
</ul>
<p>They do not fund "adult content is a huge market, therefore we will make money." That argument is available to every competitor and explains nothing about why you specifically will win.</p>

<h2>Pitch Structure</h2>
<h3>Slide 1 — The Problem / Opportunity</h3>
<p>What gap in the market are you filling? Who is underserved? Why now? Keep this to one clear, specific claim. "Adult content is big" is not a problem statement. "Independent fetish creators have no reliable compliance infrastructure and lose platform access repeatedly" is a problem statement.</p>

<h3>Slide 2 — Your Solution</h3>
<p>What specifically do you do, for whom, and why is it better than existing alternatives? Be concrete. Avoid adjectives. Show, don't describe.</p>

<h3>Slide 3 — Market Size</h3>
<p>Use real numbers. The global adult entertainment market is estimated at $59.7B in 2024, growing at 5.4% CAGR to $101B by 2034 (Market.us). OnlyFans alone processed $7.2B in fan transactions in 2024. Niche your TAM/SAM/SOM to your specific segment — do not claim the entire market.</p>

<h3>Slide 4 — Business Model</h3>
<p>How do you make money? Subscription, pay-per-view, licensing, brand partnerships, live events, merchandise? Show the unit economics: what does it cost to acquire a subscriber, what do they spend, how long do they stay?</p>

<h3>Slide 5 — Traction</h3>
<p>What have you already proven? Subscriber numbers, revenue, retention rates, engagement metrics. If you are pre-revenue, show audience signals: social following, email list, waitlist, community engagement.</p>

<h3>Slide 6 — Compliance Posture</h3>
<p>This slide is non-negotiable for adult businesses. Show your performer verification workflow, consent documentation process, content taxonomy, distribution controls, and takedown policy. Investors who fund adult businesses know the risks. Show them you know them too.</p>

<h3>Slide 7 — Use of Funds</h3>
<p>Be specific. "Marketing" is not a use of funds. "6-month paid social campaign targeting [specific audience] to acquire [X] subscribers at [Y] cost per acquisition" is a use of funds.</p>

<h3>Slide 8 — Team</h3>
<p>Why are you the right people to execute this? Relevant experience, complementary skills, existing relationships in the industry.</p>

<h3>Slide 9 — The Ask</h3>
<p>How much are you raising, at what valuation or on what terms, and what milestone does this funding achieve?</p>

<h2>Numbers to Show</h2>
<table>
  <thead><tr><th>Metric</th><th>Why It Matters</th></tr></thead>
  <tbody>
    <tr><td>Monthly recurring revenue (MRR)</td><td>Predictability of income</td></tr>
    <tr><td>Monthly churn rate</td><td>Retention quality</td></tr>
    <tr><td>Customer acquisition cost (CAC)</td><td>Efficiency of growth spend</td></tr>
    <tr><td>Lifetime value (LTV)</td><td>Long-term subscriber economics</td></tr>
    <tr><td>LTV:CAC ratio</td><td>Business model health (target >3:1)</td></tr>
    <tr><td>Average revenue per user (ARPU)</td><td>Monetisation depth</td></tr>
    <tr><td>Content-to-subscriber ratio</td><td>Production efficiency</td></tr>
  </tbody>
</table>

<h2>Use-of-Funds Example</h2>
<ul>
  <li><strong>40% — Content production:</strong> 3 months of professional shoots, equipment upgrade, post-production workflow</li>
  <li><strong>25% — Audience acquisition:</strong> Paid social, creator collaborations, SEO content</li>
  <li><strong>20% — Technology and compliance:</strong> Platform infrastructure, age-verification system, legal documentation</li>
  <li><strong>15% — Operations:</strong> Part-time support, accounting, insurance</li>
</ul>

<h2>Banking and Compliance Note</h2>
<p>Adult businesses face higher friction with banks and payment processors. AUSTRAC has noted that indiscriminate de-banking of lawful sectors is counterproductive, but friction remains real. A serious finance pack should include a risk register, performer-verification process, content taxonomy, distribution map, anti-exploitation policy, chargeback-management process, and privacy policy. Prepare this documentation before any investor conversation.</p>
    `,
  },
  "production-budget-template": {
    title: "Production Budget Template",
    badge: "Template",
    content: `
<h2>Budget Table</h2>
<p>Use this framework for every production. Adjust line items to your specific format — solo content, couples, group productions, and studio shoots have different cost profiles.</p>
<table>
  <thead><tr><th>Category</th><th>Line Item</th><th>Unit Cost</th><th>Units</th><th>Total</th></tr></thead>
  <tbody>
    <tr><td rowspan="3"><strong>Pre-Production</strong></td><td>Location scouting / hire</td><td>$X</td><td>1 day</td><td>$X</td></tr>
    <tr><td>Props and wardrobe</td><td>$X</td><td>—</td><td>$X</td></tr>
    <tr><td>Performer agreements / legal review</td><td>$X</td><td>—</td><td>$X</td></tr>
    <tr><td rowspan="4"><strong>Production</strong></td><td>Performer fee(s)</td><td>$X/performer</td><td>N performers</td><td>$X</td></tr>
    <tr><td>Camera operator / director</td><td>$X/day</td><td>1 day</td><td>$X</td></tr>
    <tr><td>Equipment hire</td><td>$X/day</td><td>1 day</td><td>$X</td></tr>
    <tr><td>Location / studio hire</td><td>$X/day</td><td>1 day</td><td>$X</td></tr>
    <tr><td rowspan="3"><strong>Post-Production</strong></td><td>Editing</td><td>$X/hour</td><td>N hours</td><td>$X</td></tr>
    <tr><td>Colour grading</td><td>$X/hour</td><td>N hours</td><td>$X</td></tr>
    <tr><td>Thumbnail and promo asset creation</td><td>$X</td><td>—</td><td>$X</td></tr>
    <tr><td rowspan="3"><strong>Distribution</strong></td><td>Platform fees / revenue share</td><td>20–30%</td><td>—</td><td>Variable</td></tr>
    <tr><td>Watermarking and piracy monitoring</td><td>$X/month</td><td>—</td><td>$X</td></tr>
    <tr><td>Marketing / promo spend</td><td>$X</td><td>—</td><td>$X</td></tr>
    <tr><td><strong>Compliance</strong></td><td>ID verification, consent docs, records</td><td>$X</td><td>—</td><td>$X</td></tr>
    <tr><td><strong>Contingency</strong></td><td>10–15% of total</td><td>—</td><td>—</td><td>$X</td></tr>
    <tr><td colspan="4"><strong>Total Production Cost</strong></td><td><strong>$X</strong></td></tr>
  </tbody>
</table>

<h2>Unit-Cost Formula</h2>
<p>For subscription content, the key metric is <strong>cost per piece of content</strong> relative to the revenue it generates.</p>
<pre>Cost per content piece = Total production cost ÷ Number of pieces produced
Revenue per piece = (Subscriber count × ARPU) ÷ Pieces published per month
Margin per piece = Revenue per piece − Cost per piece</pre>
<p>A healthy subscription content business targets a margin per piece that improves over time as subscriber count grows against relatively fixed production costs.</p>

<h2>Finance Discipline</h2>
<ul>
  <li><strong>Never pay performers in cash without documentation.</strong> All performer payments should be invoiced, receipted, and recorded for tax purposes.</li>
  <li><strong>Separate production costs from operating costs.</strong> Equipment, editing software, and platform fees are operating costs. Performer fees and shoot costs are production costs. Track them separately.</li>
  <li><strong>Build a 3-month operating reserve</strong> before scaling production spend. Platform payment delays and banking friction are common in adult businesses.</li>
  <li><strong>Track chargeback rates.</strong> High chargeback rates can result in payment processor termination. Industry standard is below 1%.</li>
  <li><strong>Reinvest a fixed percentage of revenue into content production.</strong> A common model is 30–40% of net revenue reinvested into production.</li>
</ul>
    `,
  },
  "consent-release-workflow": {
    title: "Consent & Release Workflow",
    badge: "Legal",
    content: `
<h2>Workflow Overview</h2>
<p>Consent and documentation are not bureaucratic obstacles. They are the foundation of a legitimate, sustainable adult content business. Platforms, payment processors, and investors all scrutinise this area. A robust workflow protects performers, protects your business, and demonstrates professionalism.</p>
<p><strong>This document is a framework, not legal advice. Have your release forms reviewed by a qualified lawyer in your jurisdiction before use.</strong></p>

<h2>Step 1 — Identity Verification</h2>
<p>Before any content is created, verify the identity and age of every performer.</p>
<ul>
  <li>Collect a government-issued photo ID (passport, driver's licence) from every performer.</li>
  <li>Photograph the ID alongside the performer holding it (a "selfie with ID" verification).</li>
  <li>Record the ID number, expiry date, and verification date in your performer records system.</li>
  <li>Store copies securely with access controls. Do not store on shared or unencrypted drives.</li>
  <li>In some jurisdictions (notably the US under 18 U.S.C. § 2257), specific record-keeping requirements apply. Research the requirements for your jurisdiction and distribution markets.</li>
</ul>

<h2>Step 2 — Pre-Shoot Discussion</h2>
<p>Before any shoot, have an explicit conversation with each performer about:</p>
<ul>
  <li>Exactly what activities are planned and what will be filmed</li>
  <li>What is off-limits (hard limits)</li>
  <li>Safe word or signal to pause or stop at any time</li>
  <li>How the content will be distributed and on which platforms</li>
  <li>Whether the performer's face will be visible</li>
  <li>Whether the content can be used in future compilations or promotional material</li>
  <li>Payment terms and timing</li>
</ul>

<h2>Release Form Clauses to Discuss with Counsel</h2>
<p>A comprehensive performer release form should address:</p>
<ul>
  <li><strong>Identity confirmation:</strong> Full legal name, date of birth, ID document reference</li>
  <li><strong>Age confirmation:</strong> Explicit statement that the performer is 18 or older</li>
  <li><strong>Consent to filming:</strong> Specific description of the content being created</li>
  <li><strong>Distribution rights:</strong> Which platforms, territories, and formats the content may be distributed on</li>
  <li><strong>Duration of rights:</strong> Whether rights are granted in perpetuity or for a defined period</li>
  <li><strong>Exclusivity:</strong> Whether the content is exclusive to your platform or can be distributed elsewhere</li>
  <li><strong>Takedown rights:</strong> Under what circumstances the performer can request removal</li>
  <li><strong>Payment terms:</strong> Amount, timing, and method of payment</li>
  <li><strong>Voluntary participation:</strong> Statement that participation is voluntary and not under duress</li>
  <li><strong>Governing law:</strong> Which jurisdiction's laws govern the agreement</li>
</ul>

<h2>Red Flags — Stop Immediately If You See These</h2>
<ul>
  <li>A performer appears intoxicated or impaired at any point during the shoot</li>
  <li>A performer expresses hesitation, distress, or withdrawal of consent at any point</li>
  <li>You cannot verify a performer's age with a government-issued ID</li>
  <li>A third party is pressuring a performer to participate</li>
  <li>A performer asks to remove content after the shoot — take this seriously and respond promptly</li>
</ul>

<h2>Folder Naming System</h2>
<p>Maintain a consistent, searchable record system for all performer documentation.</p>
<pre>
/performer-records/
  /[PERFORMER_ALIAS]/
    /[YYYY-MM-DD_SHOOT_ID]/
      id_verification.jpg
      selfie_with_id.jpg
      release_form_signed.pdf
      shoot_notes.txt
</pre>
<p>Back up this folder to an encrypted, access-controlled location. Never store performer personal data in publicly accessible systems.</p>

<h2>Post-Production Checklist</h2>
<ul>
  <li>Confirm all release forms are signed and filed before editing begins</li>
  <li>Apply watermarks to all distributed content</li>
  <li>Log the content in your distribution record (what was published, where, when)</li>
  <li>Set a calendar reminder to review performer consent status annually — circumstances change</li>
</ul>
    `,
  },
  "platform-strategy": {
    title: "Platform Strategy",
    badge: "Strategy",
    content: `
<h2>The Platform Stack</h2>
<p>No single platform is sufficient for a resilient adult content business. Platform terms change, accounts get suspended, and payment processors come and go. A diversified platform stack reduces single-point-of-failure risk while maximising audience reach.</p>

<table>
  <thead><tr><th>Platform</th><th>Best For</th><th>Revenue Model</th><th>Risk Level</th></tr></thead>
  <tbody>
    <tr><td><strong>OnlyFans</strong></td><td>Subscription, direct fan relationships</td><td>80% creator / 20% platform</td><td>Medium (policy changes)</td></tr>
    <tr><td><strong>Fansly</strong></td><td>OnlyFans backup, more permissive content</td><td>80% creator / 20% platform</td><td>Low-Medium</td></tr>
    <tr><td><strong>Clips4Sale</strong></td><td>Fetish/niche clip sales</td><td>60–70% creator</td><td>Low</td></tr>
    <tr><td><strong>ManyVids</strong></td><td>Clip sales, custom content</td><td>60–80% creator</td><td>Low</td></tr>
    <tr><td><strong>Pornhub Model Program</strong></td><td>Tube traffic, brand awareness</td><td>Revenue share on views</td><td>Medium</td></tr>
    <tr><td><strong>Your own website</strong></td><td>Full control, email list building</td><td>100% (minus payment fees)</td><td>Highest setup cost, lowest platform risk</td></tr>
    <tr><td><strong>X/Twitter</strong></td><td>Non-explicit promo, community</td><td>Traffic driver only</td><td>Medium (policy changes)</td></tr>
    <tr><td><strong>Reddit</strong></td><td>Community engagement, niche discovery</td><td>Traffic driver only</td><td>Low-Medium</td></tr>
  </tbody>
</table>

<h2>Rules of Thumb</h2>
<ul>
  <li><strong>Never rely on a single platform for more than 60% of revenue.</strong> If that platform changes its terms or suspends your account, your business survives.</li>
  <li><strong>Build an email list from day one.</strong> Email is the only audience you truly own. Use a non-explicit landing page to capture emails from social traffic.</li>
  <li><strong>Treat tube sites as a top-of-funnel, not a revenue source.</strong> Free content on tube sites drives subscribers to paid platforms. Price accordingly.</li>
  <li><strong>Niche platforms pay more per subscriber than mainstream ones.</strong> Clips4Sale customers for specific fetishes spend significantly more than general OnlyFans subscribers.</li>
  <li><strong>Cross-promotion is the most efficient growth channel.</strong> Collaborations with creators in adjacent niches are cheaper than paid advertising and more trusted by audiences.</li>
</ul>

<h2>Launch Cadence</h2>
<h3>Month 1 — Foundation</h3>
<ul>
  <li>Establish primary platform (OnlyFans or equivalent)</li>
  <li>Build content backlog (minimum 20 pieces before launch)</li>
  <li>Create non-explicit social presence on 2–3 platforms</li>
  <li>Set up email capture landing page</li>
</ul>
<h3>Month 2–3 — Growth</h3>
<ul>
  <li>Launch first cross-promotion collaboration</li>
  <li>Add secondary platform (Fansly or Clips4Sale)</li>
  <li>Begin consistent posting schedule (minimum 3× per week on primary platform)</li>
  <li>Start tracking churn and engagement metrics</li>
</ul>
<h3>Month 4–6 — Diversification</h3>
<ul>
  <li>Add third platform based on niche fit</li>
  <li>Launch email newsletter to your list</li>
  <li>Test paid promotion on X/Twitter or Reddit</li>
  <li>Review pricing and consider tiered subscription model</li>
</ul>
    `,
  },
  "onlyfans-creator-operating-system": {
    title: "OnlyFans Creator Operating System",
    badge: "Operations",
    content: `
<h2>Weekly Rhythm</h2>
<p>Consistency is the single most important factor in subscriber retention. Subscribers who receive regular, predictable content churn at significantly lower rates than those who experience irregular posting. Build your weekly rhythm before you need it — not in response to a churn spike.</p>

<h3>Monday — Planning</h3>
<ul>
  <li>Review last week's engagement metrics: which posts performed best, which underperformed</li>
  <li>Check DM queue — respond to all unanswered messages</li>
  <li>Plan content for the week: what posts, what format, what time</li>
  <li>Review any custom content requests and schedule shoots</li>
</ul>

<h3>Tuesday–Thursday — Production</h3>
<ul>
  <li>Shoot and edit content for the week</li>
  <li>Schedule posts in advance using OnlyFans scheduling feature</li>
  <li>Engage with comments and DMs daily (minimum 30 minutes)</li>
</ul>

<h3>Friday — Promotion</h3>
<ul>
  <li>Post non-explicit teasers on social platforms</li>
  <li>Engage with potential new subscribers on Reddit, Twitter, or TikTok</li>
  <li>Reach out to one potential collaboration partner</li>
</ul>

<h3>Weekend — Community</h3>
<ul>
  <li>Post at least one piece of content (weekends often have higher engagement)</li>
  <li>Respond to all DMs and comments</li>
  <li>Review subscriber count and revenue for the week</li>
</ul>

<h2>Dashboards to Maintain</h2>
<p>Track these metrics weekly in a simple spreadsheet. Trends matter more than absolute numbers.</p>
<table>
  <thead><tr><th>Metric</th><th>Target Trend</th><th>Action if Declining</th></tr></thead>
  <tbody>
    <tr><td>Active subscriber count</td><td>Growing or stable</td><td>Review content quality, pricing, posting frequency</td></tr>
    <tr><td>Monthly churn rate</td><td>Below 10%</td><td>Increase DM engagement, add exclusive content for long-term subscribers</td></tr>
    <tr><td>Average revenue per subscriber</td><td>Growing</td><td>Test PPV content, custom requests, tip menus</td></tr>
    <tr><td>New subscribers per week</td><td>Consistent or growing</td><td>Increase promo activity, add collaboration</td></tr>
    <tr><td>DM response rate</td><td>Above 80%</td><td>Prioritise inbox management, consider VA support</td></tr>
    <tr><td>Post engagement rate</td><td>Above 5%</td><td>Test different content formats, posting times</td></tr>
  </tbody>
</table>

<h2>Monthly Review Questions</h2>
<p>At the end of each month, answer these questions honestly. They will tell you where to focus next month.</p>
<ol>
  <li>What was my net subscriber change this month? What drove it?</li>
  <li>What was my churn rate? Is it improving or worsening?</li>
  <li>Which 3 pieces of content generated the most engagement? What do they have in common?</li>
  <li>Which 3 pieces of content underperformed? Why?</li>
  <li>How much of my revenue came from subscriptions vs PPV vs tips vs custom content?</li>
  <li>Did I hit my posting schedule? If not, why not, and how do I fix it?</li>
  <li>What is one thing I will do differently next month?</li>
  <li>Am I on track for my 90-day revenue goal?</li>
</ol>

<h2>Pricing Strategy</h2>
<ul>
  <li><strong>Start at a sustainable price, not a promotional one.</strong> Discounting to acquire subscribers creates a subscriber base that will churn when the discount ends.</li>
  <li><strong>Use a tiered model.</strong> A lower-priced tier for casual subscribers and a higher-priced tier for dedicated fans (with additional perks) maximises revenue across different willingness-to-pay levels.</li>
  <li><strong>PPV content should be priced at 3–5× your monthly subscription rate</strong> to feel like premium value without being prohibitive.</li>
  <li><strong>Custom content should be priced to reflect time, not just content.</strong> Factor in planning, production, editing, and delivery time.</li>
</ul>
    `,
  },
  "content-ideas-non-explicit-promo": {
    title: "Non-Explicit Promo Ideas",
    badge: "Marketing",
    content: `
<h2>Safe-for-Social Angles</h2>
<p>Driving traffic to paid platforms requires a presence on mainstream social media. The challenge is creating content that is compelling enough to convert followers into subscribers without violating platform terms of service. The following angles consistently perform well.</p>

<h3>Personality and Lifestyle</h3>
<ul>
  <li>Behind-the-scenes content creation process (filming setup, editing, planning)</li>
  <li>Day-in-the-life content that humanises you as a creator</li>
  <li>Opinions on industry news, trends, or platform changes</li>
  <li>Workout, wellness, or self-care routines</li>
  <li>Cooking, travel, or hobby content that builds a fuller personality</li>
</ul>

<h3>Educational and Authority</h3>
<ul>
  <li>"How I built my OnlyFans to [X] subscribers" — creator journey content performs strongly</li>
  <li>Photography and lighting tips (positions you as a professional)</li>
  <li>Business advice for other creators (builds authority and community)</li>
  <li>Commentary on adult industry trends using data (KinkMetrics dashboard is a natural source)</li>
  <li>Consent and safety education — builds trust and differentiates from low-quality creators</li>
</ul>

<h3>Tease and Intrigue</h3>
<ul>
  <li>Cropped or partially obscured images that imply without showing</li>
  <li>"What I posted today on [platform]" posts with a non-explicit thumbnail</li>
  <li>Polls asking followers what content they want to see</li>
  <li>Countdown posts to new content drops</li>
  <li>Collaboration announcements with other creators</li>
</ul>

<h2>Promo Calendar Framework</h2>
<p>A consistent promo calendar reduces the cognitive load of deciding what to post each day. Build this template and repeat it monthly with fresh content.</p>
<table>
  <thead><tr><th>Day</th><th>Content Type</th><th>Platform</th></tr></thead>
  <tbody>
    <tr><td>Monday</td><td>Personality / lifestyle post</td><td>Instagram, TikTok</td></tr>
    <tr><td>Tuesday</td><td>Tease / new content announcement</td><td>X/Twitter, Reddit</td></tr>
    <tr><td>Wednesday</td><td>Educational or opinion post</td><td>Instagram, X/Twitter</td></tr>
    <tr><td>Thursday</td><td>Community engagement (poll, Q&A, reply thread)</td><td>All platforms</td></tr>
    <tr><td>Friday</td><td>Weekend content teaser</td><td>All platforms</td></tr>
    <tr><td>Saturday</td><td>Collaboration or cross-promotion post</td><td>X/Twitter, Reddit</td></tr>
    <tr><td>Sunday</td><td>Week recap / "what's coming this week" preview</td><td>Instagram Stories, X/Twitter</td></tr>
  </tbody>
</table>

<h2>Copy Prompts</h2>
<p>Use these as starting points. Adapt the tone to your brand voice.</p>
<ul>
  <li><em>"I just posted [X] on my page. The kind of content that makes [specific audience] very happy. Link in bio."</em></li>
  <li><em>"Behind the scenes of today's shoot. What I actually look like when I'm working. Full video on [platform]."</em></li>
  <li><em>"Hot take: [opinion on adult industry trend]. Discuss."</em></li>
  <li><em>"I've been creating content for [X] months. Here's the one thing I wish I'd known at the start."</em></li>
  <li><em>"Poll: what should I create next? [Option A] or [Option B]?"</em></li>
  <li><em>"New collab dropping this week with [creator]. We've been planning this for [X] weeks and it's genuinely one of my favourite things I've ever made."</em></li>
</ul>

<h2>Platform-Specific Notes</h2>
<ul>
  <li><strong>TikTok:</strong> Personality and lifestyle content performs best. Avoid anything that could trigger content moderation. Build a following before linking to paid platforms.</li>
  <li><strong>Instagram:</strong> Aesthetic consistency matters more than frequency. Use Stories for daily engagement, feed for polished content.</li>
  <li><strong>X/Twitter:</strong> More permissive than other platforms. Can post more suggestive content. Strong community for adult creators. Use hashtags strategically.</li>
  <li><strong>Reddit:</strong> Subreddit-specific rules vary enormously. Read the rules of every subreddit before posting. Authentic engagement in communities outperforms pure promotional posts.</li>
</ul>
    `,
  },
  "risk-register": {
    title: "Adult Producer Risk Register",
    badge: "Risk",
    content: `
<h2>Core Risk Map</h2>
<p>Every adult content business faces a specific set of risks that mainstream businesses do not. Identifying and mitigating these risks proactively is the difference between a business that survives long-term and one that collapses at the first platform policy change or banking friction event.</p>

<table>
  <thead><tr><th>Risk Category</th><th>Specific Risk</th><th>Likelihood</th><th>Impact</th><th>Mitigation</th></tr></thead>
  <tbody>
    <tr>
      <td><strong>Platform Risk</strong></td>
      <td>Primary platform changes terms, suspends account, or exits market</td>
      <td>High</td>
      <td>High</td>
      <td>Distribute across 3+ platforms. Build email list. Own your audience data.</td>
    </tr>
    <tr>
      <td><strong>Banking Risk</strong></td>
      <td>Bank account closed due to adult content business activity</td>
      <td>Medium</td>
      <td>High</td>
      <td>Use adult-friendly banks. Maintain relationships with multiple institutions. Keep 3-month cash reserve.</td>
    </tr>
    <tr>
      <td><strong>Payment Processing Risk</strong></td>
      <td>Payment processor terminates account due to chargebacks or policy</td>
      <td>Medium</td>
      <td>High</td>
      <td>Monitor chargeback rate (keep below 1%). Use multiple processors. Have backup payment solution ready.</td>
    </tr>
    <tr>
      <td><strong>Legal / Compliance Risk</strong></td>
      <td>Regulatory action due to age verification, content, or performer documentation failures</td>
      <td>Low-Medium</td>
      <td>Very High</td>
      <td>Robust ID verification. Signed releases for every performer. Legal review of documentation annually.</td>
    </tr>
    <tr>
      <td><strong>Performer Risk</strong></td>
      <td>Performer withdraws consent, requests content removal, or makes a complaint</td>
      <td>Low-Medium</td>
      <td>High</td>
      <td>Clear consent process. Documented takedown policy. Respond promptly to all removal requests.</td>
    </tr>
    <tr>
      <td><strong>Piracy Risk</strong></td>
      <td>Content distributed without authorisation on tube sites or file-sharing platforms</td>
      <td>High</td>
      <td>Medium</td>
      <td>Watermark all content. Use DMCA takedown services. Monitor for leaks regularly.</td>
    </tr>
    <tr>
      <td><strong>Reputation Risk</strong></td>
      <td>Negative press, social media backlash, or association with harmful content</td>
      <td>Medium</td>
      <td>Medium-High</td>
      <td>Clear brand positioning. Documented ethics policy. Proactive community engagement.</td>
    </tr>
    <tr>
      <td><strong>Cybersecurity Risk</strong></td>
      <td>Performer data breach, account hack, or content theft</td>
      <td>Medium</td>
      <td>High</td>
      <td>Strong passwords, 2FA on all accounts. Encrypted storage for performer records. Regular security audit.</td>
    </tr>
    <tr>
      <td><strong>Tax Risk</strong></td>
      <td>Incorrect tax treatment of income, performer payments, or business expenses</td>
      <td>Medium</td>
      <td>Medium</td>
      <td>Engage accountant familiar with adult content businesses. Keep meticulous records from day one.</td>
    </tr>
  </tbody>
</table>

<h2>Monthly Risk Review</h2>
<p>At the end of each month, review this register and ask:</p>
<ol>
  <li>Have any platform terms of service changed? Have I read the update?</li>
  <li>What is my current chargeback rate? Is it trending up?</li>
  <li>Have I received any content removal requests? How were they handled?</li>
  <li>Are all performer records current and securely stored?</li>
  <li>Have I received any communications from banks, payment processors, or regulators?</li>
  <li>Are my backup platforms and payment processors active and functional?</li>
  <li>Has any new legislation been announced in my jurisdiction or key distribution markets?</li>
</ol>

<h2>External References</h2>
<ul>
  <li>Ofcom (UK): Age checks for online safety — <a href="https://www.ofcom.org.uk" target="_blank">ofcom.org.uk</a></li>
  <li>eSafety Commissioner (Australia): Online safety obligations — <a href="https://www.esafety.gov.au" target="_blank">esafety.gov.au</a></li>
  <li>AUSTRAC (Australia): Guidance on de-banking and financial services — <a href="https://www.austrac.gov.au" target="_blank">austrac.gov.au</a></li>
  <li>Electronic Frontier Foundation: Digital rights and content moderation — <a href="https://www.eff.org" target="_blank">eff.org</a></li>
  <li>Free Speech Coalition (US): Adult industry compliance resources — <a href="https://www.freespeechcoalition.com" target="_blank">freespeechcoalition.com</a></li>
</ul>
    `,
  },
};

export default function ToolkitTool() {
  const { slug } = useParams<{ slug: string }>();
  const tool = toolContent[slug || ""];

  if (!tool) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 container text-center">
          <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
          <Link href="/toolkit">
            <button className="text-primary hover:underline">Back to Toolkit</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container max-w-4xl">
          <Link href="/toolkit">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Making Porn Toolkit
            </button>
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-primary" />
            </div>
            <Badge variant="secondary">{tool.badge}</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8">{tool.title}</h1>

          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-semibold
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-strong:text-foreground
              prose-li:text-muted-foreground
              prose-table:text-sm
              prose-th:text-foreground prose-th:font-semibold prose-th:bg-secondary/50 prose-th:px-3 prose-th:py-2
              prose-td:text-muted-foreground prose-td:px-3 prose-td:py-2 prose-td:border-b prose-td:border-border/30
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-pre:bg-secondary/50 prose-pre:text-sm prose-pre:rounded-lg prose-pre:p-4
              prose-ol:text-muted-foreground prose-ul:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: tool.content }}
          />

          <div className="mt-12 p-5 rounded-xl border border-border/50 bg-secondary/20">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Legal disclaimer:</strong> This guide is for informational and educational purposes only and does not constitute legal, financial, or professional advice. Laws governing adult content production vary by jurisdiction. Consult qualified professionals before making business decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
