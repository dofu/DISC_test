// DISC Assessment Application

// State management
let cur = 0;
let answers = {};
for(let i = 0; i < 24; i++) { 
  answers[i] = {most: null, least: null}; 
}

// DOM elements
let startBtn, intro, quiz, results, backBtn, prevBtn, nextBtn, qwrap, bar, introErr, quizErr, downloadBtn, retakeBtn;

// Initialize application
function initializeElements() {
  startBtn = document.getElementById('startBtn');
  intro = document.getElementById('intro');
  quiz = document.getElementById('quiz');
  results = document.getElementById('results');
  backBtn = document.getElementById('backBtn');
  prevBtn = document.getElementById('prevBtn');
  nextBtn = document.getElementById('nextBtn');
  qwrap = document.getElementById('qwrap');
  bar = document.getElementById('bar');
  introErr = document.getElementById('introErr');
  quizErr = document.getElementById('quizErr');
  downloadBtn = document.getElementById('downloadBtn');
  retakeBtn = document.getElementById('retakeBtn');
  const manualTestBtn = document.getElementById('manualTestBtn');

  // Event listeners
  if(startBtn) {
    startBtn.addEventListener('click', () => showQuiz());
    startBtn.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') showQuiz();
    });
  }

  if(backBtn) backBtn.addEventListener('click', () => showIntro());
  if(prevBtn) prevBtn.addEventListener('click', prevQuestion);
  if(nextBtn) nextBtn.addEventListener('click', nextQuestion);
  if(retakeBtn) retakeBtn.addEventListener('click', retakeQuiz);
  if(manualTestBtn) manualTestBtn.addEventListener('click', runManualTest);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeElements();
  showIntro();
});

// Navigation functions
function showIntro() {
  if(intro) intro.classList.remove('hidden');
  if(quiz) quiz.classList.add('hidden');
  if(results) results.classList.add('hidden');
  hideErr('intro');
}

function showQuiz() {
  const name = document.getElementById('name').value.trim();
  const org = document.getElementById('org').value.trim();
  
  if(!name || !org) {
    const missingFields = [];
    if(!name) missingFields.push('Name');
    if(!org) missingFields.push('Organisation');
    
    showErr('Please fill in all required fields: ' + missingFields.join(', '), 'intro');
    return;
  }
  
  if(intro) intro.classList.add('hidden');
  if(quiz) quiz.classList.remove('hidden');
  if(results) results.classList.add('hidden');
  renderQuestion(cur);
  updateNav();
  updateProgress();
  hideErr('quiz');
}

function showResults(report) {
  const who = document.getElementById('who');
  const grid = document.getElementById('grid');
  const domTitle = document.getElementById('domTitle');
  const desc = document.getElementById('desc');
  const naturalSummary = document.getElementById('naturalSummary');

  const rawName = (document.getElementById('name') && document.getElementById('name').value.trim()) || '';
  const rawOrg = (document.getElementById('org') && document.getElementById('org').value.trim()) || '';
  const displayName = rawName !== '' ? rawName : 'Luke Skywalker';
  const displayOrg = rawOrg !== '' ? rawOrg : 'Jedi';
  const displayDate = new Date().toISOString().slice(0,10);

  const order = ['D','I','S','C'];
  const dom = order.slice().sort((a,b) => report.c[b] - report.c[a])[0];

  // Populate report fields
  const rn = document.getElementById('resultName');
  const ro = document.getElementById('resultOrg');
  const rd = document.getElementById('resultDate');
  if(rn) rn.value = displayName;
  if(ro) ro.value = displayOrg;
  if(rd) rd.value = displayDate;

  if(who) who.textContent = '';

  if(domTitle) domTitle.innerHTML = 'Your Dominant Style: ' + fullName(dom) + ' (' + dom + ')';
  if(desc) desc.innerHTML = '<p>' + descriptionText(dom) + '</p>';

  if(naturalSummary) {
    naturalSummary.innerHTML = 
      'Visit <a href="https://www.discprofile.com/disc-styles" target="_blank" style="color: var(--brand); text-decoration: none; font-weight: 600;">discprofile.com/disc-styles</a> to learn more about your DISC results and how to apply them in your work and relationships.';
  }

  // Build results table
  if(grid) {
    grid.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'score-table';
    
    const headerRow = document.createElement('tr');
    ['','D','I','S','C','★'].forEach(h => {
      const th = document.createElement('th');
      th.textContent = h;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // MOST row
    const mostRow = document.createElement('tr');
    const mostLabel = document.createElement('td'); 
    mostLabel.textContent = 'Most'; 
    mostLabel.style.fontWeight = '700';
    mostRow.appendChild(mostLabel);
    ['D','I','S','C'].forEach(k => { 
      const td = document.createElement('td'); 
      td.textContent = report.m[k]; 
      td.style.fontWeight = '700'; 
      mostRow.appendChild(td); 
    });
    const mostStar = document.createElement('td'); 
    mostStar.textContent = 24 - (report.m.D + report.m.I + report.m.S + report.m.C); 
    mostRow.appendChild(mostStar);
    table.appendChild(mostRow);

    // LEAST row
    const leastRow = document.createElement('tr');
    const leastLabel = document.createElement('td'); 
    leastLabel.textContent = 'Least'; 
    leastLabel.style.fontWeight = '700'; 
    leastRow.appendChild(leastLabel);
    ['D','I','S','C'].forEach(k => { 
      const td = document.createElement('td'); 
      td.textContent = report.l[k]; 
      td.style.fontWeight = '700'; 
      leastRow.appendChild(td); 
    });
    const leastStar = document.createElement('td'); 
    leastStar.textContent = 24 - (report.l.D + report.l.I + report.l.S + report.l.C); 
    leastRow.appendChild(leastStar);
    table.appendChild(leastRow);

    // CHANGE row
    const changeRow = document.createElement('tr');
    const changeLabel = document.createElement('td'); 
    changeLabel.textContent = 'Change'; 
    changeLabel.style.fontWeight = '700'; 
    changeRow.appendChild(changeLabel);
    ['D','I','S','C'].forEach(k => { 
      const td = document.createElement('td'); 
      td.textContent = (report.c[k] >= 0 ? '+' : '') + report.c[k]; 
      if(k === dom) td.style.background = '#fff'; 
      changeRow.appendChild(td); 
    });
    const empty = document.createElement('td'); 
    changeRow.appendChild(empty);
    table.appendChild(changeRow);

    grid.appendChild(table);
  }

  // Setup PDF download
  if(downloadBtn) {
    downloadBtn.onclick = async () => {
      try {
        downloadBtn.disabled = true;
        downloadBtn.textContent = 'Generating PDF...';

        const reportElement = document.getElementById('report');
        if(!reportElement) throw new Error('No report element found');

        // Check if html2pdf is available
        if (typeof window.html2pdf === 'undefined') {
          console.log('html2pdf not available, using print');
          window.print();
          return;
        }

        const filename = `DISC_Report_${sanitizeFilename(displayName)}_${displayDate}.pdf`;
        
        const options = {
          margin: 0.5,
          filename: filename,
          image: { 
            type: 'jpeg', 
            quality: 0.98 
          },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            letterRendering: true
          },
          jsPDF: { 
            unit: 'in', 
            format: 'letter', 
            orientation: 'portrait'
          }
        };

        // Generate PDF - save exactly as it appears on screen
        await window.html2pdf().set(options).from(reportElement).save();
        
        console.log('PDF generated successfully');

      } catch(error) {
        console.error('PDF generation failed:', error);
        // Fallback to browser print
        window.print();
        
      } finally {
        downloadBtn.disabled = false;
        downloadBtn.textContent = 'Download PDF';
      }
    };
  }

  if(quiz) quiz.classList.add('hidden');
  if(intro) intro.classList.add('hidden');
  if(results) { 
    results.classList.remove('hidden'); 
    results.style.display = 'block'; 
  }
  hideErr('quiz');
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// Question rendering
function renderQuestion(qIdx) {
  if(!qwrap) return;
  
  qwrap.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'qcard';
  
  const header = document.createElement('div');
  header.className = 'qtitle';
  header.textContent = 'Question ' + (qIdx + 1) + ' of 24 — pick ONE MOST(M) and ONE LEAST(L)';
  card.appendChild(header);

  const table = document.createElement('div');
  table.className = 'question-grid';

  const emptyHeader = document.createElement('div'); 
  table.appendChild(emptyHeader);
  
  const mostHeader = document.createElement('div'); 
  mostHeader.className = 'question-header';
  mostHeader.textContent = 'M'; 
  table.appendChild(mostHeader);
  
  const leastHeader = document.createElement('div'); 
  leastHeader.className = 'question-header';
  leastHeader.textContent = 'L'; 
  table.appendChild(leastHeader);

  QUESTIONS[qIdx].forEach((txt, idx) => {
    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.textContent = txt;
    table.appendChild(questionText);

    const mostOpt = document.createElement('div');
    mostOpt.className = 'option-button';
    if(answers[qIdx].most === idx) mostOpt.classList.add('selected');
    
    const mostCircle = document.createElement('div');
    mostCircle.className = 'option-circle';
    if(answers[qIdx].most === idx) mostCircle.classList.add('selected');
    mostOpt.appendChild(mostCircle);
    mostOpt.onclick = () => selectAnswer(qIdx, 'most', idx);
    table.appendChild(mostOpt);

    const leastOpt = document.createElement('div');
    leastOpt.className = 'option-button';
    if(answers[qIdx].least === idx) leastOpt.classList.add('selected');
    
    const leastCircle = document.createElement('div');
    leastCircle.className = 'option-circle';
    if(answers[qIdx].least === idx) leastCircle.classList.add('selected');
    leastOpt.appendChild(leastCircle);
    leastOpt.onclick = () => selectAnswer(qIdx, 'least', idx);
    table.appendChild(leastOpt);
  });

  card.appendChild(table);
  qwrap.appendChild(card);
}

// Answer selection
function selectAnswer(q, side, idx) {
  const other = (side === 'most') ? 'least' : 'most';
  if(answers[q][other] === idx) {
    showErr('You cannot pick the same option for MOST and LEAST.', 'quiz');
    return;
  }
  answers[q][side] = idx;
  renderQuestion(q);
  updateProgress();
  updateNav();
}

// Progress and navigation
function updateProgress() {
  if(!bar) return;
  let filled = 0;
  for(let i = 0; i < 24; i++) {
    if(answers[i].most != null && answers[i].least != null) filled++;
  }
  bar.style.width = (filled / 24 * 100) + '%';
}

function updateNav() {
  if(!prevBtn || !nextBtn) return;
  prevBtn.disabled = (cur === 0);
  nextBtn.textContent = (cur === 23) ? 'Calculate Results' : 'Next';
}

function prevQuestion() {
  if(cur > 0) {
    cur--;
    renderQuestion(cur);
    updateNav();
  }
}

function nextQuestion() {
  if(answers[cur].most == null && answers[cur].least == null) {
    showErr('Please select both MOST and LEAST options for this question.', 'quiz');
    return;
  }
  if(answers[cur].most == null) {
    showErr('Please select a MOST option for this question.', 'quiz');
    return;
  }
  if(answers[cur].least == null) {
    showErr('Please select a LEAST option for this question.', 'quiz');
    return;
  }
  if(answers[cur].most === answers[cur].least) {
    showErr('MOST and LEAST cannot be the same option.', 'quiz');
    return;
  }
  if(cur === 23) {
    calculateResults();
  } else {
    cur++;
    renderQuestion(cur);
    updateNav();
  }
}

// Results calculation
function calculateResults() {
  for(let i = 0; i < 24; i++) {
    if(answers[i].most == null || answers[i].least == null) {
      showErr('Please complete question ' + (i + 1), 'quiz');
      cur = i;
      renderQuestion(cur);
      updateNav();
      return;
    }
  }
  
  const m = {D: 0, I: 0, S: 0, C: 0};
  const l = {D: 0, I: 0, S: 0, C: 0};
  
  for(let q = 0; q < 24; q++) {
    const mi = answers[q].most;
    const li = answers[q].least;
    const ml = mapMost[q][mi];
    const ll = mapLeast[q][li];
    if(ml) m[ml]++;
    if(ll) l[ll]++;
  }
  
  const c = {
    D: m.D - l.D, 
    I: m.I - l.I, 
    S: m.S - l.S, 
    C: m.C - l.C
  };
  
  showResults({m: m, l: l, c: c});
}

// Error handling
function showErr(msg, target) {
  const el = (target === 'intro') ? introErr : quizErr;
  if(el) {
    el.classList.remove('hidden');
    el.textContent = msg;
    try { 
      el.scrollIntoView({behavior: 'smooth', block: 'center'}); 
    } catch(e) {}
    setTimeout(() => { 
      if(el) el.classList.add('hidden'); 
    }, 4000);
  } else {
    alert(msg);
  }
}

function hideErr(target) {
  if(target === 'intro' && introErr) { 
    introErr.classList.add('hidden'); 
    introErr.textContent = ''; 
  }
  if(target === 'quiz' && quizErr) { 
    quizErr.classList.add('hidden'); 
    quizErr.textContent = ''; 
  }
}

// Utility functions
function sanitizeFilename(s) {
  return (s || 'User').replace(/[^a-z0-9_\\-]+/gi, '_');
}

function retakeQuiz() {
  for(let i = 0; i < 24; i++) { 
    answers[i] = {most: null, least: null}; 
  }
  cur = 0;

  const nameEl = document.getElementById('name');
  const orgEl = document.getElementById('org');
  if(nameEl) nameEl.value = '';
  if(orgEl) orgEl.value = '';

  const rn = document.getElementById('resultName');
  const ro = document.getElementById('resultOrg');
  const rd = document.getElementById('resultDate');
  if(rn) rn.value = '';
  if(ro) ro.value = '';
  if(rd) rd.value = '';

  if(quiz) quiz.classList.add('hidden');
  if(results) results.classList.add('hidden');
  if(intro) intro.classList.remove('hidden');

  renderQuestion(cur);
  updateNav();
  updateProgress();
  hideErr('intro');
}

function runManualTest() {
  const manualAnswers = [
    {most: 0, least: 2}, {most: 1, least: 2}, {most: 0, least: 1}, {most: 2, least: 3}, {most: 0, least: 3},
    {most: 3, least: 2}, {most: 2, least: 1}, {most: 0, least: 1}, {most: 2, least: 3}, {most: 0, least: 3},
    {most: 2, least: 1}, {most: 0, least: 2}, {most: 0, least: 2}, {most: 3, least: 0}, {most: 0, least: 3},
    {most: 3, least: 2}, {most: 0, least: 3}, {most: 1, least: 2}, {most: 1, least: 2}, {most: 3, least: 2},
    {most: 3, least: 2}, {most: 2, least: 3}, {most: 1, least: 3}, {most: 3, least: 1}
  ];
  
  for(let i = 0; i < 24; i++) { 
    answers[i] = manualAnswers[i]; 
  }
  calculateResults();

  async function generatePDF() {
  const reportElement = document.getElementById("report");
  const fname = "DISC_Report.pdf";

  const opt = {
    margin: 0,  // no big white borders
    filename: fname,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  };

  await window.html2pdf().set(opt).from(reportElement).save();
}

}