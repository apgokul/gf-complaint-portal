# 💖 GF Complaint Portal (Frontend)

A fun and heartwarming web app that lets your girlfriend raise playful complaints, suggestions, or rants — and reminds her how much you love her anyway. Built using React + TailwindCSS + Framer Motion, with Firebase Firestore as the database and hosted for free on Netlify.

## 🌐 Live URL
[https://he-did-it-again.netlify.app](https://he-did-it-again.netlify.app)

## ✨ Features

- 💌 Welcome page with nickname & relationship day count
- 📝 Complaint submission with mood emoji and type
- 📜 View all past complaints in a timeline
- 🔄 Real-time Firestore sync (no refresh needed!)
- 🚪 Logout with cute confirmation message
- 🎨 Smooth animations via Framer Motion
- 📲 Telegram notification on each new complaint

## 🔗 Related Project

👉 [Telegram Notifier Backend Repo]((https://github.com/apgokul/gf-telegram-notifier))

Handles sending real-time Telegram messages whenever a new complaint is submitted.

## 🛠️ Tech Stack

- **Frontend:** React (with Vite), Tailwind CSS, Framer Motion
- **Database:** Firebase Firestore
- **Hosting:** Netlify

## 📦 Setup Instructions

1. Clone the repo
2. Run `npm install`
3. Add your Firebase config to `firebase.js`
4. Run `npm run dev` to start locally

## 🔐 Firestore Rules (basic safety)

```js
service cloud.firestore {
  match /databases/{database}/documents {
    match /complaints/{docId} {
      allow read, write: if request.resource.data.apiKey == "your_shared_secret";
    }
  }
}

## ❤️ Credits

- Inspired by love, rants, and the power of fun apps
- Built using [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- Real-time database powered by [Firebase Firestore](https://firebase.google.com/)
- Telegram notifications via [Telegram Bot API](https://core.telegram.org/bots/api)
- Special thanks to [OpenAI](https://openai.com) for ChatGPT's support during development!
