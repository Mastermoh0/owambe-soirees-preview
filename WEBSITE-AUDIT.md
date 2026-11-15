# Owambe Soirées website audit

Date: 15 November 2026. Target: https://mastermoh0.github.io/owambe-soirees-preview/

## Assessment

A distinctive, coherent event-planning presentation site with a sound static HTML foundation. Suitable for sharing as a preview. Needs asset optimization, accessibility corrections, and verified business content before a permanent business launch and a sustained search campaign. No website source or deployment was changed in this audit.

## Evidence

One Lighthouse 13.6.0 mobile laboratory run: performance 83, accessibility 96, best practices 100, SEO 100. These scores describe that run and its automated checks; they do not establish rankings, indexing, full WCAG conformance, or real-user Core Web Vitals.

- First Contentful Paint: 2.9 seconds.
- Largest Contentful Paint: 2.9 seconds.
- Speed Index: 7.4 seconds.
- Total Blocking Time: 110 milliseconds (not a measurement of field INP).
- Cumulative Layout Shift: 0 in this run.
- Total transferred payload: approximately 2.8 MiB.
- Browser checks at 320, 390, 768 and 1440 CSS pixels found no horizontal page overflow. Visible button/input/select/textarea bounds were at least 44px in both dimensions; this was not an exhaustive audit of text-link spacing.
- Mobile menu closes with Escape; gallery opens by keyboard and returns focus to its trigger on dismissal. No JavaScript page errors were observed.
- Core copy remains in HTML with JavaScript disabled. This does not prove every no-JavaScript interaction works.
- Settled desktop/mobile hero screenshots reviewed. The warm neutral/plum palette, serif typography, photo-led hierarchy and clear contact path form a coherent identity. Low-resolution Instagram photographs limit sharpness on large displays.

## Priority fixes

### 1. Optimize logo delivery

The transparent logo is 1,199,450 bytes at 1536×1024, despite a much smaller rendered size. Lighthouse attributes around 1.19 MB of avoidable delivery to this resource. The purple logo used as the favicon is 1,354,245 bytes. Produce compact website derivatives and a small favicon while retaining the high-resolution masters. Use responsive sizing and modern formats where appropriate. Do not count repeated uses of the same cached logo as repeated full downloads.

### 2. Fix accessible names

The three service links override their visible labels with unrelated aria-label wording. For example, “Plan with us” becomes “Enquire about event planning”. Include the visible wording in the accessible name, such as “Plan with us — event planning”, to support voice control and WCAG label-in-name expectations.

### 3. Keep text readable throughout motion

Lighthouse found insufficient contrast in intro, service, invitation and process content at low-opacity animation states. Scrolling those sampled elements into view and waiting for completion restored opacity to 1. These results do not establish a permanent palette failure, but show a real risk of dim content until scroll triggers run. Prefer full-opacity text with small transforms, or use opacity on decorative imagery instead. Retest contrast in resting, entering, highlighted and reduced-motion states.

### 4. Replace preview content with verified evidence

Replace or remove the explicitly labelled founder placeholder. Confirm business name spelling, services, service areas, contact channels and response expectations. Obtain high-quality authorized image originals. Add genuine event case studies describing the occasion, location where approved, work delivered, and relevant decisions. Only publish reviews with permission; do not invent testimonials, addresses, hours or prices.

### 5. Prepare permanent search metadata

Current title: “Owambe Soirées — Your people. Your moment.” A more descriptive permanent title could be “Event Planning & Styling in Abuja | Owambe Soirées by Kuby”. Retain the expressive hero heading if desired; the nearby copy already describes the service and city.

The current document has a description, lang=en, a single H1, semantic sections, image alternatives and crawlable links. It has no canonical link, JSON-LD structured data, Open Graph metadata, or sitemap.xml. The origin robots.txt returns 404; this is not itself a crawl prohibition. There is no observed noindex meta directive or X-Robots-Tag. Actual indexing was not checked through Search Console.

Choose the permanent domain before setting canonical URLs and a sitemap. Add social sharing metadata for consistent previews (not a direct ranking requirement). Add truthful Organization or appropriate LocalBusiness structured data only when its required facts are available; do not fabricate an address to qualify for LocalBusiness rich results. Validate markup and inspect the final URL in Search Console. A sitemap helps discovery but is not mandatory for a small, well-linked site.

### 6. Build content useful to people and answer engines

The FAQ and plain HTML are useful starting points. Expand concise, specific answers around service areas, what planning versus coordination includes, how availability and quotes work, and the booking process. Genuine dedicated service or case-study pages may serve distinct visitor questions better than one general page; create them only when there is substantial useful content.

For Google AI Overviews and AI Mode, the same SEO foundations apply. There is no special AI schema or required llms.txt file. Structured data must agree with visible content and does not guarantee inclusion. Other answer engines have their own crawling and citation policies, so no universal AEO score is claimed.

## Modern Web Guidance used

Reviewed performance, accessibility and form-factor-adaptation. Relevant rules included “DO implement responsive images with srcset and sizes”, “Do include a control's visible text in its accessible name”, and “Keep content inside its box”. These informed findings rather than code changes. No legacy-scan was run because this was a targeted standards/launch audit.

## Sources

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/appearance/structured-data/local-business

## Limits

No real-phone, screen-reader-user, Search Console, Business Profile, external form delivery or field analytics verification was performed. Lighthouse is a single simulated mobile run and can vary. Performance trace reflow and main-thread findings merit profiling during optimization. Existing deferred scripts, HTML-discoverable prioritized hero image, native dialogs/details, reduced-motion controls and buildless implementation are positive foundations; new frameworks or backend features are unnecessary for the identified fixes.

