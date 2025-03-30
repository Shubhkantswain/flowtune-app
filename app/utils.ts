// Format time helper function
export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Function to get the greeting message dynamically
export const getGreeting = (): string => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
  const istTime = new Date(now.getTime() + istOffset);
  const hours = istTime.getUTCHours();

  if (hours >= 5 && hours < 12) return "Good Morning";
  if (hours >= 12 && hours < 17) return "Good Afternoon";
  if (hours >= 17 && hours < 21) return "Good Evening";
  return "Good Night";
};

// Function to determine section titles with repeating pattern
export const getTitle = (index: number): string => {
  const titles = ["Welcome back", getGreeting(), "Discover more"];
  return titles[index % 3] || "More Tracks"; // This will cycle through 0,1,2,0,1,2...
};