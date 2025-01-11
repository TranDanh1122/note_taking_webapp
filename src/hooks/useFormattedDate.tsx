
const useFormattedDate = (isoDate: string) => {

    let date = new Date()
    if (isoDate) date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-US', options).replace(',', '');
    const formattedTime = date.toISOString().substring(11, 16);

    return { formattedDate, formattedTime };

};

export default useFormattedDate;