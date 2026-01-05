export const togglePassword = (input, trigger) => {
  if (input.type === "password") {
    input.type = "text";
    trigger.src = "./img/hide.png";
  } else {
    input.type = "password";
    trigger.src = "./img/view.png";
  }
};

export const validationMessage = (message, element) => {
  const parentElement = element.parentElement.parentElement;
  const oldMessage = parentElement.getElementsByClassName("text-danger")[0];

  if (oldMessage) {
    if (oldMessage.value !== message) {
      parentElement.removeChild(oldMessage);
    }
  }

  const validatonMessage = document.createElement("p");
  validatonMessage.textContent = message;
  validatonMessage.className = "text-danger";
  element.className = "border-danger";

  parentElement.appendChild(validatonMessage);
};

export const removeValidationMessage = (element) => {
  element.className = "default-border";
  const parentElement = element.parentElement.parentElement;
  const message = parentElement.querySelector("p");

  if (message) {
    message.remove();
  }
};

export const createSuccessMessage = (message) => {
  const form = document.querySelector("form");
  if (!form.querySelector(".text-success")) {
    const successMessage = document.createElement("p");
    successMessage.textContent = message;
    successMessage.className = "text-success";
    form.appendChild(successMessage);
  }
};
