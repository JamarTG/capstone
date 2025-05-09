export const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  
export const insertSoftHyphens = (text: string) => {
    return text
      .replace(/([a-z])([A-Z])/g, '$1&shy;$2') 
      .replace(/-/g, '&shy;-');              
  }