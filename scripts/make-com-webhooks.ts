/**
 * Make.com Webhook Configuration
 * Marketing Automation - Webhook Events and Actions
 *
 * This file documents the webhook events used for marketing automation
 * and the corresponding Make.com actions to trigger.
 */

export interface WebhookEvent {
  event: string;
  description: string;
  payload: Record<string, unknown>;
  triggers: MakeComAction[];
}

export interface MakeComAction {
  module: string;
  action: string;
  parameters: Record<string, unknown>;
}

// Webhook Event Definitions
export const WEBHOOK_EVENTS = {
  NEW_INQUIRY: 'NEW_INQUIRY',
  NEW_BLOG_POST: 'NEW_BLOG_POST',
  DOCUMENT_DOWNLOAD: 'DOCUMENT_DOWNLOAD',
  INVENTORY_UPDATE: 'INVENTORY_UPDATE',
} as const;

export type WebhookEventType = (typeof WEBHOOK_EVENTS)[keyof typeof WEBHOOK_EVENTS];

// NEW_INQUIRY Event
// Triggered when a new inquiry form is submitted
export const newInquiryEvent: WebhookEvent = {
  event: WEBHOOK_EVENTS.NEW_INQUIRY,
  description: 'Triggered when a new inquiry is submitted through the website contact form',
  payload: {
    inquiryId: 'string',
    customerName: 'string',
    customerEmail: 'string',
    company: 'string (optional)',
    message: 'string',
    source: 'string (e.g., "contact-page", "pricing-page")',
    timestamp: 'ISO 8601 datetime string',
    utmData: {
      utmSource: 'string (optional)',
      utmMedium: 'string (optional)',
      utmCampaign: 'string (optional)',
    },
  },
  triggers: [
    {
      module: 'Email',
      action: 'SendEmail',
      parameters: {
        to: '{{customerEmail}}',
        subject: 'Thank you for your inquiry - {{customerName}}',
        body: 'We have received your inquiry and will respond within 24 hours.',
      },
    },
    {
      module: 'GoogleSheets',
      action: 'addRow',
      parameters: {
        spreadsheetId: 'INQUIRY_TRACKING_SHEET_ID',
        values: {
          inquiryId: '{{inquiryId}}',
          customerName: '{{customerName}}',
          customerEmail: '{{customerEmail}}',
          company: '{{company}}',
          timestamp: '{{timestamp}}',
          status: 'new',
        },
      },
    },
    {
      module: 'Slack',
      action: 'createMessage',
      parameters: {
        channel: '#sales-leads',
        text: 'New inquiry from {{customerName}} ({{customerEmail}}) - {{message}}',
      },
    },
  ],
};

// NEW_BLOG_POST Event
// Triggered when a new blog post is published
export const newBlogPostEvent: WebhookEvent = {
  event: WEBHOOK_EVENTS.NEW_BLOG_POST,
  description: 'Triggered when a new blog post is published on the website',
  payload: {
    postId: 'string',
    title: 'string',
    slug: 'string',
    excerpt: 'string',
    author: 'string',
    category: 'string',
    tags: 'string[]',
    publishedAt: 'ISO 8601 datetime string',
    url: 'string',
    featuredImage: 'string (URL, optional)',
  },
  triggers: [
    {
      module: 'SocialMedia',
      action: 'createPhotoPost',
      parameters: {
        platform: 'linkedin',
        text: 'New blog post: {{title}}\n\n{{excerpt}}\n\nRead more: {{url}}',
      },
    },
    {
      module: 'SocialMedia',
      action: 'createPhotoPost',
      parameters: {
        platform: 'twitter',
        text: 'Just published: {{title}} {{url}}',
      },
    },
    {
      module: 'Email',
      action: 'SendEmail',
      parameters: {
        to: 'SUBSCRIBER_LIST',
        subject: 'New Blog Post: {{title}}',
        body: 'Check out our latest article: {{title}}\n\n{{excerpt}}\n\n{{url}}',
      },
    },
  ],
};

// DOCUMENT_DOWNLOAD Event
// Triggered when a user downloads a document (whitepaper, case study, etc.)
export const documentDownloadEvent: WebhookEvent = {
  event: WEBHOOK_EVENTS.DOCUMENT_DOWNLOAD,
  description: 'Triggered when a user downloads a marketing document',
  payload: {
    downloadId: 'string',
    documentId: 'string',
    documentName: 'string',
    documentType: 'string (e.g., "whitepaper", "case-study", "datasheet")',
    userEmail: 'string',
    userName: 'string (optional)',
    company: 'string (optional)',
    timestamp: 'ISO 8601 datetime string',
    utmData: {
      utmSource: 'string (optional)',
      utmMedium: 'string (optional)',
      utmCampaign: 'string (optional)',
    },
  },
  triggers: [
    {
      module: 'GoogleSheets',
      action: 'addRow',
      parameters: {
        spreadsheetId: 'DOCUMENT_DOWNLOADS_SHEET_ID',
        values: {
          downloadId: '{{downloadId}}',
          documentName: '{{documentName}}',
          documentType: '{{documentType}}',
          userEmail: '{{userEmail}}',
          userName: '{{userName}}',
          company: '{{company}}',
          timestamp: '{{timestamp}}',
        },
      },
    },
    {
      module: 'Email',
      action: 'SendEmail',
      parameters: {
        to: '{{userEmail}}',
        subject: 'Your download: {{documentName}}',
        body: 'Thank you for downloading {{documentName}}. Here is your copy.',
      },
    },
  ],
};

// INVENTORY_UPDATE Event
// Triggered when inventory levels change significantly
export const inventoryUpdateEvent: WebhookEvent = {
  event: WEBHOOK_EVENTS.INVENTORY_UPDATE,
  description: 'Triggered when inventory levels change for tracked products',
  payload: {
    productId: 'string',
    productName: 'string',
    sku: 'string',
    previousQuantity: 'number',
    newQuantity: 'number',
    change: 'number (positive = increase, negative = decrease)',
    threshold: 'number (low stock threshold)',
    timestamp: 'ISO 8601 datetime string',
  },
  triggers: [
    {
      module: 'GoogleSheets',
      action: 'addRow',
      parameters: {
        spreadsheetId: 'INVENTORY_TRACKING_SHEET_ID',
        values: {
          productId: '{{productId}}',
          productName: '{{productName}}',
          sku: '{{sku}}',
          previousQuantity: '{{previousQuantity}}',
          newQuantity: '{{newQuantity}}',
          change: '{{change}}',
          timestamp: '{{timestamp}}',
        },
      },
    },
    {
      module: 'Slack',
      action: 'createMessage',
      parameters: {
        channel: '#inventory-alerts',
        text: 'Inventory Alert: {{productName}} (SKU: {{sku}})\nPrevious: {{previousQuantity}}\nNew: {{newQuantity}}\nChange: {{change}}',
      },
    },
  ],
};

// All Webhook Events Registry
export const WEBHOOK_REGISTRY: Record<WebhookEventType, WebhookEvent> = {
  [WEBHOOK_EVENTS.NEW_INQUIRY]: newInquiryEvent,
  [WEBHOOK_EVENTS.NEW_BLOG_POST]: newBlogPostEvent,
  [WEBHOOK_EVENTS.DOCUMENT_DOWNLOAD]: documentDownloadEvent,
  [WEBHOOK_EVENTS.INVENTORY_UPDATE]: inventoryUpdateEvent,
};

// Make.com Webhook URL Configuration
export const makeWebhooksConfig = {
  inquiryWebhook: process.env.MAKE_COM_WEBHOOK_INQUIRY_URL || 'https://hook.eu1.make.com/your-inquiry-scenario',
  blogPostWebhook: process.env.MAKE_COM_WEBHOOK_BLOG_POST_URL || 'https://hook.eu1.make.com/your-blog-post-scenario',
  documentDownloadWebhook: process.env.MAKE_COM_WEBHOOK_DOCUMENT_URL || 'https://hook.eu1.make.com/your-document-scenario',
  inventoryWebhook: process.env.MAKE_COM_WEBHOOK_INVENTORY_URL || 'https://hook.eu1.make.com/your-inventory-scenario',
};

export default WEBHOOK_REGISTRY;
