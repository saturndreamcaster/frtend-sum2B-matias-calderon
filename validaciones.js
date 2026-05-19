document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registroForm');
  const ownerName = form.owner_name;
  const ownerDob = form.owner_dob;
  const ownerDni = form.owner_dni;
  const ownerEmail = form.owner_email;
  const ownerEmailConfirm = form.owner_email_confirm;
  const ownerPassword = form.owner_password;
  const ownerPasswordConfirm = form.owner_password_confirm;
  const ownerPhone = form.owner_phone;
  const ownerAddress = form.owner_address;
  const ownerCity = form.owner_city;
  const ownerProvince = form.owner_province;

  const petName = form.pet_name;
  const petSpecies = document.getElementById('petSpecies');
  const petSpeciesOther = document.getElementById('petSpeciesOther');
  const petBreed = form.pet_breed;
  const petSexRadios = form.elements['pet_sex'];
  const petDob = form.pet_dob;
  const petMicrochip = document.getElementById('petMicrochip');
  const petChipNumber = document.getElementById('petChipNumber');
  const petConditions = document.getElementById('petConditions');
  const interestServices = form.querySelectorAll('input[name="interest_services"]');
  const preferredShiftRadios = form.elements['preferred_shift'];
  const visitFrequency = form.visit_frequency;

  const allFields = [
    ownerName,
    ownerDob,
    ownerDni,
    ownerEmail,
    ownerEmailConfirm,
    ownerPassword,
    ownerPasswordConfirm,
    ownerPhone,
    ownerAddress,
    ownerCity,
    ownerProvince,
    petName,
    petSpecies,
    petSpeciesOther,
    petBreed,
    petDob,
    petChipNumber
  ].filter(Boolean);

  function setFieldStatus(field, valid, message = '') {
    if (!field) return;
    field.classList.toggle('campo-ok', valid);
    field.classList.toggle('campo-error', !valid);
    field.setCustomValidity(valid ? '' : message);
    field.setAttribute('aria-invalid', valid ? 'false' : 'true');
  }

  function setRadioStatus(radios, valid, message = '') {
    if (!radios || !radios.length) return;
    radios.forEach(radio => {
      radio.classList.toggle('campo-ok', valid);
      radio.classList.toggle('campo-error', !valid);
      radio.setCustomValidity(valid ? '' : message);
      radio.setAttribute('aria-invalid', valid ? 'false' : 'true');
    });
  }

  function setCheckboxGroupStatus(checkboxes, valid, message = '') {
    if (!checkboxes || !checkboxes.length) return;
    checkboxes.forEach(checkbox => {
      checkbox.classList.toggle('campo-ok', valid);
      checkbox.classList.toggle('campo-error', !valid);
      checkbox.setCustomValidity(valid ? '' : message);
      checkbox.setAttribute('aria-invalid', valid ? 'false' : 'true');
    });
  }

  function clearStatus() {
    allFields.forEach(field => {
      field.classList.remove('campo-error', 'campo-ok');
      field.setCustomValidity('');
      field.setAttribute('aria-invalid', 'false');
    });
    if (petSexRadios && petSexRadios.length) {
      petSexRadios.forEach(radio => {
        radio.classList.remove('campo-error', 'campo-ok');
        radio.setCustomValidity('');
        radio.setAttribute('aria-invalid', 'false');
      });
    }
  }

  function validateName(value) {
    const normalized = value.trim();
    return normalized.length >= 5 && normalized.length <= 80 && /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(normalized);
  }

  function validateOwnerDob(value) {
    if (!value) return false;
    const birthday = new Date(value);
    const today = new Date();
    if (birthday > today) return false;
    const age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();
    const dayDiff = today.getDate() - birthday.getDate();
    return age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
  }

  function validateDni(value) {
    return /^[0-9]{7,8}$/.test(value.trim());
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function validatePassword(value) {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(value);
  }

  function validatePhone(value) {
    const digits = value.replace(/[^0-9]/g, '');
    return /^[0-9+\-\s]+$/.test(value.trim()) && digits.length >= 8;
  }

  function validateTextField(value, minLength) {
    return value.trim().length >= minLength;
  }

  function validateSpecies(value) {
    return ['Perro', 'Gato', 'Ave', 'Conejo', 'Reptil', 'Otro'].includes(value);
  }

  function validatePetName(value) {
    const normalized = value.trim();
    return normalized.length >= 2 && /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(normalized);
  }

  function validatePetDob(value) {
    if (!value) return false;
    const birthday = new Date(value);
    const today = new Date();
    if (birthday > today) return false;
    const age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();
    const dayDiff = today.getDate() - birthday.getDate();
    const years = age - (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? 1 : 0);
    return years >= 0 && years <= 30;
  }

  function validateChipNumber(value) {
    return /^[0-9]{9,15}$/.test(value.trim());
  }

  function validateOwnerSection() {
    let valid = true;

    if (!validateName(ownerName.value)) {
      setFieldStatus(ownerName, false, 'Nombre completo solo letras y espacios, entre 5 y 80 caracteres.');
      valid = false;
    } else {
      setFieldStatus(ownerName, true);
    }

    if (!validateOwnerDob(ownerDob.value)) {
      setFieldStatus(ownerDob, false, 'Debe ser mayor de 18 años y no puede ser fecha futura.');
      valid = false;
    } else {
      setFieldStatus(ownerDob, true);
    }

    if (!validateDni(ownerDni.value)) {
      setFieldStatus(ownerDni, false, 'DNI debe tener solo números y 7 u 8 dígitos.');
      valid = false;
    } else {
      setFieldStatus(ownerDni, true);
    }

    if (!validateEmail(ownerEmail.value)) {
      setFieldStatus(ownerEmail, false, 'Correo electrónico con formato válido.');
      valid = false;
    } else {
      setFieldStatus(ownerEmail, true);
    }

    if (ownerEmailConfirm.value.trim() !== ownerEmail.value.trim()) {
      setFieldStatus(ownerEmailConfirm, false, 'Debe coincidir exactamente con el correo electrónico.');
      valid = false;
    } else {
      setFieldStatus(ownerEmailConfirm, true);
    }

    if (!validatePassword(ownerPassword.value)) {
      setFieldStatus(ownerPassword, false, 'Contraseña con mínimo 8 caracteres, una mayúscula, un número y un caracter especial.');
      valid = false;
    } else {
      setFieldStatus(ownerPassword, true);
    }

    if (ownerPasswordConfirm.value !== ownerPassword.value) {
      setFieldStatus(ownerPasswordConfirm, false, 'Debe coincidir exactamente con la contraseña.');
      valid = false;
    } else {
      setFieldStatus(ownerPasswordConfirm, true);
    }

    if (!validatePhone(ownerPhone.value)) {
      setFieldStatus(ownerPhone, false, 'Teléfono válido con al menos 8 dígitos numéricos.');
      valid = false;
    } else {
      setFieldStatus(ownerPhone, true);
    }

    if (!validateTextField(ownerAddress.value, 3)) {
      setFieldStatus(ownerAddress, false, 'Dirección no puede estar vacía y debe tener al menos 3 caracteres.');
      valid = false;
    } else {
      setFieldStatus(ownerAddress, true);
    }

    if (!validateTextField(ownerCity.value, 3)) {
      setFieldStatus(ownerCity, false, 'Localidad no puede estar vacía y debe tener al menos 3 caracteres.');
      valid = false;
    } else {
      setFieldStatus(ownerCity, true);
    }

    if (!ownerProvince.value || ownerProvince.value.trim() === '') {
      setFieldStatus(ownerProvince, false, 'Debe seleccionar una provincia válida.');
      valid = false;
    } else {
      setFieldStatus(ownerProvince, true);
    }

    return valid;
  }

  function validatePetSection() {
    let valid = true;

    if (!validatePetName(petName.value)) {
      setFieldStatus(petName, false, 'Nombre de la mascota solo letras y espacios, mínimo 2 caracteres.');
      valid = false;
    } else {
      setFieldStatus(petName, true);
    }

    if (!validateSpecies(petSpecies.value)) {
      setFieldStatus(petSpecies, false, 'Debe seleccionar una especie válida.');
      valid = false;
    } else {
      setFieldStatus(petSpecies, true);
    }

    if (petSpecies.value === 'Otro') {
      if (!validateTextField(petSpeciesOther.value, 1)) {
        setFieldStatus(petSpeciesOther, false, 'Especifique la especie si eligió Otro.');
        valid = false;
      } else {
        setFieldStatus(petSpeciesOther, true);
      }
    } else if (petSpeciesOther) {
      setFieldStatus(petSpeciesOther, true);
    }

    if (!validateTextField(petBreed.value, 2)) {
      setFieldStatus(petBreed, false, 'Raza no puede estar vacía y debe tener al menos 2 caracteres.');
      valid = false;
    } else {
      setFieldStatus(petBreed, true);
    }

    const selectedSex = Array.from(petSexRadios).some(radio => radio.checked);
    if (!selectedSex) {
      setRadioStatus(petSexRadios, false, 'Seleccione el sexo de la mascota.');
      valid = false;
    } else {
      setRadioStatus(petSexRadios, true);
    }

    if (!validatePetDob(petDob.value)) {
      setFieldStatus(petDob, false, 'Fecha inválida; no puede ser futura ni mayor a 30 años.');
      valid = false;
    } else {
      setFieldStatus(petDob, true);
    }

    if (petMicrochip.checked) {
      if (!validateChipNumber(petChipNumber.value)) {
        setFieldStatus(petChipNumber, false, 'Número de microchip debe tener entre 9 y 15 dígitos numéricos.');
        valid = false;
      } else {
        setFieldStatus(petChipNumber, true);
      }
    } else if (petChipNumber) {
      setFieldStatus(petChipNumber, true);
    }

    if (petConditions && petConditions.value.trim().length > 0 && petConditions.value.length > 250) {
      setFieldStatus(petConditions, false, 'El campo de alergias no puede superar los 250 caracteres.');
      valid = false;
    } else if (petConditions) {
      setFieldStatus(petConditions, true);
    }

    return valid;
  }

  function validatePreferenceSection() {
    let valid = true;
    const anyServiceSelected = Array.from(interestServices).some(checkbox => checkbox.checked);
    if (!anyServiceSelected) {
      setCheckboxGroupStatus(interestServices, false, 'Seleccione al menos un servicio de interés.');
      valid = false;
    } else {
      setCheckboxGroupStatus(interestServices, true);
    }

    const preferredShiftSelected = Array.from(preferredShiftRadios).some(radio => radio.checked);
    if (!preferredShiftSelected) {
      setRadioStatus(preferredShiftRadios, false, 'Seleccione un turno preferido.');
      valid = false;
    } else {
      setRadioStatus(preferredShiftRadios, true);
    }

    if (!visitFrequency || !visitFrequency.value || visitFrequency.value.trim() === '') {
      setFieldStatus(visitFrequency, false, 'Seleccione la frecuencia estimada de visitas.');
      valid = false;
    } else {
      setFieldStatus(visitFrequency, true);
    }

    return valid;
  }

  form.addEventListener('submit', function(event) {
    clearStatus();
    const ownerValid = validateOwnerSection();
    const petValid = validatePetSection();
    const preferenceValid = validatePreferenceSection();

    if (!ownerValid || !petValid || !preferenceValid) {
      event.preventDefault();
      const firstError = form.querySelector('.campo-error');
      if (firstError) {
        firstError.focus();
        if (typeof firstError.reportValidity === 'function') {
          firstError.reportValidity();
        }
      }
    }
  });

  form.addEventListener('reset', function() {
    setTimeout(function() {
      clearStatus();
    }, 10);
  });
});
