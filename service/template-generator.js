function uid() {
  return Math.random().toString(36).slice(2, 8);
}

export function generateLandingTemplate(productData, copyData) {
  const templateName = `landing-${uid()}`;
  const sectionPrefix = `template--${Date.now()}__`;

  const heroSectionId = `rich_text_${uid()}`;
  const videoSectionId = `video_${uid()}`;
  const descSectionId = `rich_text_${uid()}`;
  const mainSectionId = "main";
  const ctaSectionId1 = `extra_button_${uid()}`;
  const scrollTextId = uid();
  const cardsSectionId = `lumin_cards_${uid()}`;
  const multirowSectionId = `multirow_${uid()}`;
  const comparisonSectionId = `comparison_table_${uid()}`;
  const ctaSectionId2 = `extra_button_${uid()}`;
  const faqSectionId = uid();
  const reviewSectionId = uid();
  const relatedId = "related-products";
  const fontsId1 = uid();
  const fontsId2 = uid();

  const template = {
    sections: {
      // 1. HERO - Rich Text
      [heroSectionId]: {
        type: "rich-text",
        blocks: {
          [`heading_${uid()}`]: {
            type: "heading",
            settings: {
              heading: copyData.hero_headline,
              heading_size: "h1",
            },
          },
          [`heading_${uid()}`]: {
            type: "heading",
            settings: {
              heading: copyData.hero_subheadline,
              heading_size: "h2",
            },
          },
          [`caption_${uid()}`]: {
            type: "caption",
            settings: {
              caption: copyData.hero_caption,
              text_style: "caption-with-letter-spacing",
              text_size: "medium",
            },
          },
        },
        block_order: [],
        settings: {
          desktop_content_position: "center",
          content_alignment: "center",
          color_scheme: "accent-2",
          full_width: true,
          padding_top: 12,
          padding_bottom: 12,
        },
      },

      // 2. VIDEO (placeholder - user can add video URL later)
      [videoSectionId]: {
        type: "video",
        settings: {
          heading: "",
          heading_size: "h1",
          enable_video_looping: false,
          video_url: "",
          description: "",
          full_width: false,
          color_scheme: "",
          padding_top: 36,
          padding_bottom: 36,
        },
      },

      // 3. DESCRIPTION Rich Text
      [descSectionId]: {
        type: "rich-text",
        blocks: {
          [`text_${uid()}`]: {
            type: "text",
            settings: {
              text: copyData.product_description_html || `<p>${productData.description}</p>`,
            },
          },
          [`caption_${uid()}`]: {
            type: "caption",
            settings: {
              caption: copyData.urgency_text || "",
              text_style: "caption-with-letter-spacing",
              text_size: "medium",
            },
          },
        },
        block_order: [],
        settings: {
          desktop_content_position: "center",
          content_alignment: "center",
          color_scheme: "",
          full_width: true,
          padding_top: 12,
          padding_bottom: 12,
        },
      },

      // 4. MAIN PRODUCT
      [mainSectionId]: {
        type: "main-product",
        blocks: {
          [`review_${uid()}`]: {
            type: "review",
            settings: {
              lrw_text: "<strong>4.8 - 1356 Reviews</strong>",
              text_size: "14",
              star_style: "star",
              star_size: "0.7",
              star_rating: "4.5",
              lrw_star_color: "#000000",
              lrw_star_color_disable: "#eeeeee",
              lrw_color: "#ff7e8d",
              margin_top: "15",
              margin_bottom: "10",
            },
          },
          [`title_${uid()}`]: {
            type: "title",
            settings: {
              title_size: "24",
              title_height: "120",
              text_transform: "none",
            },
          },
          [`fomo_${uid()}`]: {
            type: "fomo",
            settings: {
              fomo_text_before:
                "<strong>(x) people are looking at this!</strong>",
              text_style: "uppercase",
              text_size: "10",
              color_scheme: "accent-2",
              fomo_border_color: "#c7f0f0",
              pill_color: "#17e6e6",
              fomo_min: "8",
              fomo_max: "16",
              fomo_speed: "3",
              margin_top: "16",
            },
          },
          price: {
            type: "price",
            settings: {
              price_style: "price",
              price_size: "20",
              badge_text_1: "13",
              badge_bg_1: "#17e6e6",
              badge_price_1: "#ffffff",
              price_size_2: "1",
              badge_price: "#8b8d8f",
              sale_price_color: "#a5a9a9",
              regular_price_color: "#000000",
              price_bold: true,
              padding_top: "4",
              padding_bottom: "4",
            },
          },
          [`variant_${uid()}`]: {
            type: "variant_picker",
            settings: {
              picker_type: "button",
              swatch_shape: "circle",
            },
          },
          [`quantity_${uid()}`]: {
            type: "quantity_selector",
            settings: {},
          },
          [`buy_${uid()}`]: {
            type: "buy_buttons",
            settings: {
              show_dynamic_checkout: true,
              show_gift_card_recipient: true,
            },
          },
          [`description_${uid()}`]: {
            type: "description",
            settings: {},
          },
        },
        block_order: [],
        settings: {
          enable_sticky_info: false,
          color_scheme: "",
          media_size: "large",
          constrained: true,
          media_fit: "contain",
          gallery_layout: "stacked",
          media_position: "left",
          image_zoom: "lightbox",
          mobile_thumbnails: "hide",
          hide_variants: true,
          enable_video_looping: false,
          padding_top: 36,
          padding_bottom: 12,
        },
      },

      // 5. CTA Button 1
      [ctaSectionId1]: {
        type: "extra-button",
        settings: {
          button_label: copyData.cta_text || "Order Now",
          button_link: "",
          button_style_secondary: false,
          color_scheme: "accent-2",
          padding_top: 12,
          padding_bottom: 12,
        },
      },

      // 6. SCROLLING TEXT
      [scrollTextId]: {
        type: "lumin-scrolling-text",
        blocks: {
          [`${sectionPrefix}${scrollTextId}-announcement-1`]: {
            type: "announcement",
            settings: {
              Announcement: `<p><strong>${copyData.scrolling_text}</strong></p>`,
              announcement_size: "60",
              announcement_size_m: "40",
              text_spacing: "-0.5",
              text_transform: "none",
              announcement_color: "#1f1d24",
              icon: "none",
            },
          },
          [`${sectionPrefix}${scrollTextId}-announcement-2`]: {
            type: "announcement",
            settings: {
              Announcement: `<p><strong>${copyData.scrolling_text}</strong></p>`,
              announcement_size: "60",
              announcement_size_m: "40",
              text_spacing: "-0.5",
              text_transform: "none",
              announcement_color: "#1f1d24",
              icon: "none",
            },
          },
        },
        block_order: [],
        settings: {
          scroll_speed: "20",
          bg_color: "#ffffff",
          padding_top: 24,
          padding_bottom: 24,
        },
      },

      // 7. BENEFIT CARDS (lumin-cards)
      [cardsSectionId]: buildCardsSection(copyData.benefit_cards || []),

      // 8. FEATURE ROWS (multirow)
      [multirowSectionId]: buildMultirowSection(
        copyData.feature_rows || [],
        productData.images || []
      ),

      // 9. COMPARISON TABLE
      [comparisonSectionId]: buildComparisonSection(
        copyData.comparison_rows || []
      ),

      // 10. CTA Button 2
      [ctaSectionId2]: {
        type: "extra-button",
        settings: {
          button_label: copyData.cta_text || "Order Now",
          button_link: "",
          button_style_secondary: false,
          color_scheme: "accent-2",
          padding_top: 12,
          padding_bottom: 12,
        },
      },

      // 11. FAQ (collapsible-content)
      [faqSectionId]: buildFaqSection(copyData.faq_items || []),

      // 12. REVIEWS (lumin-review)
      [reviewSectionId]: buildReviewSection(copyData.reviews || []),

      // 13. Related Products
      [relatedId]: {
        type: "related-products",
        settings: {
          heading: "You May Also Like",
          heading_size: "h2",
          products_to_show: 4,
          columns_desktop: 4,
          color_scheme: "",
          image_ratio: "square",
          image_shape: "default",
          show_secondary_image: true,
          show_vendor: false,
          show_rating: false,
          padding_top: 36,
          padding_bottom: 28,
        },
      },

      // 14-15. Custom Fonts (same as master)
      [fontsId1]: {
        type: "custom-fonts",
        blocks: {
          [`font_${uid()}`]: {
            type: "image",
            settings: {
              name: "Gotham",
              custom_font_weight: "500",
              custom_font_style: "none",
              custom_font_url:
                "https://cdn.shopify.com/s/files/1/0839/0370/9486/files/Gotham-Bold.otf?v=1697134",
              apply_h1: true,
              apply_h2: true,
              apply_h3: true,
              apply_h4: true,
              apply_h5: true,
              apply_h6: true,
            },
          },
        },
        block_order: [],
        settings: {},
      },
      [fontsId2]: {
        type: "custom-fonts",
        blocks: {
          [`font_${uid()}`]: {
            type: "image",
            settings: {
              name: "customfont",
              custom_font_weight: "none",
              custom_font_style: "none",
              apply_h1: true,
              apply_h2: true,
              apply_h3: true,
              apply_h4: true,
              apply_h5: true,
              apply_h6: true,
              apply_span: true,
              apply_p: true,
            },
          },
        },
        block_order: [],
        settings: {},
      },
    },
    order: [
      heroSectionId,
      videoSectionId,
      descSectionId,
      mainSectionId,
      ctaSectionId1,
      scrollTextId,
      cardsSectionId,
      multirowSectionId,
      comparisonSectionId,
      ctaSectionId2,
      faqSectionId,
      reviewSectionId,
      relatedId,
      fontsId1,
      fontsId2,
    ],
  };

  // Fill block_order for each section
  for (const [, section] of Object.entries(template.sections)) {
    if (section.blocks && !section.block_order?.length) {
      section.block_order = Object.keys(section.blocks);
    }
  }

  return { templateName, template };
}

function buildCardsSection(benefitCards) {
  const blocks = {};
  for (const card of benefitCards) {
    blocks[`card_${uid()}`] = {
      type: "card",
      settings: {
        grid_width_desktop: "33.3333333",
        grid_width_tablet: "33.3333333",
        grid_width_mobile: "100",
        desktop_card_height: "fit-content",
        padding_size: "30",
        padding_size_mobile: "30",
        padding_left_mobile: "30",
        media_ratio: "adapt",
        icon_size: "100",
        head: card.title,
        head_size_d: "30",
        head_size_m: "24",
        margin_bottom: "15",
        subtitle: `<p>${card.description}</p>`,
        text_size_d: "16",
        text_size_m: "14",
        desktop_content_alignment: "center",
        show_border: true,
        border_color: "#eeeeee",
        bg_color: "#ffffff",
        head_color: "#212121",
        text_color: "#212121",
      },
    };
  }
  return {
    type: "lumin-cards",
    blocks,
    block_order: Object.keys(blocks),
    settings: {
      padding_top: 36,
      padding_bottom: 36,
    },
  };
}

function buildMultirowSection(featureRows, images) {
  const blocks = {};
  for (let i = 0; i < featureRows.length; i++) {
    const row = featureRows[i];
    blocks[`row_${uid()}`] = {
      type: "row",
      settings: {
        image: images[i + 1] || "",
        heading: row.heading,
        text: `<p>${row.text}</p>`,
      },
    };
  }
  return {
    type: "multirow",
    blocks,
    block_order: Object.keys(blocks),
    settings: {
      image_width: "medium",
      image_height: "adapt",
      desktop_image_alignment: "alternate-left",
      heading_size: "h2",
      text_style: "body",
      button_style: "secondary",
      desktop_content_position: "middle",
      desktop_content_alignment: "left",
      image_layout: "alternate-left",
      section_color_scheme: "",
      row_color_scheme: "",
      mobile_content_alignment: "left",
      padding_top: 36,
      padding_bottom: 36,
    },
  };
}

function buildComparisonSection(comparisonRows) {
  const blocks = {};
  for (const row of comparisonRows) {
    blocks[`row_${uid()}`] = {
      type: "row",
      settings: {
        benefit: row.benefit,
        us: row.us ? true : false,
        them: row.them ? true : false,
      },
    };
  }
  return {
    type: "comparison-table",
    blocks,
    block_order: Object.keys(blocks),
    settings: {
      heading: "",
      us_heading: "Us",
      them_heading: "Others",
      color_scheme: "",
      padding_top: 36,
      padding_bottom: 36,
    },
  };
}

function buildFaqSection(faqItems) {
  const blocks = {};
  for (const item of faqItems) {
    blocks[`faq_${uid()}`] = {
      type: "collapsible_row",
      settings: {
        heading: item.question,
        icon: "none",
        row_content: `<p>${item.answer}</p>`,
      },
    };
  }
  return {
    type: "collapsible-content",
    blocks,
    block_order: Object.keys(blocks),
    settings: {
      caption: "",
      heading: "Frequently Asked Questions",
      heading_size: "h1",
      heading_alignment: "center",
      layout: "none",
      color_scheme: "",
      container_color_scheme: "",
      open_first_collapsible_row: false,
      image_ratio: "adapt",
      desktop_layout: "image_second",
      padding_top: 36,
      padding_bottom: 36,
    },
  };
}

function buildReviewSection(reviews) {
  const blocks = {};
  for (const review of reviews) {
    blocks[`review_${uid()}`] = {
      type: "review",
      settings: {
        star_rating: String(review.rating || 5),
        name_text: review.name,
        date_text: review.date,
        review_head: review.title,
        review_text: review.text,
        feature_font_size: "16",
      },
    };
  }
  return {
    type: "lumin-review",
    blocks,
    block_order: Object.keys(blocks),
    settings: {
      heading: "What Our Customers Say",
      heading_size: "h2",
      color_scheme: "",
      padding_top: 36,
      padding_bottom: 36,
    },
  };
}
