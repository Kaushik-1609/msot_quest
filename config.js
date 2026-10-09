// ================================================================
// MSOT Quest: Configuration & Supabase Credentials
// ================================================================

const CONFIG = {
    // Linked Supabase Project URL
    SUPABASE_URL: "https://totwhntfszsbgcvbutpc.supabase.co",

    // Linked Supabase Public Publishable / Anon Key
    SUPABASE_ANON_KEY: "sb_publishable_FOOsqOAgTTcTqPqL0Kf9Vw_GyglxClR",

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
