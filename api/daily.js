
export default async function handler(req, res) {
  const API_KEY = process.env.FINNHUB_API_KEY;

  const newsUrl = `https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`;
  const calUrl = `https://finnhub.io/api/v1/calendar/economic?token=${API_KEY}`;

  const [newsRes, calRes] = await Promise.all([
    fetch(newsUrl).then(r => r.json()),
    fetch(calUrl).then(r => r.json())
  ]);

  const news = (newsRes || []).slice(0, 7).map(n => ({
    headline: n.headline,
    url: n.url,
    source: n.source
  }));

  const calendar = (calRes.economicCalendar || []).slice(0, 10);

  res.status(200).json({
    news,
    calendar
  });
}
