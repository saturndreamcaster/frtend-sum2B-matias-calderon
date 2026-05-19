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
