import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function analyzeAliExpressProduct(url, copyInstructions = "") {
  const extractionResponse = await openai.responses.create({
    model: "gpt-4o",
    tools: [{ type: "web_search_preview" }],
    input: [
      {
        role: "user",
        content: `Analyze this AliExpress product page and extract ALL the following information in JSON format. Be thorough and accurate.

URL: ${url}

Return a JSON object with these fields:
{
  "title": "product title (clean, no store name)",
  "short_title": "short catchy title (3-5 words max)",
  "price": "price in USD",
  "original_price": "original/crossed out price if available",
  "currency": "USD",
  "images": ["array of all product image URLs"],
  "description": "full product description text",
  "features": ["array of key features/bullet points"],
  "specifications": {"key": "value pairs of product specs"},
  "category": "product category",
  "shipping_info": "shipping details if available",
  "seller_rating": "seller rating if available",
  "orders_count": "number of orders if visible",
  "review_summary": "summary of reviews if available",
  "variants": ["color/size options if available"],
  "material": "material info if available",
  "target_audience": "who this product is for"
}

IMPORTANT: Return ONLY valid JSON, no markdown, no explanation.`,
      },
    ],
  });

  let productData;
  const outputText =
    extractionResponse.output_text || extractionResponse.choices?.[0]?.message?.content;
  try {
    const cleaned = outputText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    productData = JSON.parse(cleaned);
  } catch {
    throw new Error("Failed to parse product data from OpenAI: " + outputText?.slice(0, 200));
  }

  const copyResponse = await openai.responses.create({
    model: "gpt-4o",
    input: [
      {
        role: "system",
        content: `You are an expert direct-response copywriter specializing in e-commerce landing pages that convert. You write compelling, benefit-driven copy.

${copyInstructions ? `ADDITIONAL COPY INSTRUCTIONS FROM THE USER:\n${copyInstructions}\n\nFollow these instructions precisely.` : ""}`,
      },
      {
        role: "user",
        content: `Based on this product data, generate ALL the copy needed for a high-converting Shopify landing page.

PRODUCT DATA:
${JSON.stringify(productData, null, 2)}

Generate a JSON object with:
{
  "hero_headline": "Main headline (powerful, benefit-driven, use <strong> for emphasis)",
  "hero_subheadline": "Sub-headline that supports the main headline",
  "hero_caption": "Short caption/tagline above or below the headline",
  "product_description_html": "Rich HTML product description for the main product section",
  "benefit_cards": [
    {"title": "Benefit Title", "description": "2-3 sentence benefit description"},
    {"title": "Benefit Title", "description": "2-3 sentence benefit description"},
    {"title": "Benefit Title", "description": "2-3 sentence benefit description"}
  ],
  "feature_rows": [
    {"heading": "Feature heading", "text": "Feature description paragraph"},
    {"heading": "Feature heading", "text": "Feature description paragraph"},
    {"heading": "Feature heading", "text": "Feature description paragraph"}
  ],
  "comparison_rows": [
    {"benefit": "Comparison point (us vs competitors)", "us": true, "them": false},
    {"benefit": "Comparison point", "us": true, "them": false},
    {"benefit": "Comparison point", "us": true, "them": false},
    {"benefit": "Comparison point", "us": true, "them": true},
    {"benefit": "Comparison point", "us": true, "them": false}
  ],
  "scrolling_text": "Short catchy text for the scrolling marquee section",
  "faq_items": [
    {"question": "FAQ question", "answer": "FAQ answer"},
    {"question": "FAQ question", "answer": "FAQ answer"},
    {"question": "FAQ question", "answer": "FAQ answer"},
    {"question": "FAQ question", "answer": "FAQ answer"}
  ],
  "reviews": [
    {"name": "First Name L.", "date": "Month Year", "title": "Review title", "text": "Review text (realistic, 2-3 sentences)", "rating": 5},
    {"name": "First Name L.", "date": "Month Year", "title": "Review title", "text": "Review text", "rating": 5},
    {"name": "First Name L.", "date": "Month Year", "title": "Review title", "text": "Review text", "rating": 5},
    {"name": "First Name L.", "date": "Month Year", "title": "Review title", "text": "Review text", "rating": 4},
    {"name": "First Name L.", "date": "Month Year", "title": "Review title", "text": "Review text", "rating": 5}
  ],
  "cta_text": "Call-to-action button text",
  "urgency_text": "Urgency/scarcity text (e.g. limited stock)",
  "seo_title": "SEO optimized page title",
  "seo_description": "SEO meta description"
}

Make the copy persuasive, benefit-focused, and ready to sell. Use emotional triggers.
IMPORTANT: Return ONLY valid JSON.`,
      },
    ],
  });

  let copyData;
  const copyText =
    copyResponse.output_text || copyResponse.choices?.[0]?.message?.content;
  try {
    const cleaned = copyText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    copyData = JSON.parse(cleaned);
  } catch {
    throw new Error("Failed to parse copy data from OpenAI: " + copyText?.slice(0, 200));
  }

  return { productData, copyData };
}
