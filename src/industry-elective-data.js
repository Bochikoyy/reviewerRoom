// Industry Elective 1 (CSIT340) Course Revision & Study Content
// Derived directly from lecture presentation by Mr. Lance Vincent A. Salera: Introduction to ReactJS
// All page references correspond to physical slide numbers 1 to 51.

const section = (title, pages, summary, points, takeaway, table = null, figure = null) => ({ title, pages, summary, points, takeaway, table, figure });
const mc = (prompt, answer, wrong, explanation, page) => ({ type: 'mcq', prompt, answer, options: [answer, ...wrong], explanation, page });
const id = (prompt, answer, aliases, explanation, page) => ({ type: 'identification', prompt, answer, aliases, explanation, page });
const essay = (prompt, model, rubric, page) => ({ type: 'essay', prompt, model, rubric, page });

export const industryElectiveLessons = [
  {
    id: 1,
    title: 'Introduction to ReactJS',
    sourceTitle: 'Introduction to ReactJS',
    subtitle: 'From the browser’s dual engines and the DOM tree to Vanilla JavaScript limitations and React’s Virtual DOM reconciliation.',
    pages: 51,
    time: 35,
    tags: ['Web Architecture', 'DOM Tree', 'Vanilla JavaScript', 'Event Handling', 'ReactJS', 'Virtual DOM'],
    objectives: [
      'Understand browser architecture, the separation between rendering and JavaScript engines, and how HTML is parsed into the in-memory DOM tree.',
      'Analyze the limitations of Web 1.0 full-page reloads and how Web 2.0 leveraged DOM scripting for client-side interactivity.',
      'Master vanilla JavaScript core fundamentals: object properties, first-class functions, function references vs invocations, and event listener registration.',
      'Explain HTML script execution timing, parser-blocking behavior, and modern deferral mechanisms (defer and type="module").',
      'Identify the core limitations of vanilla JS state synchronization and evaluate how React’s declarative paradigm and Virtual DOM reconciliation solve them.'
    ],
    sections: [
      section(
        '1. The Browser Architecture: Dual Engines & Painting Pipeline',
        [2, 3],
        'A web browser is a client-side program that requests documents from a server and displays them on the screen. Once the server returns the requested document, the browser assumes total responsibility for everything that happens to it afterward. Internally, modern browsers operate two distinct engines: a rendering engine and a JavaScript engine.',
        [
          ['The browser’s core responsibility', 'The browser requests documents over the network from a server and displays them on screen. After receiving the document, the server disconnects and the browser takes complete ownership of document lifecycle, parsing, rendering, and in-memory management.'],
          ['The rendering engine', 'Contains the parsing and layout pipeline: it parses HTML and CSS markup, computes geometry and layout, constructs the visual page structure, and paints pixels onto the physical display screen.'],
          ['The JavaScript engine', 'A dedicated runtime environment that executes JavaScript instructions. Crucially, the JavaScript engine on its own paints nothing to the screen; it executes computational and logic tasks in memory.'],
          ['Rendering independence', 'A webpage containing zero JavaScript displays completely and accurately. The rendering engine alone is fully sufficient to parse markup and draw a finished document.'],
          ['The non-direct painting rule', 'The rendering engine does not paint pixels directly from raw HTML text. Instead, it must first parse and convert that raw text into an intermediate in-memory data structure before any pixel is rendered.']
        ],
        'Rendering engine builds and paints; JavaScript engine executes logic and paints nothing. HTML is never painted directly from raw text.',
        {
          caption: 'Architectural comparison of browser rendering engine vs JavaScript engine',
          headers: ['Engine Component', 'Primary Inputs', 'Core Operational Duty', 'Screen Painting Capability', 'JavaScript Required?'],
          rows: [
            ['Rendering Engine', 'HTML & CSS markup', 'Parses markup, constructs layout tree, computes styles, and rasterizes pixels', 'Yes — directly paints pixels to the screen', 'No — renders static pages with zero JS'],
            ['JavaScript Engine', 'JavaScript source code / bytecode', 'Executes algorithms, manages memory, evaluates expressions, and handles call stack', 'No — paints nothing on its own', 'Yes — dedicated execution runtime']
          ]
        }
      ),

      section(
        '2. The Document Object Model (DOM) Tree & In-Memory Representation',
        [4, 5, 6],
        'To render a document, the browser rendering engine parses received HTML markup exactly once and converts it into a hierarchical tree of objects held in memory. This data structure is the Document Object Model (DOM). Pixels on screen are painted strictly from the current state of this tree, and the original HTML text is completely discarded.',
        [
          ['Single-pass parsing', 'The rendering engine reads the incoming HTML stream once from top to bottom, tokenizing and converting tags into an in-memory object graph called the Document Object Model (DOM).'],
          ['Tags become memory objects', 'Every HTML element tag in the markup is instantiated as a distinct JavaScript-accessible object in browser memory.'],
          ['Nesting defines parent-child edges', 'Hierarchical nesting in the HTML source code is mapped directly into parent-child and sibling relationships between objects in the tree.'],
          ['Painting from the live tree', 'Screen pixels are rasterized and painted strictly from the current live state of the in-memory DOM tree. The browser never references the raw HTML source text again once parsing is complete.'],
          ['Server-dictated initial state', 'The DOM tree is initially constructed from whatever document the server delivered. The browser has no autonomous role in deciding what initial content the document contains.'],
          ['The DOM Tree anatomy', 'The root is the `Document` object, which branches to `HTML`, splitting into `Head` (containing `Title`) and `Body` (containing elements like `div`, `p`, `h1`, and `ul` with child `li` elements).']
        ],
        'The DOM is an in-memory tree of objects built once from HTML. The screen paints from the live tree, not from HTML source text.',
        {
          caption: 'HTML Source Code vs In-Memory DOM Tree vs Rendered Screen Pixels',
          headers: ['Representation Stage', 'Physical Form', 'Mutability in Browser', 'Role in Pixel Rendering'],
          rows: [
            ['HTML Source Markup', 'Serialized UTF-8 text string over network', 'Immutable (server file is static/fixed)', 'Parsed once into memory; never consulted again'],
            ['DOM Tree (In-Memory)', 'Hierarchical tree of live JavaScript objects in RAM', 'Fully mutable via DOM APIs', 'Single direct source from which the screen is painted'],
            ['Screen Display', 'Rasterized RGB pixels on physical viewport', 'Redrawn when corresponding DOM nodes are modified', 'Visual output displayed to the end user']
          ]
        },
        {
          src: '/images/industry-elective-1/dom-tree-diagram.png',
          alt: 'The DOM Tree Diagram showing HTML source code transformed into an in-memory object hierarchy',
          caption: 'The "DOM Tree" conversion: HTML source text on the left is parsed into an in-memory object hierarchy rooted at Document, branching through HTML into Head and Body subtrees with parent-child relationships.'
        }
      ),

      section(
        '3. Web 1.0 Architecture & The Full-Page Reload Problem',
        [7, 8, 9, 10, 11],
        'In the early era of the World Wide Web (Web 1.0), every webpage was fully assembled on the server before being delivered to the browser. Under this classic reload architecture, any user interaction that changed the screen required discarding the entire current document and requesting a completely new page from the server.',
        [
          ['Full server-side assembly', 'In Web 1.0, the HTML document was assembled in full on the server before reaching the client browser.'],
          ['Static files vs server programs', 'Early web pages were static files stored on server hard drives, returning identical files to all visitors. Later servers executed programs (e.g., CGI, early PHP) that generated dynamic HTML per request; this changed *what* was sent, but did not change *when* or *where* it was assembled.'],
          ['The browser as a passive viewer', 'In both static and server-generated scenarios, the browser’s only role was to display the finished document it received. Every single screen change required a different document.'],
          ['The reload destruction cycle', 'Clicking any hyperlink or submitting any form caused the browser to discard the current page entirely, tear down the DOM tree, and request a brand new document from the server.'],
          ['Redundant retransmission waste', 'Identical parts of the interface—navigation bars, site headers, footers, stylesheets, logos, and scripts—were repeatedly retransmitted across the network and reparsed on every interaction.'],
          ['The state destruction flaw', 'Text typed into forms was wiped out if validation failed, because the DOM nodes holding the input values were destroyed. Scroll position reset to the top, and the screen flashed white while waiting for the server response.'],
          ['The architectural mismatch', 'Full-page replacement was designed for reading academic documents, where "partially replacing a document" had no meaning. But users ultimately wanted to run interactive software applications inside browsers, not just read static papers.']
        ],
        'In Web 1.0, changing one value costs an entire document reload, destroying form input, scroll position, and wasting network bandwidth.',
        {
          caption: 'Web 1.0 Full-Page Reload Cycle vs Modern Web Application Expectations',
          headers: ['Characteristic', 'Web 1.0 Reload Model', 'Interactive Application Expectation'],
          rows: [
            ['Screen Updates', 'Tears down entire document and requests new HTML', 'Surgically modifies only the specific element that changed'],
            ['User Input State', 'Destroyed and lost upon reload', 'Preserved across user interactions and async operations'],
            ['Viewport Scroll', 'Resets to the top (0, 0) upon document load', 'Maintains scroll position and active reading focus'],
            ['Network Efficiency', 'Retransmits unchanged headers, navbars, and styling', 'Transfers only lightweight data payloads (JSON)'],
            ['Visual Continuity', 'Blank white screen during transit between pages', 'Seamless visual continuity with zero flash or flicker']
          ]
        }
      ),

      section(
        '4. Web 1.0 to Web 2.0: Scripting the DOM & Preserving In-Memory State',
        [12, 13, 14, 15, 16, 17],
        'To build interactive web software, developers needed a mechanism where changing one node in the DOM did not affect or destroy other nodes. Because the browser could not be redesigned without breaking the existing internet, new capabilities were layered on top of the original architecture by activating the JavaScript engine to script the DOM.',
        [
          ['The core technical requirement', 'Web applications required a way to update individual DOM nodes in place without incurring the cost and destruction of a full document reload.'],
          ['The backwards compatibility constraint', 'The browser could not be redesigned or re-engineered from scratch, because the entire existing global internet already depended on its established behavior and protocols.'],
          ['The layered solution', 'Every modern web capability added afterward was engineered as a layer on top of the original browser architecture.'],
          ['Waking the dormant engine', 'The first evolutionary layer activated the browser’s second engine—the JavaScript engine—which had previously sat idle while the rendering engine did all the work.'],
          ['The global document bridge', 'JavaScript runs in the second engine and was given direct access to inspect and modify the DOM tree through the global `document` object.'],
          ['In-place localized repaints', 'Modifying an object in the DOM tree causes the rendering engine to repaint only that specific region of the screen without requesting a new document from the server.'],
          ['Ephemeral client memory', 'DOM modifications made by JavaScript exist strictly in the client computer’s RAM. The original source file residing on the server is completely untouched.'],
          ['Browser refresh semantics', 'Refreshing the browser discards the modified in-memory DOM tree and rebuilds it anew from the server’s original file.'],
          ['The birth of Web 2.0', 'Pages could now accept user input, respond immediately, and exchange data with the server (via background requests) while remaining continuously loaded. Web 2.0 sites carried user-generated content (social networks, web apps).'],
          ['Web 1.0 and Web 2.0 are usage labels', 'Web 1.0 and Web 2.0 are retrospective labels describing how websites were built and used; neither is a technical version of any protocol, language, or specification.']
        ],
        'Web 2.0 was created by scripting the DOM with JavaScript, updating memory nodes in place without changing underlying internet protocols.',
        {
          caption: 'Evolution from Web 1.0 to Web 2.0 Architecture',
          headers: ['Dimension', 'Web 1.0 (Static Publishing)', 'Web 2.0 (Dynamic Application Web)'],
          rows: [
            ['Document Assembly', 'Assembled 100% on the server', 'Assembled initially on server/client, mutated continuously in browser memory'],
            ['Client Scripting', 'None or purely decorative (banners, alerts)', 'Heavy DOM scripting driving application state and UI logic'],
            ['Page Lifecycle', 'Short-lived: destroyed upon every link click or submit', 'Long-lived: single document remains loaded while state changes dynamically'],
            ['Data Exchange', 'Synchronous HTTP GET/POST causing page navigation', 'Asynchronous background requests (AJAX/Fetch) exchanging data payloads'],
            ['Content Source', 'Publisher-created content consumed passively', 'User-generated content (posts, comments, collaborative edits) created actively']
          ]
        }
      ),

      section(
        '5. Vanilla JavaScript Foundations: Objects and the document Object',
        [18, 19, 20, 21, 22, 23],
        'Vanilla JavaScript refers to the core JavaScript language and the browser’s built-in APIs without any third-party libraries or frameworks added. Everything that modern libraries like React do is built directly on top of Vanilla JavaScript. Understanding objects, properties, and variable declarations is essential.',
        [
          ['Definition of Vanilla JavaScript', 'Vanilla JavaScript denotes standard ECMAScript plus standard browser Web APIs (DOM, Fetch, Storage) with zero libraries, bundlers, or frameworks added. Nothing in React replaces Vanilla JS.'],
          ['The `document` object demystified', 'The `document` used to reach the DOM is not a special language keyword or magical compiler construct; it is an ordinary JavaScript object provided automatically by the browser in the global scope.'],
          ['JavaScript objects defined', 'An object is written as curly braces containing key-value pairs called properties, separated by commas: `const student = { name: "Ana", year: 3 };`.'],
          ['Zero boilerplate instantiation', 'Creating an object literal requires no class definition, no constructor function, and no separate file—unlike classical languages such as Java or C++.'],
          ['Dot notation property access', 'A property is accessed by writing the object’s variable name, a dot (`.`), and the property key (`student.name` returns `"Ana"`, `document.title` returns the tab title).'],
          ['DOM nodes are live objects', 'Every node in the DOM tree is an ordinary object. This is why reading or changing text is written as an ordinary property assignment: `display.textContent = "Result";`.'],
          ['`const` vs `let` bindings', '`const` names an identifier whose binding will not be reassigned. `let` names an identifier whose value can be reassigned over time.'],
          ['Universal naming capability', 'In JavaScript, anything can be named with `const` or `let`: primitive numbers and strings, object literals, arrays, and functions.']
        ],
        'document and DOM nodes are ordinary JavaScript objects. Manipulating the DOM is simply reading and writing object properties.',
        {
          caption: 'JavaScript Primitives vs Object Literals vs DOM Node Objects',
          headers: ['Category', 'Syntax Example', 'Internal Structure', 'Mutability & Property Access'],
          rows: [
            ['Primitive Values', '`const name = "Ana"; let count = 0;`', 'Single atomic scalar value stored on stack', 'Immutable; cannot add or assign properties'],
            ['Plain JavaScript Objects', '`const student = { name: "Ana", year: 3 };`', 'Collection of key-value pairs stored in heap memory', 'Mutable properties read/written via dot notation (`student.year`)'],
            ['DOM Node Objects', '`document.getElementById("add")`', 'Host object reflecting an element in the browser’s DOM tree', 'Mutable; assigning properties (`node.textContent`) causes rendering engine repaints']
          ]
        }
      ),

      section(
        '6. First-Class Functions: Declarations, Expressions, and Arrow Syntax',
        [24, 25, 26, 27, 28],
        'In JavaScript, functions are first-class values: they can be stored in variables, passed as arguments to other functions, and returned from functions. JavaScript supports multiple ways to define functions, notably function declarations, function expressions, and ES6 arrow functions.',
        [
          ['Functions as first-class citizens', 'A function in JavaScript is a value. It can be stored in a variable or object property, passed into other functions as a parameter (callbacks), and returned from another function.'],
          ['Function declarations', 'Begins with the `function` keyword followed immediately by an identifier name without assignment: `function double(n) { return n * 2; }`. Its body is enclosed in braces and must use `return` to output a value.'],
          ['Function expressions', 'Produces an anonymous function as a value and assigns it to a variable binding using `const`: `const double = function(n) { return n * 2; };`.'],
          ['Arrow functions', 'An arrow function is a compact function expression written as a parameter list, the token `=>`, and the function body: `const double = (n) => n * 2;`.'],
          ['Braced body vs concise body', 'A braced arrow body (`(n) => { return n * 2; }`) contains statements and must explicitly use the `return` keyword. A concise single-expression body (`(n) => n * 2`) implicitly returns that expression value with no braces and no `return` keyword.'],
          ['Behavioral equivalence in React', 'Declarations and expressions produce functions that behave identically when invoked. Both syntaxes appear extensively throughout modern React components and hooks.']
        ],
        'JavaScript functions are values. Arrow functions provide concise syntax and implicit returns for single expressions.',
        {
          caption: 'Comparison of JavaScript Function Syntaxes',
          headers: ['Syntax Type', 'Code Example', 'Name Assignment', 'Body Syntax', 'Return Mechanism'],
          rows: [
            ['Function Declaration', '`function double(n) { return n * 2; }`', 'Named directly in declaration statement', 'Always enclosed in curly braces `{}`', 'Explicit `return` statement required'],
            ['Function Expression', '`const double = function(n) { return n * 2; };`', 'Assigned to variable via `const`/`let`', 'Enclosed in curly braces `{}`', 'Explicit `return` statement required'],
            ['Arrow Function (Braced)', '`const double = (n) => { return n * 2; };`', 'Assigned to variable via `const`/`let`', 'Enclosed in curly braces `{}`', 'Explicit `return` statement required'],
            ['Arrow Function (Concise)', '`const double = (n) => n * 2;`', 'Assigned to variable via `const`/`let`', 'Single expression; no curly braces', 'Implicit return: evaluates and returns expression automatically']
          ]
        }
      ),

      section(
        '7. Function Execution Timing: References vs Immediate Invocations',
        [29, 30],
        'A critical concept in asynchronous JavaScript and event-driven programming is understanding the difference between evaluating a function reference and invoking a function. Writing a function’s name alone refers to the function itself, whereas adding parentheses executes it immediately.',
        [
          ['Function name alone evaluates to reference', 'Writing a function’s identifier without parentheses (`double`) evaluates to the function value itself (the executable routine). It does not run the code.'],
          ['Parentheses invoke execution immediately', 'Writing a function’s identifier followed by parentheses (`double(5)`) runs the function immediately at that line of code and evaluates to whatever value it returned (e.g., `10`).'],
          ['Passing callbacks for later execution', 'Passing `double` (the reference) hands over an executable package that the receiving system can store and run later when an event happens.'],
          ['Passing invocation results runs nothing later', 'Passing `double()` runs the function once during initialization, hands over the return value (often `undefined`), and leaves nothing to be called later.'],
          ['Receiving intent determines correctness', 'Whether to pass `fn` or `fn()` depends entirely on whether the receiving code expects an executable routine to call later (e.g., event listeners, timers) or an immediate evaluated result.']
        ],
        'Write fn without parentheses to pass code to be executed later; write fn() to execute right now and pass its return value.',
        {
          caption: 'Function Reference (fn) vs Function Invocation (fn()) in Common Scenarios',
          headers: ['Usage Context', 'Pattern', 'What Gets Passed / Assigned', 'When Does Code Execute?', 'Correctness'],
          rows: [
            ['Event Handler', '`button.onclick = add;`', 'Function reference (`add`)', 'Later, each time the user clicks the button', 'Correct: handler is ready for user interaction'],
            ['Event Handler (Bug)', '`button.onclick = add();`', 'Return value of `add()` (usually `undefined`)', 'Immediately once when the script loads', 'Incorrect: button does nothing when clicked'],
            ['Timer Callback', '`setTimeout(tick, 1000);`', 'Function reference (`tick`)', 'After 1000ms delay by the event loop', 'Correct: delayed execution'],
            ['Timer Callback (Bug)', '`setTimeout(tick(), 1000);`', 'Return value of `tick()`', 'Immediately; nothing runs after 1000ms', 'Incorrect: timer receives undefined'],
            ['Array Transform', '`[1, 2, 3].map(double)`', 'Function reference (`double`)', 'Called by `map` once for each element', 'Correct: produces `[2, 4, 6]`']
          ]
        }
      ),

      section(
        '8. The Browser Event Model & Handler Registration',
        [31, 32, 33, 34, 35, 36],
        'Browsers operate an asynchronous, event-driven model. When a user clicks a button, types into an input, submits a form, or when a document finishes loading, the browser emits an event associated with that specific node. Programs cannot predict when events occur, so event handlers must be registered in advance.',
        [
          ['What is an event?', 'An event is an asynchronous notification the browser produces when something occurs in the document. Every event is strictly associated with the specific DOM node it happened to.'],
          ['Temporal unpredictability', 'A software program cannot predict the exact millisecond a user will click or type. Therefore, code designed to respond to an event must be registered in advance before the event happens.'],
          ['Event handlers defined', 'A function registered to run when a specific event occurs is called an event handler (or event listener).'],
          ['Property registration with `onclick`', 'Assigning a function reference to an element’s `onclick` property registers that function to run on every click of that element: `document.getElementById("add").onclick = add;`.'],
          ['The parenthesis bug in handlers', 'If written with parentheses (`node.onclick = add()`), the function executes once at the exact moment the line is parsed, and whatever it returns (usually `undefined`) is assigned to `onclick`, leaving the button inert upon future clicks.'],
          ['Property handler overwrite limitation', 'A node property like `onclick` can hold only one function. Assigning a second handler completely replaces and destroys the first handler.'],
          ['Modern registration: `addEventListener`', '`node.addEventListener("click", add)` registers a handler and appends it to any existing handlers on that node without overwriting.'],
          ['Event name syntax difference', 'In `addEventListener`, the event name argument has NO "on" prefix: `"click"`, `"submit"`, `"keydown"` (unlike the property names `onclick`, `onsubmit`, `onkeydown`).']
        ],
        'Register handlers by function reference, never invocation. Use addEventListener to allow multiple independent listeners without overwriting.',
        {
          caption: 'Comparison: node.onclick Property vs node.addEventListener() Method',
          headers: ['Feature', 'Property: `node.onclick`', 'Method: `node.addEventListener()`'],
          rows: [
            ['Event Name Argument', '`"onclick"` (includes "on" prefix)', '`"click"` (omits "on" prefix)'],
            ['Multiple Handlers', 'No — assigning a new function overwrites the previous handler', 'Yes — appends additional handlers; all registered listeners fire in order'],
            ['Registration Syntax', '`btn.onclick = handleClick;`', '`btn.addEventListener("click", handleClick);`'],
            ['Removal Mechanism', '`btn.onclick = null;`', '`btn.removeEventListener("click", handleClick);`'],
            ['Industry Best Practice', 'Legacy pattern; discouraged in complex enterprise applications', 'Modern standard across web development and libraries']
          ]
        }
      ),

      section(
        '9. script Tag Execution Timing, Parser-Blocking, and Deferral',
        [37, 38, 39, 40, 41, 42],
        'JavaScript is integrated into HTML via the `&lt;script&gt;` element. By default, `&lt;script&gt;` tags are parser-blocking: the browser halts HTML parsing while executing the script. Understanding script execution timing is vital to avoid fatal null-reference errors when accessing DOM elements.',
        [
          ['The `&lt;script&gt;` element', 'Where JavaScript is placed inside an HTML document. Can contain inline code or specify an external file via the `src` attribute (`&lt;script src="app.js"&gt;&lt;/script&gt;`).'],
          ['Sequential parser-blocking execution', 'The browser reads an HTML document from top to bottom and builds the DOM tree sequentially. Reaching a standard `&lt;script&gt;` tag halts the parser: code executes to completion before HTML parsing can resume.'],
          ['The temporal existence of elements', 'Elements located physically above the `&lt;script&gt;` tag in the HTML source exist in the DOM when the script runs; elements located below the `&lt;script&gt;` do not yet exist.'],
          ['The fatal null-reference error', 'Calling `document.getElementById("btn")` for an element that sits below the script returns `null`. Attempting to read or assign a property of `null` (e.g., `null.onclick = add`) throws an unhandled `TypeError`.'],
          ['Bottom-of-body placement', 'Placing `&lt;script&gt;` at the bottom of the document right before `&lt;/body&gt;` guarantees that every element above it has already been parsed and exists in the DOM tree before code runs.'],
          ['Scripts in `&lt;head&gt;`', 'A script in the `&lt;head&gt;` runs before any `&lt;body&gt;` elements exist and is safe only if it touches no DOM nodes (e.g., utility functions or analytics setup).'],
          ['`DOMContentLoaded` event listener', 'Wrapping DOM queries inside a `DOMContentLoaded` handler ensures code runs after the entire tree is built, regardless of where the `&lt;script&gt;` tag is located.'],
          ['The `defer` attribute', '`&lt;script defer src="app.js"&gt;&lt;/script&gt;` allows the file to download in the background without blocking the parser, delaying execution until HTML parsing is completely finished.'],
          ['`type="module"` automatic deferral', '`&lt;script type="module" src="app.js"&gt;&lt;/script&gt;` automatically applies deferred execution, scoped variables, and ES module syntax, guaranteeing it never runs before the DOM is ready.'],
          ['Execution timing vs source position', 'What matters is *when* the code runs, not *where* the tag is written. Content placed after `&lt;/body&gt;` is still inserted into `&lt;body&gt;` by the parser’s error recovery, showing that parser execution timing governs DOM state.']
        ],
        'Scripts block HTML parsing. Elements below an un-deferred script do not exist yet. Use defer or type="module" to safely execute after DOM parsing.',
        {
          caption: 'JavaScript Loading and Execution Timing Strategies in HTML',
          headers: ['Placement / Attribute', 'Parser Blocking?', 'DOM Available When Running?', 'When Does Code Execute?', 'Best Use Case'],
          rows: [
            ['`&lt;script&gt;` in `&lt;head&gt;`', 'Yes — halts parser immediately', 'No — body elements return `null`', 'Immediately during `&lt;head&gt;` parsing', 'Scripts that do not touch the DOM (analytics, configs)'],
            ['`&lt;script&gt;` at bottom of `&lt;body&gt;`', 'Yes — blocks only trailing tags', 'Yes — all elements above are parsed', 'After all preceding body elements are parsed', 'Traditional legacy baseline without module bundlers'],
            ['`DOMContentLoaded` listener', 'No — registration is fast', 'Yes — guaranteed full DOM readiness', 'Fires when HTML tree is completely constructed', 'Safe DOM initialization inside head or inline scripts'],
            ['`&lt;script defer src="..."&gt;`', 'No — downloads in background', 'Yes — guaranteed full DOM readiness', 'Executes after HTML parsing finishes, before DOMContentLoaded', 'External scripts in `&lt;head&gt;` that need full DOM access'],
            ['`&lt;script type="module" src="..."&gt;`', 'No — downloads asynchronously', 'Yes — guaranteed full DOM readiness', 'Deferred automatically; runs after parsing completes', 'Modern standard for ES module architectures and React apps']
          ]
        }
      ),

      section(
        '10. Vanilla JS State Synchronization & The Imperative Burden',
        [43, 44, 45, 46],
        'In Vanilla JavaScript, there is no automatic connection between JavaScript variables in memory and the pixels rendered on the screen. Changing a variable does not update the screen. This fundamental limitation forces developers to manually write imperative DOM mutation code across every single event and callback in an application.',
        [
          ['Variable mutation does not change screen', 'Mutating a JavaScript variable in memory (`count += 1;`) alters the computer’s RAM but leaves the screen completely unchanged.'],
          ['The direct touch rule', 'Only an explicit line of code that locates and touches a DOM node changes the screen: `display.textContent = count;`.'],
          ['Variables changing are not browser events', 'The browser’s event loop observes and fires events only for user interactions (clicks, typing) or system occurrences (timers, network responses). A variable changing value in memory is NOT an event, so there is no built-in way to register a listener on variable updates.'],
          ['The imperative burden', 'Because variable changes cannot be observed, the screen must be manually updated at EVERY single place where application data changes: in every click handler, every keyboard handler, every timer interval, and every server fetch response.'],
          ['State drift and code complexity', 'In large applications, managing manual DOM synchronization across dozens of scattered handlers leads to state drift, stale UI elements, duplicated DOM code, and severe maintenance overhead.']
        ],
        'Variable changes do not trigger browser events. Vanilla JS requires manually updating DOM nodes at every place data changes.',
        {
          caption: 'Data Mutation vs DOM Synchronization in Vanilla JavaScript',
          headers: ['Action', 'Code Statement', 'Impact on Memory', 'Impact on Screen Pixels', 'Required Next Step'],
          rows: [
            ['Data Mutation', '`count += 1;`', 'Increments variable value in RAM', 'None — screen remains totally unchanged', 'Developer must manually update DOM node'],
            ['DOM Synchronization', '`display.textContent = count;`', 'Updates property of target DOM node object', 'Rendering engine repaints pixel display', 'None — screen now matches data state'],
            ['Missed Sync (Bug)', '`count += 1;` (omitted DOM line)', 'State in memory is out of sync with UI', 'Stale display: user sees old value', 'Leads to severe UI state bugs and desynchronization']
          ]
        }
      ),

      section(
        '11. ReactJS & The Declarative UI Paradigm',
        [47, 48],
        'React is an open-source JavaScript library that fundamentally solves the manual DOM synchronization problem by producing the webpage directly from data. Instead of writing imperative step-by-step instructions to find and mutate nodes, developers write declarative components that describe what the UI should look like for any given state.',
        [
          ['React defined', 'React is a JavaScript library created to produce and manage web user interfaces directly from application data.'],
          ['The declarative paradigm', 'The developer writes WHAT the page should contain for a given set of data. The developer writes zero instructions to locate, query, create, or modify actual browser DOM nodes.'],
          ['Inversion of control', 'In vanilla JS, the developer calls DOM methods to change the screen. In React, the developer does not call DOM methods; React calls the developer’s components whenever state data changes and manages DOM updates automatically.'],
          ['Minimal differential updates', 'Whenever data changes, React produces the page structure again and updates only the specific parts of the browser’s page that differ from the previous render.'],
          ['Preservation of client state', 'Because React updates existing DOM nodes in place rather than blowing away and rebuilding the entire document, user-entered text in inputs, active keyboard focus, and viewport scroll positions survive updates intact.']
        ],
        'React is declarative: you describe what the page looks like from data, and React automatically updates only the parts that changed while preserving user focus and scroll.',
        {
          caption: 'Imperative Vanilla JavaScript vs Declarative ReactJS',
          headers: ['Development Dimension', 'Imperative Vanilla JavaScript', 'Declarative ReactJS'],
          rows: [
            ['UI Description', 'How to mutate the DOM step-by-step (`getElementById`, `createElement`, `appendChild`)', 'What the UI should look like for a given data state (`return &lt;h1&gt;{count}&lt;/h1&gt;`)'],
            ['DOM Manipulation', 'Developer writes explicit instructions to locate and update nodes', 'React library handles all DOM querying and node updates internally'],
            ['State Synchronization', 'Developer must remember to sync DOM at every data change site', 'React automatically re-renders component tree whenever state changes'],
            ['Focus & Input Preservation', 'Easy to accidentally destroy inputs and reset focus during manual updates', 'React surgically updates text/attributes, preserving input focus and scroll'],
            ['Scalability', 'Complexity scales poorly; error-prone in large dynamic apps', 'Components compose cleanly; UI remains predictable as apps grow']
          ]
        }
      ),

      section(
        '12. The Virtual DOM Architecture & Reconciliation Diffing',
        [49, 50, 51],
        'React achieves performant, declarative updates through its Virtual DOM architecture. Rather than querying or manipulating the slow browser DOM directly, React maintains its own lightweight in-memory tree of JavaScript objects describing the intended page structure. When data changes, React diffs two virtual trees and surgically updates the real DOM.',
        [
          ['Browser DOM still paints pixels', 'The browser still paints from the real DOM tree; React does not replace the browser’s native rendering engine or real DOM.'],
          ['Virtual DOM defined', 'React maintains its own in-memory tree of plain JavaScript objects describing what the webpage structure should contain.'],
          ['The reconciliation lifecycle', 'When application data changes, React produces a brand new version of its own Virtual DOM tree and compares it against the previously rendered Virtual DOM tree.'],
          ['Diffing is purely in-memory', 'The reconciliation comparison (diffing) takes place entirely in memory between React’s own two virtual versions. The slow real browser DOM is NEVER read during this diffing process.'],
          ['Virtual DOM is the source of truth', 'React’s Virtual DOM tree is the single source of truth; the browser’s real DOM is merely a projection produced from it.'],
          ['Surgical minimal rendering', 'After diffing, React computes the minimal set of DOM operations required and applies them in a batch to the real DOM (e.g., appending only the new child `&lt;span&gt;` shown on slide 51 while leaving parent `&lt;div&gt;` elements untouched).']
        ],
        'React keeps an in-memory Virtual DOM as the source of truth, diffs two virtual versions without touching the real DOM, and patches only the differing nodes.',
        {
          caption: 'Real Browser DOM vs React Virtual DOM',
          headers: ['Attribute', 'Real Browser DOM', 'React Virtual DOM'],
          rows: [
            ['Representation', 'Native browser C++ host objects with heavy APIs and style calculation hooks', 'Lightweight, plain JavaScript objects in memory (`{ type: "div", props: {} }`)'],
            ['Access & Mutation Cost', 'Very expensive: triggers recalculate styles, reflow, layout, and repaints', 'Extremely cheap and fast: simple in-memory object allocation and property checks'],
            ['Diffing Location', 'Never diffed directly; reading layout properties forces synchronous reflows', 'Diffed entirely in JavaScript memory between two virtual tree snapshots'],
            ['Update Strategy', 'Imperative, piecemeal updates or destructive innerHTML replacements', 'Batched, surgical reconciliation applying only the minimal delta to the screen']
          ]
        },
        {
          src: '/images/industry-elective-1/virtual-dom-diffing.png',
          alt: 'Virtual DOM Diffing Diagram showing Existing Virtual DOM vs After Update and minimal Render to Original DOM',
          caption: 'Reconciliation in action: When state changes, React compares the Existing Virtual DOM with the After Update Virtual DOM. In this case, only a single new child span was added to the center div; React surgically patches the Original DOM by appending just that span, leaving all surrounding div nodes untouched.'
        }
      )
    ],
    questions: [
      // 15 Multiple Choice Questions (1-15)
      mc(
        'What is the primary operational responsibility of a web browser’s rendering engine?',
        'Parsing HTML and CSS, building the page layout structure, and painting pixels to screen',
        [
          'Executing JavaScript computational logic and managing network sockets',
          'Managing server-side databases and compiling server-side scripts',
          'Painting pixels directly from raw incoming HTML source text without parsing'
        ],
        'The rendering engine parses HTML and CSS markup, constructs the visual layout tree, and paints pixels on the physical screen. It does not execute JavaScript logic or paint directly from unparsed text.',
        2
      ),
      mc(
        'How does a webpage display in a browser if it contains zero JavaScript code?',
        'It displays completely and correctly because the rendering engine alone is sufficient to draw a document',
        [
          'It fails to render because the JavaScript engine is required to trigger initial pixel painting',
          'It displays only raw text because CSS cannot be applied without JavaScript execution',
          'It renders with a blank screen until a JavaScript polyfill is fetched from the server'
        ],
        'A page containing no JavaScript displays correctly because the rendering engine alone is fully sufficient to parse markup and draw a document. The JavaScript engine executes code and paints nothing.',
        3
      ),
      mc(
        'How does the browser rendering engine construct the Document Object Model (DOM) from received HTML markup?',
        'It parses the HTML text once and converts it into an in-memory tree of objects where tags become objects and nesting forms parent-child relationships',
        [
          'It continuously re-reads the HTML file from disk every time the screen needs to be repainted',
          'It compiles the HTML text directly into binary machine code instructions executed by the CPU',
          'It transmits the HTML string back to the server to verify the tree structure before drawing'
        ],
        'The rendering engine parses the received HTML once and converts it into an in-memory tree of objects. Each tag becomes an object, and nesting in source code becomes a parent-child relationship.',
        4
      ),
      mc(
        'Once HTML parsing is complete, what source do screen pixels paint from during subsequent rendering?',
        'From the current live state of the in-memory DOM tree, without consulting the HTML text again',
        [
          'Directly from the original HTML text received from the server',
          'From a cached snapshot stored on the server hard drive',
          'From the JavaScript call stack after every function execution'
        ],
        'The pixels on screen are painted from the current state of the DOM tree. The HTML text is no longer consulted once parsing is complete.',
        6
      ),
      mc(
        'Why was the Web 1.0 full-page reload model architecturally inefficient when users interacted with a page?',
        'Following a link or submitting a form discarded the entire page, forcing unchanged components like navigation and styling to be retransmitted and reparsed',
        [
          'It executed excessive client-side JavaScript that overloaded the client CPU',
          'It required client browsers to pre-render the entire global internet on disk',
          'It prevented web servers from generating dynamic HTML content using database scripts'
        ],
        'In Web 1.0, following a link or submitting a form discarded the current page entirely. Parts of the page identical to the ones arriving (navigation, headers, styling) were retransmitted and reparsed anyway.',
        9
      ),
      mc(
        'Which user experience defect directly resulted from the Web 1.0 reload architecture when a form was submitted?',
        'Text typed into the form was lost because the DOM nodes holding it were destroyed upon reload',
        [
          'The server permanently rejected any further HTTP connections from that client IP',
          'The browser rendering engine was forced to restart the entire operating system',
          'All CSS stylesheets were permanently deleted from the browser cache'
        ],
        'In Web 1.0, text typed into a form was lost when a page reloaded because the DOM nodes holding the input text were destroyed when the browser discarded the document.',
        10
      ),
      mc(
        'How did the introduction of client-side JavaScript in Web 2.0 change how DOM modifications affect the server?',
        'Modifications exist only in client browser memory; the original source file on the server remains completely unchanged',
        [
          'Modifications immediately overwrite the server-side HTML file on disk via HTTP PUT',
          'Modifications are stored in the server database and permanently alter the page for all visitors',
          'Modifications cause the server to recompile the browser rendering engine'
        ],
        'JavaScript modifies objects in the in-memory DOM tree. The modification exists only in browser memory, and the file on the server is completely unchanged. Refreshing discards the modified tree and rebuilds it from the original file.',
        14
      ),
      mc(
        'What is the true nature of the `document` identifier used to access the DOM in JavaScript?',
        'It is an ordinary JavaScript object provided by the browser environment, not a reserved language keyword',
        [
          'It is a reserved JavaScript keyword built directly into the ECMAScript compiler syntax',
          'It is a special binary stream connection to the server operating system',
          'It is a CSS selector engine that operates independently of JavaScript memory'
        ],
        'The `document` used to reach the DOM is not a special keyword. It is an ordinary JavaScript object the browser makes available to every page.',
        20
      ),
      mc(
        'What is the fundamental distinction between declaring an identifier with `const` versus `let` in JavaScript?',
        '`const` names a value binding that will not be reassigned, whereas `let` names a value binding that can be reassigned',
        [
          '`const` can only hold primitive numbers, whereas `let` can only hold objects and functions',
          '`const` variables are stored on the server, whereas `let` variables are stored in the browser',
          '`const` requires an explicit class definition, whereas `let` requires a constructor function'
        ],
        '`const` names a value that will not be reassigned and `let` names a value that will be reassigned. Anything can be named this way—a number, a string, an object, or a function.',
        23
      ),
      mc(
        'Which feature distinguishes a concise single-expression arrow function from a braced arrow function in JavaScript?',
        'A single-expression arrow function implicitly returns its expression value with no braces and no `return` keyword',
        [
          'A single-expression arrow function cannot accept parameters',
          'A single-expression arrow function executes synchronously while braced arrow functions execute asynchronously',
          'A single-expression arrow function creates a new HTML tag in the DOM tree automatically'
        ],
        'An arrow function with a braced body contains statements and must use `return` to produce a value. A body written as a single expression returns that expression automatically, with no braces and no `return` keyword.',
        27
      ),
      mc(
        'In asynchronous JavaScript programming, what is the critical difference between writing `double` versus `double(5)`?',
        '`double` evaluates to the callable function reference itself, whereas `double(5)` executes immediately and evaluates to its return value',
        [
          '`double` executes the function immediately, whereas `double(5)` delays execution by 5 seconds',
          '`double` converts the function into an HTML tag, whereas `double(5)` paints 5 pixels',
          '`double` is a function declaration, whereas `double(5)` is an arrow expression'
        ],
        'A function’s name written alone evaluates to the function reference itself. A function’s name followed by parentheses runs the function immediately and evaluates to whatever it returned.',
        29
      ),
      mc(
        'What happens if an event handler is registered incorrectly using parentheses, as in `button.onclick = add();`?',
        '`add` executes once immediately at the moment the script runs, and its return value (typically undefined) is assigned to onclick, leaving the button unresponsive to clicks',
        [
          '`add` is successfully registered and will execute twice every time the user clicks',
          'The browser pauses execution and asks the user for permission to execute the function',
          'The button element is automatically removed from the DOM tree due to a syntax error'
        ],
        'A function call with parentheses (`add()`) calls the function once at the moment the line runs and stores its return value instead. Since `add` usually returns nothing (`undefined`), nothing is registered to handle subsequent clicks.',
        34
      ),
      mc(
        'Why does calling `document.getElementById("btn")` return `null` if the `&lt;script&gt;` tag is placed in the `&lt;head&gt;` without deferral attributes?',
        'The browser parses HTML sequentially from top to bottom; elements in the body do not yet exist in the DOM when a script in the head executes',
        [
          'The `getElementById` method is only supported for elements located inside the head',
          'The browser requires all elements to be styled with CSS before they can be selected by ID',
          'The JavaScript engine disables all DOM querying methods while inside the head tag'
        ],
        'The browser reads HTML top-to-bottom and builds the tree as it goes. Reaching a script element stops that process. Elements above the script exist in the tree when the code runs, and elements below it do not yet exist, so querying them returns `null`.',
        38
      ),
      mc(
        'What does the `defer` attribute on an external `&lt;script defer src="app.js"&gt;&lt;/script&gt;` tag do?',
        'It downloads the script in the background and delays execution until HTML parsing is completely finished',
        [
          'It delays script execution until the user clicks somewhere on the page',
          'It executes the script before any CSS styles are downloaded or parsed',
          'It prevents the script from executing if the device is running in offline mode'
        ],
        'The `defer` attribute delays execution until parsing is complete, from any position in the document. Similarly, `type="module"` applies that deferral automatically.',
        41
      ),
      mc(
        'How does React’s reconciliation algorithm update the browser DOM when application data changes?',
        'React produces a new Virtual DOM tree, compares its two in-memory versions without reading the real DOM, and applies only the minimal differing changes to the browser DOM',
        [
          'React discards the entire browser DOM and rebuilds every HTML element from scratch on every state update',
          'React reads the real browser DOM repeatedly in a loop to detect visual changes made by the user',
          'React sends the new state to the web server so the server can recompile and retransmit a new HTML document'
        ],
        'React keeps its own tree of objects (Virtual DOM). When data changes, React produces a new version of its tree and compares it against the previously rendered version entirely in memory. The DOM is never read during diffing, and React updates only the parts that differ.',
        49
      ),

      // 10 Identification Questions (16-25)
      id(
        'Name the in-memory hierarchical tree of objects created by the browser rendering engine by parsing received HTML markup.',
        'Document Object Model',
        ['DOM', 'DOM tree', 'Document Object Model (DOM)'],
        'The Document Object Model (DOM) is the in-memory tree of objects built once from HTML markup by the browser rendering engine, from which all screen pixels are painted.',
        4
      ),
      id(
        'Name the internal browser subsystem that executes JavaScript code and paints nothing to the screen on its own.',
        'JavaScript engine',
        ['JS engine', 'JavaScript Engine'],
        'The JavaScript engine executes JavaScript code in memory and paints nothing to the screen on its own. The rendering engine is responsible for parsing HTML/CSS and painting pixels.',
        3
      ),
      id(
        'What historical label was applied retrospectively to describe dynamic websites where pages accept input and exchange data while remaining loaded, driven by user-generated content?',
        'Web 2.0',
        ['web 2.0', 'Web 2'],
        'Web 2.0 describes dynamic websites where pages accept input, respond immediately, and exchange data with servers while remaining continuously loaded, without full-page reloads.',
        16
      ),
      id(
        'What term denotes the core JavaScript programming language and built-in browser Web APIs without any third-party framework or library added?',
        'Vanilla JavaScript',
        ['Vanilla JS', 'vanilla javascript', 'vanilla js'],
        'Vanilla JavaScript refers to the standard JavaScript language and built-in browser capabilities (DOM, Fetch) with no library or framework added. Everything React does is built on top of Vanilla JS.',
        19
      ),
      id(
        'What programming language concept describes functions in JavaScript that can be stored in variables, passed to other functions as arguments, and returned from functions like any other value?',
        'First-class functions',
        ['first class functions', 'first-class citizens', 'first class citizen', 'first-class values'],
        'In JavaScript, functions are first-class citizens (or first-class values), meaning they can be assigned to variables, passed as arguments, and returned from other functions.',
        24
      ),
      id(
        'What term describes a function registered to run when a specific browser notification (such as a click or keypress) occurs on a target DOM node?',
        'Event handler',
        ['event listener', 'handler', 'listener'],
        'An event handler is a function registered to run when a specific browser event occurs on a target DOM node (e.g., via `onclick` or `addEventListener`).',
        33
      ),
      id(
        'Name the modern DOM method that registers an event handler on a node and appends it to any existing handlers without overwriting them.',
        'addEventListener',
        ['addEventListener()', 'node.addEventListener'],
        '`addEventListener` registers an event handler and appends it to any existing handlers on that node without overwriting them, using event names without the "on" prefix (e.g., "click").',
        36
      ),
      id(
        'Name the standard browser event that fires when the HTML document has been completely parsed and the entire DOM tree is built, regardless of where script tags sit.',
        'DOMContentLoaded',
        ['DOMContentLoaded event'],
        'Code registered inside a `DOMContentLoaded` event handler runs after the entire DOM tree is constructed by the parser, making it safe to query and mutate elements regardless of script position.',
        40
      ),
      id(
        'Name the boolean HTML attribute that delays external script execution until document parsing is complete, allowing scripts in the head to download in parallel.',
        'defer',
        ['defer attribute'],
        'The `defer` attribute tells the browser to download the script in parallel with HTML parsing and delay execution until parsing is fully complete.',
        41
      ),
      id(
        'Name the lightweight in-memory tree of JavaScript objects maintained by React to describe what the page should contain and calculate minimal real DOM updates.',
        'Virtual DOM',
        ['VDOM', 'virtual dom', 'React Virtual DOM'],
        'The Virtual DOM is React’s in-memory tree of objects representing the UI. React diffs two virtual trees when data changes and applies only minimal differential patches to the real browser DOM.',
        49
      ),

      // 5 Comprehensive Essay Questions (26-30)
      essay(
        'Compare the distinct architectural roles and operational boundaries of the browser’s rendering engine versus its JavaScript engine, explaining how raw HTML markup is transformed into the DOM tree and painted to screen.',
        'The modern browser relies on two separate internal engines with distinct operational boundaries: the rendering engine and the JavaScript engine. 1) Dual Engine Roles: The rendering engine is responsible for parsing HTML markup and CSS stylesheets, calculating layout geometry, building the visual structure of the page, and painting physical pixels to the screen. In contrast, the JavaScript engine is a computational runtime that executes JavaScript source code and bytecode in memory; on its own, it paints nothing to the display screen. A webpage containing zero JavaScript renders completely and accurately because the rendering engine alone is sufficient to draw a document. 2) The Non-Direct Painting Transformation: The rendering engine never paints pixels directly from raw incoming HTML text. Instead, it reads the received HTML markup in a single sequential pass, tokenizing tags and converting them into an in-memory graph of live objects known as the Document Object Model (DOM). In this tree, every HTML tag becomes a distinct object held in memory, and nesting in the source markup is transformed into parent-child relationships between objects. 3) Painting from the Live Tree: Once HTML parsing finishes, the raw HTML text is completely discarded and is never consulted again. Screen pixels are rasterized and painted strictly from the current live state of the in-memory DOM tree. The server dictates what the initial document contains, and the browser merely reflects that tree state onto the screen.',
        [
          'Differentiates the rendering engine (parses HTML/CSS, computes layout, paints pixels) from the JavaScript engine (executes code, paints nothing on its own).',
          'Explains the transformation from raw HTML text into the in-memory DOM tree where tags become objects and nesting forms parent-child relationships.',
          'Emphasizes that screen pixels are painted strictly from the current in-memory DOM tree and that raw HTML text is discarded after parsing.'
        ],
        4
      ),
      essay(
        'Analyze the architectural limitations of the Web 1.0 full-page reload model, and explain how client-side DOM scripting gave rise to Web 2.0 without changing core internet protocols.',
        '1) Web 1.0 Architecture & Limitations: In Web 1.0, documents were assembled in full on the server before reaching the browser. Early sites delivered static disk files; later sites ran server scripts that dynamically generated HTML per request. In both cases, the browser acted solely as a passive viewer of finished documents. Every visual change required discarding the current document, tearing down the DOM tree, and requesting a brand new page. This reload model had three fatal drawbacks: redundant retransmission of unchanged UI chrome (navbars, headers, stylesheets), loss of transient client state (form inputs were wiped out because memory nodes holding them were destroyed), and visual disruption (scroll position reset to the top, accompanied by a white flash while waiting for the server). This behavior was designed for reading academic hypertext, but mismatched user demand for interactive software applications. 2) The Backward Compatibility Constraint: The browser could not be re-engineered from scratch because the entire global internet already depended on its existing behavior. Therefore, all new capabilities had to be layered on top of the original design. 3) The Web 2.0 Evolution: The first evolutionary layer activated the dormant JavaScript engine by granting it access to the DOM via the global `document` object. By mutating DOM objects directly in memory, JavaScript triggered localized screen repaints without requesting a new document from the server. Modifications existed strictly in browser RAM while server files remained untouched. Pages could now accept input, respond immediately, and exchange background data (AJAX/Fetch) while staying loaded, unlocking rich user-generated content. Web 1.0 and Web 2.0 were retrospective usage labels, not versions of any network technology.',
        [
          'Details the flaws of Web 1.0 full-page reloads: discarding the document, retransmitting static assets, wiping form input, resetting scroll position, and blank screen flashes.',
          'Explains the backward compatibility constraint and how new capabilities were added as layers on top of the original browser design.',
          'Describes the emergence of Web 2.0 via JavaScript mutating in-memory DOM objects through the document object, enabling dynamic updates without full-page reloads.'
        ],
        12
      ),
      essay(
        'Contrast function references with function invocations in asynchronous event handling, detailing the common bug that occurs with `button.onclick = handleClick()` versus `button.addEventListener(\'click\', handleClick)`.',
        '1) References vs Invocations: In JavaScript, a function’s name written alone (`handleClick`) evaluates to the function reference itself—the executable routine stored as a first-class value. Adding parentheses (`handleClick()`) immediately invokes the function at that exact moment in code execution and evaluates to whatever value the function returns. In asynchronous event-driven programming, the receiving system must be given a function reference so that it has an executable routine to call later when an event fires. 2) The Fatal Parenthesis Bug: When a developer writes `button.onclick = handleClick();`, the JavaScript engine executes `handleClick()` immediately during script parsing. Because most event handler functions return nothing (`undefined`), the assignment evaluates to `button.onclick = undefined;`. As a result, the function runs once at page load when it was not wanted, and nothing is registered to handle future user clicks, leaving the button completely broken. To correctly register a handler using properties, one must write `button.onclick = handleClick;` without parentheses. 3) Comparison with `addEventListener`: Beyond avoiding invocation timing errors, `button.addEventListener("click", handleClick)` is superior to property assignment. While `button.onclick` holds only a single function reference (meaning assigning a second function completely overwrites and destroys the first), `addEventListener` appends handlers, allowing multiple independent functions to listen to the same event on the same element. Furthermore, `addEventListener` uses standard event names without the "on" prefix (`"click"` instead of `"onclick"`).',
        [
          'Contrasts function references (`fn`, hands over callable code for later) with invocations (`fn()`, executes immediately and evaluates to return value).',
          'Explains the fatal parenthesis bug in `node.onclick = fn()`: executes once at initialization, assigns `undefined`, and leaves the button unresponsive.',
          'Details why `addEventListener` is preferred: appends multiple listeners without overwriting, omits the "on" prefix, and follows modern web standards.'
        ],
        34
      ),
      essay(
        'Trace the execution timing of `&lt;script&gt;` tags during browser HTML parsing, explaining why DOM queries can return `null`, and compare the solutions: bottom-of-body placement, `DOMContentLoaded`, `defer`, and `type="module"`.',
        '1) Parser-Blocking & The Null Reference Trap: The browser reads HTML documents sequentially from top to bottom, tokenizing markup and constructing DOM nodes as it proceeds. When the HTML parser encounters a standard `&lt;script&gt;` tag, it halts document parsing completely: the script must be downloaded and executed to completion before the parser can resume. Consequently, elements physically located above the script tag exist in the DOM tree at execution time, but elements located below the script do not yet exist. If a script in the `&lt;head&gt;` or middle of the page attempts to query an element below it (e.g., `document.getElementById("btn")`), the method returns `null`. Attempting to read properties on `null` (such as `null.onclick = handler`) immediately throws an unhandled `TypeError: Cannot read properties of null`, crashing the application script. 2) Traditional Bottom-of-Body Fix: Placing `&lt;script&gt;` at the bottom of `&lt;body&gt;` ensures that all preceding markup has already been parsed into the DOM before the script runs. However, this delays script downloading until the entire HTML has been processed. 3) Event-Driven `DOMContentLoaded`: Wrapping code inside `document.addEventListener("DOMContentLoaded", ...)` allows a script in the `&lt;head&gt;` to register a listener that fires only after the HTML parser finishes building the full DOM tree. 4) Modern Attributes (`defer` and `type="module"`): The `defer` attribute allows external scripts to download asynchronously in the background while HTML parsing continues, but guarantees execution is deferred until parsing is complete. Similarly, `&lt;script type="module"&gt;` automatically applies deferred execution, provides strict scoping, and enables ES module imports, ensuring scripts never execute prematurely.',
        [
          'Explains parser-blocking execution: scripts stop HTML parsing; elements below do not exist in the DOM, causing queries to return `null` and throw TypeErrors.',
          'Discusses the traditional bottom-of-body placement and the `DOMContentLoaded` event listener for waiting until the DOM tree is constructed.',
          'Compares modern `defer` and `type="module"` attributes: non-blocking parallel download with execution deferred until HTML parsing completes.'
        ],
        38
      ),
      essay(
        'Explain why manual DOM synchronization is a fundamental limitation in Vanilla JavaScript, and detail how React’s declarative paradigm and Virtual DOM reconciliation diffing overcome it.',
        '1) The Vanilla JS Synchronization Dilemma: In Vanilla JavaScript, there is no reactive link between JavaScript memory variables and the rendered screen. Mutating a variable (`count += 1;`) alters RAM but leaves the screen unchanged; only an explicit line of code that locates and touches a DOM node (`display.textContent = count;`) updates pixels. Furthermore, variable mutations in memory are not browser events, so developers cannot attach event listeners to variables. Consequently, developers are forced to manually write imperative DOM synchronization code at every single site where data changes: in button click handlers, form inputs, timers, and asynchronous server fetch callbacks. In complex interfaces, this manual imperative approach leads to state drift, missed UI updates, duplicate code, and fragile spaghetti architecture. 2) React’s Declarative Solution: React inverts this model by introducing a declarative paradigm where developers write *what* the UI should look like for any given state, writing zero imperative code to locate or mutate DOM nodes. The developer does not call React to manipulate the screen; React calls the developer’s components whenever data changes. User focus, text cursor positions, and scroll offsets survive updates because existing nodes are updated in place rather than destroyed. 3) The Virtual DOM & Reconciliation: React achieves high performance through an in-memory Virtual DOM—a lightweight tree of plain JavaScript objects describing the UI. When state changes, React constructs a new Virtual DOM tree and compares it against the previous Virtual DOM tree. This diffing process happens entirely in memory between React’s own two object trees; the slow browser DOM is never touched or read during diffing. React calculates the minimal delta (such as appending a single child `&lt;span&gt;` to an existing `&lt;div&gt;`) and surgically applies that minimal batch update to the real browser DOM.',
        [
          'Explains the Vanilla JS limitation: variable changes are not browser events, forcing developers to manually synchronize DOM nodes at every place data changes.',
          'Defines React’s declarative paradigm: developers describe UI from data without writing imperative DOM queries, preserving user focus and scroll state.',
          'Details the Virtual DOM and reconciliation diffing: in-memory comparison of two virtual trees without reading real DOM, applying minimal surgical patches to the screen.'
        ],
        47
      )
    ]
  },
{
    id: 2,
    title: 'Anatomy of ReactJS',
    sourceTitle: 'Anatomy of ReactJS',
    subtitle: 'Project structure, module evaluation, root mounting, JSX transformation, StrictMode, and component rendering.',
    pages: 27,
    time: 25,
    tags: ['Project Anatomy', 'Tooling', 'ES Modules', 'createRoot', 'render()', 'JSX', 'StrictMode', 'App Component'],
    objectives: [
      'Contrast vanilla JavaScript imperative node locating with React’s single-mount declarative paradigm.',
      'Master the file and tooling anatomy of a modern React application, distinguishing source code from configuration and dependencies.',
      'Analyze the architecture of index.html, the “missing content” paradox, and the role of the root container element.',
      'Explain ES module scoping, import/export mechanics, and why type="module" guarantees deferred execution after DOM parsing.',
      'Deconstruct main.jsx and App.jsx, understanding the separation between react and react-dom, createRoot().render(), JSX compilation, and StrictMode double execution.'
    ],
    sections: [
      section(
        '1. The React Paradigm Shift: Locating Nodes Once vs Vanilla JS',
        [1, 2],
        'In traditional vanilla JavaScript, updating a webpage requires the developer to imperatively name and locate the target DOM node at every single location where application data changes. React fundamentally alters this relationship: the developer declares what the page should contain for any given set of data and writes zero instructions to locate or modify a node. Locating a DOM node is not absent from a React application; it simply occurs exactly once.',
        [
          ['The vanilla JS imperative burden', 'In vanilla JavaScript, every data change requires an explicit command to locate a DOM node (e.g., getElementById or querySelector) and mutate its properties (e.g., textContent or innerHTML). As the application grows, locating and synchronizing nodes across dozens of event handlers becomes brittle and error-prone.'],
          ['The declarative contract', 'In React, the developer writes a component that describes what the interface should look like for a given state. The developer writes no code to find nodes, create nodes, or update properties.'],
          ['The single-lookup architecture', 'Locating a node in the real browser DOM is not absent from React; it occurs exactly once during application bootstrapping. React takes ownership of that single root node and handles all subsequent rendering internally.'],
          ['Separation of data from mutation', 'Because the developer never queries the DOM, application logic focuses entirely on data state. When state changes, React recalculates the view without the developer ever writing a node lookup.']
        ],
        'Vanilla JS requires locating nodes at every place data changes; React locates a DOM node once and derives the interface purely from data.',
        {
          caption: 'Imperative Node Locating in Vanilla JS vs Declarative Single Mount in ReactJS',
          headers: ['Architectural Aspect', 'Vanilla JavaScript (Imperative)', 'ReactJS (Declarative)'],
          rows: [
            ['DOM Node Lookup Frequency', 'Repeated at every single point of data mutation', 'Executed exactly once during initial bootstrapping'],
            ['Lookup Method Used', 'Imperative host APIs (getElementById, querySelector)', 'Single document.getElementById("root") passed to createRoot'],
            ['Developer Focus', 'How to find nodes and how to apply surgical mutations', 'What the page contains for a given set of data'],
            ['Risk of Stale UI Bugs', 'High — omitting one DOM update leaves UI out of sync', 'Eliminated — UI automatically reflects current data state'],
            ['DOM Ownership', 'Shared across multiple scattered scripts and handlers', 'Centralized under React’s root container object']
          ]
        }
      ),

      section(
        '2. Project Anatomy: Source Code vs Tooling & Configuration',
        [3, 4, 5, 6],
        'A modern React application created with build tools (such as Vite) contains files generated by tooling rather than written by hand. Out of the entire project tree, exactly three files contain everything the application actually does: index.html, src/main.jsx, and src/App.jsx. All remaining entries in the project are configuration files, dependencies, documentation, and tooling assets.',
        [
          ['The three essential application files', 'Everything the application does lives in three files: index.html (the entry HTML shell), src/main.jsx (the JavaScript bootstrap entrypoint), and src/App.jsx (the root React component). Every visual element and interaction originates here.'],
          ['package.json manifest', 'Declares project metadata, which third-party packages the project requires (dependencies and devDependencies), and which command scripts it supports (such as dev, build, lint, and preview).'],
          ['package-lock.json reproducibility', 'Records the exact semantic version, dependency tree, and cryptographic integrity hashes of every installed package, ensuring that running an install on another machine reproduces the identical environment down to the exact commit.'],
          ['node_modules directory', 'Holds the physical downloaded packages, binaries, and dependencies. It is generated automatically by the package manager and should never be edited by hand or committed to version control.'],
          ['Tooling configuration files', 'vite.config.js configures the bundler, development server, and plugins (e.g., Tailwind CSS or React plugins). eslint.config.js configures code linting rules and syntax validation.'],
          ['Supporting project entries', '.gitignore specifies files git must ignore (like node_modules and dist), README.md provides human documentation, and public/ holds unbundled static assets like favicons and icons.'],
          ['Only one HTML document', 'In the entire project structure, only one single file is an HTML document: index.html. All other source code is JavaScript, JSX, or CSS.']
        ],
        'Only three files (index.html, src/main.jsx, src/App.jsx) define application behavior; all others manage dependencies, build tooling, and static assets.',
        {
          caption: 'Anatomy of a Modern React Project Directory',
          headers: ['File / Directory', 'Category', 'Written by Hand or Tooling', 'Core Operational Role'],
          rows: [
            ['index.html', 'Application Entry', 'Written / Scaffolding', 'Host HTML document containing the root mount container and module script'],
            ['src/main.jsx', 'Application Entry', 'Written by Developer', 'Bootstraps React, locates the root DOM node, and renders the root component'],
            ['src/App.jsx', 'Application Core', 'Written by Developer', 'Defines the root React component returning the initial JSX structure'],
            ['package.json', 'Project Manifest', 'Tooling / Developer', 'Declares required dependencies and runnable command scripts (dev, build)'],
            ['package-lock.json', 'Dependency Lock', 'Generated by Tooling', 'Locks exact versions of all packages for identical reproduction across machines'],
            ['node_modules/', 'Dependency Store', 'Generated by Tooling', 'Stores physical package files and binaries installed by the package manager'],
            ['vite.config.js', 'Tooling Config', 'Scaffolding / Config', 'Configures the Vite build tool, dev server port, and bundler plugins'],
            ['eslint.config.js', 'Linter Config', 'Scaffolding / Config', 'Defines static code analysis and code quality rules for the project'],
            ['public/', 'Static Assets', 'Developer Assets', 'Houses uncompiled static files (favicons, svgs) served directly at the root URL']
          ]
        },
        {
          src: '/images/industry-elective-2/react-project-structure.jpg',
          alt: 'React project file tree in VS Code showing node_modules, public, src with App.jsx, index.css, main.jsx, package.json, and vite.config.js',
          caption: 'The React project file anatomy: node_modules and package-lock.json are tooling-managed, while index.html, src/main.jsx, and src/App.jsx contain all application behavior.'
        }
      ),

      section(
        '3. The Root HTML Shell (index.html) & The Missing Content Paradox',
        [7, 8, 9, 10],
        'In a Vite-powered React project, index.html sits at the project root rather than inside src/. Examining the body of this file reveals a striking paradox: the body contains exactly two elements and zero textual content. Every heading, paragraph, button, and visual element that the user sees on the screen appears nowhere in this HTML file.',
        [
          ['Root directory placement', 'Unlike legacy bundling setups where index.html was buried inside public/ or dist/, Vite treats index.html as the primary entrypoint sitting at the project root.'],
          ['Two body elements only', 'The body contains exactly two elements: an empty div (&lt;div id="root"&gt;&lt;/div&gt;) and a script tag (&lt;script type="module" src="/src/main.jsx"&gt;&lt;/script&gt;). It contains no text nodes, paragraphs, or headings.'],
          ['The missing content paradox', 'When inspected on disk, the HTML document contains none of the visual elements of the application. The browser initially receives what appears to be a blank page.'],
          ['Contrast with vanilla architecture', 'A traditional vanilla web project places all its content directly inside the HTML markup and uses JavaScript to manipulate that content. The React HTML document holds no content to modify.'],
          ['An empty container on purpose', 'The div in index.html is deliberately left empty on disk. It serves purely as an anchor point for React’s runtime rendering engine.']
        ],
        'The React index.html contains no visual content; it provides only an empty mount div and a script tag that boots the application.',
        {
          caption: 'Traditional Content-Centric HTML vs React SPA Entry Shell',
          headers: ['Feature', 'Vanilla HTML Document', 'React Single-Page Application (SPA) index.html'],
          rows: [
            ['Content on Disk', 'Full HTML markup: headings, paragraphs, lists, forms', 'Zero visual content; body contains only two elements'],
            ['File Location', 'Project root or pages directory', 'Project root (processed directly by Vite as entrypoint)'],
            ['Role of Script', 'Optional script that finds and mutates existing elements', 'Mandatory module script that generates and injects all content'],
            ['Initial Body Children', 'Hundreds of DOM nodes declaring layout and text', 'Exactly two: &lt;div id="root"&gt;&lt;/div&gt; and &lt;script type="module"&gt;'],
            ['Browser Rendering Without JS', 'Displays static text, layout, and images accurately', 'Renders a blank white page (content requires JavaScript)']
          ]
        },
        {
          src: '/images/industry-elective-2/index-html-entrypoint.jpg',
          alt: 'index.html showing minimal structure with head tags, empty div id root, and module script pointing to src/main.jsx',
          caption: 'The complete index.html file: a minimal document shell where the body contains only &lt;div id="root"&gt;&lt;/div&gt; and &lt;script type="module" src="/src/main.jsx"&gt;&lt;/script&gt;.'
        }
      ),

      section(
        '4. The &lt;div id="root"&gt;&lt;/div&gt;: Boundary of the React Application',
        [11, 12],
        'The &lt;div id="root"&gt;&lt;/div&gt; element is completely empty on disk and remains empty until JavaScript executes. Its sole reason for existence is to provide later JavaScript code with a concrete DOM node to locate. Furthermore, this div establishes the strict boundary of React’s authority: React manages only what is inside this div, while elements written outside remain under the author’s control.',
        [
          ['Empty on disk and in transit', '&lt;div id="root"&gt;&lt;/div&gt; contains no child elements, no text, and no styling on disk. It remains empty during network transfer and initial parsing until client JavaScript runs.'],
          ['A node to locate', 'The element exists so that subsequent code has an identifiable target in the browser DOM tree. Without an existing container node, client-side rendering cannot attach to the document.'],
          ['The region given to React', 'The root div is the designated territory ceded to React. Everything rendered by React is inserted into this node; React never modifies or claims jurisdiction over the rest of the document.'],
          ['Independence of outer markup', 'Elements written outside &lt;div id="root"&gt;&lt;/div&gt;—such as static headers, navigation bars, third-party analytics scripts, or body background styles—remain under the author’s direct control and are completely unaffected by React.'],
          ['Mandatory prerequisite', 'Something must locate this node before anything can be placed inside it. This single lookup connects the browser’s DOM tree to the React rendering pipeline.']
        ],
        'The root div exists solely to provide a DOM node to locate; it defines the boundary of React’s authority without affecting outer elements.',
        {
          caption: 'Scope of Control: React-Managed Root Container vs Outer Document',
          headers: ['Document Zone', 'Jurisdiction', 'Content Generation', 'Lifecycle & Mutability'],
          rows: [
            ['Inside &lt;div id="root"&gt;', 'React runtime environment', 'Generated and reconciled dynamically from JSX components', 'Controlled entirely by React state and re-renders'],
            ['Outside &lt;div id="root"&gt;', 'Document author / Browser', 'Declared statically in index.html or injected by external tools', 'Unaffected by React; preserved across component updates']
          ]
        }
      ),

      section(
        '5. The Script Entrypoint & ES Module Deferral (type="module")',
        [13, 15, 16],
        'The script tag in index.html loads src/main.jsx with the attribute type="module". This informs the browser to treat the file as an ECMAScript (ES) Module. Modules introduce private variable scoping, explicit import/export interfaces, and a critical timing guarantee: module scripts are deferred automatically while imports are fetched, ensuring the script never runs before the DOM is parsed.',
        [
          ['Private lexical scoping', 'In classic scripts, top-level variables and function declarations leak into the global window scope and collide across files. In an ES module, top-level names are strictly private to the module itself.'],
          ['Explicit contracts via import and export', 'A module explicitly declares which values it offers to other files using export, and which values it requests using import. Unexported variables remain completely hidden.'],
          ['The dependency resolution requirement', 'An ES module cannot execute until every file in its dependency tree has been fetched over the network and evaluated.'],
          ['Parallel fetching during parsing', 'While the browser’s rendering engine continues parsing the HTML document, the browser fetches all imported module files in parallel across the network.'],
          ['Deferral as a structural consequence', 'A module script runs only after the HTML document has been completely parsed. Deferral is not an extra option or separate feature; it is an inherent physical consequence of allowing files to import each other.'],
          ['Immunity to the null trap', 'Because module scripts are guaranteed to defer execution until document parsing finishes, a script marked type="module" will never run before &lt;div id="root"&gt; has been created in the DOM tree.']
        ],
        'type="module" encapsulates variables and guarantees execution occurs only after HTML parsing completes, preventing null lookup errors.',
        {
          caption: 'Comparison of Script Loading and Execution Behaviors',
          headers: ['Script Type', 'Scoping Behavior', 'Network Fetch Timing', 'Execution Timing', 'Guaranteed DOM Availability?'],
          rows: [
            ['Classic &lt;script src="..."&gt;', 'Global scope (pollutes window)', 'Parser-blocking (halts parsing)', 'Executes immediately upon download', 'No — returns null if element is below script'],
            ['&lt;script defer src="..."&gt;', 'Global scope', 'Non-blocking parallel download', 'Runs after full document parsing completes', 'Yes — all DOM nodes exist prior to execution'],
            ['&lt;script type="module" src="..."&gt;', 'Strict module scope (private)', 'Non-blocking parallel download of dependency graph', 'Runs after full document parsing and all imports evaluated', 'Yes — guaranteed never to execute before #root exists']
          ]
        }
      ),

      section(
        '6. Locating the Mount Point: document.getElementById(\'root\')',
        [14, 17, 18, 19],
        'In src/main.jsx, the code invokes document.getElementById(\'root\'). This method belongs to the browser’s native DOM host API and is available to any script, with or without React. Crucially, this single call represents the only DOM lookup the application’s own code ever performs.',
        [
          ['Native browser DOM method', 'document.getElementById is not a React feature; it is a standard method provided by the browser host environment to locate an element by its ID attribute.'],
          ['The only lookup in the application', 'In an entire React project consisting of hundreds of components, this is the one and only DOM lookup written in the application’s own code. All other DOM modifications are handled by React behind the scenes.'],
          ['The single agreement string', 'The string "root" is the only identifier that the HTML file (index.html) and the JavaScript file (main.jsx) must agree on.'],
          ['Fragility of mismatched identifiers', 'If a developer changes id="root" in index.html to id="app" without updating main.jsx, document.getElementById("root") returns null. When passed to createRoot, the application immediately crashes at this exact line.'],
          ['The node hand-off', 'Once the browser locates the node in the DOM tree, it immediately hands that node over to createRoot, relinquishing control to React.']
        ],
        '"root" is the sole agreement string between HTML and JS; getElementById(\'root\') is the only DOM lookup the application code performs.',
        {
          caption: 'The HTML-to-JavaScript Agreement Contract',
          headers: ['File Location', 'Code Snippet', 'Required Agreement Value', 'Consequence of Mismatch'],
          rows: [
            ['index.html', '&lt;div id="root"&gt;&lt;/div&gt;', 'ID attribute: "root"', 'If changed to "main", query fails'],
            ['src/main.jsx', 'document.getElementById("root")', 'Query argument: "root"', 'Returns null; createRoot crashes with error']
          ]
        }
      ),

      section(
        '7. Initializing the Root Object: createRoot()',
        [14, 20],
        'React 18+ replaces legacy mounting with createRoot(), imported from react-dom/client. createRoot() accepts exactly one DOM element node and returns a specialized React root object. From this moment onward, React treats the contents of that DOM node as its exclusive property.',
        [
          ['Accepts one DOM container', 'createRoot() takes exactly one parameter: a live DOM element node (typically the div obtained from document.getElementById).'],
          ['Returns a root object', 'The return value of createRoot() is a root object instance that manages the concurrent rendering pipeline and reconciliation tree for that container.'],
          ['Exclusive React ownership', 'Once a DOM node is passed to createRoot(), React treats all internal child nodes of that container as its own. Any external script that tries to mutate child nodes inside the root risks desynchronizing React’s internal state.'],
          ['Displays zero visual content', 'createRoot() does not render or display anything on screen. Invoking createRoot() by itself leaves the browser viewport completely blank.'],
          ['Preparation for rendering', 'createRoot() prepares the internal fiber tree and scheduler; visual display occurs only when the render() method is subsequently invoked on the returned root object.']
        ],
        'createRoot() takes one DOM node, claims ownership of its contents, and returns a root object, but displays nothing on screen on its own.',
        {
          caption: 'Characteristics and Operational Contract of createRoot()',
          headers: ['Property', 'Specification & Behavior'],
          rows: [
            ['Import Source', 'react-dom/client (browser-specific client rendering entrypoint)'],
            ['Input Parameter', 'Exactly one DOM element node (e.g., HTMLDivElement)'],
            ['Return Value', 'A React root object containing the render() and unmount() methods'],
            ['Visual Output', 'None — produces zero pixels and leaves the screen completely blank'],
            ['DOM Ownership', 'Assumes exclusive management of all child nodes within the container']
          ]
        }
      ),

      section(
        '8. Rendering the Application: The render() Method',
        [14, 21],
        'Once createRoot() returns a root object, the application calls render() on it. The render() method accepts a declarative description of what the page should contain and displays it inside the root container. When render() is called again, React compares descriptions and applies only the differences.',
        [
          ['Method invocation on root', 'render() is called as a chained method on the object returned by createRoot(): createRoot(container).render(element).'],
          ['Accepts a UI description', 'The argument passed to render() is a declarative description (typically expressed via JSX) specifying what the interface should look like.'],
          ['Initial mount pipeline', 'On the first call, React converts the UI description into real DOM elements and inserts them into the empty root container, painting the initial interface.'],
          ['Subsequent call diffing', 'If render() is called again (or when state updates trigger a re-render), React does not destroy and re-create the DOM. Instead, it compares the new description with the previous description and applies only the detected differences.'],
          ['Reconciliation in action', 'This comparison mechanism is reconciliation: React computes the minimal delta and executes targeted surgical updates on the real DOM tree.']
        ],
        'render() mounts the UI description into the root container; subsequent calls compare descriptions and update only the differences.',
        {
          caption: 'Initial Render Mount vs Subsequent Re-render Diffing',
          headers: ['Invocation Phase', 'React Action Taken', 'DOM Operation', 'Impact on User State'],
          rows: [
            ['Initial render() Call', 'Evaluates root component, constructs initial virtual tree', 'Creates and inserts real DOM elements into the empty root div', 'Establishes initial page state and paints screen'],
            ['Subsequent Re-render', 'Generates new virtual tree, runs diffing algorithm against previous tree', 'Surgically updates only changed attributes and nodes in place', 'Preserves scroll position, input focus, and form text']
          ]
        },
        {
          src: '/images/industry-elective-2/main-jsx-bootstrap.jpg',
          alt: 'main.jsx showing imports from react and react-dom/client, and createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>)',
          caption: 'The complete main.jsx bootstrapping entrypoint: four imports and one statement chaining createRoot() to render() with StrictMode and App.'
        }
      ),

      section(
        '9. The Nature of JSX: Syntax, Transformation & Tree of Objects',
        [22, 23],
        'The argument passed to render() looks like HTML tags written inside a JavaScript file. This syntax is called JSX. JSX is fundamentally neither HTML nor a string. It is a syntactic extension for JavaScript that build tools transform into pure JavaScript objects describing what the page should contain.',
        [
          ['Tag syntax inside JavaScript', 'JSX allows developers to write familiar markup-like tags (e.g., &lt;StrictMode&gt;&lt;App /&gt;&lt;/StrictMode&gt;) directly inside JavaScript files (.jsx).'],
          ['What JSX is NOT', 'JSX is not HTML, and it is not a string. It is not parsed by the browser’s HTML parser and does not represent real DOM elements when written.'],
          ['Pre-browser conversion', 'Web browsers have no built-in engine to execute JSX syntax. Build tools (such as Vite, Babel, or SWC) compile JSX tags into standard JavaScript function calls before the code reaches the browser.'],
          ['A tree of objects', 'When the compiled JavaScript executes, the JSX evaluates to a nested tree of plain JavaScript objects (React elements) describing the UI.'],
          ['Tags as descriptors', 'Both App and StrictMode are written as tags in JSX. App represents a custom user component, while StrictMode represents a built-in React utility component.']
        ],
        'JSX is not HTML or a string; it is syntactic sugar compiled into a tree of JavaScript objects describing the desired DOM.',
        {
          caption: 'JSX Tag Syntax vs Compiled JavaScript vs In-Memory Object Tree',
          headers: ['Stage', 'Representation Format', 'Environment', 'Example'],
          rows: [
            ['Authoring (JSX)', 'HTML-like tag syntax in .jsx files', 'Developer source code', '&lt;App /&gt; or &lt;div&gt;Hello&lt;/div&gt;'],
            ['Transpiled (JavaScript)', 'Function calls (React.createElement or jsxRuntime)', 'Compiled bundle sent to browser', '_jsx(App, {}) or _jsx("div", {children: "Hello"})'],
            ['Runtime Evaluation', 'Tree of plain JavaScript objects ({type, props})', 'In-memory Virtual DOM', '{type: "div", props: {children: "Hello"}}'],
            ['Browser DOM', 'Physical C++ DOM element nodes in memory', 'Browser rendering engine', 'HTMLDivElement node rendered to screen']
          ]
        }
      ),

      section(
        '10. Separation of Concerns: react vs react-dom Packages',
        [14, 24],
        'In src/main.jsx, imports are split between two distinct libraries: StrictMode is imported from react, while createRoot is imported from react-dom/client. This split reflects a fundamental architectural boundary: react contains the platform-agnostic engine that produces UI descriptions, while react-dom contains the renderer that translates those descriptions into browser DOM nodes.',
        [
          ['Two distinct packages', 'React is divided into two separate npm packages: react and react-dom. They serve complementary but strictly separated duties.'],
          ['The react package', 'Contains the core engine that produces UI descriptions: component declarations, state hooks (useState, useEffect), element creation, and utilities like StrictMode. It has zero knowledge of web browsers or DOM trees.'],
          ['The react-dom package', 'Contains the platform-specific renderer for the web browser. It takes React’s abstract UI descriptions and writes them to the browser’s Document Object Model.'],
          ['Why createRoot is in react-dom', 'createRoot is located in react-dom/client because its entire purpose is to accept a browser DOM element (e.g., document.getElementById). Non-browser environments (like React Native for mobile or React Three Fiber for 3D) do not have a browser DOM.'],
          ['Architectural portability', 'This separation allows React’s component model and diffing algorithms to be reused across web apps, native iOS/Android apps, VR applications, and terminal interfaces simply by swapping the renderer.']
        ],
        'react produces platform-independent UI descriptions; react-dom is the browser renderer that writes those descriptions to the DOM.',
        {
          caption: 'Separation of Responsibilities: react vs react-dom',
          headers: ['Feature', 'react Package', 'react-dom Package'],
          rows: [
            ['Primary Role', 'Produces UI descriptions and manages component logic', 'Writes and reconciles descriptions to the browser DOM'],
            ['Platform Dependency', 'Completely platform-independent', 'Web browser-specific (depends on browser DOM APIs)'],
            ['Key Exports', 'StrictMode, useState, useEffect, createElement', 'createRoot, hydrateRoot, flushSync'],
            ['Direct DOM Access', 'No — never touches or queries DOM nodes', 'Yes — directly reads and manipulates HTML elements'],
            ['Alternative Equivalents', 'Shared everywhere in React ecosystem', 'react-native (iOS/Android), react-pdf, ink (CLI)']
          ]
        }
      ),

      section(
        '11. Development Safeguard: &lt;StrictMode&gt; & Intentional Double Execution',
        [14, 25],
        'In main.jsx, the root component is wrapped inside &lt;StrictMode&gt;. StrictMode is a developer tool that displays nothing of its own and produces no node in the real DOM. In development, it intentionally executes certain code twice to expose subtle bugs and impure functions before the code reaches production.',
        [
          ['No DOM footprint', '&lt;StrictMode&gt; produces zero wrapper nodes (such as extraneous divs or spans) in the rendered DOM tree. It is an invisible container.'],
          ['Intentional double execution', 'While a project runs in development mode, StrictMode causes React to run component functions, initializer functions, and effect setup/cleanup cycles twice.'],
          ['Surfacing hidden bugs', 'If a component relies on running exactly once or contains an impure side-effect (such as mutating an external variable or pushing to a global array during render), running it twice makes the bug fail visibly.'],
          ['Enforcing idempotency', 'React components are meant to be pure functions of props and state. StrictMode forces developers to write render functions that are safe to call multiple times without causing side-effects.'],
          ['Zero production overhead', 'StrictMode has absolutely no effect in a production build (vite build). In production, component functions run strictly once, guaranteeing maximum runtime performance.']
        ],
        '&lt;StrictMode&gt; produces no DOM node and executes code twice in development to uncover side-effect bugs, but does nothing in production.',
        {
          caption: '&lt;StrictMode&gt; Behavior: Development Server vs Production Build',
          headers: ['Operational Metric', 'Development Mode (npm run dev)', 'Production Build (npm run build)'],
          rows: [
            ['Component Function Invocations', 'Executed twice per render cycle', 'Executed strictly once per render cycle'],
            ['Effect Setup and Cleanup', 'Fires setup, runs cleanup, then fires setup again', 'Fires setup once upon component mounting'],
            ['DOM Node Generation', 'Zero DOM nodes generated (invisible wrapper)', 'Zero DOM nodes generated (invisible wrapper)'],
            ['Console Warnings & Diagnostics', 'Active: flags deprecated APIs and impure lifecycles', 'Stripped out for optimal bundle size and speed'],
            ['Performance Impact', 'Slightly higher CPU usage to catch logic defects', 'Zero performance overhead']
          ]
        }
      ),

      section(
        '12. The Root Component: src/App.jsx & The Declarative Hand-Off',
        [26, 27],
        'In src/App.jsx, the file declares a single function named App and exports it via export default App. The function returns JSX, yet it is called nowhere in App.jsx. Instead, App is written as a tag (&lt;App /&gt;) in main.jsx. React itself calls App and displays the returned JSX inside the root div.',
        [
          ['Function component declaration', 'App is declared as a standard JavaScript function that returns JSX markup: function App() { return &lt;div&gt;Hello World!&lt;/div&gt;; }'],
          ['Default export pattern', 'The function is made available to other modules via export default App;, enabling main.jsx to import it cleanly as import App from "./App.jsx".'],
          ['The "called nowhere" paradox', 'App is never invoked by developer code anywhere in the project. There is no call to App() in App.jsx or main.jsx.'],
          ['Inversion of control', 'Instead of the developer calling the component function, the developer writes &lt;App /&gt; as a JSX tag inside main.jsx. React itself takes responsibility for calling App().'],
          ['Mounting into the root container', 'When React executes App(), it receives the returned JSX description (&lt;div&gt;Hello World!&lt;/div&gt;), translates it into real DOM nodes, and inserts them into the empty &lt;div id="root"&gt; container.'],
          ['The complete bootstrap sequence', '1) index.html loads with &lt;div id="root"&gt;; 2) script loads src/main.jsx as an ES module; 3) getElementById("root") finds the div; 4) createRoot() creates the root; 5) render(&lt;StrictMode&gt;&lt;App /&gt;&lt;/StrictMode&gt;) starts the pipeline; 6) React calls App() and mounts the output into the root div.']
        ],
        'The developer declares App returning JSX; React invokes App() when rendering the &lt;App /&gt; tag and mounts the result into &lt;div id="root"&gt;.',
        {
          caption: 'The Complete React Application Bootstrapping Sequence',
          headers: ['Step', 'File Involved', 'Executed Code / Action', 'Resulting System State'],
          rows: [
            ['1. Document Shell', 'index.html', 'Browser parses HTML body', '&lt;div id="root"&gt;&lt;/div&gt; exists in DOM; parser reaches module script'],
            ['2. Module Loading', 'index.html', '&lt;script type="module" src="/src/main.jsx"&gt;', 'Browser fetches main.jsx and dependency tree in parallel; defers execution'],
            ['3. Node Lookup', 'src/main.jsx', 'document.getElementById("root")', 'Locates the empty root div in the DOM tree (only app lookup)'],
            ['4. Root Initialization', 'src/main.jsx', 'createRoot(container)', 'Initializes React root manager object; claims ownership of the container'],
            ['5. Render Pipeline', 'src/main.jsx', '.render(&lt;StrictMode&gt;&lt;App /&gt;&lt;/StrictMode&gt;)', 'Evaluates JSX tree; passes UI description to React scheduler'],
            ['6. Component Call', 'src/App.jsx', 'React invokes App() internally', 'App returns &lt;div&gt;Hello World!&lt;/div&gt;; React mounts it inside &lt;div id="root"&gt;']
          ]
        },
        {
          src: '/images/industry-elective-2/app-jsx-component.png',
          alt: 'src/App.jsx code showing function App() returning div Hello World! and export default App',
          caption: 'The root App component in src/App.jsx: declares a function returning JSX and exports it as default; React calls this function when rendering &lt;App /&gt;.'
        }
      )
    ],
    cards: [
      {
        id: 'ie2-c1',
        front: 'How often does a vanilla JavaScript project locate a DOM node compared to a React project?',
        back: 'Vanilla JS locates nodes at every single place data changes; React locates a node exactly once.',
        detail: 'In vanilla JS, developers must repeatedly query the DOM (via getElementById or querySelector) to update elements whenever data changes. In React, the developer writes what the page contains for a given state; locating a DOM node occurs once during application setup (Slide 2).',
        page: 2
      },
      {
        id: 'ie2-c2',
        front: 'What three essential files contain everything a React application actually does?',
        back: 'index.html, src/main.jsx, and src/App.jsx.',
        detail: 'While modern React tooling generates dozens of configuration files and dependencies, all actual application behavior, layout, and logic reside in index.html, src/main.jsx, and src/App.jsx (Slide 3).',
        page: 3
      },
      {
        id: 'ie2-c3',
        front: 'What is the primary role of package.json in a React project?',
        back: 'It declares required packages and runnable command scripts.',
        detail: 'package.json serves as the project manifest, declaring which third-party packages the project requires (dependencies and devDependencies) and which commands it supports (such as dev, build, lint, and preview) (Slide 4).',
        page: 4
      },
      {
        id: 'ie2-c4',
        front: 'What is the purpose of package-lock.json and why is it committed to version control?',
        back: 'It records exact package versions so installs reproduce identically on another machine.',
        detail: 'package-lock.json locks down the exact semantic version, dependency tree, and cryptographic hashes of every installed package, ensuring that running npm install across different computers produces the exact same environment (Slide 5).',
        page: 5
      },
      {
        id: 'ie2-c5',
        front: 'What is the node_modules directory and how is it generated?',
        back: 'It holds installed package code and binaries; it is generated by tooling rather than written.',
        detail: 'node_modules is generated automatically by the package manager (e.g., npm) when dependencies are installed. It should never be edited by hand or checked into version control (Slide 5).',
        page: 5
      },
      {
        id: 'ie2-c6',
        front: 'What is the role of vite.config.js and eslint.config.js in a React project?',
        back: 'They configure the build tool / development server and the code linter.',
        detail: 'vite.config.js configures the Vite bundler, development server, and plugins (such as Tailwind CSS). eslint.config.js configures ESLint static analysis rules to enforce code quality (Slide 6).',
        page: 6
      },
      {
        id: 'ie2-c7',
        front: 'What type of content is kept in the public/ folder of a React project?',
        back: 'Static, uncompiled assets (e.g., favicons and icons) served directly at the root URL.',
        detail: 'The public/ folder contains assets that are not processed by Vite’s JavaScript bundler, such as favicon.svg and icons.svg, which are copied directly to the root of the output build (Slide 6).',
        page: 6
      },
      {
        id: 'ie2-c8',
        front: 'Where does index.html sit in a modern Vite-based React project?',
        back: 'At the project root rather than inside src/.',
        detail: 'Unlike older bundlers where the HTML file was placed in a public folder, Vite treats index.html as the primary application entrypoint situated directly in the project root directory (Slide 7).',
        page: 7
      },
      {
        id: 'ie2-c9',
        front: 'What are the only two elements present inside the <body> of index.html on disk?',
        back: '<div id="root"></div> and <script type="module" src="/src/main.jsx"></script>.',
        detail: 'The body of index.html contains exactly two elements and zero text content: an empty div serving as the React mount point and a module script tag loading main.jsx (Slide 8).',
        page: 8
      },
      {
        id: 'ie2-c10',
        front: 'What is the "missing content" paradox of a React index.html file?',
        back: 'Every heading, paragraph, and UI element appears nowhere in the HTML file.',
        detail: 'A vanilla web project holds its content in the HTML document and uses scripts to modify it. In React, index.html holds no content to modify; all visual elements are generated dynamically in JavaScript (Slide 9).',
        page: 9
      },
      {
        id: 'ie2-c11',
        front: 'Why does <div id="root"></div> exist if it is completely empty on disk?',
        back: 'It exists so that subsequent JavaScript code has an in-memory DOM node to locate.',
        detail: '<div id="root"></div> remains empty until JavaScript executes. It provides the anchor node in the browser DOM tree where React mounts its component hierarchy (Slide 11).',
        page: 11
      },
      {
        id: 'ie2-c12',
        front: 'How does React treat HTML elements written outside <div id="root"></div>?',
        back: 'Elements outside the div are unaffected by React and stay under the author’s control.',
        detail: '<div id="root"></div> is the designated region ceded to React. Elements written outside it (such as static headers or third-party widgets) are completely untouched by React’s rendering lifecycle (Slide 12).',
        page: 12
      },
      {
        id: 'ie2-c13',
        front: 'What does the attribute type="module" on a <script> tag tell the browser?',
        back: 'Treat the file as an ES module and defer execution until document parsing is complete.',
        detail: 'type="module" enables ECMAScript module semantics (strict scoping, import/export) and automatically defers execution so the script never runs before the HTML has been parsed (Slide 13).',
        page: 13
      },
      {
        id: 'ie2-c14',
        front: 'How does variable scoping in an ES module differ from a traditional script?',
        back: 'Traditional script top-level names are global; module top-level names are strictly private.',
        detail: 'In classic scripts, variables declared at the top level pollute the global window scope. In an ES module, top-level names are private to that module unless explicitly shared using export (Slide 15).',
        page: 15
      },
      {
        id: 'ie2-c15',
        front: 'What keywords are used to share and consume values between ES modules?',
        back: 'export marks a value as available; import names a value and the file it comes from.',
        detail: 'An ES module explicitly states which values it takes from other files (import) and which values it offers to external files (export), establishing strict module contracts (Slide 15).',
        page: 15
      },
      {
        id: 'ie2-c16',
        front: 'Why is a module script guaranteed never to execute before <div id="root"> exists in the DOM?',
        back: 'A module cannot run until all imports are fetched, which finishes only after HTML parsing.',
        detail: 'A module’s imports are fetched concurrently while the HTML parser continues building the DOM. Because the module runs only after document parsing is complete, <div id="root"> is guaranteed to exist (Slide 16).',
        page: 16
      },
      {
        id: 'ie2-c17',
        front: 'How many DOM lookups does a React application’s own code perform, and what method is used?',
        back: 'Exactly one lookup, using document.getElementById("root").',
        detail: 'document.getElementById is a native browser method. Locating the root div in main.jsx is the one and only DOM query the application code performs; React manages all other updates (Slide 17, 18).',
        page: 18
      },
      {
        id: 'ie2-c18',
        front: 'What is the single agreement string that index.html and src/main.jsx must agree on?',
        back: 'The string "root" (the id attribute of the mount container).',
        detail: 'The string "root" in document.getElementById("root") is the only identifier shared between HTML and JS. Changing it in one file without updating the other breaks the application (Slide 19).',
        page: 19
      },
      {
        id: 'ie2-c19',
        front: 'What does createRoot() accept as an argument, and what does it return?',
        back: 'It accepts one DOM node and returns a React root object.',
        detail: 'createRoot() takes a DOM container node and returns a root object that manages rendering. React treats the contents of that container as its exclusive property from that point forward (Slide 20).',
        page: 20
      },
      {
        id: 'ie2-c20',
        front: 'What visual output is displayed on screen if createRoot() is called without render()?',
        back: 'Nothing — calling createRoot() alone leaves the page completely blank.',
        detail: 'createRoot() prepares the internal root management context but renders no visual elements. Displaying content requires calling the render() method on the returned root object (Slide 20).',
        page: 20
      },
      {
        id: 'ie2-c21',
        front: 'What happens when render() is called again after the initial render?',
        back: 'React compares the new description with the previous one and applies only differences.',
        detail: 'Subsequent calls to render() trigger React’s reconciliation diffing algorithm: React compares the new virtual UI description against the existing one and patches only the changed DOM nodes (Slide 21).',
        page: 21
      },
      {
        id: 'ie2-c22',
        front: 'What is JSX, and what is it fundamentally NOT?',
        back: 'JSX is tag syntax in JS compiled to object trees; it is NOT HTML and NOT a string.',
        detail: 'JSX looks like HTML tags inside JavaScript files, but build tools compile it into JavaScript function calls that evaluate to trees of plain objects describing what the page should contain (Slide 22, 23).',
        page: 22
      },
      {
        id: 'ie2-c23',
        front: 'What is the division of responsibility between the react and react-dom packages?',
        back: 'react produces UI descriptions; react-dom writes those descriptions to the browser DOM.',
        detail: 'The core react package contains the platform-agnostic component and state engine. The react-dom package contains the web renderer and createRoot, which directly interact with browser DOM nodes (Slide 24).',
        page: 24
      },
      {
        id: 'ie2-c24',
        front: 'What does <StrictMode> do during development, and what effect does it have in production?',
        back: 'Runs code twice in development to surface side-effect bugs; has no effect in production.',
        detail: 'StrictMode produces no DOM nodes. It intentionally invokes component functions twice in development so code that improperly depends on running once fails visibly, but is completely inert in production (Slide 25).',
        page: 25
      },
      {
        id: 'ie2-c25',
        front: 'Where is the App component function called by developer code in a React project?',
        back: 'Nowhere — the developer writes <App />, and React itself calls App().',
        detail: 'In App.jsx, App is declared as a function returning JSX. It is written as a JSX tag (<App />) in main.jsx; React invokes App() internally and mounts the returned JSX into the root div (Slide 26, 27).',
        page: 27
      }
    ],
    questions: [
      mc(
        'How does updating a webpage in vanilla JavaScript fundamentally compare to updating a webpage in ReactJS?',
        'Vanilla JS requires imperatively locating the node at every place data changes, whereas React locates a node once and derives UI from data.',
        [
          'Vanilla JS derives UI automatically from memory variables, whereas React requires manually binding querySelector listeners.',
          'Vanilla JS performs zero DOM lookups, whereas React re-queries document.getElementById on every state change.',
          'Vanilla JS reloads the entire page on every update, whereas React never interacts with the browser DOM.'
        ],
        'Slide 2 emphasizes that updating a page in vanilla JavaScript requires naming the node at every place the data changes. In React, the developer writes what the page contains for a given set of data and writes no instruction to locate or modify a node; locating a node occurs exactly once during application setup.',
        2
      ),
      mc(
        'Out of all files and directories in a modern React project, which three files contain everything the application actually does?',
        'index.html, src/main.jsx, and src/App.jsx',
        [
          'package.json, vite.config.js, and eslint.config.js',
          'public/favicon.svg, src/index.css, and README.md',
          'index.html, node_modules, and package-lock.json'
        ],
        'Slide 3 highlights that while a React project contains many files generated by tooling, three of them contain everything the application does: index.html, src/main.jsx, and src/App.jsx. The remaining entries are configuration and installed code.',
        3
      ),
      mc(
        'What is the primary role of package.json in a React project?',
        'It declares which packages the project requires and which commands it supports.',
        [
          'It records the exact version of every installed package to guarantee reproducible builds.',
          'It holds the physical binaries and source code of all downloaded third-party libraries.',
          'It serves as the main HTML entrypoint that mounts React into the browser DOM.'
        ],
        'Slide 4 explicitly defines package.json: it declares which packages the project requires (dependencies/devDependencies) and which commands it supports (scripts such as dev, build, lint, and preview).',
        4
      ),
      mc(
        'Why is package-lock.json essential in a modern JavaScript project?',
        'It records the exact version of every installed package, ensuring installs reproduce identically on another machine.',
        [
          'It compiles JSX files into vanilla JavaScript before runtime.',
          'It runs ESLint rules across all source files in the project.',
          'It configures the local development server port and proxy settings.'
        ],
        'Slide 5 states that package-lock.json records the exact version of every installed package, so an install reproduces identically on another machine.',
        5
      ),
      mc(
        'What is the nature and origin of the node_modules directory in a React project?',
        'It holds the installed packages themselves and is generated by tooling rather than written by hand.',
        [
          'It contains the developer’s source components and is committed directly to Git.',
          'It holds unprocessed static assets like icons and favicons served at the root URL.',
          'It contains the production-bundled HTML, CSS, and minified JavaScript files.'
        ],
        'Slide 5 notes that node_modules holds the installed packages themselves and is generated rather than written.',
        5
      ),
      mc(
        'Which files in the project root configure the tools that process and lint the project?',
        'vite.config.js and eslint.config.js',
        [
          '.gitignore and README.md',
          'package.json and package-lock.json',
          'index.html and src/main.jsx'
        ],
        'Slide 6 specifies that vite.config.js and eslint.config.js configure the tools that process the project (bundling/dev server and linting), while .gitignore, README.md, and public/ concern version control, documentation, and static files.',
        6
      ),
      mc(
        'Where is index.html physically located in a Vite-based React project?',
        'At the project root rather than inside src/',
        [
          'Inside the src/ directory alongside main.jsx',
          'Inside the public/ directory alongside favicon.svg',
          'Inside node_modules under the react-dom package'
        ],
        'Slide 7 notes that index.html sits at the project root rather than inside src/.',
        7
      ),
      mc(
        'When inspecting the body of index.html on disk, what does it contain?',
        'Two elements (&lt;div id="root"&gt;&lt;/div&gt; and &lt;script&gt;) and no text content.',
        [
          'The full header, navigation bar, and footer markup rendered by the application.',
          'A single iframe that loads the compiled React application bundle.',
          'A series of hidden template tags holding the application’s component definitions.'
        ],
        'Slide 8 points out that the body contains two elements (&lt;div id="root"&gt;&lt;/div&gt; and &lt;script type="module" src="/src/main.jsx"&gt;&lt;/script&gt;) and no text content.',
        8
      ),
      mc(
        'What is the key difference between a vanilla HTML document and the React index.html regarding content?',
        'A vanilla project holds its content in the document and uses scripts to modify it; the React document holds no content to modify.',
        [
          'A vanilla project generates content via modules, whereas React writes all HTML markup directly into index.html.',
          'A vanilla project requires a build tool to display content, whereas React runs without a browser.',
          'A vanilla project cannot load CSS stylesheets, whereas React injects styles into the head.'
        ],
        'Slide 9 explains that the heading, paragraph, and every element the user sees appear nowhere in index.html. A vanilla project holds its content in the document and uses scripts to modify that content; this document holds no content to modify.',
        9
      ),
      mc(
        'Why does the empty &lt;div id="root"&gt;&lt;/div&gt; exist in index.html?',
        'It exists so that later JavaScript code has an in-memory DOM node to locate and mount into.',
        [
          'It provides fallback text for browsers that have JavaScript disabled.',
          'It acts as a service worker cache container for offline web application storage.',
          'It informs the Vite build tool how to minify and bundle the application CSS.'
        ],
        'Slide 11 explains that &lt;div id="root"&gt;&lt;/div&gt; is empty on disk and stays empty until JavaScript runs. The element exists so that later code has a node to locate.',
        11
      ),
      mc(
        'How does React treat HTML elements that are written outside &lt;div id="root"&gt;&lt;/div&gt;?',
        'Elements written outside the div are unaffected by React, and the rest of the document stays under the author’s control.',
        [
          'React deletes all elements outside the div upon initial rendering.',
          'React converts all elements outside the div into virtual DOM nodes automatically.',
          'React throws a runtime syntax error if any element exists outside the root div.'
        ],
        'Slide 12 clarifies that elements written outside the div are unaffected by React. The div is the region of the page React is given, and the rest of the document stays under the author’s control.',
        12
      ),
      mc(
        'Why is a script marked with type="module" guaranteed never to run before &lt;div id="root"&gt; exists?',
        'A module cannot run until all its imports are fetched and evaluated, which completes only after the HTML document has been parsed.',
        [
          'The browser delays module scripts with an internal 3-second timer before execution.',
          'React intercepts the browser network request and pauses execution until createRoot is ready.',
          'The type="module" attribute converts the script into synchronous inline assembly code.'
        ],
        'Slides 13 and 16 explain that type="module" causes the browser to treat the file as an ES module. A module cannot run until every file it imports has been fetched and evaluated. Because imports are fetched while document parsing continues, the module runs only after parsing is complete. Deferral is a consequence of module imports, ensuring the script never runs before the div exists.',
        16
      ),
      mc(
        'How does variable scoping in an ES module differ from a traditional JavaScript file?',
        'A traditional file’s top-level names are shared globally, whereas an ES module’s top-level names are private to itself.',
        [
          'An ES module shares all variables globally, whereas a traditional script has strict function scoping.',
          'An ES module prohibits the declaration of functions and allows only object literals.',
          'An ES module runs exclusively inside a Web Worker thread on the client.'
        ],
        'Slide 15 highlights that a JavaScript file’s top-level names are ordinarily shared with every other script on the page; a module’s top-level names are private to itself. A module explicitly states what it takes via import and what it offers via export.',
        15
      ),
      mc(
        'What occurs when createRoot() is invoked with a DOM node, without subsequently calling render()?',
        'React creates and returns a root object, but displays nothing and leaves the page blank.',
        [
          'React automatically mounts the default App component into the specified node.',
          'The browser throws a DOMException because render() was not chained synchronously.',
          'React parses all .jsx files in the src/ directory and paints them to the screen.'
        ],
        'Slide 20 points out that createRoot() accepts one DOM node and returns a root object. React treats the contents of that node as its own from this point forward; however, createRoot() displays nothing, and calling it alone leaves the page blank.',
        20
      ),
      mc(
        'What is the purpose of &lt;StrictMode&gt; running certain code twice during development?',
        'To expose subtle bugs and side-effects so that code which improperly depends on running once fails visibly.',
        [
          'To ensure that both the CPU and GPU render the application simultaneously for higher framerates.',
          'To verify that the application operates identically in both light mode and dark mode.',
          'To pre-compile JSX elements into production machine bytecode ahead of time.'
        ],
        'Slide 25 states that StrictMode displays nothing of its own and produces no node in the DOM. It causes React to run certain code twice while in development, so that code which depends on running once fails visibly. It has no effect in a production build.',
        25
      ),

      id(
        'Name the function imported from react-dom/client that accepts a DOM container node and returns a React root manager object.',
        'createRoot',
        ['createRoot()', 'react-dom createRoot', 'createRoot function'],
        'createRoot() accepts one DOM node and returns a root object, establishing the entrypoint for React’s rendering pipeline (Slide 20).',
        20
      ),
      id(
        'Name the built-in React helper component imported from \'react\' that produces no DOM nodes and intentionally runs code twice in development to surface side-effect bugs.',
        'StrictMode',
        ['<StrictMode>', '<StrictMode></StrictMode>', 'React.StrictMode'],
        'StrictMode produces no node in the DOM and runs certain code twice in development to ensure code is resilient and free of impure side-effects (Slide 25).',
        25
      ),
      id(
        'What term describes the tag-like syntax written inside JavaScript files that is converted into standard JavaScript objects before the browser receives it?',
        'JSX',
        ['JavaScript XML', 'JSX syntax'],
        'JSX is tag syntax written inside JavaScript; it is neither HTML nor a string, and build tools transpile it into JavaScript object trees (Slide 22).',
        22
      ),
      id(
        'Name the file in a React project that records the exact version of every installed package to ensure reproducible installations across different machines.',
        'package-lock.json',
        ['package-lock', 'package lock', 'package-lock.json file'],
        'package-lock.json records the exact version of every installed package, guaranteeing identical environments across machines (Slide 5).',
        5
      ),
      id(
        'Name the tooling-generated directory that holds the downloaded physical packages, source files, and binaries of all project dependencies.',
        'node_modules',
        ['node_modules/', 'node modules', 'node_modules folder', 'node_modules directory'],
        'node_modules holds the installed packages themselves and is generated by package managers rather than written by the developer (Slide 5).',
        5
      ),
      id(
        'What attribute added to a &lt;script&gt; tag instructs the browser to evaluate the file as an ES module and automatically defer execution until document parsing is complete?',
        'type="module"',
        ['type=module', 'type = "module"', 'type=\'module\'', 'module'],
        'type="module" makes the browser treat the script as an ES module, which defers execution until the document has been fully parsed (Slide 13).',
        13
      ),
      id(
        'What is the single agreement string / identifier that index.html and src/main.jsx must agree on to locate the application mounting node?',
        'root',
        ['\'root\'', '"root"', 'id="root"', '#root'],
        'The string \'root\' is the only name the HTML and JavaScript file must agree on; changing it in one file without the other breaks the application (Slide 19).',
        19
      ),
      id(
        'Which separate package in a React project contains the specific renderer responsible for writing and reconciling descriptions to the browser’s Document Object Model?',
        'react-dom',
        ['react-dom/client', 'react dom'],
        'react contains the engine that produces UI descriptions, while react-dom contains the part that writes and commits updates to the browser DOM (Slide 24).',
        24
      ),
      id(
        'What method is called on the object returned by createRoot() to display a UI description inside the root container?',
        'render',
        ['render()', 'root.render', 'root.render()'],
        'render() is called on the root object returned by createRoot(); it accepts a description and displays it, comparing descriptions on subsequent calls (Slide 21).',
        21
      ),
      id(
        'Name the root component function declared in src/App.jsx that returns JSX and is rendered as a tag inside src/main.jsx.',
        'App',
        ['App()', 'App component', '<App />', '<App></App>'],
        'App is the function declared and exported in src/App.jsx; it is rendered as the tag <App /> in main.jsx and invoked by React (Slide 26, 27).',
        27
      ),

      essay(
        'Compare the node locating paradigm of traditional Vanilla JavaScript with that of ReactJS, and explain the significance of the single lookup rule.',
        'In traditional Vanilla JavaScript, updating a user interface requires the developer to imperatively name and locate the target DOM node at every single place where application data changes. Whenever a variable updates—in button click listeners, input handlers, or fetch callbacks—the developer must write explicit queries like document.getElementById or querySelector and directly mutate node properties like textContent or innerHTML. As applications grow in complexity, this imperative requirement becomes brittle: if a developer modifies data in memory but forgets to locate and update the corresponding DOM node, the UI falls out of sync with application state. In contrast, React inverts this relationship: the developer declares what the page should contain for a given set of data and writes zero instructions to locate or modify individual DOM nodes. The developer does not imperatively search the DOM; React derives the entire view from state. Locating a DOM node is not absent from a React application; it occurs exactly once during application bootstrapping when document.getElementById(\'root\') finds the mount container and passes it to createRoot(). From that point forward, all DOM mutations are handled internally by React’s reconciliation engine, eliminating the imperative burden from developer code.',
        [
          'Contrasts vanilla JS imperative node locating (searching DOM at every data mutation) with React’s declarative state-to-UI projection.',
          'Explains the risks of vanilla JS manual synchronization: missed updates, state drift, and brittle imperative queries.',
          'Details the single lookup rule: document.getElementById(\'root\') runs exactly once to hand the container to createRoot(), after which React manages the DOM internally.'
        ],
        2
      ),
      essay(
        'Analyze the file anatomy of a modern React project, contrasting hand-written application code with tooling-generated files, and explain the roles of package.json and package-lock.json.',
        'A modern React project initialized with build tools like Vite contains a mixture of hand-written application source files, configuration manifests, and tooling-generated assets. Remarkably, out of the dozens of files in the project tree, exactly three files contain everything the application actually does: index.html (the HTML shell), src/main.jsx (the JavaScript bootstrap entrypoint), and src/App.jsx (the root React component). All other entries exist to support build tooling, dependency management, and quality control. Among these, package.json serves as the project manifest: it declares which third-party packages the project requires (dependencies and devDependencies) and specifies executable command scripts (e.g., dev, build, lint, preview). However, because package.json typically specifies semantic version ranges (e.g., ^19.2.8), running an install at different times could install different minor or patch releases. To ensure complete deterministic reproducibility, package-lock.json records the exact semantic version, resolved dependency tree, and cryptographic integrity hashes of every installed package. This guarantees that running npm install on any machine produces an identical environment. Finally, node_modules contains the physical downloaded package code and binaries; it is generated by the package manager and should never be manually modified or committed to version control.',
        [
          'Identifies the three core application files (index.html, src/main.jsx, src/App.jsx) versus tooling and configuration files.',
          'Contrasts package.json (manifest of direct dependencies and runnable scripts) with package-lock.json (exact locked versions and hashes for reproducible builds).',
          'Explains the role of node_modules as a tooling-generated directory holding installed packages rather than hand-written code.'
        ],
        4
      ),
      essay(
        'Explain the "missing content" paradox of index.html in a React application, and detail the architectural role of &lt;div id="root"&gt;&lt;/div&gt; as a boundary of authority.',
        'In a React single-page application (SPA), index.html sits at the project root and acts as the entrypoint. When inspected on disk, the body of index.html contains exactly two elements: &lt;div id="root"&gt;&lt;/div&gt; and &lt;script type="module" src="/src/main.jsx"&gt;&lt;/script&gt;. This reveals the "missing content" paradox: headings, paragraphs, navigation bars, buttons, and all visual interface elements appear nowhere in this HTML file. In traditional vanilla web development, the HTML document directly houses all static content and structure, and JavaScript merely enhances or modifies existing nodes. In React, however, the HTML document holds no content to modify; it is an empty shell. The &lt;div id="root"&gt;&lt;/div&gt; element is completely empty on disk and stays empty until client JavaScript executes. Its existence serves two vital architectural purposes: first, it provides client-side JavaScript code with a concrete in-memory DOM node to locate during startup; second, it establishes the strict boundary of React’s authority. The root div represents the designated territory given to React: React takes ownership of all nodes inside this container and renders dynamic components into it. Elements written outside &lt;div id="root"&gt; remain completely unaffected by React and stay under the document author’s control, enabling React to coexist cleanly with external markup or legacy systems.',
        [
          'Describes the body of index.html containing only an empty div and module script, explaining the "missing content" paradox.',
          'Contrasts traditional content-heavy HTML documents with React’s empty entry shell.',
          'Explains the dual role of <div id="root">: acting as a concrete node for JavaScript to locate, and defining the strict boundary of React’s DOM jurisdiction.'
        ],
        9
      ),
      essay(
        'Detail the execution timing, scoping, and dependency resolution of &lt;script type="module"&gt;, and explain why it inherently prevents the "cannot read properties of null" DOM lookup bug.',
        'When index.html loads src/main.jsx using &lt;script type="module"&gt;, the browser treats the script as an ECMAScript (ES) Module. This introduces three fundamental architectural behaviors: 1) Lexical Scoping: In classic scripts, top-level variables and functions are automatically attached to the global window object, causing global namespace collisions. In ES modules, top-level names are strictly private to the module itself. Modules communicate solely through explicit interfaces: export makes a value available to other files, and import brings specified values into scope. 2) Dependency Tree Resolution: An ES module cannot execute until every single file in its import graph has been fetched over the network and evaluated. In main.jsx, imports from \'react\', \'react-dom/client\', and \'./App.jsx\' must all be resolved. 3) Deferred Execution: While the browser’s rendering engine parses the HTML document, it initiates parallel network requests for the imported module files. The module script runs only after document parsing is completely finished. In traditional HTML, placing a classic script in the &lt;head&gt; or before an element results in parser-blocking execution where document.getElementById returns null, throwing a fatal TypeError. With &lt;script type="module"&gt;, deferral is not an extra option; it is an inherent physical consequence of module dependency resolution. Because execution is deferred until parsing completes, the script is guaranteed never to run before &lt;div id="root"&gt; has been constructed in the DOM tree, eliminating the null reference trap.',
        [
          'Contrasts ES module private scoping and explicit import/export interfaces with classic global namespace sharing.',
          'Explains dependency graph resolution: a module cannot run until all imported dependencies are fetched and evaluated.',
          'Clarifies how module deferral naturally ensures document parsing finishes before execution, guaranteeing <div id="root"> exists and preventing null errors.'
        ],
        16
      ),
      essay(
        'Trace the bootstrapping sequence in src/main.jsx, differentiating the responsibilities of react versus react-dom, explaining createRoot().render(), and analyzing the development role of &lt;StrictMode&gt;.',
        'The bootstrapping sequence in src/main.jsx initializes the React application through four imports and one chained statement: 1) Package Separation: Imports are deliberately divided between two packages: \'react\' and \'react-dom\'. The core \'react\' package contains the platform-independent engine that creates UI descriptions, defines component lifecycles, and provides hooks and utilities like StrictMode. It has no awareness of web browsers. In contrast, \'react-dom\' contains the browser-specific renderer that writes and reconciles React descriptions to the browser’s Document Object Model. createRoot is placed in \'react-dom/client\' because its entire function is to accept a browser DOM element. 2) Root Creation and Rendering: In main.jsx, document.getElementById(\'root\') locates the container in the DOM (the only DOM lookup in the app). This node is passed to createRoot(), which returns a React root manager object and claims exclusive ownership of the container without painting any pixels. Next, .render() is called on the root object, passing a declarative JSX element tree. On initial render, React evaluates the components and mounts real DOM nodes into the root div. On subsequent renders, render() compares the new description with the previous tree (reconciliation diffing) and applies only the detected differences. 3) The Role of StrictMode: The root component &lt;App /&gt; is wrapped in &lt;StrictMode&gt;. StrictMode displays nothing of its own and creates zero DOM nodes. In development mode, it intentionally executes component functions, state initializers, and effect setup/cleanup cycles twice. This intentional double execution forces impure functions and unintended side-effects (such as mutating external state during render) to fail visibly. In production builds, StrictMode is completely inert and introduces zero performance overhead.',
        [
          'Differentiates the core \'react\' package (platform-agnostic UI description engine) from \'react-dom\' (browser DOM renderer).',
          'Explains createRoot() (accepts container, returns root manager, claims ownership) and render() (mounts UI description, diffs on subsequent calls).',
          'Details <StrictMode>: zero DOM footprint, intentional double execution in development to surface side-effects, and zero overhead in production.'
        ],
        24
      )
    ]
  }
];
