export const sendRequest = async (url, configObj = null, errorMsg = null) => {
     const response = await fetch(url, configObj);
     const responseData = await response.json();

     if(!response.ok) {
          throw new Error(errorMsg || responseData.message);
     }

     return responseData;
};

const gcd = (a, b) => {
     return b ? gcd(b, a % b) : a;
};

const convertDecimalToFraction = (decimal) => {
     let top = decimal.toString().replace(/\d+[.]/, '');
     const bottom = Math.pow(10, top.length);
     if (decimal > 1) {
          top	= + top + Math.floor(decimal) * bottom;
     }
     const x = gcd(top, bottom);

     return {
          numerator: top / x,
          denominator: bottom / x
     };
};

export const formatQuantity = (quantity) => {
     let { numerator, denominator } = convertDecimalToFraction(quantity);

     let wholeNumber;

     if(numerator > denominator) {
          wholeNumber = parseInt(numerator / denominator);
          numerator = numerator % denominator;
     }

     const fraction = document.createElement('textarea');
     fraction.innerHTML = '&frasl;';

     return `${wholeNumber ? wholeNumber : ''} ${numerator}${fraction.value}${denominator}`;
};

export const getViewWidth = () => {
     return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
};

export const createSlug = (str) => {
     return str.toLowerCase().replace(/[',()]+/g, '').split(' ').join('-');
};

export const trimTitle = (title, viewWidth) => {
     let maxLetter;
     if(viewWidth < 576) {
          maxLetter = 26;
     } 
     else if(viewWidth >= 576 && viewWidth < 768) {
          maxLetter = 43;
     }
     else {
          maxLetter = 20;
     }

     if(title.length < maxLetter) {
          return title;
     }
     return `${title.slice(0, maxLetter).trim()}...`;
};