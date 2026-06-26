<div align="center">
  
  <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/shield-halved.svg" alt="Logo" width="80" height="80">

# AspiVault: Password Manager

  *A lightweight, fully local, and lightning-fast password manager built for the browser.*

  [![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](#)
  [![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](#)
  [![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](#)
  
  **[Live Demo](https://aspivault.vercel.app)**

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Visuals & UI](#-visuals--ui)
- [Getting Started](#-getting-started)
- [How It Works](#-how-it-works)
- [Important Disclaimer](#-important-disclaimer)

---

## 🔎 About the Project

**AspiVault** is a privacy-first, client-side credential manager. In an era of cloud data breaches, AspiVault takes a different approach: **your data never leaves your device**. Built entirely with vanilla web technologies, it leverages the browser's native Web Storage API to keep your passwords securely encrypted on your local machine.

Perfect for users who need a quick, offline utility to manage local credentials or developers looking for a clean implementation of DOM manipulation and state management.

---

## ✨ Key Features

- 🚫 **100% Offline & Local:** No databases, no external servers, no tracking.
- 🎲 **One-Click Password Generator:** Instantly generate strong, random 16-character alphanumeric passwords with special characters.
- 📊 **Dynamic Strength Meter:** Real-time visual feedback (Red/Orange/Green) on your password's security level.
- 🔍 **Instant Search Engine:** Filter through your vault instantly by website or username.
- 🌙 **Sleek Dark UI:** A highly responsive, WhatsApp-inspired dark theme optimized for eye comfort (`#111b21` background).
- 📋 **Frictionless Copy:** One-click copying to clipboard with visual confirmation.
- 👁️ **Secure Masking:** Passwords stay hidden behind `••••••••` until explicitly revealed.

## 🚀 Getting Started

Since AspiVault is a purely client-side application, running it locally takes less than 10 seconds.

### Prerequisites

* A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository:**

   ```bash
   git clone AspiVault:- https://github.com/yourusername/AspiVault.git

```

1. **Navigate to the directory:**

```bash
cd AspiVault

```

1. **Launch the app:**
Simply double-click the `index.html` file to open it in your browser. No local server, npm installs, or build processes required!

---

## ⚙️ How It Works (Under the Hood)

AspiVault relies on standard Web APIs to function smoothly without a backend:

- **Storage:** Utilizes `window.localStorage` to persist a stringified JSON array of credential objects.
- **State Management:** The UI is re-rendered dynamically upon any CRUD (Create, Read, Update, Delete) operation using vanilla JS DOM manipulation.
- **Clipboard API:** Uses `navigator.clipboard.writeText()` for secure and modern text copying.

### File Structure

```text
📦 AspiVault
 ┣ 📜 index.html    # Layout and markup
 ┣ 📜 style.css     # Dark theme styling & responsiveness
 ┗ 📜 index.js      # Core logic, DOM events, and localStorage handling

```

---

## ⚠️ Important Disclaimer

AspiVault uses **`localStorage`** to save your data. Please be aware of the following:

1. **Device Specific:** Your passwords are ONLY stored on the specific device and web browser you are currently using.
2. **Volatility:** If you clear your browser's site data, clear your cache aggressively, or use Incognito/Private mode, **your vault will be permanently deleted**.
3. **Security:** While local, the data is not hashed via a master password in this current iteration. Anyone with access to your device's developer tools can read the storage. Do not use this for highly sensitive banking or life-critical passwords.

---
