const emojiElements = document.querySelectorAll('.emoji');
const moodInput = document.getElementById('moodInput');
const saveMoodBtn = document.getElementById('saveMoodBtn');
const suggestionsDiv = document.getElementById('suggestions');
const moodHistoryDiv = document.getElementById('moodHistory');
const dateDiv = document.getElementById('date');

let selectedMood = "";

// Display today's date
const today = new Date();
dateDiv.textContent = today.toDateString();

// Mood suggestions
const moodSuggestions = {
  happy: `You're feeling joyful and uplifted!
- Keep doing what you're doing!
- Share your happiness with friends and family.
- Do something creative to express yourself.
- Take a moment to appreciate the good things in life.`,

  excited: `You're feeling enthusiastic and energized!
- Channel your energy into a creative project.
- Share your excitement with others.
- Plan a fun activity or outing.
- Take calculated risks and step out of your comfort zone.`,

  neutral: `You're feeling neutral.
- Stay open to positive experiences today.
- Consider trying something new to lift your mood.
- Maintain balance in your activities.
- Reflect on things you're grateful for.`,

  relaxed: `You're feeling calm and serene.
- Enjoy the moment and savor the peace.
- Practice mindfulness and presence.
- Engage in a calming activity, like reading or listening to soothing music.
- Take care of your physical and emotional well-being.`,

  angry: `You're feeling upset and irritated.
- Take a moment to calm down and reflect.
- Identify the source of your anger.
- Find a healthy way to express your emotions, like talking to someone or writing.
- Practice forgiveness and letting go.`,

  tired: `You're feeling exhausted and drained.
- Prioritize rest and self-care.
- Engage in relaxing activities, like meditation or reading.
- Take breaks and practice time management.
- Seek support from others if needed.`
};

// Emoji click handler
emojiElements.forEach(emoji => {
  emoji.addEventListener('click', () => {
    emojiElements.forEach(e => e.classList.remove('selected')); // remove highlight from others
    emoji.classList.add('selected'); // highlight selected emoji
    selectedMood = emoji.getAttribute('data-mood'); // set mood
    displaySuggestions(selectedMood);
    moodInput.value = selectedMood; // Write mood name in the input box
  });
});

// Show suggestions for selected mood
function displaySuggestions(mood) {
  if (moodSuggestions[mood]) {
    suggestionsDiv.textContent = moodSuggestions[mood];
  } else {
    suggestionsDiv.textContent = "";
  }
}

// Save mood button click handler
saveMoodBtn.addEventListener('click', () => {
  if (!selectedMood) {
    alert('Please select an emoji representing your mood.');
    return;
  }
  const note = moodInput.value.trim();
  const moodData = {
    date: today.toLocaleString(),
    mood: selectedMood,
    note: note
  };

  let moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
  moodHistory.push(moodData);
  localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  moodInput.value = "";
  alert('Mood saved!');
  displayMoodHistory();
});

// Show mood history on page load
function displayMoodHistory() {
  let moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
  moodHistoryDiv.innerHTML = "<h3>Your Mood History:</h3>";
  moodHistory.slice().reverse().forEach(item => {
    moodHistoryDiv.innerHTML += `
      <div>
        <strong>${item.date}:</strong> 
        <em>${item.mood}</em> - ${item.note ? item.note : 'No description'}
      </div>
    `;
  });
}

displayMoodHistory();
