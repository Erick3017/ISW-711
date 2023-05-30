let selectedCountry = "";

const completed = (e) => {
  const data = JSON.parse(e.target.responseText);
  addOptions("countries", data);
};

const completedCurrencies = (e) => {
  const dataCurrency = JSON.parse(e.target.responseText);
  const usd = "usd";
  const eur = "eur";

  for (let key in dataCurrency) {
    if (key === selectedCountry) {
      const selectObject = dataCurrency[key];
      
      for (let currency in selectObject) {
        const value = selectObject[currency];

        if (currency === usd) {
          document.getElementById('labelUsd').innerText = (1 / value).toFixed(2);
        } else if (currency === eur) {
          document.getElementById('labelEur').innerText = (1 / value).toFixed(2);
        }
      }
    } else {
      const value = dataCurrency[key];
      console.log(key + ": " + value);
    }
  }

  console.log(dataCurrency);
};

const error = () => console.log(this.responseText);

function getHelloWorld() {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", completed);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", "http://localhost:3000/countries");
  ajaxRequest.send();
}

function getCurrencies(selectedCountry) {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", completedCurrencies);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${selectedCountry}.json`);
  ajaxRequest.send();
}

function addOptions(domElement, array) {
  const select = document.getElementById(domElement);
  
  for (let value in array) {
    const option = document.createElement("option");
    option.text = array[value].countryName;
    option.value = array[value].currencyCode;
    option.className = "option";
    select.add(option);
  }
}

function handleInputChangeMoney(select) {
  selectedCountry = select.value.toLowerCase();
  getCurrencies(selectedCountry);
}

function onMyLoad() {
  getHelloWorld();
}

window.addEventListener("load", onMyLoad);
