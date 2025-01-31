const FAQ = require('../models/faq.model.js');
const { translateText } = require('../services/translation.service.js');
const { getFromCache, setToCache } = require('../services/cache.service.js');


// Get all FAQs from the database or cache [/api/faqs/?lang=hi]
const getFAQs = async (req, res) => {
  const { lang = 'en' } = req.query;
  const cacheKey = `faqs_${lang}`;

  try {
    let cachedData;
    try {
      cachedData = await getFromCache(cacheKey);
    } catch (err) {
      console.error('Cache fetch error:', err.message);
      // If cache fetch fails or times out, proceed without cache
      cachedData = null;
    }

    if (cachedData) {
      console.log('Cache hit:', cachedData);
      return res.json(cachedData);
    }

    console.log('Cache miss or timeout. Fetching FAQs from database...');
    const faqs = await FAQ.find({});
    console.log('FAQs fetched from database:', faqs);
    const translatedFAQs = faqs.map((faq) => faq.getTranslatedText(lang));

    try {
      await setToCache(cacheKey, translatedFAQs);
      console.log('Cache set successfully.');
    } catch (err) {
      console.error('Cache set error:', err.message);
      // If cache set fails, continue without caching
    }

    res.json(translatedFAQs);
  } catch (err) {
    console.error('Error in getFAQs:', err);
    res.status(500).json({ message: err.message });
  }
};

// Create a new FAQ [/api/faqs]
const createFAQ = async (req, res) => {
  const { question, answer } = req.body;

  try {
    const faq = new FAQ({ question, answer });

    // Translate to Hindi and Bengali
    faq.translations.hi = {
      question: await translateText(question, 'hi'),
      answer: await translateText(answer, 'hi'),
    };
    faq.translations.bn = {
      question: await translateText(question, 'bn'),
      answer: await translateText(answer, 'bn'),
    };

    await faq.save();
    res.status(201).json(faq);
  } catch (err) {
    console.error('Error creating FAQ:', err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getFAQs, createFAQ };