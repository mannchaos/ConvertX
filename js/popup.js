document.addEventListener("DOMContentLoaded", () => {
  const convertFrom = document.getElementById("convertFrom");
  const convertTo = document.getElementById("convertTo");
  const enteredInputvalue = document.getElementById("enteredAmount");
  const convertedValue = document.getElementById("convertedAmount");
  const conversionForm = document.getElementById("conversionForm");

  const API_URL = "https://openexchangerates.org/api";
  let currencyList = [];

  const fetchCurrencyList = async () => {
    try {
      const response = await fetch(`${API_URL}/currencies.json`);
      const data = await response.json();
      currencyList = Object.keys(data);

      convertFrom.innerHTML = currencyList
        .map((curr) => `<option value="${curr}">${curr}</option>`)
        .join("");
      convertTo.innerHTML = currencyList
        .map((curr) => `<option value="${curr}">${curr}</option>`)
        .join("");

      convertFrom.value = "USD";
      convertTo.value = "INR";
    } catch (error) {
      console.error("Error while fetching currency list", error);
    }
  };

  if (currencyList.length === 0) {
    fetchCurrencyList();
  }

  const convertCurrency = async (event) => {
    event.preventDefault();
    const from = convertFrom.value;
    const to = convertTo.value;
    const value = enteredInputvalue.value;

    if (!value) {
      alert("Please Enter Amount");
    }

    try {
      const response = await fetch(
        `${API_URL}/convert/${value}/${from}/${to}?app_id={}` //app id will be add here
      );
      const data = await response.json();
      console.log("data", data);
      //   const convertedValue
    } catch (error) {
      console.error("Error while converting currency", error);
    }
  };

  conversionForm.addEventListener("submit", convertCurrency);
});
