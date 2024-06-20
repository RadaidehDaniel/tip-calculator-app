// INPUTS
const billInput = document.getElementById("bill");
const tipInputs = document.getElementsByName("tip");
const peopleInput = document.getElementById("people");
const customInput = document.getElementById("custom-input");

const inputs = [billInput, peopleInput, customInput];

// OUTPUTS
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");
const errorBillMsg = document.getElementById("bill-error");
const errorTipMsg = document.getElementById("tip-error");
const errorPeoplelMsg = document.getElementById("people-error");

//RESET
const resetBtn = document.getElementById("reset-button");

// VALIDATION

function isValid(value) {
  if (value <= 0) {
    return false;
  }

  return true;
}

// FUNCTIONS

function findLableForControl(el) {
  var idVal = el.id;
  labels = document.getElementsByTagName("label");
  for (var i = 0; i < labels.length; i++) {
    if (labels[i].htmlFor == idVal) return labels[i];
  }
}

function tipValue() {
  for (i = 0; i < tipInputs.length; i++) {
    findLableForControl(tipInputs[i]).classList.remove("active");
  }

  for (i = 0; i < tipInputs.length; i++) {
    if (tipInputs[i].checked) {
      findLableForControl(tipInputs[i]).classList.add("active");
      return tipInputs[i].value / 100;
    }
  }

  if (customInput.value) {
    return customInput.value / 100;
  }
}

function handleRender(bill, tip, people) {
  const tipPerson = (bill * tip) / people;
  const totalPerson = (bill + bill * tip) / people;

  tipAmount.textContent = `${parseFloat(tipPerson).toFixed(2)}`;
  totalAmount.textContent = `${parseFloat(totalPerson).toFixed(2)}`;
}

function handleChange() {
  resetBtn.classList.add("active-reset");

  const bill = Number(billInput.value);
  const tip = tipValue();
  const people = Number(peopleInput.value);

  if (!isValid(bill)) {
    errorBillMsg.style.display = "block";
  } else {
    errorBillMsg.style.display = "none";
  }

  if (!isValid(tip)) {
    errorTipMsg.style.display = "block";
  } else {
    errorTipMsg.style.display = "none";
  }

  if (!isValid(people)) {
    errorPeoplelMsg.style.display = "block";
  } else {
    errorPeoplelMsg.style.display = "none";
  }

  if (isValid(people) && isValid(tip) && isValid(bill)) {
    handleRender(bill, tip, people);
  }
}

function unCheck() {
  for (i = 0; i < tipInputs.length; i++) {
    tipInputs[i].checked = false;
    findLableForControl(tipInputs[i]).classList.remove("active");
  }
}

function resetHandle() {
  billInput.value = "0";
  tipInputs[2].checked = true;
  customInput.value = "";
  peopleInput.value = "0";
  tipAmount.textContent = "0.00";
  totalAmount.textContent = "0.00";
  resetBtn.classList.remove("active-reset");
  errorBillMsg.style.display = "none";
  errorPeoplelMsg.style.display = "none";
  errorTipMsg.style.display = "none";
}

// EXCUTION

inputs.forEach((input) => input.addEventListener("change", handleChange));
tipInputs.forEach((element) =>
  element.addEventListener("change", handleChange)
);

customInput.addEventListener("focus", unCheck);

tipInputs.forEach((element) => {
  element.addEventListener("focus", function () {
    customInput.value = "";
  });
});

resetBtn.addEventListener("click", resetHandle);
