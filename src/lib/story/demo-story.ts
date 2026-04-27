import type { Story } from "./types";

export const demoStory: Story = {
  id: "demo-lighthouse",
  title: "The Lighthouse Keeper's Secret",
  genre: "Mystery",
  setting: "A wave-battered island where the lighthouse beam has begun blinking in impossible patterns.",
  atmosphere: "Salt, thunder, old brass, and a secret that refuses to stay buried.",
  isDemo: true,
  createdAt: "2026-04-27T00:00:00.000Z",
  characters: [
    {
      name: "Mara Vale",
      role: "protagonist",
      personality: "Careful, stubborn, and quietly brave when the truth is close.",
      visualDescription: "A raincoat-dark silhouette with a notebook full of tide tables and old rumors.",
      avatarEmoji: "🕯️",
      accentColor: "#fbbf24",
    },
    {
      name: "Elias Thorn",
      role: "neutral",
      personality: "A weary keeper who answers simple questions with complicated silences.",
      visualDescription: "Silver beard, storm-glass eyes, and hands stained with lamp oil.",
      avatarEmoji: "🧭",
      accentColor: "#38bdf8",
    },
    {
      name: "Ione Reed",
      role: "ally",
      personality: "A radio operator with a quick wit and a faster sense for lies.",
      visualDescription: "Copper goggles, sea-green scarf, and a portable transmitter strapped to her hip.",
      avatarEmoji: "📻",
      accentColor: "#34d399",
    },
    {
      name: "The Signal",
      role: "antagonist",
      personality: "Patient, ancient, and almost human when heard through static.",
      visualDescription: "A presence in the lantern room: violet light folded into the shape of a warning.",
      avatarEmoji: "🔮",
      accentColor: "#c084fc",
    },
  ],
  chapters: [
    {
      id: "chapter-1",
      title: "The Missing Beam",
      scene: "The dock groans as Mara steps onto Gullwake Island. Above her, the lighthouse flashes twice, pauses, then flashes seven times.",
      narration:
        "No official chart used that rhythm. No living keeper should have known it. Yet the sea answers every pulse with a sound like a locked door opening.",
      backgroundMood: "storm",
      dialogue: [
        {
          speaker: "Ione Reed",
          emotion: "surprised",
          text: "That pattern just cut across every frequency. Someone is transmitting through the lamp.",
        },
        {
          speaker: "Elias Thorn",
          emotion: "fearful",
          text: "Leave before low tide. The lighthouse is only merciful while it still has witnesses.",
        },
      ],
      choices: [
        {
          id: "inspect-lantern",
          text: "Climb to the lantern room and inspect the mechanism.",
          nextChapterId: "chapter-2",
          consequence: "Mara finds a hidden prism etched with names.",
        },
        {
          id: "question-keeper",
          text: "Press Elias about the old signal code.",
          nextChapterId: "chapter-2",
          consequence: "Elias admits the beam once guided more than ships.",
        },
        {
          id: "scan-radio",
          text: "Help Ione isolate the transmission.",
          nextChapterId: "chapter-2",
          consequence: "The static speaks Mara's name before she says it aloud.",
        },
      ],
    },
    {
      id: "chapter-2",
      title: "Names in the Glass",
      scene: "The lantern room smells of lightning. A cracked prism turns slowly inside the lamp, throwing violet names across the walls.",
      narration:
        "Mara recognizes one name from a grave marker below the cliff. Another is her mother's. The newest name is still being written.",
      backgroundMood: "night",
      dialogue: [
        {
          speaker: "Mara Vale",
          emotion: "angry",
          text: "You knew my family was tied to this place. That is why you tried to send me away.",
        },
        {
          speaker: "Elias Thorn",
          emotion: "sad",
          text: "Your mother sealed the signal under this island. I kept the lamp lit so it could not dream in the dark.",
        },
        {
          speaker: "The Signal",
          emotion: "happy",
          text: "Mara Vale. At last, a hand that remembers the key.",
        },
      ],
      choices: [
        {
          id: "break-prism",
          text: "Break the prism before the final name appears.",
          nextChapterId: "chapter-3",
          consequence: "The lighthouse goes dark, but the sea begins to glow.",
        },
        {
          id: "read-journal",
          text: "Search Elias's journal for the sealing ritual.",
          nextChapterId: "chapter-3",
          consequence: "Mara learns the signal can be bargained with.",
        },
        {
          id: "answer-signal",
          text: "Speak directly to the presence in the beam.",
          nextChapterId: "chapter-3",
          consequence: "The Signal offers a memory in exchange for a promise.",
        },
      ],
    },
    {
      id: "chapter-3",
      title: "Low Tide Confession",
      scene: "At low tide, stone steps rise from the surf beneath the lighthouse, leading to a door with no handle.",
      narration:
        "The secret is not a treasure or a crime. It is a bargain: one keeper, one light, one island spared from the thing that listens below.",
      backgroundMood: "dream",
      dialogue: [
        {
          speaker: "Ione Reed",
          emotion: "fearful",
          text: "Whatever choice you make, make it now. The tide is turning backward.",
        },
        {
          speaker: "Elias Thorn",
          emotion: "neutral",
          text: "A keeper is not a prisoner if they choose the watch with open eyes.",
        },
        {
          speaker: "Mara Vale",
          emotion: "happy",
          text: "Then I choose a different rule. We do not feed secrets to the dark. We bring witnesses.",
        },
      ],
      choices: [
        {
          id: "end-witness",
          text: "Broadcast the truth to the mainland.",
          nextChapterId: "chapter-3",
          consequence: "The Signal weakens as the island fills with listening voices.",
        },
        {
          id: "end-keeper",
          text: "Take the keeper's vow and rewrite it.",
          nextChapterId: "chapter-3",
          consequence: "Mara binds the light to choice instead of sacrifice.",
        },
        {
          id: "end-sea",
          text: "Open the tide door and face what waits below.",
          nextChapterId: "chapter-3",
          consequence: "The island exhales, and the first honest dawn breaks over Gullwake.",
        },
      ],
    },
  ],
};
