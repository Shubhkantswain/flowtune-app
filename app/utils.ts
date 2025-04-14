// Format time helper function
export const formatTime = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export const formatDuration = (durationString: string) => {
  const totalSeconds = Math.floor(parseFloat(durationString));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export const formatTotalDuration = (durations: string[]) => {
    const totalSeconds = durations.reduce((sum, val) => sum + Math.floor(parseFloat(val)), 0);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const hourPart = hours > 0 ? `${hours} HOUR${hours > 1 ? 'S' : ''}` : '';
    const minutePart = minutes > 0 ? `${minutes} MINUTE${minutes > 1 ? 'S' : ''}` : '';

    if (hourPart && minutePart) return `${hourPart} AND ${minutePart}`;
    if (hourPart) return hourPart;
    if (minutePart) return minutePart;
    return '0 MINUTES';
}

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

