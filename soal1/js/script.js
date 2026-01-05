import {
  togglePassword,
  validationMessage,
  removeValidationMessage,
  createSuccessMessage,
} from "./handler.js";

const submitBtn = document.getElementById("submit");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password1");
const passwordConfirmation = document.getElementById("password2");

// Show Password
const showBtns = document.getElementsByClassName("toggle-show");
const showPassBtn = showBtns[0];
const showPassConfirmationBtn = showBtns[1];

showPassBtn.addEventListener("click", (event) => {
  togglePassword(password, event.target);
});
showPassConfirmationBtn.addEventListener("click", (event) => {
  togglePassword(passwordConfirmation, event.target);
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  // Validasi Email
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = regexEmail.test(email.value); // Format email harus example@example.com

  if (!email.value) {
    validationMessage("Email harus diisi", email);
  } else if (!isEmailValid) {
    validationMessage(
      "Format email tidak valid, contoh email valid: example@example.com",
      email
    );
  } else {
    removeValidationMessage(email);
  }

  // Validasi Pass
  const regexPassword = /^.{8,}$/; // Password Minimal 8 Karakter
  const isPasswordValid = regexPassword.test(password.value);
  const isPasswordConfirmationValid =
    password.value === passwordConfirmation.value;

  if (!isPasswordValid) {
    validationMessage("Password harus berisi minimal 8 karakter", password);
  } else if (!isPasswordConfirmationValid) {
    validationMessage("Password dan konfirmasi password tidak sama", password);
    validationMessage(
      "Password dan konfirmasi password tidak sama",
      passwordConfirmation
    );
  } else {
    removeValidationMessage(password);
    removeValidationMessage(passwordConfirmation);

    createSuccessMessage("Pendaftaran Berhasil");
  }
});
