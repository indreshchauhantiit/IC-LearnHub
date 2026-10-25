# Java Q&A: Adding questions and SEO setup

## Add a question
Edit `src/data/javaQuestions.js` and add an object to the `javaQuestions` array:

```js
{
  id: "your-seo-friendly-question-slug",
  topic: "basics", // use an id from javaTopics
  level: "Beginner",
  question: "Your question here?",
  answer: "Write the answer in your own words.",
  code: "System.out.println(\"Example\");",
  explanation: "Explain why the answer is correct."
}
```

Rules:
- Make `id` unique and URL-safe (lowercase words separated by hyphens).
- `id` becomes the question URL, for example `/java-questions/your-seo-friendly-question-slug`.
- Use `code: ""` or omit `code` if no code example is needed.
- Write original, reviewed content; avoid copying answers from other websites.

## Sitemap and robots.txt
Before deploying, replace `https://your-domain.com` in `scripts/generate-sitemap.js` and `public/robots.txt` with your real production domain.
Then run `npm run build`. The build script regenerates `public/sitemap.xml` with the current Java question URLs before Vite builds the site.

After deployment:
1. Open `https://YOUR-REAL-DOMAIN/sitemap.xml` and confirm it loads.
2. Open `https://YOUR-REAL-DOMAIN/robots.txt` and confirm its sitemap line uses your domain.
3. Add and verify the domain property in Google Search Console.
4. Submit the sitemap URL in Search Console and inspect a few individual question URLs.

Note: this is a client-rendered React/Vite app. The question page updates the document title and meta description in the browser, but those tags are not pre-rendered into the original HTML for every URL. Google can render JavaScript, but if search visibility becomes a priority, consider prerendering/SSR so each question's metadata and content are present in the initial HTML response.

Do not add AdSense until the site has enough useful original content and working About, Contact, and Privacy Policy pages. Approval and earnings are not guaranteed.
