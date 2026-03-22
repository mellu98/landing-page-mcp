const SHOPIFY_STORE_URL = () => process.env.SHOPIFY_STORE_URL;
const SHOPIFY_ACCESS_TOKEN = () => process.env.SHOPIFY_ACCESS_TOKEN;

function apiUrl(path) {
  return `https://${SHOPIFY_STORE_URL()}/admin/api/2024-10/${path}`;
}

async function shopifyFetch(path, options = {}) {
  const res = await fetch(apiUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN(),
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Shopify API error (${res.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

async function shopifyGraphQL(query, variables = {}) {
  const res = await fetch(
    `https://${SHOPIFY_STORE_URL()}/admin/api/2024-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN(),
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  const data = await res.json();
  if (data.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(data.errors)}`);
  }
  return data;
}

export async function createProduct(productData, copyData) {
  const product = {
    product: {
      title: productData.short_title || productData.title,
      body_html: copyData.product_description_html || productData.description,
      vendor: "Our Store",
      product_type: productData.category || "",
      tags: productData.category || "",
      status: "draft",
      variants: [
        {
          price: productData.price?.toString().replace(/[^0-9.]/g, "") || "29.99",
          compare_at_price:
            productData.original_price?.toString().replace(/[^0-9.]/g, "") || null,
          inventory_management: null,
          requires_shipping: true,
        },
      ],
      images: (productData.images || []).slice(0, 10).map((src) => ({ src })),
    },
  };

  const result = await shopifyFetch("products.json", {
    method: "POST",
    body: JSON.stringify(product),
  });

  return result.product;
}

export async function createProductTemplate(templateName, templateJson) {
  // Use the Asset API to create the template JSON in the active theme
  const themes = await shopifyFetch("themes.json");
  const activeTheme = themes.themes.find((t) => t.role === "main");
  if (!activeTheme) {
    throw new Error("No active theme found");
  }

  const assetKey = `templates/product.${templateName}.json`;
  const result = await shopifyFetch(`themes/${activeTheme.id}/assets.json`, {
    method: "PUT",
    body: JSON.stringify({
      asset: {
        key: assetKey,
        value: JSON.stringify(templateJson, null, 2),
      },
    }),
  });

  return { themeId: activeTheme.id, assetKey, result };
}

export async function assignTemplateToProduct(productId, templateSuffix) {
  // Use GraphQL to update the template suffix
  const gid = `gid://shopify/Product/${productId}`;
  const query = `
    mutation productUpdate($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          templateSuffix
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const result = await shopifyGraphQL(query, {
    input: { id: gid, templateSuffix },
  });

  if (result.data?.productUpdate?.userErrors?.length) {
    throw new Error(
      `Failed to assign template: ${JSON.stringify(result.data.productUpdate.userErrors)}`
    );
  }

  return result.data.productUpdate.product;
}

export async function fullImport(productData, copyData, templateName, templateJson) {
  console.log("Creating product on Shopify...");
  const product = await createProduct(productData, copyData);
  console.log(`Product created: ${product.id} - ${product.title}`);

  console.log("Uploading landing page template...");
  const templateResult = await createProductTemplate(templateName, templateJson);
  console.log(`Template uploaded: ${templateResult.assetKey}`);

  console.log("Assigning template to product...");
  const assigned = await assignTemplateToProduct(product.id, templateName);
  console.log(`Template assigned: ${assigned.templateSuffix}`);

  return {
    product,
    templateAsset: templateResult.assetKey,
    productUrl: `https://${SHOPIFY_STORE_URL()}/products/${product.handle}`,
    adminUrl: `https://${SHOPIFY_STORE_URL()}/admin/products/${product.id}`,
  };
}
