/* js/announcements.js — Dynamic Announcements Marquee Controller */
/**
 * ADMINISTRATOR PANEL: Easily manage marquee items here.
 * To add a new announcement, insert an object: { icon: "emoji", text: "message" }
 */
const ANNOUNCEMENTS = [
    { icon: "🔔", text: "Admissions Open for Academic Year 2026–27" },
    { icon: "🎓", text: "Scholarships Available for Eligible Students" },
    { icon: "🤖", text: "New AI-Powered Admission Chatbot Now Available" },
    { icon: "📚", text: "Applications Open for B.Tech, MBA, BCA, MCA and B.Com Programs" },
    { icon: "🏆", text: "Ranked Among Emerging Institutions in Kerala" },
    { icon: "💼", text: "Placement Training and Career Development Programs Started" },
    { icon: "🌐", text: "Industry Collaboration Programs with Leading Technology Companies" },
    { icon: "📅", text: "Last Date for Early Admission Registration: July 31, 2026" },
    { icon: "🎯", text: "Campus Recruitment Preparation Sessions Available" },
    { icon: "🚀", text: "Welcome to Cybolink Institute of Studies" }
];
document.addEventListener("DOMContentLoaded", () => {
    const marqueeContainer = document.getElementById("hero-announcement-marquee");
    if (!marqueeContainer) return;
    // Build the marquee item HTML templates
    const itemsHtml = ANNOUNCEMENTS.map(item => `
        <span class="marquee-item">
            <span class="marquee-icon">${item.icon}</span>
            <span class="marquee-text">${item.text}</span>
        </span>
    `).join('<span class="marquee-divider">•</span>');
    // Create the scrolling track container
    const track = document.createElement("div");
    track.className = "marquee-track";
    // Create block 1 (primary track segment)
    const block1 = document.createElement("div");
    block1.className = "marquee-content";
    block1.innerHTML = itemsHtml + '<span class="marquee-divider">•</span>';
    // Create block 2 (cloned segment for seamless infinite scroll)
    const block2 = document.createElement("div");
    block2.className = "marquee-content";
    block2.setAttribute("aria-hidden", "true");
    block2.innerHTML = itemsHtml + '<span class="marquee-divider">•</span>';
    // Append blocks to track
    track.appendChild(block1);
    track.appendChild(block2);
    // Render in DOM
    marqueeContainer.appendChild(track);
});
