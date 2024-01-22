export const formatDateTime = (dateTimeString: string | Date): { formattedDate: string, formattedTime: string } => {
    const dateTime = new Date(dateTimeString);
  
    // Format the date
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour12: false,
    }).format(dateTime);
  
    // Get the time separately
    const formattedTime = dateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  
    return { formattedDate, formattedTime };
  }