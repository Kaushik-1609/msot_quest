/**
 * MSOT Quest - Complete 17 Arcade Games Dataset
 * Matching Neoclassical Cyber Mirai Tech / Cheery-Zuccutto Arcade Platform
 */

const ARCADE_GAMES = [
    // -------------------------------------------------------------
    // DSA IN C++ (7 TOPICS)
    // -------------------------------------------------------------
    {
        id: "game_dsa_1",
        category: "DSA IN C++",
        topicNumber: 1,
        topicName: "Program Basics and Input/Output",
        title: "CODE DETECTIVE",
        icon: "🔍",
        badge: "Chief Inspector",
        description: "You are a detective in Neo-Tokyo. Every broken C++ program is a cyber crime scene and you must find the clue.",
        caseFile: "A mysterious runtime anomaly crashed the neo-transit network! Inspect the C++ input/output pipeline and deduce the correct streams to restore telemetry.",
        animationIcon: "🔍",
        animationTitle: "Analyze the crime scene stream buffer. Correct = decrypted clue. Wrong = security alarm triggers!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Fill the Blank",
                clue: "Look for the stream extraction operator >> used with standard input.",
                question: "Which C++ standard stream reads formatted sensor telemetry from the user console?",
                code: "int sensor_id;\nstd::___ >> sensor_id;\nstd::cout << \"Telemetry locked: \" << sensor_id;",
                options: ["std::cin", "std::cout", "std::cerr", "std::clog"],
                correct: 0,
                explanation: "std::cin uses the >> extraction operator to read standard input."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Syntax Analysis",
                clue: "Pre-processor directives start with a hash symbol and include header files.",
                question: "Which header directive is mandatory for std::cout and std::endl?",
                code: "___ <iostream>\n\nint main() {\n    std::cout << \"Neo Tokyo Grid Online\";\n    return 0;\n}",
                options: ["#include", "import", "#require", "#using"],
                correct: 0,
                explanation: "#include <iostream> brings standard I/O stream classes into compilation."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Code Output",
                clue: "std::endl flushes the stream buffer and inserts a new line character.",
                question: "What does std::endl do compared to '\\n' in C++?",
                code: "std::cout << \"Status: Active\" << std::endl;",
                options: ["Inserts newline and flushes the buffer", "Only inserts a space", "Clears the screen", "Terminates main()"],
                correct: 0,
                explanation: "std::endl outputs a newline character and forces a buffer flush."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Syntax Check",
                clue: "The standard namespace prefix is std followed by scope resolution operator.",
                question: "Which keyword allows skipping the 'std::' prefix for console streams?",
                code: "___ namespace std;\n\nint main() {\n    cout << \"Stream Open\";\n}",
                options: ["using", "import", "package", "namespace"],
                correct: 0,
                explanation: "'using namespace std;' pulls all std symbols into the global scope."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Return Value",
                clue: "Exit status 0 signals to the OS kernel that execution concluded successfully.",
                question: "What integer code should main() return on successful execution?",
                code: "int main() {\n    std::cout << \"Case Solved!\";\n    return ___;\n}",
                options: ["0", "1", "-1", "NULL"],
                correct: 0,
                explanation: "Returning 0 from main() indicates successful process exit without errors."
            }
        ]
    },
    {
        id: "game_dsa_2",
        category: "DSA IN C++",
        topicNumber: 2,
        topicName: "Variables and Data Types",
        title: "BOX SORTING WAREHOUSE",
        icon: "📦",
        badge: "Sorting Specialist",
        description: "You work in the automated cyber warehouse of Mirai Tech. Every memory value must be sorted into its correct type box before the clock ticks down.",
        caseFile: "Pallets of raw memory bytes are flowing down the conveyor! Assign exact C++ primitive types before memory overflows.",
        animationIcon: "📦",
        animationTitle: "Sort incoming memory payloads. Correct = conveyor clears. Wrong = buffer overflow!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Type Selection",
                clue: "Single precision floating point uses 4 bytes, double uses 8 bytes.",
                question: "Which data type accurately stores floating decimal coordinates like 3.14159?",
                code: "___ drone_altitude = 1240.75f;\nstd::cout << drone_altitude;",
                options: ["float", "int", "char", "bool"],
                correct: 0,
                explanation: "float stores single-precision 32-bit floating point numbers."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Memory Sizing",
                clue: "Standard boolean flags represent true or false in 1 byte.",
                question: "What is the standard byte size of a 'char' in modern C++?",
                code: "char security_key = 'A';\nstd::cout << sizeof(security_key);",
                options: ["1 Byte", "2 Bytes", "4 Bytes", "8 Bytes"],
                correct: 0,
                explanation: "In C++, sizeof(char) is always guaranteed to be 1 byte (8 bits)."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Constant Modifier",
                clue: "This keyword marks variables as read-only and immutable.",
                question: "Which keyword prevents a variable value from ever being modified after assignment?",
                code: "___ double GRAVITY = 9.80665;\n// GRAVITY = 10.0; -> Compiler Error!",
                options: ["const", "static", "volatile", "final"],
                correct: 0,
                explanation: "const enforces compile-time immutability on variables."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Range Check",
                clue: "Unsigned integers cannot store negative values, doubling positive range.",
                question: "Which type qualifier doubles the positive capacity by prohibiting negative numbers?",
                code: "___ int packets_transmitted = 4000000000U;",
                options: ["unsigned", "signed", "long", "short"],
                correct: 0,
                explanation: "'unsigned' removes the sign bit, allowing non-negative values up to ~4.29 billion on 32-bit."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Type Inference",
                clue: "Modern C++ (C++11) can deduce variable types automatically at compile time.",
                question: "Which keyword instructs the C++ compiler to automatically deduce the variable type?",
                code: "___ status_code = 200;\n___ server_name = \"NeoNode-7\";",
                options: ["auto", "var", "let", "dynamic"],
                correct: 0,
                explanation: "'auto' enables automatic compile-time type deduction in C++11 and higher."
            }
        ]
    },
    {
        id: "game_dsa_3",
        category: "DSA IN C++",
        topicNumber: 3,
        topicName: "Operators",
        title: "CALCULATOR BOSS BATTLE",
        icon: "⚔️",
        badge: "Operator Master",
        description: "A rogue Cyber Mecha Boss with 100 HP threatens Mirai School! Every correct operator evaluation launches an elemental plasma slash. Answer fast for critical hits!",
        caseFile: "The boss shield rotates mathematical frequencies. Compute modulo, bitwise shifts, and precedence gates to break the defenses.",
        animationIcon: "⚔️",
        animationTitle: "Channel arithmetic and bitwise energy. Correct = plasma slash lands! Wrong = counter-attack!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Arithmetic Modulo",
                clue: "The % modulo operator computes integer remainder after division.",
                question: "What is the evaluated result of 17 % 5 in C++?",
                code: "int shield_drain = 17 % 5;\nstd::cout << shield_drain;",
                options: ["2", "3", "3.4", "0"],
                correct: 0,
                explanation: "17 divided by 5 is 3 with remainder 2, so 17 % 5 = 2."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Bitwise Shift",
                clue: "Left shift (<< 1) multiplies an integer by 2.",
                question: "What is the result of (4 << 2) in binary arithmetic?",
                code: "int plasma_power = (4 << 2); // 0000 0100 shifted left by 2",
                options: ["16", "8", "32", "2"],
                correct: 0,
                explanation: "4 shifted left by 2 positions is 4 * 2^2 = 16 (binary 0001 0000)."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Ternary Operator",
                clue: "The conditional operator ? : is a compact inline if-else statement.",
                question: "What will 'status' hold in this ternary expression?",
                code: "int hp = 45;\nstring status = (hp > 50) ? \"Overdrive\" : \"Vulnerable\";",
                options: ["Vulnerable", "Overdrive", "Error", "45"],
                correct: 0,
                explanation: "Since 45 > 50 is false, the expression evaluates to the second operand 'Vulnerable'."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Pre-Increment vs Post-Increment",
                clue: "++x increments before returning value, x++ returns value first then increments.",
                question: "What is the value printed for y in this C++ snippet?",
                code: "int x = 5;\nint y = ++x * 2;\nstd::cout << y;",
                options: ["12", "10", "11", "14"],
                correct: 0,
                explanation: "Pre-increment ++x turns x into 6 first, then 6 * 2 = 12."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Logical Short-Circuit",
                clue: "In logical OR (||), if the first operand is true, the second operand is skipped.",
                question: "Will the second function call execute in this condition?",
                code: "bool pass = true || scanPerimeter();",
                options: ["No, due to short-circuit evaluation", "Yes, both always run", "Compiler error", "Only on debug build"],
                correct: 0,
                explanation: "Logical OR short-circuits immediately when the first condition is true."
            }
        ]
    },
    {
        id: "game_dsa_4",
        category: "DSA IN C++",
        topicNumber: 4,
        topicName: "if-else and switch",
        title: "MAZE RUNNER",
        icon: "🌀",
        badge: "Maze Master",
        description: "A cyber courier is trapped in a branching neon labyrinth. At every gate, the conditional code controls which portal opens.",
        caseFile: "Labyrinth gates evaluate student conditions in microseconds. Choose correct boolean branch pathways to escape the maze.",
        animationIcon: "🌀",
        animationTitle: "Navigate conditional gates. Correct = portal unlocks. Wrong = dead end collision!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Switch Statement",
                clue: "Without 'break', execution falls through into subsequent case blocks.",
                question: "What keyword is necessary to prevent fall-through in a C++ switch case?",
                code: "switch (gate_id) {\n    case 1: openPortal(); ___;\n    case 2: openVault(); ___;\n}",
                options: ["break", "return", "exit", "continue"],
                correct: 0,
                explanation: "The 'break' statement terminates the switch block immediately."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Default Case",
                clue: "This label catches all unmatched values in a switch block.",
                question: "Which label catches values that do not match any explicit case in a switch statement?",
                code: "switch (code) {\n    case 100: handleOk(); break;\n    ___: handleUnknown(); break;\n}",
                options: ["default", "else", "otherwise", "catch"],
                correct: 0,
                explanation: "'default:' acts as the fallback clause when no case matches."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Boolean Comparison",
                clue: "Single '=' is assignment, double '==' is equality comparison.",
                question: "Which operator checks for equality between two variables in C++?",
                code: "if (gate_key ___ MASTER_KEY) {\n    teleport();\n}",
                options: ["==", "=", "===", "eq"],
                correct: 0,
                explanation: "In C++, '==' checks equality while '=' performs assignment."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Branch Execution",
                clue: "Check condition bounds carefully.",
                question: "Which branch executes when energy is 75?",
                code: "if (energy > 80) charge();\nelse if (energy >= 70) stabilize();\nelse powerDown();",
                options: ["stabilize()", "charge()", "powerDown()", "None"],
                correct: 0,
                explanation: "75 is not > 80, but 75 >= 70 is true, so stabilize() executes."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Scope Declaration",
                clue: "C++17 allows initializing a variable directly inside the if statement condition.",
                question: "Is initializing a variable inside if statement (if-with-initializer) valid in C++17?",
                code: "if (auto val = readSensor(); val > 0) {\n    process(val);\n}",
                options: ["Valid in C++17 and above", "Invalid syntax", "Only in C#", "Causes memory leak"],
                correct: 0,
                explanation: "C++17 introduced if statements with initializers to limit variable scope."
            }
        ]
    },
    {
        id: "game_dsa_5",
        category: "DSA IN C++",
        topicNumber: 5,
        topicName: "Loops",
        title: "LOOP RACING TRACK",
        icon: "🏎️",
        badge: "Speed Coder",
        description: "A cyber racing car screams down the circuit. Loop logic dictates acceleration, lap times, and nitro boosts.",
        caseFile: "The race car engine timer requires exact iteration bounds. Prevent infinite loop spinouts on the high-speed track.",
        animationIcon: "🏎️",
        animationTitle: "Control high-speed loop cycles. Correct = nitro acceleration! Wrong = engine stall!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Loop Iterations",
                clue: "Count how many times i runs from 0 to strictly less than 5.",
                question: "How many times will this for loop iterate?",
                code: "for (int i = 0; i < 5; i++) {\n    accelerateNitro();\n}",
                options: ["5 times", "4 times", "6 times", "Infinite"],
                correct: 0,
                explanation: "i takes values 0, 1, 2, 3, 4 which is exactly 5 iterations."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Do-While Property",
                clue: "do-while loops evaluate the condition at the exit point.",
                question: "What is guaranteed about a do-while loop compared to a while loop?",
                code: "do {\n    checkSensors();\n} while (isOnline);",
                options: ["Executes at least once", "Never executes if condition is false", "Runs faster", "Allocates heap memory"],
                correct: 0,
                explanation: "A do-while loop always executes its body at least once before checking condition."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Loop Control",
                clue: "'continue' skips the rest of the current iteration and jumps to increment/condition.",
                question: "Which statement skips the current iteration and advances to the next cycle?",
                code: "for (int lap = 1; lap <= 10; lap++) {\n    if (hasPitStop(lap)) ___;\n    fullThrottle();\n}",
                options: ["continue", "break", "skip", "pass"],
                correct: 0,
                explanation: "'continue' skips remaining statements in current loop and proceeds to the next iteration."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Range-Based For Loop",
                clue: "C++11 range-based for loops iterate through collections seamlessly.",
                question: "Which syntax correctly iterates through vector<int> laps by const reference?",
                code: "vector<int> laps = {58, 59, 57};\nfor (___ : laps) { log(lap); }",
                options: ["const auto& lap", "int lap = 0", "var lap in laps", "each lap"],
                correct: 0,
                explanation: "'const auto& lap' avoids copying while guaranteeing immutability during iteration."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Infinite Loop Check",
                clue: "If the increment or termination condition is missing, loops spin indefinitely.",
                question: "What is the critical bug in this while loop?",
                code: "int speed = 100;\nwhile (speed > 0) {\n    std::cout << \"Decelerating...\";\n    // Missing speed--;\n}",
                options: ["Infinite loop because speed never decreases", "Syntax error", "Out of bounds", "Null pointer dereference"],
                correct: 0,
                explanation: "Without decrementing speed, speed remains 100 and condition stays true forever."
            }
        ]
    },
    {
        id: "game_dsa_6",
        category: "DSA IN C++",
        topicNumber: 6,
        topicName: "Patterns (Nested Loops)",
        title: "PATTERN BUILDER (LEGO STYLE)",
        icon: "🧱",
        badge: "Pattern Pro",
        description: "Assemble holographic voxel structures block-by-block. The nested loop code is your architectural blueprint.",
        caseFile: "Construct pyramid structures, inverted triangles, and hollow diamonds in the Mirai voxel engine.",
        animationIcon: "🧱",
        animationTitle: "Stack 3D voxels layer by layer. Correct = architectural masterpiece. Wrong = structural collapse!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Nested Loop Complexity",
                clue: "Outer loop runs N times, inner loop runs N times = N * N iterations.",
                question: "What is the time complexity of printing an N x N square star pattern?",
                code: "for(int i = 0; i < N; i++) {\n    for(int j = 0; j < N; j++) {\n        std::cout << \"* \";\n    }\n    std::cout << \"\\n\";\n}",
                options: ["O(N^2)", "O(N)", "O(log N)", "O(N^3)"],
                correct: 0,
                explanation: "Two nested loops running up to N result in quadratic O(N^2) complexity."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Triangle Boundary",
                clue: "For row i (0 to N-1), we print (i + 1) stars.",
                question: "Which inner loop condition generates a right-angled triangle of height N?",
                code: "for(int i = 1; i <= N; i++) {\n    for(int j = 1; ___; j++) {\n        std::cout << \"*\";\n    }\n    std::cout << \"\\n\";\n}",
                options: ["j <= i", "j <= N", "j < i", "j == i"],
                correct: 0,
                explanation: "j <= i ensures row 1 prints 1 star, row 2 prints 2 stars, up to row N."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Space Calculation",
                clue: "Pyramid centered patterns need (N - i) spaces before (2*i - 1) stars.",
                question: "How many leading spaces are required for row i (1-indexed) in a centered pyramid of height N?",
                code: "int spaces = ___;\nfor(int s = 0; s < spaces; s++) std::cout << \" \";",
                options: ["N - i", "N + i", "2 * i", "i - 1"],
                correct: 0,
                explanation: "For a height N pyramid, row i requires (N - i) leading spaces for centering."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Inverted Matrix",
                clue: "Start outer loop at N and decrement down to 1.",
                question: "Which loop header creates an inverted triangle pattern starting from row N down to 1?",
                code: "for(int i = N; ___; i--) {\n    for(int j = 1; j <= i; j++) std::cout << \"*\";\n    std::cout << \"\\n\";\n}",
                options: ["i >= 1", "i > N", "i == 0", "i <= 1"],
                correct: 0,
                explanation: "i >= 1 decrements from N down to 1, producing the inverted pattern."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Hollow Box Logic",
                clue: "Print stars only on the boundaries: first row, last row, first col, last col.",
                question: "What condition checks if position (i, j) is on the boundary of an N x N box?",
                code: "if (___) std::cout << \"*\";\nelse std::cout << \" \";",
                options: ["i==0 || i==N-1 || j==0 || j==N-1", "i == j", "i + j == N", "i > 0 && j > 0"],
                correct: 0,
                explanation: "Boundary cells occur whenever row or column index equals 0 or N-1."
            }
        ]
    },
    {
        id: "game_dsa_7",
        category: "DSA IN C++",
        topicNumber: 7,
        topicName: "Functions",
        title: "FUNCTION FACTORY",
        icon: "⚙️",
        badge: "Factory Boss",
        description: "Manage the high-tech automation factory of Mirai Tech. Each function is an industrial machine: feed input in, predict the product output!",
        caseFile: "Calibrate recursive pipelines, pass-by-reference gears, and overloaded machine assembly lines.",
        animationIcon: "⚙️",
        animationTitle: "Assemble modular C++ functions. Correct = factory efficiency 100%. Wrong = line jam!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Pass by Reference",
                clue: "The & ampersand symbol denotes reference passing, modifying original variable.",
                question: "Which function signature modifies the caller's integer variable directly without returning?",
                code: "void doublePower(___ x) {\n    x *= 2;\n}",
                options: ["int&", "int", "const int", "int* const"],
                correct: 0,
                explanation: "int& passes by reference, allowing in-place mutation of the caller variable."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Function Overloading",
                clue: "Functions can share the same name if their parameter lists differ in count or types.",
                question: "What is it called when two C++ functions share the same name but have different parameter types?",
                code: "int add(int a, int b);\ndouble add(double a, double b);",
                options: ["Function Overloading", "Function Overriding", "Function Shadowing", "Function Recursion"],
                correct: 0,
                explanation: "Function overloading allows multiple functions with identical names but unique signatures."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Recursion Base Case",
                clue: "Without a base case, recursive calls overflow the execution call stack.",
                question: "What prevents a recursive function from calling itself infinitely until stack overflow?",
                code: "int factorial(int n) {\n    if (n <= 1) return 1; // ___\n    return n * factorial(n - 1);\n}",
                options: ["Base Case", "Break Statement", "Memory Heap", "Virtual Table"],
                correct: 0,
                explanation: "The base case provides the termination condition for recursion."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Inline Keyword",
                clue: "'inline' suggests substituting the function body directly at call sites.",
                question: "What is the primary optimization benefit of declaring a small function 'inline'?",
                code: "inline int square(int x) { return x * x; }",
                options: ["Eliminates function call overhead", "Makes it thread safe", "Stores code on heap", "Prevents compilation"],
                correct: 0,
                explanation: "Inline functions reduce overhead by inserting the machine instructions at the call site."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Default Argument",
                clue: "Default arguments must appear trailing at the end of the parameter list.",
                question: "Where must default parameter values be declared in a function signature?",
                code: "void spawnBot(int team, int hp = 100, int speed = 20);",
                options: ["Trailing at the right side of parameter list", "At the very start only", "Any random position", "In main() only"],
                correct: 0,
                explanation: "In C++, default arguments must always be specified from right to left."
            }
        ]
    },

    // -------------------------------------------------------------
    // WEB DEVELOPMENT (HTML) (10 TOPICS)
    // -------------------------------------------------------------
    {
        id: "game_html_1",
        category: "WEB DEVELOPMENT (HTML)",
        topicNumber: 1,
        topicName: "HTML Page Structure",
        title: "BUILD THE HOUSE",
        icon: "🏛️",
        badge: "Master Builder",
        description: "A web page is like an architectural foundation. Assemble DOCTYPE, html, head, title, and body in flawless structural order.",
        caseFile: "The neo-campus web portal is missing its foundational skeleton. Erect the proper structural hierarchy.",
        animationIcon: "🏛️",
        animationTitle: "Lay HTML foundational blocks. Correct = skyscraper rises! Wrong = foundation collapses!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Declaration Tag",
                clue: "The document type preamble informs modern browsers to render in HTML5 standards mode.",
                question: "Which tag is the very first line of every modern HTML5 document?",
                code: "___ html>\n<html lang=\"en\">\n<head><title>MSOT</title></head>\n<body></body>\n</html>",
                options: ["<!DOCTYPE", "<!HTML5", "<DOCTYPE", "<HTML version=5"],
                correct: 0,
                explanation: "<!DOCTYPE html> declares the document type to be HTML5."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Head vs Body",
                clue: "Visible UI elements must live inside the <body> tag.",
                question: "Which container encapsulates all user-visible website elements (headings, buttons, cards)?",
                code: "<!DOCTYPE html>\n<html>\n  <head><meta charset=\"UTF-8\"></head>\n  <___>\n     <h1>Welcome</h1>\n  </___>\n</html>",
                options: ["<body>", "<head>", "<meta>", "<script>"],
                correct: 0,
                explanation: "The <body> element contains all visible content rendered on the browser canvas."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Tab Title",
                clue: "This tag lives inside <head> and sets the text on browser tabs and bookmarks.",
                question: "Which tag defines the title shown on the browser's tab?",
                code: "<head>\n    <___>Mirai Tech | Cyber Portal</___>\n</head>",
                options: ["<title>", "<header>", "<h1>", "<meta title>"],
                correct: 0,
                explanation: "The <title> tag inside <head> sets the browser window/tab caption."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Character Encoding",
                clue: "UTF-8 covers virtually all international characters and emojis.",
                question: "Which meta tag correctly sets universal character encoding for emojis and symbols?",
                code: "<head>\n    <meta charset=\"___\">\n</head>",
                options: ["UTF-8", "ASCII", "ISO-8859", "WIN-1252"],
                correct: 0,
                explanation: "UTF-8 is the universal standard encoding covering all languages and emoji glyphs."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Language Attribute",
                clue: "The 'lang' attribute on <html> aids search engines and screen readers.",
                question: "Which attribute on the <html> root tag sets the primary document language to English?",
                code: "<html ___=\"en\">",
                options: ["lang", "language", "locale", "type"],
                correct: 0,
                explanation: "The 'lang' attribute declares the language of the element's contents."
            }
        ]
    },
    {
        id: "game_html_2",
        category: "WEB DEVELOPMENT (HTML)",
        topicNumber: 2,
        topicName: "Headings, Paragraphs and Text Formatting",
        title: "FONT FASHION SHOW",
        icon: "✨",
        badge: "Style Star",
        description: "Step onto the cyber runway of Mirai Fashion! Plain text models appear on stage and need the perfect typographic tags.",
        caseFile: "Dress raw article manuscripts in bold, italicized, marked, and semantic heading tags.",
        animationIcon: "✨",
        animationTitle: "Style typography models. Correct = spotlight applause! Wrong = fashion disaster!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Semantic Importance",
                clue: "<strong> indicates strong semantic importance (rendered bold).",
                question: "Which tag gives text strong semantic importance and accessibility weight?",
                code: "<p>Warning: System access requires <___>Biometric Verification</___>.</p>",
                options: ["<strong>", "<b>", "<bold>", "<big>"],
                correct: 0,
                explanation: "<strong> represents strong importance, seriousness, or urgency semantically."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Heading Hierarchy",
                clue: "h1 is the most important heading, h6 is the smallest.",
                question: "Which heading tag represents the highest level in document hierarchy?",
                code: "<___>Mirai Institute of Cybernetics</___>",
                options: ["<h1>", "<h6>", "<header>", "<head>"],
                correct: 0,
                explanation: "<h1> is the primary top-level section heading in HTML."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Highlight Tag",
                clue: "<mark> highlights text with a yellow background marker.",
                question: "Which HTML5 tag highlights or marks text with background color for relevance?",
                code: "<p>The key formula is <___>E = mc^2</___> for relativity.</p>",
                options: ["<mark>", "<highlight>", "<yellow>", "<color>"],
                correct: 0,
                explanation: "The <mark> element represents text marked or highlighted for reference purposes."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Line Break Tag",
                clue: "<br> produces a single line break without starting a new paragraph.",
                question: "Which self-closing void tag inserts a single line break in text?",
                code: "<p>Neo Tokyo District 4<___>Floor 82, Cyber Tower</p>",
                options: ["<br>", "<lb>", "<break>", "<newline>"],
                correct: 0,
                explanation: "<br> produces a line break in text (carriage-return)."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Subscript vs Superscript",
                clue: "<sup> raises text for powers like x^2, <sub> lowers text like H2O.",
                question: "Which tag formats chemical formulas like H₂O with lowered subscript text?",
                code: "<p>Water molecule: H<___>2</___>O</p>",
                options: ["<sub>", "<sup>", "<small>", "<down>"],
                correct: 0,
                explanation: "<sub> specifies subscript text which renders half a character lower."
            }
        ]
    },
    {
        id: "game_html_3",
        category: "WEB DEVELOPMENT (HTML)",
        topicNumber: 3,
        topicName: "Lists",
        title: "SHOPPING LIST CHALLENGE",
        icon: "🛒",
        badge: "List Legend",
        description: "You are on a mission in the Neo-Akihabara Cyber Market! Fill your inventory cart by assembling exact list structures.",
        caseFile: "Organize disordered gadget parts into ordered (ol), unordered (ul), and definition lists (dl).",
        animationIcon: "🛒",
        animationTitle: "Organize market inventory items. Correct = cart checked out! Wrong = items scatter!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Ordered List",
                clue: "<ol> automatically numbers list items (1, 2, 3...).",
                question: "Which tag creates a numbered sequence list of instructions?",
                code: "<___>\n    <li>Insert Holo-Key</li>\n    <li>Enter Pin</li>\n    <li>Access Terminal</li>\n</___>",
                options: ["<ol>", "<ul>", "<dl>", "<list>"],
                correct: 0,
                explanation: "<ol> defines an ordered (numbered) list."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Unordered List",
                clue: "<ul> creates bulleted lists with bullet point markers.",
                question: "Which tag creates a bulleted list of unranked grocery items?",
                code: "<___>\n    <li>Quantum GPU</li>\n    <li>Optic Fiber</li>\n</___>",
                options: ["<ul>", "<ol>", "<li>", "<bullet>"],
                correct: 0,
                explanation: "<ul> defines an unordered (bulleted) list."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Description List Term",
                clue: "In <dl>, <dt> represents the term being defined, and <dd> is the description.",
                question: "Which tag defines the name or term in an HTML description list (<dl>)?",
                code: "<dl>\n    <___>RAM</___>\n    <dd>Random Access Memory</dd>\n</dl>",
                options: ["<dt>", "<term>", "<li>", "<dfn>"],
                correct: 0,
                explanation: "<dt> specifies a term/name in a description list."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Nested Lists",
                clue: "Nested lists must be placed directly inside a parent <li> element.",
                question: "Where should a sub-list (nested <ul>) be placed in valid HTML?",
                code: "<ul>\n    <li>Hardware\n        <___>\n            <li>Motherboard</li>\n        </___>\n    </li>\n</ul>",
                options: ["Inside the parent <li> item", "Directly inside <ul> without <li>", "Outside <html>", "Inside <head>"],
                correct: 0,
                explanation: "In valid HTML, nested lists must be placed inside an enclosing <li> tag."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Reversed Attribute",
                clue: "The 'reversed' boolean attribute counts down (e.g. 3, 2, 1).",
                question: "Which attribute makes an ordered list count backwards from highest to lowest?",
                code: "<ol ___>\n    <li>Winner</li>\n    <li>Runner Up</li>\n    <li>Third Place</li>\n</ol>",
                options: ["reversed", "descending", "count=\"down\"", "order=\"rev\""],
                correct: 0,
                explanation: "'reversed' is a boolean attribute that numbers list items in reverse order."
            }
        ]
    },
    {
        id: "game_html_4",
        category: "WEB DEVELOPMENT (HTML)",
        topicNumber: 4,
        topicName: "Links and Anchors",
        title: "TREASURE MAP NAVIGATION",
        icon: "🧭",
        badge: "Navigator",
        description: "Every hyperlink is an ocean route on a treasure map! Sail between cyber islands by crafting exact anchor targets.",
        caseFile: "Configure anchor hrefs, target attributes, and internal page jump fragments (#) across the archipelago.",
        animationIcon: "🧭",
        animationTitle: "Calibrate navigation hyperlinks. Correct = ship arrives safely! Wrong = shipwreck!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Href Attribute",
                clue: "href stands for Hypertext Reference.",
                question: "Which attribute specifies the destination URL of an anchor link?",
                code: "<a ___=\"https://msot.edu.in\">Visit MSOT Portal</a>",
                options: ["href", "src", "link", "target"],
                correct: 0,
                explanation: "href specifies the hyperlink target URL address."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "New Tab Target",
                clue: "target='_blank' tells browsers to open the URL in a fresh tab.",
                question: "Which target attribute value opens the linked page in a new browser tab?",
                code: "<a href=\"https://github.com\" target=\"___\">GitHub Source</a>",
                options: ["_blank", "_new", "_tab", "_self"],
                correct: 0,
                explanation: "target=\"_blank\" opens the linked document in a new window or tab."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Fragment Anchor",
                clue: "The # hash symbol links directly to an element by its id attribute.",
                question: "How do you link directly to a section with id=\"syllabus\" on the same page?",
                code: "<a href=\"___\">Jump to Syllabus</a>\n...\n<section id=\"syllabus\">...</section>",
                options: ["#syllabus", "@syllabus", "id:syllabus", "/syllabus"],
                correct: 0,
                explanation: "A hash (#) followed by element ID creates an internal page bookmark link."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Email Protocol Link",
                clue: "mailto: opens the user's default desktop email client.",
                question: "Which URL scheme opens an email client to send a message to admissions?",
                code: "<a href=\"___:support@msot.edu\">Contact Support</a>",
                options: ["mailto", "email", "sendto", "message"],
                correct: 0,
                explanation: "'mailto:' URL protocol triggers the OS default email client."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Download Attribute",
                clue: "The 'download' attribute prompts the browser to save the file rather than navigate to it.",
                question: "Which attribute instructs the browser to download the linked target file?",
                code: "<a href=\"/syllabus.pdf\" ___=\"CS301_Syllabus.pdf\">Download PDF</a>",
                options: ["download", "save", "fetch", "export"],
                correct: 0,
                explanation: "The 'download' attribute instructs browsers to download the linked URL."
            }
        ]
    },
    {
        id: "game_html_5",
        category: "WEB DEVELOPMENT (HTML)",
        topicNumber: 5,
        topicName: "Images and Media",
        title: "PHOTO GALLERY PUZZLE",
        icon: "🖼️",
        badge: "Curator",
        description: "You are the chief curator of the Mirai Holographic Art Gallery! Restore broken media embeds and configure image attributes.",
        caseFile: "Render responsive images, accessible alt tags, and embedded audio/video player streams.",
        animationIcon: "🖼️",
        animationTitle: "Restore holographic art pieces. Correct = gallery crystal clear! Wrong = visual static!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Alt Attribute",
                clue: "alt provides alternate text for screen readers and when images fail to load.",
                question: "Which attribute provides descriptive alternate text for accessibility on <img> tags?",
                code: "<img src=\"robot.png\" ___=\"3D Mecha Cyber Guardian Sentinel\">",
                options: ["alt", "title", "caption", "desc"],
                correct: 0,
                explanation: "alt attribute provides alternative information if the image cannot be viewed."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Video Player Controls",
                clue: "The 'controls' attribute adds play, pause, and volume buttons.",
                question: "Which attribute displays standard play/pause controls on an HTML5 <video> tag?",
                code: "<video src=\"lecture.mp4\" ___\"></video>",
                options: ["controls", "playbar", "buttons", "panel"],
                correct: 0,
                explanation: "'controls' adds video player buttons (play, pause, volume, seeker)."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Audio Player",
                clue: "<audio> embeds sound content such as MP3 or WAV audio tracks.",
                question: "Which tag is used to embed audio streams in an HTML document?",
                code: "<___ controls>\n    <source src=\"bgm.mp3\" type=\"audio/mpeg\">\n</___>",
                options: ["<audio>", "<sound>", "<media>", "<music>"],
                correct: 0,
                explanation: "<audio> defines sound, such as music or other audio streams."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Picture Element",
                clue: "<picture> contains <source> elements for art direction and responsive resolution switching.",
                question: "Which wrapper tag enables responsive art direction by holding multiple <source> child tags?",
                code: "<___>\n    <source media=\"(min-width: 800px)\" srcset=\"large.jpg\">\n    <img src=\"small.jpg\" alt=\"Banner\">\n</___>",
                options: ["<picture>", "<figure>", "<gallery>", "<responsive>"],
                correct: 0,
                explanation: "<picture> gives web developers more flexibility in specifying image resources."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Lazy Loading",
                clue: "loading='lazy' defers image loading until the user scrolls near it.",
                question: "Which attribute value defers loading off-screen images until they are near the viewport?",
                code: "<img src=\"huge_render.png\" loading=\"___\">",
                options: ["lazy", "defer", "async", "background"],
                correct: 0,
                explanation: "loading=\"lazy\" defers loading the image until it reaches a calculated distance from viewport."
            }
        ]
    },
    {
        id: "game_html_6",
        category: "WEB DEVELOPMENT (HTML)",
        topicNumber: 6,
        topicName: "Tables",
        title: "CLASSROOM TIMETABLE BUILDER",
        icon: "📊",
        badge: "Table Topper",
        description: "You are the class monitor of Mirai School. Rebuild the academy master schedule cell-by-cell using tabular tags.",
        caseFile: "Construct table headers (th), rows (tr), cells (td), and manage colspan / rowspan merges.",
        animationIcon: "📊",
        animationTitle: "Align class schedules into tabular grid. Correct = bell rings on time! Wrong = schedule clash!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Table Header Cell",
                clue: "<th> defines a header cell (centered and bold by default).",
                question: "Which tag defines a table header cell in a table row?",
                code: "<tr>\n    <___>Course Code</___>\n    <___>Instructor</___>\n</tr>",
                options: ["<th>", "<td>", "<thead-cell>", "<header>"],
                correct: 0,
                explanation: "<th> defines a header cell in an HTML table."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Column Span",
                clue: "colspan merges multiple columns into a single wide cell.",
                question: "Which attribute merges a single table cell across 3 horizontal columns?",
                code: "<td ___=\"3\">Lunch & Cyber Break (All Sections)</td>",
                options: ["colspan", "rowspan", "span", "merge"],
                correct: 0,
                explanation: "'colspan' specifies the number of columns a cell should span."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Row Span",
                clue: "rowspan stretches a cell vertically across multiple rows.",
                question: "Which attribute spans a single table cell vertically across 2 rows?",
                code: "<td ___=\"2\">2-Hour Lab Session</td>",
                options: ["rowspan", "colspan", "height", "vspan"],
                correct: 0,
                explanation: "'rowspan' specifies the number of rows a cell should span vertically."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Table Caption",
                clue: "<caption> provides a title or summary directly above the table.",
                question: "Which tag provides an accessible title caption directly attached to a <table>?",
                code: "<table>\n    <___>Spring 2026 CS301 Timetable</___>\n    <tr><th>Day</th>...</tr>\n</table>",
                options: ["<caption>", "<title>", "<summary>", "<header>"],
                correct: 0,
                explanation: "<caption> specifies the caption (title) of a table."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Semantic Table Sectioning",
                clue: "A standard table consists of <thead>, <tbody>, and <tfoot>.",
                question: "Which tag encapsulates the main data rows body of a table?",
                code: "<table>\n    <thead>...</thead>\n    <___>\n        <tr><td>CS301</td></tr>\n    </___>\n</table>",
                options: ["<tbody>", "<tcontent>", "<main>", "<rows>"],
                correct: 0,
                explanation: "<tbody> groups the body content in an HTML table."
            }
        ]
    },
    {
        id: "game_html_7",
        category: "WEB DEVELOPMENT (HTML)",
        topicNumber: 7,
        topicName: "Forms and Inputs",
        title: "REGISTRATION DESK RUSH",
        icon: "📝",
        badge: "Form Master",
        description: "A massive wave of new cadets arrives at Mirai Tech Admissions! Configure the right form inputs and validations before the queue overflows.",
        caseFile: "Match form fields with requirement specs. Validate email, passwords, checkboxes, and POST submissions.",
        animationIcon: "📝",
        animationTitle: "Match requirements with form fields. Correct = cadet receives ID card and passes. Wrong = queue backs up!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Container Tag",
                clue: "<form> encapsulates all input fields, buttons, and handles action/method.",
                question: "Which HTML container tag encapsulates and manages all interactive form controls?",
                code: "<___ action=\"/submit\" method=\"POST\">\n    <input type=\"text\" name=\"cadet_name\">\n    <button type=\"submit\">Register</button>\n</___>",
                options: ["<form>", "<input>", "<fieldset>", "<dialog>"],
                correct: 0,
                explanation: "<form> tag creates an HTML form for user input submission."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Password Input",
                clue: "type='password' masks keystrokes with dots or asterisks.",
                question: "Which input type securely masks user characters on screen?",
                code: "<input type=\"___\" name=\"passcode\" placeholder=\"Secret Key\">",
                options: ["password", "hidden", "secret", "mask"],
                correct: 0,
                explanation: "type=\"password\" creates a single-line text field whose characters are obscured."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Label Association",
                clue: "The 'for' attribute on <label> matches the 'id' attribute of the input control.",
                question: "Which attribute on a <label> connects it accessibility-wise to an input's id?",
                code: "<label ___=\"student_id\">Cadet ID:</label>\n<input type=\"text\" id=\"student_id\">",
                options: ["for", "to", "target", "connect"],
                correct: 0,
                explanation: "The 'for' attribute of <label> should be equal to the 'id' of the related element."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Dropdown Selection",
                clue: "<select> paired with <option> creates a dropdown menu.",
                question: "Which tag creates a selectable dropdown list in a form?",
                code: "<___ name=\"branch\">\n    <option value=\"cse\">Computer Science</option>\n    <option value=\"ai\">Artificial Intelligence</option>\n</___>",
                options: ["<select>", "<dropdown>", "<menu>", "<choice>"],
                correct: 0,
                explanation: "<select> element is used to create a drop-down list."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Required Field Validation",
                clue: "The 'required' boolean attribute prevents form submission if empty.",
                question: "Which attribute prevents form submission if the user leaves the field empty?",
                code: "<input type=\"email\" name=\"email\" ___>",
                options: ["required", "mandatory", "validate", "locked"],
                correct: 0,
                explanation: "'required' is a boolean attribute specifying that an input field must be filled out."
            }
        ]
    },
    {
        id: "game_html_8",
        category: "WEB DEVELOPMENT (HTML)",
        topicNumber: 8,
        topicName: "Semantic Tags",
        title: "CITY PLANNER",
        icon: "🏙️",
        badge: "Mayor",
        description: "You are the Chief Urban Architect of Neo-Tokyo. Every building zone in the metropolis must utilize precise semantic HTML5 tags.",
        caseFile: "Zoning laws mandate replacing generic <div> boxes with semantic <nav>, <header>, <main>, <section>, and <aside> districts.",
        animationIcon: "🏙️",
        animationTitle: "Zone cyber districts semantically. Correct = smart city powers up! Wrong = zoning code violation!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Semantic Navigation",
                clue: "<nav> wraps major navigation link blocks.",
                question: "Which semantic tag represents a section containing primary navigation links?",
                code: "<___>\n    <a href=\"#home\">Home</a>\n    <a href=\"#arcade\">Arcade</a>\n</___>",
                options: ["<nav>", "<menu>", "<links>", "<header>"],
                correct: 0,
                explanation: "<nav> defines a set of navigation links."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Sidebar Content",
                clue: "<aside> is for content indirectly related to main content (sidebars, callouts).",
                question: "Which semantic tag represents tangential sidebar content or widget side-panels?",
                code: "<___>\n    <h3>Leaderboard Widget</h3>\n    <p>Rank 1: Rahul Sharma</p>\n</___>",
                options: ["<aside>", "<sidebar>", "<section>", "<extra>"],
                correct: 0,
                explanation: "<aside> defines content aside from the page content (like a sidebar)."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Independent Article",
                clue: "<article> represents standalone, distributable self-contained content.",
                question: "Which semantic tag is best suited for a self-contained blog post or news story?",
                code: "<___>\n    <h2>Mirai Tech Hackathon Announced</h2>\n    <p>Over 500 teams registered...</p>\n</___>",
                options: ["<article>", "<section>", "<div>", "<news>"],
                correct: 0,
                explanation: "<article> specifies independent, self-contained content that can stand alone."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Main Unique Content",
                clue: "There must only be one visible <main> tag per document.",
                question: "Which semantic tag encapsulates the central dominant content unique to that page?",
                code: "<___>\n    <h1>Student Learning Portal</h1>\n    <p>Your active quests...</p>\n</___>",
                options: ["<main>", "<body>", "<center>", "<container>"],
                correct: 0,
                explanation: "<main> specifies the main unique content of a document (excluding repeating headers/footers)."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Footer Information",
                clue: "<footer> contains author info, copyright, and legal links.",
                question: "Which semantic tag is used for the bottom section of a page or article with copyright data?",
                code: "<___>\n    <p>&copy; 2026 MSOT Quest. All rights reserved.</p>\n</___>",
                options: ["<footer>", "<bottom>", "<end>", "<copyright>"],
                correct: 0,
                explanation: "<footer> defines a footer for a document or section."
            }
        ]
    },
    {
        id: "game_html_9",
        category: "WEB DEVELOPMENT (HTML)",
        topicNumber: 9,
        topicName: "div, span, Block vs Inline and Attributes",
        title: "BLOCK VS INLINE SORTING RACE",
        icon: "⚡",
        badge: "Sorting Champion",
        description: "Tags are hurtling down a high-speed conveyor belt in the Mirai rendering pipeline! Flick each tag into the Block bin or Inline bin.",
        caseFile: "Block elements take full width and start on new lines. Inline elements only occupy their content width.",
        animationIcon: "⚡",
        animationTitle: "Flick rendering tags into Block vs Inline channels. Correct = 60 FPS rendering! Wrong = layout thrashing!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "Display Classification",
                clue: "<div> starts on a new line and takes the full available width of its parent.",
                question: "Is the <div> element a Block-level or Inline-level element by default?",
                code: "<div style=\"background: red;\">Hello Neo Tokyo</div>",
                options: ["Block-level (Takes full width, starts on new line)", "Inline-level (Only wraps text width)", "Inline-block only", "None"],
                correct: 0,
                explanation: "<div> is a block-level container element taking up 100% available container width."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "Inline Container",
                clue: "<span> is an inline container used to style portions of text without breaking flow.",
                question: "Which generic inline tag is used to color or style specific words inside a paragraph?",
                code: "<p>The status is <___ class=\"text-emerald-400\">ONLINE</___> now.</p>",
                options: ["<span>", "<div>", "<p>", "<section>"],
                correct: 0,
                explanation: "<span> is an inline container used to mark up a part of text for styling."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Inline Tags Identification",
                clue: "Anchor links, bold, and spans do not break onto a new line.",
                question: "Which of the following is an Inline element by default?",
                code: "<___ href=\"#\">Cyber Link</___>",
                options: ["<a>", "<h1>", "<p>", "<ul>"],
                correct: 0,
                explanation: "<a> (anchor) is an inline element that does not start on a new line."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Class vs ID",
                clue: "ID must be unique per document, class can be reused multiple times.",
                question: "What is the key difference between the 'id' and 'class' attributes?",
                code: "<div id=\"uniqueHeader\" class=\"glowCard badge\">...</div>",
                options: ["id must be unique on page; class can be reused on multiple elements", "class must be unique; id is reusable", "id is for CSS only", "class cannot be read by JS"],
                correct: 0,
                explanation: "An 'id' attribute must be unique across the whole document; 'class' can be shared."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Custom Data Attributes",
                clue: "Custom HTML5 data attributes start with the prefix 'data-'.",
                question: "What prefix is required for storing custom data values on HTML elements?",
                code: "<button ___=\"42\" data-category=\"dsa\">Inspect</button>",
                options: ["data-user-id", "custom-id", "var-id", "attr-id"],
                correct: 0,
                explanation: "HTML5 custom data attributes must begin with the prefix 'data-'."
            }
        ]
    },
    {
        id: "game_html_10",
        category: "WEB DEVELOPMENT (HTML)",
        topicNumber: 10,
        topicName: "Comments, Entities, iframe and Meta Tags",
        title: "SECRET CODES AND HIDDEN NOTES",
        icon: "🕵️",
        badge: "Secret Agent",
        description: "You are an elite cyber intelligence spy for Mirai Academy! Decode hidden messages, escape entities, and inspect document metadata.",
        caseFile: "Parse hidden HTML comments (<!-- -->), character entities like &copy; and &lt;, viewport meta tags, and sandbox iframes.",
        animationIcon: "🕵️",
        animationTitle: "Decode hidden espionage metadata. Correct = intelligence retrieved! Wrong = message destroyed!",
        questions: [
            {
                qNumber: 1,
                qTotal: 5,
                type: "HTML Comment Syntax",
                clue: "HTML comments open with <!-- and close with -->.",
                question: "Which syntax correctly writes an invisible comment in HTML source code?",
                code: "___ Secret Admin Access Key: MSOT-2026 ___",
                options: ["<!-- Secret Admin Access Key: MSOT-2026 -->", "// Secret Admin Access Key: MSOT-2026", "/* Secret Admin Access Key: MSOT-2026 */", "# Secret Admin Access Key: MSOT-2026"],
                correct: 0,
                explanation: "HTML comments start with <!-- and end with -->."
            },
            {
                qNumber: 2,
                qTotal: 5,
                type: "HTML Character Entity",
                clue: "&lt; stands for 'less than' (<) to prevent browsers from parsing it as a tag.",
                question: "Which character entity renders the literal '<' less-than symbol in HTML without error?",
                code: "<p>If score ___ 50 then fail.</p>",
                options: ["&lt;", "&gt;", "&amp;", "&quot;"],
                correct: 0,
                explanation: "&lt; is the HTML entity for the less-than symbol (<)."
            },
            {
                qNumber: 3,
                qTotal: 5,
                type: "Embedded IFrame",
                clue: "<iframe> embeds another independent web page inside the current document.",
                question: "Which tag embeds another independent web page inside a frame within the current page?",
                code: "<___ src=\"https://example.com\" width=\"600\" height=\"400\"></___>",
                options: ["<iframe>", "<frame>", "<embed-page>", "<window>"],
                correct: 0,
                explanation: "An <iframe> is used to display a web page within a web page."
            },
            {
                qNumber: 4,
                qTotal: 5,
                type: "Mobile Viewport Meta",
                clue: "The viewport meta tag ensures responsive scaling on mobile smartphones.",
                question: "Which meta tag is required for responsive layout scaling on mobile screens?",
                code: "<meta name=\"___\" content=\"width=device-width, initial-scale=1.0\">",
                options: ["viewport", "screen", "mobile", "display"],
                correct: 0,
                explanation: "<meta name=\"viewport\" ...> gives the browser instructions on how to control page scale."
            },
            {
                qNumber: 5,
                qTotal: 5,
                type: "Non-Breaking Space Entity",
                clue: "&nbsp; inserts a space that prevents automated line wraps.",
                question: "Which entity inserts a non-breaking space between two words?",
                code: "<p>Neo&___;Tokyo</p>",
                options: ["nbsp", "space", "sp", "blank"],
                correct: 0,
                explanation: "&nbsp; stands for Non-Breaking Space in HTML."
            }
        ]
    }
];

// Attach to window
window.ARCADE_GAMES = ARCADE_GAMES;
