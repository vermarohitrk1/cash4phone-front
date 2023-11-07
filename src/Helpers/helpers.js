const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = currentDate.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  };

  function convertNumberToString(number) {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  
    const numberToString = (number) => {
      let str = '';
      if (number >= 100000) {
        str += numberToString(Math.floor(number / 100000)) + ' lakh ';
        number %= 100000;
      }
      if (number >= 1000) {
        str += numberToString(Math.floor(number / 1000)) + ' thousand ';
        number %= 1000;
      }
      if (number >= 100) {
        str += ones[Math.floor(number / 100)] + ' hundred ';
        number %= 100;
      }
      if (number >= 20) {
        str += tens[Math.floor(number / 10)] + ' ';
        number %= 10;
      }
      
      if (number > 0) {
        if (number === 10) {
          str += 'ten';
        } else if (number < 10) {
          str += ones[number] + ' ';
        } else {
          str += teens[number - 10] + ' ';
        }
      }
      return str.trim();
    };
    
  
    return numberToString(number);
  }


  function formatDate(originalDate, format) {
    const dateObject = new Date(originalDate);
  
    if (isNaN(dateObject.getTime())) {
      // Handle invalid date
      return '';
    }
  
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
  
    switch (format) {
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      // Add more date formats as needed
      default:
        return originalDate; // Return the original date if the format is not recognized
    }
  }

  export {getCurrentDate, convertNumberToString, formatDate};