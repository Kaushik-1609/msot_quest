// ==========================================================
// MSOT QUEST - CORE GAMIFICATION ENGINE & CONTROLLER
// ==========================================================

// Sound Effects Synthesizer using Web Audio API (No external sound files required)
class SoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
    }

    playTone(freq, duration, type = 'sine', gainVal = 0.1) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            console.warn('Audio play error:', e);
        }
    }

    xpEarned() {
        this.playTone(587.33, 0.15, 'triangle'); // D5
        setTimeout(() => this.playTone(880.00, 0.25, 'triangle'), 100); // A5
    }

    levelUp() {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
            setTimeout(() => this.playTone(freq, 0.2, 'sine', 0.15), idx * 120);
        });
    }

    bossHit() {
        this.playTone(150, 0.25, 'sawtooth', 0.15);
    }

    wrongAnswer() {
        this.playTone(200, 0.3, 'sawtooth', 0.1);
    }

    punch() {
        this.playTone(180, 0.12, 'square', 0.25);
        setTimeout(() => this.playTone(90, 0.15, 'sawtooth', 0.2), 40);
    }

    heavyPunch() {
        this.playTone(120, 0.2, 'sawtooth', 0.3);
        setTimeout(() => this.playTone(60, 0.25, 'triangle', 0.3), 60);
    }

    fightBell() {
        this.playTone(1200, 0.4, 'sine', 0.2);
        setTimeout(() => this.playTone(1200, 0.6, 'sine', 0.25), 250);
    }

    ko() {
        this.playTone(150, 0.6, 'sawtooth', 0.3);
        setTimeout(() => this.playTone(200, 0.5, 'square', 0.25), 300);
        setTimeout(() => this.playTone(80, 0.8, 'triangle', 0.35), 600);
    }

    gateOpen() {
        this.playTone(70, 0.8, 'sawtooth', 0.2);
        setTimeout(() => this.playTone(100, 0.6, 'triangle', 0.15), 300);
    }
}

const sfx = new SoundFX();

// Core Application State
const AppState = {
    currentRole: 'student', // 'student' or 'faculty'
    student: {
        id: 'std_01',
        name: 'Rahul Sharma',
        rollNo: '2024CSE104',
        department: 'Computer Science & Engineering',
        section: 'CSE-Section A',
        level: 4,
        xp: 780,
        xpToNextLevel: 1000,
        streakDays: 6,
        streakFreezesLeft: 2,
        isAnonymous: false,
        rankInLeague: 3,
        leagueName: 'Silver Tier (League 4 - Group 12)',
        completedQuests: ['quest_attendance']
    },
    // Rules Engine (Admin Configurable values)
    rules: {
        attendClass: 10,
        submitHomework: 20,
        dailyQuizBase: 15,
        dailyQuizPerCorrect: 5,
        biweeklyTestMult: 50, // Score % / 2
        codingEasy: 10,
        codingMedium: 20,
        codingHard: 40,
        clubActivity: 25,
        streak7Bonus: 50
    },
    // XP Ledger History
    ledger: [
        { id: 1, action: 'Daily Quiz Completed (4/5 correct)', xp: 35, time: '2 hours ago', icon: '📝' },
        { id: 2, action: 'Attended Algorithms Lecture (CS301)', xp: 10, time: 'Today, 10:30 AM', icon: '🎓' },
        { id: 3, action: 'Solved LeetCode Medium (Binary Tree)', xp: 20, time: 'Yesterday', icon: '💻' },
        { id: 4, action: '6-Day Streak Sustained', xp: 15, time: 'Yesterday', icon: '🔥' },
        { id: 5, action: 'Bi-Weekly Test 1 Score (88% -> 44 XP)', xp: 44, time: '3 days ago', icon: '📊' }
    ],
    // Quests
    quests: [
        { id: 'quest_recursion', title: 'Master of Recursion', cat: 'Topic Quest', reward: 60, progress: 3, total: 5, desc: 'Solve 5 recursion problems in practice lab', badge: '🌀' },
        { id: 'quest_attendance', title: 'Flawless 5-Day Attendance', cat: 'Milestone', reward: 50, progress: 5, total: 5, desc: 'Attend all 5 lecture days this week', badge: '🎖️', completed: true },
        { id: 'quest_improvement', title: 'The Comeback Kid (+15%)', cat: 'Improvement', reward: 80, progress: 1, total: 1, desc: 'Score 15% higher than previous bi-weekly test', badge: '🚀', completed: true },
        { id: 'quest_peer', title: 'Peer Review Champion', cat: 'Community', reward: 40, progress: 1, total: 2, desc: 'Review 2 peer study notes or pull requests', badge: '🤝' }
    ],
    // League Peers (Simulated league of ~20 students at similar level)
    leaguePeers: [
        { rank: 1, name: 'Ananya Verma', roll: '2024CSE012', xp: 920, streak: 8, zone: 'promotion' },
        { rank: 2, name: 'Aarav Patel', roll: '2024CSE045', xp: 840, streak: 7, zone: 'promotion' },
        { rank: 3, name: 'Rahul Sharma (You)', roll: '2024CSE104', xp: 780, streak: 6, zone: 'promotion', isUser: true },
        { rank: 4, name: 'Anonymous Student #402', roll: 'HIDDEN', xp: 750, streak: 5, zone: 'safe' },
        { rank: 5, name: 'Kavya Nair', roll: '2024CSE089', xp: 710, streak: 4, zone: 'safe' },
        { rank: 6, name: 'Rohan Gupta', roll: '2024CSE112', xp: 680, streak: 5, zone: 'safe' },
        { rank: 7, name: 'Anonymous Student #108', roll: 'HIDDEN', xp: 640, streak: 3, zone: 'safe' },
        { rank: 8, name: 'Priya Iyer', roll: '2024CSE094', xp: 610, streak: 4, zone: 'safe' },
        { rank: 9, name: 'Siddharth Roy', roll: '2024CSE133', xp: 580, streak: 2, zone: 'safe' },
        { rank: 10, name: 'Ishaan Joshi', roll: '2024CSE077', xp: 540, streak: 1, zone: 'safe' },
        { rank: 11, name: 'Tanvi Shah', roll: '2024CSE145', xp: 490, streak: 2, zone: 'safe' },
        { rank: 12, name: 'Anonymous Student #331', roll: 'HIDDEN', xp: 460, streak: 1, zone: 'safe' },
        { rank: 13, name: 'Aditya Rao', roll: '2024CSE021', xp: 430, streak: 2, zone: 'safe' },
        { rank: 14, name: 'Sneha Bose', roll: '2024CSE129', xp: 390, streak: 0, zone: 'safe' },
        { rank: 15, name: 'Vikram Singh', roll: '2024CSE155', xp: 370, streak: 1, zone: 'safe' },
        { rank: 16, name: 'Meera Pillai', roll: '2024CSE082', xp: 320, streak: 0, zone: 'relegation' },
        { rank: 17, name: 'Devendra Yadav', roll: '2024CSE051', xp: 290, streak: 0, zone: 'relegation' },
        { rank: 18, name: 'Simran Kaur', roll: '2024CSE140', xp: 250, streak: 0, zone: 'relegation' },
        { rank: 19, name: 'Mohit Agrawal', roll: '2024CSE090', xp: 210, streak: 0, zone: 'relegation' },
        { rank: 20, name: 'Varun Reddy', roll: '2024CSE159', xp: 180, streak: 0, zone: 'relegation' }
    ],
    // Team Battles (Section vs Section & Campus vs Campus)
    teams: [
        { name: 'CSE - Section A (Your Squad)', score: 14250, members: 58, lead: 'Rahul, Ananya' },
        { name: 'CSE - Section B', score: 13800, members: 56, lead: 'Aarav, Rohit' },
        { name: 'IT - Section A', score: 12400, members: 54, lead: 'Neha, Sahil' },
        { name: 'ECE - Section A', score: 10900, members: 50, lead: 'Pranav, Deepa' }
    ],
    // Rewards Store
    store: [
        { id: 'perk_canteen', title: 'MSOT Cafeteria Coffee & Snack Pass', cost: 250, cat: 'Campus Perks', icon: '☕', desc: 'Redeemable for 1 hot beverage and snack at MSOT food court.' },
        { id: 'perk_mentor', 'title': '1-on-1 Alumni FAANG Mentorship (45m)', cost: 600, cat: 'Career Growth', icon: '🎯', desc: 'Mock interview & resume critique session with alumni.' },
        { id: 'perk_pass', 'title': 'MSOT Annual Hackathon Fast-Track Pass', cost: 400, cat: 'Event Access', icon: '🎟️', desc: 'Direct ticket into the campus grand hackathon finals.' },
        { id: 'perk_hoodie', 'title': 'Official MSOT Quest Tech Hoodie', cost: 1200, cat: 'Merch', icon: '👕', desc: 'Custom printed hoodie with your Level & Gamer Tag.' }
    ],
    // Daily Syllabus Questions (Week 4: Trees & Graphs)
    dailyQuiz: [
        {
            id: 'q1',
            question: 'In a Binary Search Tree (BST), what is the worst-case time complexity of searching an element when the tree is degenerate (skewed)?',
            options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
            correct: 2,
            explanationEn: 'When a BST is degenerate (unbalanced like a linked list), searching requires traversing all N nodes, resulting in O(N).',
            explanationHi: 'Jab BST bilkul skewed ho jata hai (yaani ek single line / linked list jaisa), tab search karne ke liye saare N nodes visit karne padte hain, isliye worst-case time complexity O(N) ho jaati hai.'
        },
        {
            id: 'q2',
            question: 'Which traversal of a Binary Search Tree always produces elements in strictly ascending sorted order?',
            options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
            correct: 1,
            explanationEn: 'In-order traversal visits (Left, Root, Right). In a BST, Left < Root < Right, so it always yields sorted values.',
            explanationHi: 'In-order traversal (Left -> Root -> Right) hota hai. BST ke rules ke mutabiq left chhota aur right bada hota hai, isliye in-order hamesha ascending sorted order deta hai.'
        },
        {
            id: 'q3',
            question: 'Which data structure is primarily used to implement Breadth-First Search (BFS) in a Graph?',
            options: ['Stack', 'Queue', 'Priority Queue', 'Deque'],
            correct: 1,
            explanationEn: 'BFS explores vertices level by level using a FIFO (First-In-First-Out) Queue data structure.',
            explanationHi: 'BFS level-by-level traversal karta hai, isliye pehle aaye huye nodes ko pehle explore karne ke liye FIFO Queue data structure use hota hai.'
        }
    ],
    // Boss Battle State
    boss: {
        name: 'The Mid-Term Titan 🐉',
        course: 'Data Structures & Algorithms (MSOT Mid-Term Prep)',
        maxHp: 500,
        currentHp: 320,
        timeLeftSec: 180, // 3 mins timed battle
        damagePerCorrect: 90
    },
    // Faculty Analytics
    faculty: {
        activeEngagementPct: 82,
        strugglingTopics: [
            { topic: 'Dynamic Programming & Memoization', failureRate: 46, recommendation: 'Review session needed on Monday' },
            { topic: 'Graph Cycle Detection (Disjoint Set)', failureRate: 38, recommendation: 'Assign guided micro-practice' },
            { topic: 'Binary Search Edge Cases', failureRate: 21, recommendation: 'Included in daily quiz' }
        ],
        quietStudents: [
            { name: 'Karan Mehra', roll: '2024CSE065', daysQuiet: 7, lastAction: 'Attended Class 7 days ago', risk: 'HIGH' },
            { name: 'Pooja Tiwari', roll: '2024CSE111', daysQuiet: 6, lastAction: 'Quiz attempted 6 days ago', risk: 'HIGH' },
            { name: 'Sameer Khan', roll: '2024CSE138', daysQuiet: 5, lastAction: 'Submitted HW 5 days ago', risk: 'MEDIUM' }
        ],
        antiGamingAlerts: [
            { id: 'flag_01', student: 'R. Verma (CSE119)', action: 'Quiz completed in 1.8 seconds (Rate Limit Tripped)', severity: 'HIGH', time: '10 mins ago' },
            { id: 'flag_02', student: 'S. Bansal (CSE032)', action: 'Identical 100% submission pattern matching with Roll 033', severity: 'MEDIUM', time: '1 hour ago' },
            { id: 'flag_03', student: 'V. Nair (CSE150)', action: 'Abnormal XP surge: +340 XP in 15 minutes', severity: 'HIGH', time: 'Today' }
        ]
    }
};

// UI Controller
const UI = {
    init() {
        this.renderAll();
        this.attachEventListeners();
        this.setupConfetti();
    },

    setupConfetti() {
        // Confetti trigger helper
        window.triggerConfetti = () => {
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        };
    },

    renderAll() {
        this.renderHeader();
        this.renderStudentDashboard();
        this.renderQuests();
        this.renderLeague();
        this.renderTeamBattle();
        this.renderDailyQuiz();
        this.renderBossBattle();
        this.renderStore();
        this.renderFacultyDashboard();
        this.renderRulesEngine();
    },

    renderHeader() {
        const s = AppState.student;
        document.getElementById('headerLevel').textContent = s.level;
        document.getElementById('headerXP').textContent = s.xp;
        document.getElementById('headerStreak').textContent = s.streakDays;
        document.getElementById('headerFreezes').textContent = s.streakFreezesLeft;
        document.getElementById('studentNameBadge').textContent = s.name;
        document.getElementById('studentRollBadge').textContent = s.rollNo;
        document.getElementById('xpProgressFill').style.width = `${Math.min(100, (s.xp % 250) / 2.5)}%`;
        document.getElementById('xpNextLevelText').textContent = `${s.xp % 250} / 250 XP to Level ${s.level + 1}`;
    },

    renderStudentDashboard() {
        // Render XP History Ledger
        const ledgerEl = document.getElementById('ledgerList');
        if (!ledgerEl) return;
        ledgerEl.innerHTML = AppState.ledger.map(item => `
            <div class="flex items-center justify-between p-3.5 bg-slate-900/40 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
                <div class="flex items-center gap-3">
                    <span class="text-xl p-2 bg-slate-800/80 rounded-lg">${item.icon}</span>
                    <div>
                        <p class="text-sm font-semibold text-slate-200">${item.action}</p>
                        <p class="text-xs text-slate-400">${item.time}</p>
                    </div>
                </div>
                <span class="text-emerald-400 font-bold font-mono text-sm bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    +${item.xp} XP
                </span>
            </div>
        `).join('');
    },

    renderQuests() {
        const questEl = document.getElementById('questsList');
        if (!questEl) return;
        questEl.innerHTML = AppState.quests.map(q => {
            const isDone = q.progress >= q.total || q.completed;
            const pct = Math.min(100, Math.round((q.progress / q.total) * 100));
            return `
                <div class="p-4 rounded-xl border ${isDone ? 'bg-emerald-950/20 border-emerald-800/50' : 'bg-slate-900/60 border-slate-800'} relative overflow-hidden">
                    <div class="flex items-start justify-between gap-3 mb-2">
                        <div class="flex items-center gap-2">
                            <span class="text-2xl">${q.badge}</span>
                            <div>
                                <h4 class="font-bold text-sm text-slate-100">${q.title}</h4>
                                <span class="text-[11px] px-2 py-0.5 rounded-full ${q.cat === 'Improvement' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'} font-medium">${q.cat}</span>
                            </div>
                        </div>
                        <span class="text-xs font-bold font-mono px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            +${q.reward} XP
                        </span>
                    </div>
                    <p class="text-xs text-slate-400 mb-3">${q.desc}</p>
                    <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500" style="width: ${pct}%"></div>
                    </div>
                    <div class="flex justify-between text-[11px] text-slate-400 mt-1.5 font-mono">
                        <span>Progress: ${q.progress}/${q.total}</span>
                        <span>${isDone ? '✅ Completed' : `${pct}%`}</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    renderLeague() {
        const leagueEl = document.getElementById('leagueTableBody');
        if (!leagueEl) return;
        leagueEl.innerHTML = AppState.leaguePeers.map(p => {
            const isUser = p.isUser;
            let zoneBadge = '';
            let zoneRowClass = '';

            if (p.zone === 'promotion') {
                zoneBadge = '<span class="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold uppercase tracking-wider">▲ Promo</span>';
                zoneRowClass = 'hover:bg-emerald-950/20';
            } else if (p.zone === 'relegation') {
                zoneBadge = '<span class="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-bold uppercase tracking-wider">▼ Relegate</span>';
                zoneRowClass = 'hover:bg-red-950/20';
            } else {
                zoneBadge = '<span class="text-[10px] bg-slate-700/50 text-slate-400 px-2 py-0.5 rounded font-medium">Safe</span>';
                zoneRowClass = 'hover:bg-slate-800/40';
            }

            return `
                <tr class="border-b border-slate-800/80 transition ${isUser ? 'bg-indigo-950/40 border-indigo-500/40' : zoneRowClass}">
                    <td class="py-3 px-4 font-mono font-bold ${p.rank <= 3 ? 'text-amber-400' : 'text-slate-400'}">
                        ${p.rank === 1 ? '🥇 1' : p.rank === 2 ? '🥈 2' : p.rank === 3 ? '🥉 3' : `#${p.rank}`}
                    </td>
                    <td class="py-3 px-4">
                        <div class="flex items-center gap-2">
                            <span class="font-semibold ${isUser ? 'text-indigo-300 font-bold' : 'text-slate-200'}">
                                ${AppState.student.isAnonymous && isUser ? 'Anonymous Student (You 🕶️)' : p.name}
                            </span>
                            ${isUser ? '<span class="text-[10px] bg-indigo-500 text-white px-1.5 py-0.2 rounded font-bold">YOU</span>' : ''}
                        </div>
                    </td>
                    <td class="py-3 px-4 font-mono text-emerald-400 font-bold">${p.xp} XP</td>
                    <td class="py-3 px-4 text-xs">
                        <span class="inline-flex items-center gap-1 ${p.streak > 0 ? 'text-orange-400' : 'text-slate-500'} font-mono">
                            🔥 ${p.streak}d
                        </span>
                    </td>
                    <td class="py-3 px-4">${zoneBadge}</td>
                </tr>
            `;
        }).join('');
    },

    renderTeamBattle() {
        const teamEl = document.getElementById('teamBattleContainer');
        if (!teamEl) return;
        const maxScore = Math.max(...AppState.teams.map(t => t.score));
        teamEl.innerHTML = AppState.teams.map((t, idx) => {
            const pct = Math.round((t.score / maxScore) * 100);
            return `
                <div class="p-4 rounded-xl ${idx === 0 ? 'bg-indigo-900/30 border border-indigo-500/50' : 'bg-slate-900/40 border border-slate-800'}">
                    <div class="flex justify-between items-center mb-1.5">
                        <div class="flex items-center gap-2">
                            <span class="font-bold text-sm ${idx === 0 ? 'text-indigo-300' : 'text-slate-200'}">${t.name}</span>
                            ${idx === 0 ? '<span class="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">👑 LEADING</span>' : ''}
                        </div>
                        <span class="font-mono font-bold text-sm text-slate-100">${t.score.toLocaleString()} XP</span>
                    </div>
                    <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
                        <div class="h-full ${idx === 0 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-slate-600'} rounded-full transition-all duration-700" style="width: ${pct}%"></div>
                    </div>
                    <div class="flex justify-between text-[11px] text-slate-400">
                        <span>${t.members} Active Contributor Students</span>
                        <span>Top scorers: ${t.lead}</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    renderDailyQuiz() {
        const container = document.getElementById('dailyQuizQuestions');
        if (!container) return;
        container.innerHTML = AppState.dailyQuiz.map((q, idx) => `
            <div class="p-5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3" id="quizCard_${idx}">
                <div class="flex items-start justify-between">
                    <span class="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Question ${idx + 1} of ${AppState.dailyQuiz.length}</span>
                    <span class="text-xs text-slate-400">Week 4: DSA Syllabus</span>
                </div>
                <h4 class="font-medium text-slate-100 text-sm leading-relaxed">${q.question}</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    ${q.options.map((opt, optIdx) => `
                        <button onclick="UI.handleAnswerSelection(${idx}, ${optIdx})" 
                            id="btn_q${idx}_opt${optIdx}"
                            class="quiz-option-btn text-left p-3 rounded-lg border border-slate-700/80 bg-slate-800/40 hover:bg-slate-700/50 hover:border-slate-500 text-xs font-medium text-slate-200 transition">
                            <span class="inline-block w-5 font-mono text-slate-400 font-bold">${String.fromCharCode(65 + optIdx)}.</span> ${opt}
                        </button>
                    `).join('')}
                </div>

                <!-- AI Study Buddy (GyanAI) Explanation Container -->
                <div id="aiBuddyExplanation_${idx}" class="hidden mt-4 p-4 rounded-xl bg-slate-950/80 border border-indigo-900/50 space-y-2">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="text-lg">🤖</span>
                            <span class="text-xs font-bold text-indigo-300">GyanAI Study Buddy Explanation</span>
                        </div>
                        <div class="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-md text-[11px]">
                            <button onclick="UI.toggleLanguage(${idx}, 'en')" id="langEn_${idx}" class="px-1.5 py-0.5 rounded font-bold text-white bg-indigo-600">EN</button>
                            <button onclick="UI.toggleLanguage(${idx}, 'hi')" id="langHi_${idx}" class="px-1.5 py-0.5 rounded font-medium text-slate-400">हिंदी / Hinglish</button>
                        </div>
                    </div>
                    <p id="explanationText_${idx}" class="text-xs text-slate-300 leading-relaxed font-sans"></p>
                </div>
            </div>
        `).join('');
    },

    toggleLanguage(qIdx, lang) {
        const q = AppState.dailyQuiz[qIdx];
        const textEl = document.getElementById(`explanationText_${qIdx}`);
        const btnEn = document.getElementById(`langEn_${qIdx}`);
        const btnHi = document.getElementById(`langHi_${qIdx}`);

        if (lang === 'hi') {
            textEl.textContent = q.explanationHi;
            btnHi.className = "px-1.5 py-0.5 rounded font-bold text-white bg-indigo-600";
            btnEn.className = "px-1.5 py-0.5 rounded font-medium text-slate-400";
        } else {
            textEl.textContent = q.explanationEn;
            btnEn.className = "px-1.5 py-0.5 rounded font-bold text-white bg-indigo-600";
            btnHi.className = "px-1.5 py-0.5 rounded font-medium text-slate-400";
        }
    },

    handleAnswerSelection(qIdx, selectedOptIdx) {
        const q = AppState.dailyQuiz[qIdx];
        const isCorrect = selectedOptIdx === q.correct;
        const explanationBox = document.getElementById(`aiBuddyExplanation_${qIdx}`);
        const explanationText = document.getElementById(`explanationText_${qIdx}`);

        // Disable options for this question
        for (let i = 0; i < q.options.length; i++) {
            const btn = document.getElementById(`btn_q${qIdx}_opt${i}`);
            btn.disabled = true;
            if (i === q.correct) {
                btn.className = "text-left p-3 rounded-lg border border-emerald-500 bg-emerald-950/40 text-emerald-300 font-semibold text-xs";
            } else if (i === selectedOptIdx && !isCorrect) {
                btn.className = "text-left p-3 rounded-lg border border-red-500 bg-red-950/40 text-red-300 text-xs";
            } else {
                btn.className = "text-left p-3 rounded-lg border border-slate-800 bg-slate-900/20 text-slate-500 text-xs opacity-50";
            }
        }

        // Show AI explanation
        explanationText.textContent = q.explanationEn;
        explanationBox.classList.remove('hidden');

        if (isCorrect) {
            sfx.xpEarned();
            this.addXP(AppState.rules.dailyQuizPerCorrect, `Quiz Q${qIdx+1} Correct Answer`, '📝');
        } else {
            sfx.wrongAnswer();
        }
    },

    renderBossBattle() {
        const b = AppState.boss;
        const hpPct = Math.round((b.currentHp / b.maxHp) * 100);
        const hpBar = document.getElementById('bossHpFill');
        const hpText = document.getElementById('bossHpText');
        if (hpBar) hpBar.style.width = `${hpPct}%`;
        if (hpText) hpText.textContent = `${b.currentHp} / ${b.maxHp} HP (${hpPct}%)`;
    },

    attackBoss() {
        const b = AppState.boss;
        if (b.currentHp <= 0) return;

        b.currentHp = Math.max(0, b.currentHp - b.damagePerCorrect);
        sfx.bossHit();

        const monsterEl = document.getElementById('bossAvatar');
        if (monsterEl) {
            monsterEl.classList.add('animate-ping');
            setTimeout(() => monsterEl.classList.remove('animate-ping'), 300);
        }

        this.renderBossBattle();
        this.addXP(30, 'Boss Battle Revision Strike!', '⚔️');

        if (b.currentHp === 0) {
            sfx.levelUp();
            triggerConfetti();
            alert('🎉 VICTORY! The Mid-Term Titan has been defeated by your section! +100 Bonus XP earned!');
            this.addXP(100, 'Mid-Term Titan Defeated Bonus', '🏆');
        }
    },

    renderStore() {
        const storeEl = document.getElementById('storeContainer');
        if (!storeEl) return;
        storeEl.innerHTML = AppState.store.map(item => `
            <div class="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between glass-card-hover">
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-3xl">${item.icon}</span>
                        <span class="text-xs font-mono font-bold bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/30">
                            ${item.cost} XP
                        </span>
                    </div>
                    <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">${item.cat}</span>
                    <h4 class="font-bold text-slate-100 text-sm mt-0.5 mb-2">${item.title}</h4>
                    <p class="text-xs text-slate-400 leading-relaxed">${item.desc}</p>
                </div>
                <button onclick="UI.redeemStoreItem('${item.id}', ${item.cost}, '${item.title}')"
                    class="mt-4 w-full py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-200 border border-slate-700 transition flex items-center justify-center gap-1.5">
                    <span>Redeem Perk</span>
                </button>
            </div>
        `).join('');
    },

    redeemStoreItem(id, cost, title) {
        if (AppState.student.xp < cost) {
            sfx.wrongAnswer();
            alert(`Not enough XP! You need ${cost} XP, but you currently have ${AppState.student.xp} XP. Keep learning to earn more!`);
            return;
        }

        AppState.student.xp -= cost;
        sfx.xpEarned();
        triggerConfetti();
        AppState.ledger.unshift({
            id: Date.now(),
            action: `Redeemed: ${title}`,
            xp: -cost,
            time: 'Just now',
            icon: '🛍️'
        });
        this.renderAll();
        alert(`🎉 Congratulations! Your request for "${title}" has been submitted for faculty approval.`);
    },

    renderFacultyDashboard() {
        // Engagement
        const engEl = document.getElementById('facultyEngRate');
        if (engEl) engEl.textContent = `${AppState.faculty.activeEngagementPct}%`;

        // Struggling Topics
        const topicsEl = document.getElementById('facultyTopicsList');
        if (topicsEl) {
            topicsEl.innerHTML = AppState.faculty.strugglingTopics.map(t => `
                <div class="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <div>
                        <h4 class="text-sm font-semibold text-slate-200">${t.topic}</h4>
                        <p class="text-xs text-amber-400/90 mt-0.5">💡 ${t.recommendation}</p>
                    </div>
                    <div class="text-right">
                        <span class="text-sm font-bold font-mono text-red-400">${t.failureRate}%</span>
                        <span class="block text-[10px] text-slate-500 uppercase">Incorrect</span>
                    </div>
                </div>
            `).join('');
        }

        // Quiet Students (5+ days inactive)
        const quietEl = document.getElementById('facultyQuietList');
        if (quietEl) {
            quietEl.innerHTML = AppState.faculty.quietStudents.map(s => `
                <div class="p-3 bg-red-950/20 rounded-xl border border-red-900/40 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                        <div>
                            <p class="text-sm font-bold text-slate-200">${s.name} <span class="text-xs text-slate-400 font-mono">(${s.roll})</span></p>
                            <p class="text-xs text-slate-400">${s.lastAction}</p>
                        </div>
                    </div>
                    <span class="text-xs font-mono font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                        ${s.daysQuiet} Days Quiet
                    </span>
                </div>
            `).join('');
        }

        // Anti-Gaming Alerts
        const alertEl = document.getElementById('facultyAlertsList');
        if (alertEl) {
            alertEl.innerHTML = AppState.faculty.antiGamingAlerts.map(a => `
                <div class="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-bold text-slate-200">${a.student}</span>
                            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${a.severity === 'HIGH' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'}">${a.severity}</span>
                        </div>
                        <p class="text-xs text-slate-400 mt-0.5">${a.action}</p>
                    </div>
                    <span class="text-[11px] text-slate-500 font-mono">${a.time}</span>
                </div>
            `).join('');
        }
    },

    renderRulesEngine() {
        const rulesContainer = document.getElementById('rulesSlidersContainer');
        if (!rulesContainer) return;
        const r = AppState.rules;
        const ruleFields = [
            { key: 'attendClass', label: 'Class Attendance XP', max: 50, val: r.attendClass },
            { key: 'submitHomework', label: 'On-Time Homework Submission XP', max: 60, val: r.submitHomework },
            { key: 'dailyQuizBase', label: 'Daily Quiz Completion Base XP', max: 40, val: r.dailyQuizBase },
            { key: 'codingMedium', label: 'Verified Coding Problem (Medium) XP', max: 80, val: r.codingMedium },
            { key: 'streak7Bonus', label: '7-Day Streak Bonus XP', max: 150, val: r.streak7Bonus }
        ];

        rulesContainer.innerHTML = ruleFields.map(f => `
            <div class="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                <div class="flex justify-between items-center text-xs">
                    <span class="font-semibold text-slate-300">${f.label}</span>
                    <span class="font-mono font-bold text-indigo-400 text-sm" id="val_${f.key}">${f.val} XP</span>
                </div>
                <input type="range" min="5" max="${f.max}" step="5" value="${f.val}"
                    oninput="UI.updateRuleVal('${f.key}', this.value)"
                    class="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500">
            </div>
        `).join('');
    },

    updateRuleVal(key, val) {
        AppState.rules[key] = parseInt(val);
        const displayEl = document.getElementById(`val_${key}`);
        if (displayEl) displayEl.textContent = `${val} XP`;
    },

    addXP(amount, reason, icon = '✨') {
        const s = AppState.student;
        s.xp += amount;
        
        // Level calculation: every 250 XP
        const newLevel = Math.floor(s.xp / 250) + 1;
        if (newLevel > s.level) {
            s.level = newLevel;
            sfx.levelUp();
            triggerConfetti();
            alert(`🎉 LEVEL UP! You reached Level ${s.level}! Keep pushing!`);
        }

        AppState.ledger.unshift({
            id: Date.now(),
            action: reason,
            xp: amount,
            time: 'Just now',
            icon: icon
        });

        this.renderAll();
    },

    useStreakFreeze() {
        const s = AppState.student;
        if (s.streakFreezesLeft <= 0) {
            alert('No Streak Freezes remaining this month!');
            return;
        }
        s.streakFreezesLeft -= 1;
        sfx.xpEarned();
        alert('🛡️ Streak Freeze Shield activated! Your streak is safely protected today.');
        this.renderAll();
    },

    toggleAnonymous() {
        AppState.student.isAnonymous = !AppState.student.isAnonymous;
        this.renderLeague();
        alert(AppState.student.isAnonymous ? '🕶️ Anonymous Mode Enabled: You appear as "Anonymous Student" on public leaderboards.' : '👀 Public Mode Enabled: Your full name is visible on leaderboards.');
    },

    simulateLeetCodeSync() {
        sfx.xpEarned();
        triggerConfetti();
        this.addXP(20, 'Verified LeetCode Sync: Solved Problem #206 (Reverse Linked List)', '💻');
        alert('✅ Verified Practice: Connected to LeetCode API. +20 XP awarded for verified solution!');
    },

    switchRole(role) {
        AppState.currentRole = role;
        document.getElementById('studentPortalView').classList.toggle('hidden', role !== 'student');
        document.getElementById('facultyPortalView').classList.toggle('hidden', role !== 'faculty');

        document.getElementById('roleBtnStudent').className = role === 'student' ? 'px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white' : 'px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white';
        document.getElementById('roleBtnFaculty').className = role === 'faculty' ? 'px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white' : 'px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white';
    },

    switchTab(targetTab) {
        if (!targetTab) return;
        document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
        const tabEl = document.getElementById(`tab_${targetTab}`);
        if (tabEl) {
            tabEl.classList.remove('hidden');
            tabEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        document.querySelectorAll('.tab-nav-btn').forEach(b => {
            b.classList.remove('border-indigo-500', 'text-indigo-400', 'bg-slate-800/60');
            if (b.getAttribute('data-tab') === targetTab) {
                b.classList.add('border-indigo-500', 'text-indigo-400', 'bg-slate-800/60');
            }
        });

        // Trigger section specific initializations
        if (targetTab === 'arcade' && typeof Arcade !== 'undefined') {
            Arcade.renderGamesGrid();
        } else if (targetTab === 'fight' && typeof CodeFighter !== 'undefined') {
            CodeFighter.init();
        } else if (targetTab === 'quiz') {
            this.renderDailyQuiz();
        } else if (targetTab === 'boss') {
            this.renderBossBattle();
        } else if (targetTab === 'leagues') {
            this.renderLeague();
        } else if (targetTab === 'teambattle') {
            this.renderTeamBattle();
        } else if (targetTab === 'store') {
            this.renderStore();
        } else if (targetTab === 'overview') {
            this.renderQuests();
        }
    },

    enterGate(event) {
        if (event) {
            try { event.preventDefault(); event.stopPropagation(); } catch (e) {}
        }
        try { sfx.gateOpen(); } catch (e) {}

        const speedlines = document.getElementById('animeSpeedlines');
        if (speedlines) {
            speedlines.classList.add('active');
            setTimeout(() => speedlines.classList.remove('active'), 750);
        }
        try { triggerConfetti(); } catch (e) {}

        const gateOverlay = document.getElementById('heroGateOverlay');
        if (gateOverlay) {
            gateOverlay.classList.add('gate-opened');
            setTimeout(() => {
                gateOverlay.style.display = 'none';
            }, 850);
        }
    },

    enterGates(event) {
        this.enterGate(event);
    },

    showHeroGate() {
        const gateOverlay = document.getElementById('heroGateOverlay');
        if (gateOverlay) {
            gateOverlay.style.display = 'flex';
            setTimeout(() => {
                gateOverlay.classList.remove('gate-opened');
            }, 50);
        }
    },

    attachEventListeners() {
        // Tab Switching in student portal
        const tabBtns = document.querySelectorAll('.tab-nav-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });

        // Listen for URL hash changes (e.g. #arcade, #fight)
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.replace('#/', '').replace('#', '');
            if (hash) this.switchTab(hash);
        });
        if (window.location.hash) {
            const initialHash = window.location.hash.replace('#/', '').replace('#', '');
            if (initialHash && initialHash !== 'gates') this.switchTab(initialHash);
        }
    },

    toggleAuthMode(mode) {
        const isSignIn = mode === 'signin';
        document.getElementById('signInForm').classList.toggle('hidden', !isSignIn);
        document.getElementById('signUpForm').classList.toggle('hidden', isSignIn);

        const tabIn = document.getElementById('tabAuthSignIn');
        const tabUp = document.getElementById('tabAuthSignUp');
        if (isSignIn) {
            tabIn.className = "flex-1 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white transition";
            tabUp.className = "flex-1 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition";
        } else {
            tabUp.className = "flex-1 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white transition";
            tabIn.className = "flex-1 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition";
        }
    },

    async handleSupabaseAuth(event, mode) {
        event.preventDefault();
        const banner = document.getElementById('authStatusBanner');
        banner.className = "mb-4 p-3 rounded-xl text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/30";
        banner.textContent = mode === 'signup' ? "Creating account in Supabase..." : "Signing in with Supabase...";
        banner.classList.remove('hidden');

        let client = null;
        if (typeof supabase !== 'undefined' && isSupabaseLive()) {
            client = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
        }

        if (mode === 'signup') {
            const name = document.getElementById('signUpName').value.trim();
            const roll = document.getElementById('signUpRoll').value.trim();
            const dept = document.getElementById('signUpDept').value;
            const email = document.getElementById('signUpEmail').value.trim();
            const password = document.getElementById('signUpPassword').value;

            try {
                if (client) {
                    // 1. Supabase Auth Signup
                    const { data: authData, error: authErr } = await client.auth.signUp({
                        email: email,
                        password: password
                    });
                    if (authErr) throw authErr;

                    // 2. Insert into profiles table
                    const { error: profileErr } = await client.from('profiles').insert([{
                        email: email,
                        full_name: name,
                        roll_no: roll,
                        department: dept,
                        xp: 100,
                        level: 1,
                        streak_days: 1
                    }]);
                    if (profileErr) console.warn("Profile table insert notice:", profileErr);
                }

                // Update active state in UI
                AppState.student.name = name;
                AppState.student.rollNo = roll;
                AppState.student.department = dept;
                this.renderAll();
                sfx.xpEarned();
                triggerConfetti();

                banner.className = "mb-4 p-3 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30";
                banner.textContent = `✅ Account created! Welcome ${name}. Check your Supabase Dashboard now.`;
                setTimeout(() => {
                    document.getElementById('authModal').classList.add('hidden');
                    banner.classList.add('hidden');
                }, 1800);

            } catch (err) {
                console.error(err);
                banner.className = "mb-4 p-3 rounded-xl text-xs font-medium bg-red-500/10 text-red-300 border border-red-500/30";
                banner.textContent = `Notice: ${err.message || 'Could not connect to Supabase'}`;
            }
        } else {
            // Sign In
            const email = document.getElementById('signInEmail').value.trim();
            const password = document.getElementById('signInPassword').value;

            try {
                if (client) {
                    const { data, error } = await client.auth.signInWithPassword({
                        email: email,
                        password: password
                    });
                    if (error) throw error;
                }

                banner.className = "mb-4 p-3 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30";
                banner.textContent = "✅ Signed in successfully!";
                setTimeout(() => {
                    document.getElementById('authModal').classList.add('hidden');
                    banner.classList.add('hidden');
                }, 1200);
            } catch (err) {
                console.error(err);
                banner.className = "mb-4 p-3 rounded-xl text-xs font-medium bg-red-500/10 text-red-300 border border-red-500/30";
                banner.textContent = `Sign in notice: ${err.message || 'Invalid credentials'}`;
            }
        }
    }
};

// ==========================================================
// INTERACTIVE CYBER PARTICLE CANVAS BACKGROUND
// ==========================================================
function initCyberCanvas() {
    const canvas = document.getElementById('cyberCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            radius: Math.random() * 2 + 1,
            color: i % 2 === 0 ? 'rgba(99, 102, 241, 0.4)' : 'rgba(236, 72, 153, 0.3)'
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < count; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            for (let j = i + 1; j < count; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 110) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 110)})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ==========================================================
// TIERED GAME ARENA CONTROLLER
// ==========================================================
const Arcade = {
    currentTier: 't1',
    totalArcadeXp: 140,
    combo: 1,

    // TIER 1: SYNTAX BLITZ STATE
    blitz: {
        timer: 30,
        timerInterval: null,
        score: 0,
        running: false,
        currentIdx: 0,
        questions: [
            { q: "What is the worst-case time complexity of Binary Search?", optA: "O(log N)", optB: "O(N)", correct: 0, cat: "Algorithms" },
            { q: "Which data structure follows the LIFO principle?", optA: "Queue", optB: "Stack", correct: 1, cat: "Data Structures" },
            { q: "What is the average lookup time in a Hash Map?", optA: "O(1)", optB: "O(N)", correct: 0, cat: "Hash Tables" },
            { q: "Which traversal of a BST yields sorted order?", optA: "In-Order", optB: "Pre-Order", correct: 0, cat: "Trees" },
            { q: "Breadth-First Search (BFS) is implemented using:", optA: "Queue", optB: "Stack", correct: 0, cat: "Graphs" },
            { q: "Merge Sort follows which algorithmic paradigm?", optA: "Divide & Conquer", optB: "Greedy", correct: 0, cat: "Sorting" },
            { q: "Is a Tree an Undirected Acyclic Graph?", optA: "Yes", optB: "No", correct: 0, cat: "Graph Theory" },
            { q: "Time complexity of inserting at head of a Singly Linked List?", optA: "O(1)", optB: "O(N)", correct: 0, cat: "Linked Lists" }
        ]
    },

    // TIER 2: MEMORY MATRIX STATE
    matrix: {
        cards: [],
        flippedCards: [],
        matches: 0,
        moves: 0,
        pairs: [
            { key: 'stack', title: '🥞 Stack', desc: 'Call Stack & Undo Operations' },
            { key: 'queue', title: '🚶‍♂️ Queue', desc: 'BFS & Printer Task Spooler' },
            { key: 'hash', title: '🗺️ Hash Map', desc: 'O(1) Average Key-Value Lookup' },
            { key: 'bst', title: '🌲 BST', desc: 'In-Order Traversal Gives Sorted' }
        ]
    },

    // TIER 3: RAID BOSS STATE
    raid: {
        hp: 500,
        maxHp: 500,
    currentFilter: 'all',
    clearedGames: new Set(['game_dsa_1', 'game_dsa_3', 'game_html_4']), // Initial cleared games matching screenshot
    activeGame: null,
    currentQIdx: 0,
    lives: 3,
    score: 0,
    combo: 0,
    clueUsed: false,
    correctCount: 0,

    init() {
        this.renderGamesGrid();
    },

    filterCategory(cat) {
        this.currentFilter = cat;
        // Update filter buttons styling
        const filterBtns = {
            all: document.getElementById('arcFilter_all'),
            dsa: document.getElementById('arcFilter_dsa'),
            html: document.getElementById('arcFilter_html'),
            cleared: document.getElementById('arcFilter_cleared')
        };

        Object.keys(filterBtns).forEach(k => {
            const btn = filterBtns[k];
            if (!btn) return;
            if (k === cat) {
                btn.className = "px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-rose-600 text-white shadow-lg shadow-rose-600/30 transition transform active:scale-95";
            } else {
                btn.className = "px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 transition";
            }
        });

        this.renderGamesGrid();
    },

    renderGamesGrid() {
        const grid = document.getElementById('arcadeCardsGrid');
        if (!grid || typeof ARCADE_GAMES === 'undefined') return;

        // Update cleared count
        const countEl = document.getElementById('arcClearedCount');
        if (countEl) countEl.textContent = this.clearedGames.size;

        let filtered = ARCADE_GAMES;
        if (this.currentFilter === 'dsa') {
            filtered = ARCADE_GAMES.filter(g => g.category.includes('DSA'));
        } else if (this.currentFilter === 'html') {
            filtered = ARCADE_GAMES.filter(g => g.category.includes('HTML') || g.category.includes('WEB'));
        } else if (this.currentFilter === 'cleared') {
            filtered = ARCADE_GAMES.filter(g => this.clearedGames.has(g.id));
        }

        grid.innerHTML = filtered.map(game => {
            const isCleared = this.clearedGames.has(game.id);
            const isDsa = game.category.includes('DSA');
            const catColor = isDsa ? 'text-sky-400 border-sky-500/40 bg-sky-500/10' : 'text-amber-400 border-amber-500/40 bg-amber-500/10';
            const catLabel = isDsa ? 'DSA IN C++' : 'WEB DEVELOPMENT (HTML)';

            return `
                <div class="arcade-game-card ${isCleared ? 'is-cleared' : ''}">
                    <div>
                        <!-- Header Badge Row: Topic Tag & Cleared Status -->
                        <div class="flex items-center justify-between gap-2 mb-3">
                            <span class="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase border ${catColor}">
                                ${catLabel} • Topic ${game.topicNumber}
                            </span>
                            ${isCleared ? `
                                <span class="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                                    <span>CLEARED</span>
                                    <span>✓</span>
                                </span>
                            ` : ''}
                        </div>

                        <!-- Big Topic Icon -->
                        <div class="text-4xl my-3 select-none">
                            ${game.icon}
                        </div>

                        <!-- Title & Subtopic Name -->
                        <h3 class="text-lg font-black text-white tracking-wide font-cinzel leading-tight">
                            ${game.title}
                        </h3>
                        <p class="text-xs font-bold text-rose-400 mt-1 mb-3">
                            ${game.topicName}
                        </p>

                        <!-- Narrative Description -->
                        <p class="text-xs text-slate-400 leading-relaxed line-clamp-3">
                            ${game.description}
                        </p>
                    </div>

                    <!-- Card Footer: Badge Title & Deploy Button -->
                    <div class="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <div class="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                            <span>${game.icon}</span>
                            <span class="text-[11px] text-slate-300 font-semibold truncate max-w-[110px]">${game.badge}</span>
                        </div>
                        <button onclick="Arcade.deployGame('${game.id}')" class="${isCleared ? 'play-again-btn' : 'deploy-game-btn'}">
                            ${isCleared ? 'PLAY AGAIN ↺' : 'DEPLOY GAME ➔'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    deployGame(gameId) {
        const game = ARCADE_GAMES.find(g => g.id === gameId);
        if (!game) return;

        this.activeGame = game;
        this.currentQIdx = 0;
        this.lives = 3;
        this.score = 0;
        this.combo = 0;
        this.clueUsed = false;
        this.correctCount = 0;

        sfx.gateOpen();
        const modal = document.getElementById('arcadeGameModal');
        if (!modal) return;
        modal.classList.remove('hidden');

        // Populate Static Game Meta
        document.getElementById('gameModalCatBadge').textContent = game.category;
        document.getElementById('gameModalTitle').textContent = game.title;
        document.getElementById('gameModalSubtitle').textContent = `Topic ${game.topicNumber}: ${game.topicName}`;
        document.getElementById('gameModalAnimIcon').textContent = game.animationIcon;
        document.getElementById('gameModalAnimText').textContent = game.animationTitle;
        document.getElementById('gameModalCaseFile').textContent = game.caseFile;
        document.getElementById('gameModalCompilerTitle').textContent = `mirai-compiler://${game.id}.cpp`;

        // Reset Victory overlay
        const victory = document.getElementById('gameModalVictoryOverlay');
        if (victory) victory.classList.add('hidden');

        // Update Stats HUD
        this.updateGameStatsHud();

        // Render First Question
        this.renderCurrentQuestion();
    },

    updateGameStatsHud() {
        // Lives
        const livesEl = document.getElementById('gameModalLives');
        if (livesEl) {
            let hearts = '';
            for (let i = 0; i < 3; i++) {
                hearts += i < this.lives ? '❤️' : '🖤';
            }
            livesEl.textContent = hearts;
        }

        // Score
        const scoreEl = document.getElementById('gameModalScore');
        if (scoreEl) scoreEl.textContent = `${this.score} XP`;

        // Combo
        const comboEl = document.getElementById('gameModalCombo');
        if (comboEl) comboEl.textContent = `${this.combo}x 🔥`;
    },

    renderCurrentQuestion() {
        const game = this.activeGame;
        if (!game || this.currentQIdx >= game.questions.length) {
            this.showVictoryScreen();
            return;
        }

        const q = game.questions[this.currentQIdx];
        this.clueUsed = false;

        // Question Trackers
        document.getElementById('gameModalQTracker').textContent = `Question ${this.currentQIdx + 1} of ${game.questions.length}`;
        document.getElementById('gameModalQType').textContent = q.type;
        document.getElementById('gameModalQuestionStatement').textContent = q.question;
        document.getElementById('gameModalCodeBlock').textContent = q.code;

        // Hide feedback
        const feedback = document.getElementById('gameModalFeedback');
        if (feedback) feedback.classList.add('hidden');

        // Options
        const optionsGrid = document.getElementById('gameModalOptionsGrid');
        if (!optionsGrid) return;

        const letters = ['A', 'B', 'C', 'D'];
        optionsGrid.innerHTML = q.options.map((opt, idx) => `
            <button onclick="Arcade.answerOption(${idx})" id="gameOptBtn_${idx}" class="game-option-btn">
                <span class="w-6 h-6 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-400 flex-shrink-0">
                    ${letters[idx]}
                </span>
                <span class="font-mono text-xs sm:text-sm text-slate-100">${this.escapeHtml(opt)}</span>
            </button>
        `).join('');
    },

    answerOption(optIdx) {
        const game = this.activeGame;
        if (!game) return;
        const q = game.questions[this.currentQIdx];
        const isCorrect = optIdx === q.correct;

        const clickedBtn = document.getElementById(`gameOptBtn_${optIdx}`);
        const correctBtn = document.getElementById(`gameOptBtn_${q.correct}`);

        // Disable all option buttons temporarily
        const allBtns = document.querySelectorAll('.game-option-btn');
        allBtns.forEach(b => b.disabled = true);

        const feedback = document.getElementById('gameModalFeedback');

        if (isCorrect) {
            if (clickedBtn) clickedBtn.classList.add('opt-correct');
            this.combo++;
            const earned = 15 * this.combo;
            this.score += earned;
            this.correctCount++;
            sfx.bossHit();

            if (feedback) {
                feedback.className = "p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-medium";
                feedback.innerHTML = `<strong>✨ Correct! (+${earned} XP):</strong> ${q.explanation}`;
                feedback.classList.remove('hidden');
            }

            this.updateGameStatsHud();

            // Next question after 1.1s
            setTimeout(() => {
                this.currentQIdx++;
                this.renderCurrentQuestion();
            }, 1100);
        } else {
            if (clickedBtn) clickedBtn.classList.add('opt-wrong');
            if (correctBtn) correctBtn.classList.add('opt-correct');
            this.lives--;
            this.combo = 0;
            sfx.wrongAnswer();

            if (feedback) {
                feedback.className = "p-3.5 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-300 text-xs font-medium";
                feedback.innerHTML = `<strong>❌ Incorrect (-1 Life):</strong> ${q.explanation}`;
                feedback.classList.remove('hidden');
            }

            this.updateGameStatsHud();

            if (this.lives <= 0) {
                setTimeout(() => {
                    alert('💔 Mission Failed! You lost all lives. Re-deploying scenario!');
                    this.deployGame(game.id);
                }, 1300);
            } else {
                setTimeout(() => {
                    this.currentQIdx++;
                    this.renderCurrentQuestion();
                }, 1400);
            }
        }
    },

    showClue() {
        if (this.clueUsed || !this.activeGame) return;
        const q = this.activeGame.questions[this.currentQIdx];
        this.clueUsed = true;
        this.score = Math.max(0, this.score - 5);
        this.updateGameStatsHud();

        const feedback = document.getElementById('gameModalFeedback');
        if (feedback) {
            feedback.className = "p-3.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-medium";
            feedback.innerHTML = `<strong>💡 Tactical Clue (-5 XP):</strong> ${q.clue}`;
            feedback.classList.remove('hidden');
        }
        sfx.xpEarned();
    },

    showVictoryScreen() {
        const game = this.activeGame;
        if (!game) return;

        this.clearedGames.add(game.id);
        triggerConfetti();
        sfx.levelUp();

        const totalEarned = Math.max(30, this.score);
        UI.addXP(totalEarned, `Cleared Arcade: ${game.title} (${game.badge})`, game.icon);

        const overlay = document.getElementById('gameModalVictoryOverlay');
        if (overlay) {
            document.getElementById('victoryBadgeName').textContent = game.badge;
            document.getElementById('victoryScoreText').textContent = `+${totalEarned} XP`;
            const accuracy = Math.round((this.correctCount / game.questions.length) * 100);
            document.getElementById('victoryAccuracyText').textContent = `${accuracy}%`;
            overlay.classList.remove('hidden');
        }

        this.renderGamesGrid();
    },

    closeGameModal() {
        const modal = document.getElementById('arcadeGameModal');
        if (modal) modal.classList.add('hidden');
        this.activeGame = null;
        this.renderGamesGrid();
    },

    escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }
};

// ==========================================================
// 2-PERSON 1V1 CODE FIGHTER (STREET FIGHTER DO-OR-DIE DUEL)
// ==========================================================
const CodeFighter = {
    playerHp: 100,
    rivalHp: 100,
    round: 1,
    timer: 15,
    timerInterval: null,
    inAction: false,
    currentQuestion: null,

    rivals: [
        { name: "Syntax Imp", sprite: "👾", maxHp: 100, title: "BUG TIER 1", roundName: "ROUND 1: SYNTAX IMP" },
        { name: "NullPointer Ninja", sprite: "🥷", maxHp: 100, title: "BUG TIER 2", roundName: "ROUND 2: NULLPOINTER NINJA" },
        { name: "Recursion Demon Lord", sprite: "👹", maxHp: 100, title: "FINAL BOSS", roundName: "ROUND 3: DEMON LORD" }
    ],

    questions: [
        {
            q: "Which data structure follows FIFO and is used in BFS graph traversal?",
            options: ["Queue", "Stack", "Priority Queue", "Hash Map"],
            correct: 0
        },
        {
            q: "What is the worst-case time complexity of QuickSort?",
            options: ["O(N log N)", "O(N²)", "O(log N)", "O(1)"],
            correct: 1
        },
        {
            q: "In C++, which keyword is used to dynamically allocate memory on heap?",
            options: ["malloc", "new", "alloc", "create"],
            correct: 1
        },
        {
            q: "Which tree traversal outputs BST nodes in strictly sorted ascending order?",
            options: ["Pre-Order", "In-Order", "Post-Order", "Level-Order"],
            correct: 1
        },
        {
            q: "What is the space complexity of an iterative Binary Search algorithm?",
            options: ["O(1)", "O(log N)", "O(N)", "O(N²)"],
            correct: 0
        },
        {
            q: "Which data structure allows O(1) amortized insertion and removal from both ends?",
            options: ["Singly Linked List", "Deque", "Binary Heap", "Stack"],
            correct: 1
        },
        {
            q: "Detecting a cycle in a Directed Graph can be efficiently solved using:",
            options: ["DFS with recursion stack", "Linear Search", "Bubble Sort", "Binary Search"],
            correct: 0
        }
    ],

    init() {
        this.playerHp = 100;
        this.rivalHp = 100;
        this.updateRivalProfile();
        this.updateHud();
        this.loadNextQuestion();
        sfx.fightBell();
    },

    updateRivalProfile() {
        const rival = this.rivals[(this.round - 1) % this.rivals.length];
        const rName = document.getElementById('fightRivalName');
        const rSprite = document.getElementById('fighterRival');
        const rBadge = document.getElementById('rivalBadgeLabel');
        const rRound = document.getElementById('fightRoundBadge');
        const pName = document.getElementById('fightPlayerName');

        if (rName) rName.textContent = rival.name;
        if (rSprite) rSprite.textContent = rival.sprite;
        if (rBadge) rBadge.textContent = rival.title;
        if (rRound) rRound.textContent = rival.roundName;
        if (pName) pName.textContent = `${AppState.student.name} (Defender)`;
    },

    updateHud() {
        const playerBar = document.getElementById('fightPlayerHpBar');
        const playerText = document.getElementById('fightPlayerHpText');
        const rivalBar = document.getElementById('fightRivalHpBar');
        const rivalText = document.getElementById('fightRivalHpText');

        if (playerBar) playerBar.style.width = `${Math.max(0, this.playerHp)}%`;
        if (playerText) playerText.textContent = `${Math.max(0, this.playerHp)} / 100 HP`;

        if (rivalBar) rivalBar.style.width = `${Math.max(0, this.rivalHp)}%`;
        if (rivalText) rivalText.textContent = `${Math.max(0, this.rivalHp)} / 100 HP`;
    },

    loadNextQuestion() {
        if (this.playerHp <= 0 || this.rivalHp <= 0) return;
        this.inAction = false;
        clearInterval(this.timerInterval);

        const q = this.questions[Math.floor(Math.random() * this.questions.length)];
        this.currentQuestion = q;
        const promptEl = document.getElementById('fightQuestionPrompt');
        if (promptEl) promptEl.textContent = q.q;

        const grid = document.getElementById('fightMovesGrid');
        if (grid) {
            grid.innerHTML = q.options.map((opt, idx) => `
                <button onclick="CodeFighter.handleMoveChoice(${idx})"
                    class="fight-move-btn text-left p-3.5 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 hover:border-rose-500 font-medium text-xs text-slate-200 transition transform active:scale-95 flex items-center justify-between">
                    <span><strong class="font-mono text-rose-400 mr-2">${String.fromCharCode(65 + idx)}.</strong> ${opt}</span>
                    <span class="text-[10px] text-slate-500 font-mono">PUNCH ➔</span>
                </button>
            `).join('');
        }

        this.timer = 15;
        const timerDisp = document.getElementById('fightTimerDisplay');
        if (timerDisp) timerDisp.textContent = `⏱️ ${this.timer}s`;

        this.timerInterval = setInterval(() => {
            this.timer--;
            if (timerDisp) timerDisp.textContent = `⏱️ ${this.timer}s`;
            if (this.timer <= 0) {
                clearInterval(this.timerInterval);
                this.executeRivalPunch("Time expired! Rival countered with Speed Jab!");
            }
        }, 1000);
    },

    handleMoveChoice(selectedIdx) {
        if (this.inAction || this.playerHp <= 0 || this.rivalHp <= 0) return;
        this.inAction = true;
        clearInterval(this.timerInterval);

        // Disable buttons
        document.querySelectorAll('.fight-move-btn').forEach(b => b.disabled = true);

        const isCorrect = selectedIdx === this.currentQuestion.correct;
        if (isCorrect) {
            this.executePlayerPunch();
        } else {
            this.executeRivalPunch("Wrong answer! Rival dodged and countered!");
        }
    },

    executePlayerPunch() {
        const playerSprite = document.getElementById('fighterPlayer');
        const rivalSprite = document.getElementById('fighterRival');
        const spark = document.getElementById('fightHitSpark');
        const floatText = document.getElementById('fightFloatingText');

        if (playerSprite) playerSprite.classList.add('player-punching');
        sfx.punch();

        setTimeout(() => {
            // Hit lands on rival!
            if (spark) spark.classList.remove('hidden');
            if (floatText) {
                floatText.textContent = "💥 PUNCH LANDED! -25 HP";
                floatText.className = "font-mono font-black text-2xl sm:text-3xl text-emerald-400 drop-shadow-lg";
            }
            if (rivalSprite) rivalSprite.classList.add('rival-hurt');
            this.rivalHp = Math.max(0, this.rivalHp - 25);
            this.updateHud();

            setTimeout(() => {
                if (spark) spark.classList.add('hidden');
                if (playerSprite) playerSprite.classList.remove('player-punching');
                if (rivalSprite) rivalSprite.classList.remove('rival-hurt');

                if (this.rivalHp <= 0) {
                    this.triggerKnockout(true);
                } else {
                    this.loadNextQuestion();
                }
            }, 600);
        }, 220);
    },

    executeRivalPunch(reason) {
        const playerSprite = document.getElementById('fighterPlayer');
        const rivalSprite = document.getElementById('fighterRival');
        const spark = document.getElementById('fightHitSpark');
        const floatText = document.getElementById('fightFloatingText');
        const arena = document.getElementById('fightArenaWrapper');

        if (rivalSprite) rivalSprite.classList.add('rival-punching');
        sfx.heavyPunch();

        setTimeout(() => {
            // Hit lands on player!
            if (spark) spark.classList.remove('hidden');
            if (floatText) {
                floatText.textContent = "💥 ENEMY COUNTER PUNCH! -25 HP";
                floatText.className = "font-mono font-black text-2xl sm:text-3xl text-rose-500 drop-shadow-lg";
            }
            if (playerSprite) playerSprite.classList.add('player-hurt');
            if (arena) arena.classList.add('shake-active', 'damage-flash');
            this.playerHp = Math.max(0, this.playerHp - 25);
            this.updateHud();

            setTimeout(() => {
                if (spark) spark.classList.add('hidden');
                if (rivalSprite) rivalSprite.classList.remove('rival-punching');
                if (playerSprite) playerSprite.classList.remove('player-hurt');
                if (arena) arena.classList.remove('shake-active', 'damage-flash');

                if (this.playerHp <= 0) {
                    this.triggerKnockout(false);
                } else {
                    this.loadNextQuestion();
                }
            }, 600);
        }, 220);
    },

    triggerKnockout(playerWon) {
        clearInterval(this.timerInterval);
        const banner = document.getElementById('fightKoBanner');
        const bannerText = document.getElementById('koBannerText');
        const subText = document.getElementById('koSubText');

        if (banner) banner.classList.remove('hidden');
        if (playerWon) {
            sfx.ko();
            triggerConfetti();
            if (bannerText) {
                bannerText.textContent = "K.O.! VICTORY!";
                bannerText.className = "text-5xl sm:text-7xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 tracking-wider ko-banner-anim";
            }
            if (subText) {
                subText.textContent = `Devastating final punch! You defeated ${this.rivals[(this.round - 1) % this.rivals.length].name}! +60 XP Awarded!`;
            }
            UI.addXP(60, `1v1 Code Fighter: Defeated Round ${this.round}`, '🥊');
        } else {
            sfx.wrongAnswer();
            if (bannerText) {
                bannerText.textContent = "K.O.! DEFEATED!";
                bannerText.className = "text-5xl sm:text-7xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 tracking-wider ko-banner-anim";
            }
            if (subText) {
                subText.textContent = "You took too many heavy punches from the bug lord! Regroup and rematch!";
            }
        }
    },

    nextFightRound() {
        const banner = document.getElementById('fightKoBanner');
        if (banner) banner.classList.add('hidden');
        this.round++;
        this.playerHp = 100;
        this.rivalHp = 100;
        this.updateRivalProfile();
        this.updateHud();
        this.loadNextQuestion();
        sfx.fightBell();
    },

    restartMatch() {
        const banner = document.getElementById('fightKoBanner');
        if (banner) banner.classList.add('hidden');
        this.init();
    }
};

// Global Access Handlers
window.UI = UI;
window.Arcade = Arcade;
window.CodeFighter = CodeFighter;
window.switchTab = (t) => UI.switchTab(t);
window.enterGate = (e) => UI.enterGate(e);
window.openGateAndEnterArcade = (e) => UI.enterGate(e);

// Start application on page load
window.addEventListener('DOMContentLoaded', () => {
    UI.init();
    initCyberCanvas();
    Arcade.init();
    CodeFighter.init();
});

