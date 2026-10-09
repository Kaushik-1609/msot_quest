// ================================================================
// MSOT Quest: Configuration & Supabase Credentials
// ================================================================

const CONFIG = {
    // Paste your Supabase Project URL here:
    SUPABASE_URL: "https://xyzexample.supabase.co",

    // Paste your Supabase Public Anon Key here:
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",

    // Platform settings
    COLLEGE_NAME: "MSOT (Modern School of Tech)",
    SEMESTER: "Fall 2026",
    SEASON_END_DAYS: 12
};

// Returns true if user has replaced placeholder credentials
function isSupabaseLive() {
    return CONFIG.SUPABASE_URL && 
           !CONFIG.SUPABASE_URL.includes("xyzexample") &&
           CONFIG.SUPABASE_ANON_KEY && 
           !CONFIG.SUPABASE_ANON_KEY.includes("...");
}
