// registro.js — show/hide conditional fields and char counter + basic validation
document.addEventListener('DOMContentLoaded', function(){
  const petSpecies = document.getElementById('petSpecies');
  const otherSpeciesLabel = document.getElementById('otherSpeciesLabel');
  const petMicrochip = document.getElementById('petMicrochip');
  const chipNumberLabel = document.getElementById('chipNumberLabel');
  const petConditions = document.getElementById('petConditions');
  const charCount = document.getElementById('charCount');
  const form = document.getElementById('registroForm');

  function toggleOtherSpecies(){
    if(petSpecies.value === 'Otro') otherSpeciesLabel.classList.remove('hidden');
    else otherSpeciesLabel.classList.add('hidden');
  }

  function toggleChipNumber(){
    if(petMicrochip.checked) chipNumberLabel.classList.remove('hidden');
    else chipNumberLabel.classList.add('hidden');
  }

  petSpecies.addEventListener('change', toggleOtherSpecies);
  petMicrochip.addEventListener('change', toggleChipNumber);

  // char counter
  if(petConditions){
    petConditions.addEventListener('input', function(){
      charCount.textContent = petConditions.value.length;
    });
  }

  // Basic matching validation for email and password fields
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
    // allow submission (for now, no backend)
  });

  // initialize states
  toggleOtherSpecies();
  toggleChipNumber();
  if(petConditions) charCount.textContent = petConditions.value.length;
});
