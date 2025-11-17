# AI Workshop Form

A beautiful registration form for the AI Workshop, styled with the DESIGNLOOP STUDIO theme.

## Features

- Modern React + TypeScript + Vite setup
- Tailwind CSS v4 for styling
- Glass morphism effects and animations
- Responsive design
- Form validation
- Webhook integration for form submissions
- Thank you page after submission

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure the webhook URL:
   - Copy `.env.example` to `.env` (if not already done)
   - Set your webhook URL in `.env`:
   ```
   VITE_WEBHOOK_URL=https://your-webhook-url.com/endpoint
   ```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to http://localhost:5173/

## Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Form Fields

The form collects the following information:

- **Name** (required)
- **Email** (required)
- **Tool Installation Status** - For Claude, Claude Code, and n8n:
  - Installed (Yes/No)
  - Skill level (0-5)
- **Business Pain Points** (checkboxes):
  - Images (main image and/or image stack)
  - Inventory/accounting/data
  - Manual tasks draining you or your team
  - Other (with required text input when checked)

## Styling

The project uses the DESIGNLOOP STUDIO theme from the AI-Media-Studio project:
- Dark purple color scheme (#9D4EDD)
- Glass morphism effects
- Animated header with rotating gradient
- Custom form inputs and buttons
