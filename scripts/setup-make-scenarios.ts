/**
 * Make.com Scenario Setup Guide
 * Marketing Automation - Scenario Configuration
 *
 * This file provides step-by-step instructions for setting up Make.com scenarios
 * for marketing automation workflows.
 */

export interface ScenarioStep {
  step: number;
  title: string;
  description: string;
  modules: string[];
  configuration: Record<string, unknown>;
}

export interface ScenarioConfig {
  id: string;
  name: string;
  description: string;
  steps: ScenarioStep[];
  makeComModules: string[];
}

// Scenario: inquiryRouting
// Routes new inquiries to appropriate team members and initiates follow-up workflow
export const inquiryRoutingScenario: ScenarioConfig = {
  id: 'inquiryRouting',
  name: 'Inquiry Routing & Follow-up',
  description: 'Automatically routes new inquiries to the appropriate team based on inquiry type and initiates follow-up tasks',
  steps: [
    {
      step: 1,
      title: 'Trigger: Watch New Inquiries',
      description: 'Set up a webhook trigger to receive new inquiry data from the website',
      modules: ['Webhooks', 'customWebhook'],
      configuration: {
        webhookName: 'new-inquiry-webhook',
        dataStructure: {
          inquiryId: 'string',
          customerName: 'string',
          customerEmail: 'string',
          company: 'string',
          message: 'string',
          source: 'string',
        },
      },
    },
    {
      step: 2,
      title: 'Parse Inquiry Source',
      description: 'Use a router to determine the inquiry source and route accordingly',
      modules: ['Flow', 'router'],
      configuration: {
        branches: [
          { condition: '{{source}} equals "contact-page"', label: 'General' },
          { condition: '{{source}} equals "pricing-page"', label: 'Sales' },
          { condition: '{{source}} equals "support-page"', label: 'Support' },
          { condition: '{{source}} equals "partnership-page"', label: 'Partnership' },
        ],
      },
    },
    {
      step: 3,
      title: 'Route to Sales Team',
      description: 'For pricing inquiries, notify the sales team via Slack and create a task',
      modules: ['Slack', 'createMessage', 'GoogleTasks', 'createTask'],
      configuration: {
        slackChannel: '#sales-leads',
        salesTasklist: 'SALES_TASKS',
        priority: 'high',
        dueIn: 4, // hours
      },
    },
    {
      step: 4,
      title: 'Route to Support Team',
      description: 'For support inquiries, create a support ticket and notify the support team',
      modules: ['Slack', 'createMessage', 'Freshdesk', 'createTicket'],
      configuration: {
        slackChannel: '#support-team',
        freshdeskType: 'support',
        priority: 'medium',
      },
    },
    {
      step: 5,
      title: 'Add to Google Sheets',
      description: 'Log all inquiries to the inquiry tracking spreadsheet',
      modules: ['GoogleSheets', 'addRow'],
      configuration: {
        spreadsheetId: 'INQUIRY_TRACKING_SHEET_ID',
        sheetName: 'Inquiries',
      },
    },
    {
      step: 6,
      title: 'Send Auto-reply Email',
      description: 'Send an automated acknowledgment email to the customer',
      modules: ['Email', 'SendEmail'],
      configuration: {
        templateId: 'inquiry-auto-reply',
        fromName: 'Ankpiptide Team',
      },
    },
  ],
  makeComModules: [
    'Webhooks: customWebhook',
    'Flow: router',
    'Slack: createMessage',
    'GoogleTasks: createTask',
    'GoogleSheets: addRow',
    'Email: SendEmail',
  ],
};

// Scenario: contentPublishing
// Automates the publishing workflow when new blog posts are created
export const contentPublishingScenario: ScenarioConfig = {
  id: 'contentPublishing',
  name: 'Content Publishing Automation',
  description: 'Automates the publishing and promotion workflow when new blog posts are published',
  steps: [
    {
      step: 1,
      title: 'Trigger: Watch New Blog Posts',
      description: 'Set up a webhook trigger to receive new blog post data from the CMS',
      modules: ['Webhooks', 'customWebhook'],
      configuration: {
        webhookName: 'new-blog-post-webhook',
        dataStructure: {
          postId: 'string',
          title: 'string',
          slug: 'string',
          excerpt: 'string',
          author: 'string',
          category: 'string',
          tags: 'array',
          publishedAt: 'datetime',
          url: 'string',
        },
      },
    },
    {
      step: 2,
      title: 'Prepare Social Media Content',
      description: 'Format the blog post content for different social media platforms',
      modules: ['Text', 'replace'],
      configuration: {
        linkedinText: 'New blog post: {{title}}\n\n{{excerpt}}\n\nRead more: {{url}}',
        twitterText: 'Just published: {{title}} {{url}}',
        facebookText: 'Check out our latest article on {{category}}: {{title}}\n\n{{excerpt}}',
      },
    },
    {
      step: 3,
      title: 'Publish to LinkedIn',
      description: 'Share the blog post on LinkedIn with formatted content',
      modules: ['LinkedIn', 'createPhotoPost'],
      configuration: {
        profileId: 'COMPANY_LINKEDIN_PROFILE_ID',
        message: '{{linkedinText}}',
        visibility: 'public',
      },
    },
    {
      step: 4,
      title: 'Publish to Twitter/X',
      description: 'Share a brief tweet about the new blog post',
      modules: ['Twitter', 'createTweet'],
      configuration: {
        text: '{{twitterText}}',
      },
    },
    {
      step: 5,
      title: 'Add to Content Calendar (Google Sheets)',
      description: 'Log the published content in the content calendar',
      modules: ['GoogleSheets', 'addRow'],
      configuration: {
        spreadsheetId: 'CONTENT_CALENDAR_SHEET_ID',
        sheetName: 'Published',
      },
    },
    {
      step: 6,
      title: 'Notify Marketing Team',
      description: 'Send a notification to the marketing team channel',
      modules: ['Slack', 'createMessage'],
      configuration: {
        channel: '#marketing-updates',
        text: 'New blog post published: {{title}} by {{author}}\n{{url}}',
      },
    },
  ],
  makeComModules: [
    'Webhooks: customWebhook',
    'Text: replace',
    'LinkedIn: createPhotoPost',
    'Twitter: createTweet',
    'GoogleSheets: addRow',
    'Slack: createMessage',
  ],
};

// Scenario: documentTracking
// Tracks document downloads and manages lead follow-up
export const documentTrackingScenario: ScenarioConfig = {
  id: 'documentTracking',
  name: 'Document Download Tracking',
  description: 'Tracks document downloads for lead generation and manages follow-up communications',
  steps: [
    {
      step: 1,
      title: 'Trigger: Watch Document Downloads',
      description: 'Set up a webhook trigger to receive download event data',
      modules: ['Webhooks', 'customWebhook'],
      configuration: {
        webhookName: 'document-download-webhook',
        dataStructure: {
          downloadId: 'string',
          documentId: 'string',
          documentName: 'string',
          documentType: 'string',
          userEmail: 'string',
          userName: 'string',
          company: 'string',
        },
      },
    },
    {
      step: 2,
      title: 'Check for Existing Lead',
      description: 'Search the CRM to check if this lead already exists',
      modules: ['HubSpot', 'searchContact'],
      configuration: {
        email: '{{userEmail}}',
      },
    },
    {
      step: 3,
      title: 'Route Based on Lead Status',
      description: 'If lead exists, update their record; if new, create a new lead',
      modules: ['Flow', 'router'],
      configuration: {
        branches: [
          { condition: '{{result.exists}} equals true', label: 'Existing Lead' },
          { condition: '{{result.exists}} equals false', label: 'New Lead' },
        ],
      },
    },
    {
      step: 4,
      title: 'Create/Update Lead in CRM',
      description: 'Create a new lead or update existing lead with download activity',
      modules: ['HubSpot', 'createContact', 'updateContact'],
      configuration: {
        createContact: {
          firstName: '{{userName}}',
          email: '{{userEmail}}',
          company: '{{company}}',
          leadSource: 'Document Download',
          downloadCount: 1,
        },
        updateContact: {
          downloadCount: '{{result.downloadCount}} + 1',
          lastDownloadedDocument: '{{documentName}}',
          lastDownloadDate: '{{timestamp}}',
        },
      },
    },
    {
      step: 5,
      title: 'Log to Download Tracking Sheet',
      description: 'Record all downloads in the tracking spreadsheet for analytics',
      modules: ['GoogleSheets', 'addRow'],
      configuration: {
        spreadsheetId: 'DOCUMENT_DOWNLOADS_SHEET_ID',
        sheetName: 'Downloads',
      },
    },
    {
      step: 6,
      title: 'Send Download Email',
      description: 'Send the document to the user via email',
      modules: ['Email', 'SendEmail'],
      configuration: {
        to: '{{userEmail}}',
        subject: 'Your download: {{documentName}}',
        attachments: ['{{documentUrl}}'],
      },
    },
    {
      step: 7,
      title: 'Schedule Follow-up Task',
      description: 'Create a follow-up task for sales to check in after 3 days',
      modules: ['GoogleTasks', 'createTask'],
      configuration: {
        tasklist: 'FOLLOW_UP_TASKS',
        title: 'Follow up on document download: {{documentName}}',
        assignee: 'sales-team',
        dueIn: 3, // days
      },
    },
  ],
  makeComModules: [
    'Webhooks: customWebhook',
    'HubSpot: searchContact',
    'Flow: router',
    'HubSpot: createContact',
    'HubSpot: updateContact',
    'GoogleSheets: addRow',
    'Email: SendEmail',
    'GoogleTasks: createTask',
  ],
};

// All Scenarios Registry
export const SCENARIOS: Record<string, ScenarioConfig> = {
  inquiryRouting: inquiryRoutingScenario,
  contentPublishing: contentPublishingScenario,
  documentTracking: documentTrackingScenario,
};

// Make.com Scenario IDs (configure in environment variables)
export const makeScenarioConfig = {
  inquiryRoutingScenarioId: process.env.MAKE_INQUIRY_ROUTING_SCENARIO_ID || 'your-inquiry-routing-scenario-id',
  contentPublishingScenarioId: process.env.MAKE_CONTENT_PUBLISHING_SCENARIO_ID || 'your-content-publishing-scenario-id',
  documentTrackingScenarioId: process.env.MAKE_DOCUMENT_TRACKING_SCENARIO_ID || 'your-document-tracking-scenario-id',
};

// Setup Instructions
export const setupInstructions = {
  prerequisites: [
    'Create a Make.com account at make.com',
    'Set up Make.com webhooks for each scenario',
    'Configure environment variables for webhook URLs',
    'Connect your Google account for Google Sheets/Tasks integration',
    'Connect Slack workspace for notifications',
    'Configure HubSpot API credentials if using CRM integration',
  ],
  commonSettings: [
    'Enable "Show only when data has changed" to prevent duplicate processing',
    'Set up error handling with "Error Handler" routes',
    'Configure scheduling for scenarios that need periodic checks',
    'Enable "Strictly sequential processing" for data consistency',
  ],
};

export default SCENARIOS;
