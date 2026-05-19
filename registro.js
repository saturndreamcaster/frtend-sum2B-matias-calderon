// registro.js — show/hide conditional fields and char counters + validation and reset handling
document.addEventListener('DOMContentLoaded', function(){
  const petSpecies = document.getElementById('petSpecies');
  const otherSpeciesLabel = document.getElementById('otherSpeciesLabel');
  const petMicrochip = document.getElementById('petMicrochip');
  const chipNumberLabel = document.getElementById('chipNumberLabel');
  const petConditions = document.getElementById('petConditions');
  const charCount = document.getElementById('charCount');
  const form = document.getElementById('registroForm');

  const additionalObservations = document.getElementById('additionalObservations');
  const obsCount = document.getElementById('obsCount');
  const acceptTerms = document.getElementById('acceptTerms');
  const acceptPrivacy = document.getElementById('acceptPrivacy');

  function toggleOtherSpecies(){
    if(petSpecies && petSpecies.value === 'Otro') otherSpeciesLabel.classList.remove('hidden');
    else if(otherSpeciesLabel) otherSpeciesLabel.classList.add('hidden');
  }

  function toggleChipNumber(){
    if(petMicrochip && petMicrochip.checked) chipNumberLabel.classList.remove('hidden');
    else if(chipNumberLabel) chipNumberLabel.classList.add('hidden');
  }

  if(petSpecies) petSpecies.addEventListener('change', toggleOtherSpecies);
  if(petMicrochip) petMicrochip.addEventListener('change', toggleChipNumber);

  // pet conditions char counter
  if(petConditions){
    petConditions.addEventListener('input', function(){
      charCount.textContent = petConditions.value.length;
    });
    charCount.textContent = petConditions.value.length;
  }

  // additional observations char counter
  if(additionalObservations){
    additionalObservations.addEventListener('input', function(){
      obsCount.textContent = additionalObservations.value.length;
    });
    obsCount.textContent = additionalObservations.value.length;
  }

  // Basic matching validation for email and password fields and required agreements
  form.addEventListener('submit', function(e){
    const email = form.owner_email.value;
    const emailConfirm = form.owner_email_confirm.value;
    const pwd = form.owner_password.value;
    const pwdConfirm = form.owner_password_confirm.value;

    if(email !== emailConfirm){
      alert('Los correos electrónicos no coinciden.');
      e.preventDefault();
      return false;
    }
    if(pwd !== pwdConfirm){
      alert('Las contraseñas no coinciden.');
      e.preventDefault();
      return false;
    }

    if(acceptTerms && !acceptTerms.checked){
      alert('Debe aceptar los Términos y Condiciones.');
      e.preventDefault();
      return false;
    }
    if(acceptPrivacy && !acceptPrivacy.checked){
      alert('Debe aceptar la Política de Privacidad.');
      e.preventDefault();
      return false;
    }

    // Form is valid (no backend), allow default submission behavior for now
  });

  // Reset handler: reinitialize UI state after reset
  form.addEventListener('reset', function(){
    // delay to allow form controls to reset
    setTimeout(function(){
      toggleOtherSpecies();
      toggleChipNumber();
      if(petConditions) charCount.textContent = petConditions.value.length;
      if(additionalObservations) obsCount.textContent = additionalObservations.value.length;
    }, 10);
  });

  // initialize states
  toggleOtherSpecies();
  toggleChipNumber();
});
