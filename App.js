const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetching exchange rates and updating the DOM

function cacluate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/cc1c73686f37a1dd3ca728d5/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const rate = data.conversion_rates[currency_two];
      // console.log(rate);
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event listeners
currencyEl_one.addEventListener('change', cacluate);
currencyEl_two.addEventListener('change', cacluate);
amountEl_one.addEventListener('input', cacluate);
amountEl_two.addEventListener('input', cacluate);

swap.addEventListener('click', function onClick() {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  cacluate();
});

cacluate();
