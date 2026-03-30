# SupportAI – Embeddable AI Customer Support Chatbot

SupportAI is an embeddable AI-powered customer support chatbot that businesses can integrate into their websites using a simple script tag. It provides a dedicated dashboard for business owners to configure their chatbot, manage support details, and customize AI responses using their own knowledge base.

## 🚀 Problem It Solves

Many small businesses and website owners struggle to provide instant customer support, especially when they cannot stay online 24/7. Hiring support agents is expensive, and generic chat widgets do not provide personalized answers.

SupportAI solves this by allowing businesses to:

- Add a support chatbot to their website with a simple embed script
- Configure business-specific support details from a dashboard
- Train the chatbot with a custom knowledge base
- Deliver instant AI-powered responses tailored to their business

This makes customer support faster, more scalable, and more accessible for smaller businesses.

---

## ✨ Features

- 🔐 Secure authentication using **Scalekit**
- 📊 Owner dashboard for chatbot configuration
- 🌐 Embeddable chatbot widget via simple `<script>` integration
- 🧠 AI responses powered by business-specific **knowledge base**
- 🏢 Business profile configuration (business name, support email, etc.)
- 🎯 Owner-specific chatbot behavior using unique `ownerId`
- ⚡ Fast and lightweight frontend experience
- ☁️ Deployed and accessible via Vercel

---

## 🛠️ Tech Stack

### Frontend
- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**

### Backend / Database
- **Next.js API Routes**
- **MongoDB**
- **Mongoose**

### Authentication
- **Scalekit**

### Deployment
- **Vercel**

---

## 🧩 How It Works

### 1. Business Owner Authentication
Business owners sign in securely using **Scalekit** authentication.

### 2. Dashboard Setup
After logging in, the owner can configure:

- Business name
- Support email
- Knowledge base / business information

These settings are stored and linked to that specific owner.

### 3. Embed Script Generation
The platform generates an embeddable script snippet like this:

```html
<script 
  src="https://your-domain.vercel.app/chatBot.js"
  data-owner-id="OWNER_ID"
></script>
