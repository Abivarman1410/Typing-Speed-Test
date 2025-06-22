
export const generateRandomParagraph = (): string => {
  const paragraphs = [
    "The art of programming requires patience, creativity, and logical thinking. Every line of code tells a story, and every function serves a purpose. Debugging is not just about fixing errors; it's about understanding the intricate dance between data and logic that makes software come alive.",
    
    "Mountain climbing teaches us about perseverance and respect for nature. Each step upward is a testament to human determination, while the breathtaking views remind us of our place in the vast wilderness. The summit is not just a destination, but a metaphor for achieving our highest aspirations.",
    
    "Cooking is a beautiful blend of science and creativity. Understanding how ingredients interact at a molecular level helps create dishes that not only taste incredible but also tell stories of culture and tradition. Every recipe is a bridge connecting generations through shared flavors and memories.",
    
    "The ocean holds mysteries that have captivated humanity for millennia. Its depths conceal ancient secrets, while its surface reflects our dreams and ambitions. Marine life demonstrates the incredible diversity of evolution, showing us forms of beauty we never imagined possible.",
    
    "Photography captures fleeting moments and transforms them into eternal memories. The interplay of light and shadow, composition and timing, creates visual narratives that speak directly to our emotions. A single photograph can convey what thousands of words might struggle to express.",
    
    "Space exploration represents humanity's boldest adventure. Looking up at the stars, we see not just distant suns but possibilities for discovery and growth. Each mission beyond our atmosphere teaches us more about the universe and, surprisingly, more about ourselves and our home planet.",
    
    "Music transcends language barriers and speaks directly to the soul. Rhythm, melody, and harmony combine to create emotional experiences that can transport us across time and space. Whether classical or contemporary, music remains one of our most powerful forms of human expression.",
    
    "Gardening connects us to the earth and teaches patience through the natural cycles of growth. Watching seeds transform into flourishing plants mirrors our own personal development. Each season brings new lessons about resilience, renewal, and the delicate balance of life.",
    
    "Architecture shapes the way we live and interact with our environment. Great buildings don't just provide shelter; they inspire, comfort, and challenge us to think differently about space and form. The best architectural designs seamlessly blend functionality with artistic vision.",
    
    "Learning a new language opens doors to different cultures and ways of thinking. Each language carries within it unique perspectives on life, love, and human experience. Mastering another tongue is like gaining a new lens through which to view and understand the world around us."
  ];
  
  return paragraphs[Math.floor(Math.random() * paragraphs.length)];
};
