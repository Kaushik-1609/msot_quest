# ⚡ MSOT Quest: Gamified Learning Ecosystem
> **Problem 2: Gamified Learning Challenge (MSOT Hackathon Proposal)**  
> Built for students, faculty, and administration to eliminate the mid-semester engagement drop.

---

## 🌟 Hackathon Winning Highlights
This project implements **all 9 Must-Have requirements** and **all 5 Stretch Goals (Bonus Marks)** outlined in the problem specification:

| Feature Category | Implementation Details |
| :--- | :--- |
| **1. Student Profile & XP** | Dynamic Leveling (Level 1-10), Total XP, and real-time **XP Audit Ledger** tracing every point. |
| **2. Dynamic XP Rules Engine** | Admin sliders to configure point weights (Attendance, Quizzes, HW, Coding) without code changes. |
| **3. Daily Micro-Challenge Quiz** | 3-5 syllabus-aligned questions (CS301 Algorithms). Rate-limited (1/day) to prevent farming. |
| **4. Streaks & Freeze Protection** | Animated flame counter (🔥) + **Streak Freeze Shields (🛡️)** so one sick day doesn't wipe progress. |
| **5. Badges & Quests** | Topic Quests (*Recursion Master*), Milestones (*5-Day Attendance*), & Improvement Badges (*+15% on test*). |
| **6. Weekly Fair Leagues** | ~20 peers per league (Promotion, Safe, Relegation zones) + **Anonymous Mode (🕶️)** toggle. |
| **7. Section Battles** | Batch vs Batch / Section vs Section live scoreboard (CSE-A vs CSE-B vs IT vs ECE). |
| **8. Faculty Dashboard** | Live engagement % metrics, **Struggling Topics Heatmap**, and **Quiet for 5+ Days** at-risk alerts. |
| **9. Anti-Gaming Shield** | Quota rate-limits, copy-paste answer detection flags, and anomalous XP spike audit log. |
| **⭐ Stretch: Boss Battles** | **The Mid-Term Titan 🐉** with an interactive decaying Boss HP bar and timed team revision strikes. |
| **⭐ Stretch: Rewards Store** | Redeem XP for non-academic perks (MSOT Cafeteria pass, Hoodie, 1-on-1 Alumni FAANG Mentorship). |
| **⭐ Stretch: AI Study Buddy** | **GyanAI** explains mistakes without spoiling future answers — supports **English & Hindi/Hinglish**! |
| **⭐ Stretch: Coding Sync** | Verified sync widget for LeetCode / Codeforces / GitHub problem solutions (+20 XP). |
| **⭐ Audio & Celebrations** | Synthesizer sound effects (Web Audio API) + Particle confetti celebrations (`canvas-confetti`). |

---

## 🚀 How to Run Locally

Because the frontend is built with modern vanilla JavaScript and CDN libraries (Tailwind, Supabase, Confetti), it has **zero build dependencies**:

1. Open `index.html` directly in your browser:
   * Double click `index.html` OR run a simple local server:
   ```bash
   npx serve .
   # or
   python3 -m http.server 3000
   ```
2. Open `http://localhost:3000` in Google Chrome or any browser.

---

## ☁️ Connecting to Supabase (Production)

1. Go to [supabase.com](https://supabase.com) and create a project.
2. Open the **SQL Editor** in Supabase and paste the contents of `supabase_schema.sql`, then click **Run**.
3. Go to **Project Settings -> API** and copy your:
   * `Project URL`
   * `anon public key`
4. Open `config.js` and paste your credentials into `CONFIG.SUPABASE_URL` and `CONFIG.SUPABASE_ANON_KEY`.

*(Note: If you run without keys, the app automatically runs in **Live Demo Mode** so judges can click and experience all features seamlessly).*

---

## 🌐 Deploy to Vercel / Netlify / GitHub Pages (Under 60 Seconds)

### Option A: Vercel CLI
```bash
cd /Users/kaushikkumar/.gemini/antigravity/scratch/msot-quest
npx vercel deploy --prod
```

### Option B: Drag and Drop on Netlify
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `msot-quest` folder. Your live URL will be active in 5 seconds!

---

## 🎙️ 60-Second Hackathon Elevator Pitch

> *"Most gamified apps fail in colleges because students either farm points with idle clicks or get demotivated seeing the top 10 toppers always win.  
> **MSOT Quest** solves this with 3 core principles:  
> 1. **Learning First**: Every single XP maps to a verified academic action, backed by an immutable ledger.  
> 2. **Fair & Inclusive**: Students compete in weekly cohorts of 20 peers with promotion/relegation, so a student who is behind can still win.  
> 3. **Actionable Faculty Intelligence**: Teachers get an automated early-warning system identifying students quiet for 5+ days before mid-terms arrive.  
> With our Mid-Term Boss Battle and Hinglish AI Study Buddy, learning at MSOT is transformed into an engaging daily adventure."*
