export function checkSignupFormInput(name, value) {
  let newVal;
  let tempVal = value.trim();
  let field = name;
  switch (field) {
    case "company_name": {
      let tempArr = tempVal.split(" ");
      let newArr = tempArr.map((el) => {
        let newWord = `${el[0].toUpperCase()}${el.slice(1, el.length)}`;
        return newWord;
      });
      newVal = newArr.join(" ");
      return newVal;
    }
    case "location_state": {
      let newVal = `${tempVal[0].toUpperCase()}${tempVal.slice(
        1,
        tempVal.length - 1
      )}`;
      return newVal;
    }
    case "location_city": {
      let tempArr = tempVal.split(" ");
      let newArr = tempArr.map((el) => {
        let newWord = `${el[0].toUpperCase()}${el.slice(1, el.length)}`;
        return newWord;
      });
      newVal = newArr.join(" ");
      return newVal;
    }
    case "contact_name": {
      let tempArr = tempVal.split(" ");
      let newArr = tempArr.map((el) => {
        let newWord = `${el[0].toUpperCase()}${el.slice(1, el.length)}`;
        return newWord;
      });
      newVal = newArr.join(" ");
      return newVal;
    }
    default:
      return tempVal;
  }
}

