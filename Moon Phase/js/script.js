const calendarEl = document.getElementById('calendar');
const moonOutput = document.getElementById('moonPhaseResult');
const monthSelect = document.getElementById('month');

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

monthNames.forEach((m, i) => {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = m;
  monthSelect.appendChild(opt);
});

function generateCalendar() {
  const year = parseInt(document.getElementById('year').value);
  const month = parseInt(monthSelect.value);
  calendarEl.innerHTML = '';

  // Add weekday headers
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
    const div = document.createElement('div');
    div.textContent = day;
    div.className = 'header';
    calendarEl.appendChild(div);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarEl.appendChild(document.createElement('div')); // empty boxes
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const div = document.createElement('div');
    div.className = 'day';
    div.textContent = day;
    div.onclick = () => showMoonPhase(year, month, day);
    calendarEl.appendChild(div);
  }
}

function showMoonPhase(year, month, day) {
  const date = new Date(year, month, day);
  const { icon, name } = getMoonPhase(date);
  document.getElementById('moonIcon').textContent = icon;
  document.getElementById('moonText').textContent = `Moon phase on ${date.toDateString()}: ${name}`;
}

function getMoonPhase(date) {
  const knownNewMoon = new Date("2001-01-01T00:00:00Z");
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSince = Math.floor((date - knownNewMoon) / msPerDay);
  const synodicMonth = 29.53058867;
  let phase = (daysSince % synodicMonth);
  if (phase < 0) phase += synodicMonth; // handle negatives if any

  if (phase < 1.84566) return { icon: "🌑", name: "New Moon" };
  else if (phase < 5.53699) return { icon: "🌒", name: "Waxing Crescent" };
  else if (phase < 9.22831) return { icon: "🌓", name: "First Quarter" };
  else if (phase < 12.91963) return { icon: "🌔", name: "Waxing Gibbous" };
  else if (phase < 16.61096) return { icon: "🌕", name: "Full Moon" };
  else if (phase < 20.30228) return { icon: "🌖", name: "Waning Gibbous" };
  else if (phase < 23.99361) return { icon: "🌗", name: "Last Quarter" };
  else if (phase < 27.68493) return { icon: "🌘", name: "Waning Crescent" };
  else return { icon: "🌑", name: "New Moon" };
}


