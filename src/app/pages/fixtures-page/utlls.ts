export const formatDate =  (dateTimeString: string | Date): string => {
    const dateTime = new Date(dateTimeString);
  
    const options: any = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
  
    return new Intl.DateTimeFormat('en-US', options).format(dateTime);
}