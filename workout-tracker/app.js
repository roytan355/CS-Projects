// ==========================================
// IRON PROGRESS - WORKOUT TRACKER
// ==========================================

// ==========================================
// BADGE MILESTONES - Based on Strength Standards
// ==========================================
const BADGE_MILESTONES = {
    // Bench Press Milestones (Common gym benchmarks)
    'Bench Press': [
        { weight: 95, name: 'First Plate', tier: 'bronze', icon: '🥉', description: 'Bench 95 lbs' },
        { weight: 135, name: 'One Plate Club', tier: 'silver', icon: '🥈', description: 'Bench 135 lbs (1 plate each side)' },
        { weight: 185, name: 'Intermediate Presser', tier: 'gold', icon: '🥇', description: 'Bench 185 lbs' },
        { weight: 225, name: 'Two Plate Club', tier: 'platinum', icon: '💎', description: 'Bench 225 lbs (2 plates each side)' },
        { weight: 315, name: 'Elite Presser', tier: 'diamond', icon: '👑', description: 'Bench 315 lbs (3 plates each side)' }
    ],

    // Squat Milestones
    'Squat': [
        { weight: 135, name: 'First Squat Plate', tier: 'bronze', icon: '🥉', description: 'Squat 135 lbs' },
        { weight: 185, name: 'Rising Squatter', tier: 'silver', icon: '🥈', description: 'Squat 185 lbs' },
        { weight: 225, name: 'Two Plate Squatter', tier: 'gold', icon: '🥇', description: 'Squat 225 lbs' },
        { weight: 315, name: 'Three Plate Club', tier: 'platinum', icon: '💎', description: 'Squat 315 lbs' },
        { weight: 405, name: 'Four Plate Legend', tier: 'diamond', icon: '👑', description: 'Squat 405 lbs' }
    ],

    // Deadlift Milestones
    'Deadlift': [
        { weight: 135, name: 'Dead Starter', tier: 'bronze', icon: '🥉', description: 'Deadlift 135 lbs' },
        { weight: 225, name: 'Two Plate Puller', tier: 'silver', icon: '🥈', description: 'Deadlift 225 lbs' },
        { weight: 315, name: 'Intermediate Puller', tier: 'gold', icon: '🥇', description: 'Deadlift 315 lbs' },
        { weight: 405, name: 'Four Plate Deadlifter', tier: 'platinum', icon: '💎', description: 'Deadlift 405 lbs' },
        { weight: 500, name: 'Half-Ton Hero', tier: 'diamond', icon: '👑', description: 'Deadlift 500 lbs' }
    ],

    // Overhead Press Milestones
    'Overhead Press': [
        { weight: 65, name: 'Press Beginner', tier: 'bronze', icon: '🥉', description: 'OHP 65 lbs' },
        { weight: 95, name: 'Shoulder Soldier', tier: 'silver', icon: '🥈', description: 'OHP 95 lbs' },
        { weight: 135, name: 'One Plate OHP', tier: 'gold', icon: '🥇', description: 'OHP 135 lbs' },
        { weight: 155, name: 'Strong Shoulders', tier: 'platinum', icon: '💎', description: 'OHP 155 lbs' },
        { weight: 185, name: 'Press Master', tier: 'diamond', icon: '👑', description: 'OHP 185 lbs' }
    ],

    // Barbell Row Milestones
    'Barbell Row': [
        { weight: 95, name: 'Row Rookie', tier: 'bronze', icon: '🥉', description: 'Row 95 lbs' },
        { weight: 135, name: 'One Plate Row', tier: 'silver', icon: '🥈', description: 'Row 135 lbs' },
        { weight: 185, name: 'Strong Back', tier: 'gold', icon: '🥇', description: 'Row 185 lbs' },
        { weight: 225, name: 'Two Plate Row', tier: 'platinum', icon: '💎', description: 'Row 225 lbs' },
        { weight: 275, name: 'Row King', tier: 'diamond', icon: '👑', description: 'Row 275 lbs' }
    ],

    // Leg Press Milestones
    'Leg Press': [
        { weight: 180, name: 'Leg Day Started', tier: 'bronze', icon: '🥉', description: 'Leg Press 180 lbs' },
        { weight: 270, name: 'Building Legs', tier: 'silver', icon: '🥈', description: 'Leg Press 270 lbs' },
        { weight: 360, name: 'Strong Legs', tier: 'gold', icon: '🥇', description: 'Leg Press 360 lbs' },
        { weight: 450, name: 'Quad King', tier: 'platinum', icon: '💎', description: 'Leg Press 450 lbs' },
        { weight: 540, name: 'Leg Press Legend', tier: 'diamond', icon: '👑', description: 'Leg Press 540+ lbs' }
    ],

    // Dumbbell Curl Milestones
    'Dumbbell Curl': [
        { weight: 20, name: 'Curl Beginner', tier: 'bronze', icon: '🥉', description: 'Curl 20 lbs' },
        { weight: 30, name: 'Growing Guns', tier: 'silver', icon: '🥈', description: 'Curl 30 lbs' },
        { weight: 40, name: 'Bicep Builder', tier: 'gold', icon: '🥇', description: 'Curl 40 lbs' },
        { weight: 50, name: 'Arm Champion', tier: 'platinum', icon: '💎', description: 'Curl 50 lbs' },
        { weight: 60, name: 'Curl King', tier: 'diamond', icon: '👑', description: 'Curl 60 lbs' }
    ],

    // Lat Pulldown Milestones
    'Lat Pulldown': [
        { weight: 80, name: 'Lat Rookie', tier: 'bronze', icon: '🥉', description: 'Pulldown 80 lbs' },
        { weight: 120, name: 'Growing Wings', tier: 'silver', icon: '🥈', description: 'Pulldown 120 lbs' },
        { weight: 160, name: 'Wide Back', tier: 'gold', icon: '🥇', description: 'Pulldown 160 lbs' },
        { weight: 200, name: 'Lat Champion', tier: 'platinum', icon: '💎', description: 'Pulldown 200 lbs' },
        { weight: 240, name: 'Wing Master', tier: 'diamond', icon: '👑', description: 'Pulldown 240 lbs' }
    ]
};

// Generic milestones for exercises not in the predefined list
const GENERIC_MILESTONES = [
    { weightMultiplier: 1, name: 'Started', tier: 'bronze', icon: '🥉' },
    { weightMultiplier: 1.25, name: 'Progressing', tier: 'silver', icon: '🥈' },
    { weightMultiplier: 1.5, name: 'Intermediate', tier: 'gold', icon: '🥇' },
    { weightMultiplier: 1.75, name: 'Advanced', tier: 'platinum', icon: '💎' },
    { weightMultiplier: 2, name: 'Elite', tier: 'diamond', icon: '👑' }
];

// ==========================================
// STATE MANAGEMENT
// ==========================================
let workoutData = [];
let currentWorkout = [];
let unlockedBadges = [];
let chart = null;

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeTabs();
    initializeForm();
    initializeChartControls();
    setDefaultDate();
    updateUI();
});

// ==========================================
// DATA PERSISTENCE
// ==========================================
function loadData() {
    const storedWorkouts = localStorage.getItem('workoutData');
    const storedBadges = localStorage.getItem('unlockedBadges');

    if (storedWorkouts) {
        workoutData = JSON.parse(storedWorkouts);
    }
    if (storedBadges) {
        unlockedBadges = JSON.parse(storedBadges);
    }
}

function saveData() {
    localStorage.setItem('workoutData', JSON.stringify(workoutData));
    localStorage.setItem('unlockedBadges', JSON.stringify(unlockedBadges));
}

// ==========================================
// TAB NAVIGATION
// ==========================================
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            switchTab(tabName);

            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.getElementById(`tab-${tabName}`);
    if (selectedTab) {
        selectedTab.classList.add('active');

        // Update content when switching tabs
        if (tabName === 'progress') {
            updateProgressTab();
        } else if (tabName === 'history') {
            updateHistoryTab();
        } else if (tabName === 'log') {
            updateSuggestions();
        } else if (tabName === 'badges') {
            updateBadgesTab();
        }
    }
}

// ==========================================
// FORM HANDLING
// ==========================================
function initializeForm() {
    const form = document.getElementById('workout-form');
    const finishBtn = document.getElementById('finish-workout-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addExerciseToCurrentWorkout();
    });

    finishBtn.addEventListener('click', finishWorkout);
}

function setDefaultDate() {
    const dateInput = document.getElementById('workout-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
}

function addExerciseToCurrentWorkout() {
    const date = document.getElementById('workout-date').value;
    const exercise = document.getElementById('exercise-name').value.trim();
    const sets = parseInt(document.getElementById('sets').value);
    const reps = parseInt(document.getElementById('reps').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (!exercise || !sets || !reps || weight < 0) {
        showNotification('Fill in all fields! 💪', false);
        return;
    }

    const entry = {
        id: Date.now(),
        date,
        exercise,
        sets,
        reps,
        weight,
        volume: sets * reps * weight
    };

    currentWorkout.push(entry);

    // Check for new badges
    const newBadges = checkForNewBadges(exercise, weight);

    // Clear form fields (except date)
    document.getElementById('exercise-name').value = '';
    document.getElementById('sets').value = '';
    document.getElementById('reps').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('exercise-name').focus();

    updateCurrentWorkoutDisplay();

    if (newBadges.length > 0) {
        newBadges.forEach((badge, index) => {
            setTimeout(() => {
                showNotification(`🏆 Badge Unlocked: ${badge.name}!`, true);
            }, index * 1500);
        });
    } else {
        showNotification('Exercise added! 💪', false);
    }
}

function updateCurrentWorkoutDisplay() {
    const container = document.getElementById('current-workout');
    const list = document.getElementById('current-workout-list');

    if (currentWorkout.length === 0) {
        container.classList.add('hidden');
        return;
    }

    container.classList.remove('hidden');
    list.innerHTML = currentWorkout.map(entry => {
        const isPR = isPersonalRecord(entry.exercise, entry.weight);
        return `
      <div class="workout-entry animate-slide-up">
        <div class="workout-entry-info">
          <div class="workout-entry-name">
            ${entry.exercise}
            ${isPR ? '<span class="pr-banner">NEW PR!</span>' : ''}
          </div>
          <div class="workout-entry-details">
            ${entry.sets} sets × ${entry.reps} reps @ ${entry.weight} lbs
            <span style="color: var(--color-accent-success)"> • ${entry.volume.toLocaleString()} lbs volume</span>
          </div>
        </div>
        <div class="workout-entry-actions">
          <button class="btn btn-danger btn-small" onclick="removeFromCurrentWorkout(${entry.id})">✕</button>
        </div>
      </div>
    `;
    }).join('');
}

function removeFromCurrentWorkout(id) {
    currentWorkout = currentWorkout.filter(entry => entry.id !== id);
    updateCurrentWorkoutDisplay();
}

function finishWorkout() {
    if (currentWorkout.length === 0) {
        showNotification('Add exercises first!', false);
        return;
    }

    // Add all exercises to workout data
    workoutData.push(...currentWorkout);
    saveData();

    showNotification(`Workout complete! ${currentWorkout.length} exercises logged 🔥`, false);

    // Clear current workout
    currentWorkout = [];
    updateCurrentWorkoutDisplay();
    updateSuggestions();
    updateUI();
}

// ==========================================
// BADGE SYSTEM
// ==========================================
function checkForNewBadges(exercise, weight) {
    const newBadges = [];
    const milestones = BADGE_MILESTONES[exercise];

    if (milestones) {
        milestones.forEach(milestone => {
            if (weight >= milestone.weight) {
                const badgeId = `${exercise}-${milestone.tier}`;
                if (!unlockedBadges.includes(badgeId)) {
                    unlockedBadges.push(badgeId);
                    newBadges.push(milestone);
                }
            }
        });
    } else {
        // For exercises without predefined milestones, use generic ones
        const firstWeight = getFirstWeightForExercise(exercise);
        if (firstWeight) {
            GENERIC_MILESTONES.forEach((milestone, index) => {
                const targetWeight = Math.round(firstWeight * milestone.weightMultiplier);
                if (weight >= targetWeight) {
                    const badgeId = `${exercise}-generic-${index}`;
                    if (!unlockedBadges.includes(badgeId)) {
                        unlockedBadges.push(badgeId);
                        newBadges.push({
                            ...milestone,
                            name: `${exercise} ${milestone.name}`,
                            description: `${exercise} at ${targetWeight}+ lbs`
                        });
                    }
                }
            });
        }
    }

    if (newBadges.length > 0) {
        saveData();
    }

    return newBadges;
}

function getFirstWeightForExercise(exercise) {
    const exerciseData = workoutData.filter(w => w.exercise === exercise);
    if (exerciseData.length === 0) return null;
    exerciseData.sort((a, b) => new Date(a.date) - new Date(b.date));
    return exerciseData[0].weight;
}

function isPersonalRecord(exercise, weight) {
    const previousMax = workoutData
        .filter(w => w.exercise === exercise)
        .reduce((max, w) => Math.max(max, w.weight), 0);
    return weight > previousMax && previousMax > 0;
}

function updateBadgesTab() {
    const badgesGrid = document.getElementById('badges-grid');

    // Get all exercises used
    const usedExercises = [...new Set(workoutData.map(w => w.exercise))];

    // Build badges display
    let badgesHTML = '';

    // Show predefined exercise badges
    Object.entries(BADGE_MILESTONES).forEach(([exercise, milestones]) => {
        const hasActivity = usedExercises.includes(exercise);
        const maxWeight = workoutData
            .filter(w => w.exercise === exercise)
            .reduce((max, w) => Math.max(max, w.weight), 0);

        milestones.forEach(milestone => {
            const badgeId = `${exercise}-${milestone.tier}`;
            const isUnlocked = unlockedBadges.includes(badgeId);
            const progress = maxWeight > 0 ? Math.min(100, (maxWeight / milestone.weight) * 100) : 0;

            badgesHTML += `
        <div class="badge-item tier-${milestone.tier} ${isUnlocked ? 'unlocked' : 'locked'}">
          <span class="badge-icon">${milestone.icon}</span>
          <div class="badge-name">${milestone.name}</div>
          <div class="badge-requirement">${milestone.description}</div>
          ${!isUnlocked && progress > 0 ? `<div style="font-size: 0.625rem; color: var(--color-accent-primary); margin-top: 4px;">${Math.round(progress)}%</div>` : ''}
        </div>
      `;
        });
    });

    badgesGrid.innerHTML = badgesHTML || '<p style="color: var(--color-text-tertiary); text-align: center; grid-column: 1/-1;">Start logging workouts to see available badges!</p>';

    // Update badges earned count
    document.getElementById('badges-earned').textContent = unlockedBadges.length;
}

// ==========================================
// PROGRESS TAB
// ==========================================
function initializeChartControls() {
    const periodButtons = document.querySelectorAll('[data-period]');
    const exerciseSelect = document.getElementById('exercise-select');

    periodButtons.forEach(button => {
        button.addEventListener('click', () => {
            periodButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateChart();
        });
    });

    exerciseSelect.addEventListener('change', updateChart);
}

function updateProgressTab() {
    updateStats();
    updateExerciseSelect();
    updateChart();
}

function updateStats() {
    const totalWorkouts = new Set(workoutData.map(w => w.date)).size;
    const uniqueExercises = new Set(workoutData.map(w => w.exercise)).size;
    const totalVolume = workoutData.reduce((sum, w) => sum + w.volume, 0);

    document.getElementById('total-workouts').textContent = totalWorkouts;
    document.getElementById('unique-exercises').textContent = uniqueExercises;
    document.getElementById('total-volume').textContent = formatVolume(totalVolume);
    document.getElementById('badges-earned').textContent = unlockedBadges.length;

    const emptyState = document.getElementById('progress-empty');
    if (workoutData.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}

function formatVolume(volume) {
    if (volume >= 1000000) {
        return (volume / 1000000).toFixed(1) + 'M';
    } else if (volume >= 1000) {
        return (volume / 1000).toFixed(1) + 'K';
    }
    return volume.toLocaleString();
}

function updateExerciseSelect() {
    const select = document.getElementById('exercise-select');
    const exercises = [...new Set(workoutData.map(w => w.exercise))].sort();

    select.innerHTML = '<option value="">Select Exercise</option>' +
        exercises.map(ex => `<option value="${ex}">${ex}</option>`).join('');

    // Auto-select first exercise if none selected
    if (exercises.length > 0 && !select.value) {
        select.value = exercises[0];
    }
}

function updateChart() {
    const exerciseSelect = document.getElementById('exercise-select');
    const selectedExercise = exerciseSelect.value;

    if (!selectedExercise || workoutData.length === 0) {
        if (chart) {
            chart.destroy();
            chart = null;
        }
        return;
    }

    // Filter data by exercise and period
    const activePeriodBtn = document.querySelector('[data-period].active');
    const period = activePeriodBtn ? activePeriodBtn.dataset.period : 'all';

    let filteredData = workoutData.filter(w => w.exercise === selectedExercise);

    if (period !== 'all') {
        const days = parseInt(period);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        filteredData = filteredData.filter(w => new Date(w.date) >= cutoffDate);
    }

    // Sort by date
    filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Prepare chart data
    const labels = filteredData.map(w => {
        const date = new Date(w.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    const weights = filteredData.map(w => w.weight);
    const volumes = filteredData.map(w => w.volume);

    const ctx = document.getElementById('progress-chart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Weight (lbs)',
                    data: weights,
                    borderColor: '#ff4d4d',
                    backgroundColor: 'rgba(255, 77, 77, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#ff4d4d',
                    pointBorderColor: '#0d0d0d',
                    pointBorderWidth: 2,
                    yAxisID: 'y'
                },
                {
                    label: 'Volume (lbs)',
                    data: volumes,
                    borderColor: '#ff8c00',
                    backgroundColor: 'rgba(255, 140, 0, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#ff8c00',
                    pointBorderColor: '#0d0d0d',
                    pointBorderWidth: 2,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 12,
                            weight: 600,
                            family: 'Outfit'
                        },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(22, 22, 22, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#b0b0b0',
                    borderColor: '#ff4d4d',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    titleFont: {
                        size: 14,
                        weight: 700,
                        family: 'Outfit'
                    },
                    bodyFont: {
                        size: 12,
                        family: 'Outfit'
                    },
                    callbacks: {
                        afterBody: function (context) {
                            const index = context[0].dataIndex;
                            const entry = filteredData[index];
                            return `Sets: ${entry.sets} × Reps: ${entry.reps}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#808080',
                        font: {
                            size: 11,
                            family: 'Outfit'
                        }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#ff4d4d',
                        font: {
                            size: 11,
                            family: 'Outfit'
                        },
                        callback: function (value) {
                            return value + ' lbs';
                        }
                    },
                    title: {
                        display: true,
                        text: 'WEIGHT',
                        color: '#ff4d4d',
                        font: {
                            size: 11,
                            weight: 700,
                            family: 'Outfit'
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#ff8c00',
                        font: {
                            size: 11,
                            family: 'Outfit'
                        },
                        callback: function (value) {
                            return (value / 1000).toFixed(1) + 'k';
                        }
                    },
                    title: {
                        display: true,
                        text: 'VOLUME',
                        color: '#ff8c00',
                        font: {
                            size: 11,
                            weight: 700,
                            family: 'Outfit'
                        }
                    }
                }
            }
        }
    });
}

// ==========================================
// HISTORY TAB
// ==========================================
function updateHistoryTab() {
    const historyList = document.getElementById('history-list');
    const emptyState = document.getElementById('history-empty');

    if (workoutData.length === 0) {
        historyList.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    // Group by date
    const byDate = {};
    workoutData.forEach(entry => {
        if (!byDate[entry.date]) {
            byDate[entry.date] = [];
        }
        byDate[entry.date].push(entry);
    });

    // Sort dates descending
    const sortedDates = Object.keys(byDate).sort((a, b) => new Date(b) - new Date(a));

    historyList.innerHTML = sortedDates.map(date => {
        const entries = byDate[date];
        const totalVolume = entries.reduce((sum, e) => sum + e.volume, 0);
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        return `
      <div class="history-item animate-slide-up">
        <div class="history-header">
          <div class="history-date">${formattedDate}</div>
          <div style="color: var(--color-text-secondary); font-size: 0.75rem; text-transform: uppercase;">
            ${entries.length} exercises • ${formatVolume(totalVolume)} volume
          </div>
        </div>
        <div class="history-exercises">
          ${entries.map(entry => `
            <div class="exercise-row">
              <strong>${entry.exercise}</strong>
              <span>${entry.sets} sets</span>
              <span>${entry.reps} reps</span>
              <span>${entry.weight} lbs</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    }).join('');
}

// ==========================================
// SUGGESTIONS ENGINE
// ==========================================
function updateSuggestions() {
    const panel = document.getElementById('suggestions-panel');
    const list = document.getElementById('suggestions-list');

    if (workoutData.length < 2) {
        panel.classList.add('hidden');
        return;
    }

    const suggestions = generateSuggestions();

    if (suggestions.length === 0) {
        panel.classList.add('hidden');
        return;
    }

    panel.classList.remove('hidden');
    list.innerHTML = suggestions.map(suggestion => `
    <div class="suggestion-item ${suggestion.type}">
      <div class="suggestion-icon">${suggestion.icon}</div>
      <div class="suggestion-content">
        <div class="suggestion-title">${suggestion.title}</div>
        <div class="suggestion-description">${suggestion.description}</div>
      </div>
    </div>
  `).join('');
}

function generateSuggestions() {
    const suggestions = [];
    const exercises = [...new Set(workoutData.map(w => w.exercise))];

    exercises.forEach(exercise => {
        const exerciseData = workoutData
            .filter(w => w.exercise === exercise)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (exerciseData.length < 2) return;

        const recent = exerciseData.slice(-3);
        const latest = recent[recent.length - 1];
        const previous = recent[recent.length - 2];

        // Check for progress
        if (latest.weight > previous.weight) {
            suggestions.push({
                type: 'success',
                icon: '🔥',
                title: `${exercise} gains!`,
                description: `Increased from ${previous.weight} to ${latest.weight} lbs. Keep pushing!`
            });
        }

        // Check for plateau
        const sameWeight = recent.every(e => e.weight === latest.weight);
        if (sameWeight && recent.length >= 3) {
            const suggestedIncrease = latest.weight * 1.025;
            suggestions.push({
                type: 'warning',
                icon: '⚡',
                title: `Break the ${exercise} plateau`,
                description: `Stuck at ${latest.weight} lbs. Try ${Math.ceil(suggestedIncrease / 2.5) * 2.5} lbs next session.`
            });
        }

        // Check for badge opportunities
        const milestones = BADGE_MILESTONES[exercise];
        if (milestones) {
            const nextMilestone = milestones.find(m => m.weight > latest.weight);
            if (nextMilestone && (nextMilestone.weight - latest.weight) <= 20) {
                suggestions.push({
                    type: 'success',
                    icon: '🏆',
                    title: `Badge within reach!`,
                    description: `${nextMilestone.weight - latest.weight} lbs away from "${nextMilestone.name}" on ${exercise}!`
                });
            }
        }
    });

    // Check workout frequency
    const lastWorkoutDate = new Date(Math.max(...workoutData.map(w => new Date(w.date))));
    const daysSinceLastWorkout = Math.floor((new Date() - lastWorkoutDate) / (1000 * 60 * 60 * 24));

    if (daysSinceLastWorkout > 3 && daysSinceLastWorkout < 14) {
        suggestions.push({
            type: 'warning',
            icon: '⏰',
            title: 'Time to train!',
            description: `${daysSinceLastWorkout} days since last workout. Get back in there!`
        });
    }

    return suggestions.slice(0, 4); // Limit to 4 suggestions
}

// ==========================================
// UI UPDATES
// ==========================================
function updateUI() {
    updateProgressTab();
    updateHistoryTab();
    updateSuggestions();
    updateBadgesTab();
}

// ==========================================
// NOTIFICATIONS
// ==========================================
function showNotification(message, isBadge = false) {
    const notification = document.createElement('div');
    notification.className = `notification${isBadge ? ' badge-notification' : ''}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-in-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==========================================
// TUTORIAL VIDEOS DATABASE
// ==========================================
const TUTORIAL_VIDEOS = {
    'Bench Press': [
        { title: 'How To Bench Press For Chest Growth', channel: 'Jeff Nippard', url: 'https://www.youtube.com/watch?v=vcBig73ojpE' },
        { title: 'The Perfect Bench Press', channel: 'AthleanX', url: 'https://www.youtube.com/watch?v=4Y2ZdHCOXok' },
        { title: 'Bench Press Tutorial', channel: 'Alan Thrall', url: 'https://www.youtube.com/watch?v=BYKScL2sgCs' }
    ],
    'Squat': [
        { title: 'How To Squat For Muscle Growth', channel: 'Jeff Nippard', url: 'https://www.youtube.com/watch?v=bEv6CCg2BC8' },
        { title: 'How To Squat Properly', channel: 'AthleanX', url: 'https://www.youtube.com/watch?v=ultWZbUMPL8' },
        { title: 'How To Squat Tutorial', channel: 'Alan Thrall', url: 'https://www.youtube.com/watch?v=vmNPOjaGrVE' }
    ],
    'Deadlift': [
        { title: 'How To Deadlift For Growth', channel: 'Jeff Nippard', url: 'https://www.youtube.com/watch?v=r4MzxtBKyNE' },
        { title: 'How To Deadlift Properly', channel: 'AthleanX', url: 'https://www.youtube.com/watch?v=hCDzSR6bW10' },
        { title: '5 Step Deadlift Setup', channel: 'Alan Thrall', url: 'https://www.youtube.com/watch?v=wYREQkVtvEc' }
    ],
    'Overhead Press': [
        { title: 'How To Overhead Press', channel: 'Jeff Nippard', url: 'https://www.youtube.com/watch?v=QAQ64hK4Xxs' },
        { title: 'The Perfect Shoulder Press', channel: 'AthleanX', url: 'https://www.youtube.com/watch?v=2yjwXTZQDDI' },
        { title: 'Overhead Press Tutorial', channel: 'Alan Thrall', url: 'https://www.youtube.com/watch?v=wol7Hko8RhY' }
    ],
    'Barbell Row': [
        { title: 'How To Barbell Row For Back', channel: 'Jeff Nippard', url: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ' },
        { title: 'The Perfect Row', channel: 'AthleanX', url: 'https://www.youtube.com/watch?v=kBWAon7ItDw' },
        { title: 'Bent Over Row Form', channel: 'Alan Thrall', url: 'https://www.youtube.com/watch?v=G8l_8chR5BE' }
    ],
    'Pull-ups': [
        { title: 'How To Do Pull-ups For Growth', channel: 'Jeff Nippard', url: 'https://www.youtube.com/watch?v=sIvJTfGxdFo' },
        { title: 'The Perfect Pull-up', channel: 'AthleanX', url: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
        { title: 'Pull-up Progression', channel: 'Hybrid Calisthenics', url: 'https://www.youtube.com/watch?v=fO3dKSQayfg' }
    ],
    'Dumbbell Curl': [
        { title: 'Bicep Curl Mistakes', channel: 'Jeff Nippard', url: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
        { title: 'The Perfect Curl', channel: 'AthleanX', url: 'https://www.youtube.com/watch?v=av7-8igSXTs' },
        { title: 'Best Bicep Exercises', channel: 'Renaissance Periodization', url: 'https://www.youtube.com/watch?v=LucrUiBADnA' }
    ],
    'Lat Pulldown': [
        { title: 'Best Lat Pulldown Form', channel: 'Jeff Nippard', url: 'https://www.youtube.com/watch?v=lueEJGjTuPQ' },
        { title: 'Lat Pulldown Mistakes', channel: 'AthleanX', url: 'https://www.youtube.com/watch?v=CAwf7n6Luuc' },
        { title: 'Lat Pulldown Tips', channel: 'Renaissance Periodization', url: 'https://www.youtube.com/watch?v=SALxEARiMkw' }
    ],
    'Leg Press': [
        { title: 'Leg Press Tips', channel: 'Jeff Nippard', url: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ' },
        { title: 'The Perfect Leg Press', channel: 'AthleanX', url: 'https://www.youtube.com/watch?v=B3rOCCAb1rc' },
        { title: 'Leg Press Form Guide', channel: 'Renaissance Periodization', url: 'https://www.youtube.com/watch?v=yZmx_Ac3880' }
    ]
};

// Initialize tutorial select
document.addEventListener('DOMContentLoaded', () => {
    const tutorialSelect = document.getElementById('tutorial-exercise-select');
    if (tutorialSelect) {
        tutorialSelect.addEventListener('change', updateTutorials);
    }

    // Initialize nutrition form
    const nutritionForm = document.getElementById('nutrition-form');
    if (nutritionForm) {
        nutritionForm.addEventListener('submit', calculateNutrition);
    }
});

function updateTutorials() {
    const select = document.getElementById('tutorial-exercise-select');
    const list = document.getElementById('tutorials-list');
    const exercise = select.value;

    if (!exercise || !TUTORIAL_VIDEOS[exercise]) {
        list.innerHTML = '<p style="color: var(--color-text-tertiary);">Select an exercise to see tutorial videos.</p>';
        return;
    }

    const videos = TUTORIAL_VIDEOS[exercise];
    list.innerHTML = videos.map(video => `
        <div class="tutorial-item">
            <div class="tutorial-info">
                <div class="tutorial-title">${video.title}</div>
                <div class="tutorial-channel">📺 ${video.channel}</div>
            </div>
            <a href="${video.url}" target="_blank" rel="noopener" class="btn btn-primary btn-small">
                ▶ Watch
            </a>
        </div>
    `).join('');
}

// ==========================================
// NUTRITION CALCULATOR
// ==========================================
function calculateNutrition(e) {
    e.preventDefault();

    const weight = parseFloat(document.getElementById('user-weight').value);
    const height = parseFloat(document.getElementById('user-height').value);
    const age = parseInt(document.getElementById('user-age').value);
    const gender = document.getElementById('user-gender').value;
    const activityLevel = document.getElementById('activity-level').value;
    const goal = document.getElementById('fitness-goal').value;

    if (!weight || !height || !age || !gender || !activityLevel || !goal) {
        showNotification('Please fill in all fields!', false);
        return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * (weight / 2.205) + 6.25 * (height * 2.54) - 5 * age + 5;
    } else {
        bmr = 10 * (weight / 2.205) + 6.25 * (height * 2.54) - 5 * age - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very-active': 1.9
    };

    // Calculate TDEE (Total Daily Energy Expenditure)
    let tdee = bmr * activityMultipliers[activityLevel];

    // Adjust for goal
    let calories;
    let proteinMultiplier;
    let goalDescription;

    switch (goal) {
        case 'lose':
            calories = Math.round(tdee - 500); // 500 cal deficit
            proteinMultiplier = 1.0; // 1g per lb of body weight
            goalDescription = 'fat loss';
            break;
        case 'maintain':
            calories = Math.round(tdee);
            proteinMultiplier = 0.8;
            goalDescription = 'maintenance';
            break;
        case 'gain':
            calories = Math.round(tdee + 300); // 300 cal surplus for lean gains
            proteinMultiplier = 1.0;
            goalDescription = 'muscle building';
            break;
    }

    // Calculate macros
    const protein = Math.round(weight * proteinMultiplier);
    const proteinCalories = protein * 4;

    // Fat: 25-30% of calories
    const fatCalories = calories * 0.25;
    const fat = Math.round(fatCalories / 9);

    // Carbs: remaining calories
    const carbCalories = calories - proteinCalories - fatCalories;
    const carbs = Math.round(carbCalories / 4);

    // Display results
    document.getElementById('daily-calories').textContent = calories.toLocaleString();
    document.getElementById('daily-protein').textContent = protein + 'g';
    document.getElementById('daily-carbs').textContent = carbs + 'g';
    document.getElementById('daily-fat').textContent = fat + 'g';

    // Diet tips
    const tipsHtml = `
        <div class="suggestion-item success">
            <div class="suggestion-icon">🎯</div>
            <div class="suggestion-content">
                <div class="suggestion-title">Your ${goalDescription} targets</div>
                <div class="suggestion-description">
                    These numbers are calculated based on your stats. Adjust as needed based on progress.
                </div>
            </div>
        </div>
        <div class="suggestion-item success">
            <div class="suggestion-icon">🥩</div>
            <div class="suggestion-content">
                <div class="suggestion-title">Protein is key</div>
                <div class="suggestion-description">
                    Aim for ${protein}g of protein daily (about ${Math.round(protein / 4)} servings of protein-rich foods).
                    Good sources: chicken, fish, eggs, Greek yogurt, protein powder.
                </div>
            </div>
        </div>
        <div class="suggestion-item success">
            <div class="suggestion-icon">💧</div>
            <div class="suggestion-content">
                <div class="suggestion-title">Stay hydrated</div>
                <div class="suggestion-description">
                    Drink at least ${Math.round(weight / 2)} oz of water daily (about ${Math.round(weight / 2 / 8)} glasses).
                </div>
            </div>
        </div>
        <div class="suggestion-item warning">
            <div class="suggestion-icon">📊</div>
            <div class="suggestion-content">
                <div class="suggestion-title">Track your progress</div>
                <div class="suggestion-description">
                    Weigh yourself weekly and adjust calories by 100-200 if not seeing expected results.
                </div>
            </div>
        </div>
    `;
    document.getElementById('diet-tips').innerHTML = tipsHtml;

    // Sample meal plan
    const mealPlanHtml = generateMealPlan(calories, protein, carbs, fat, goal);
    document.getElementById('meal-plan').innerHTML = mealPlanHtml;

    // Show results
    document.getElementById('nutrition-results').classList.remove('hidden');
    showNotification('Nutrition plan calculated! 🥗', false);
}

function generateMealPlan(calories, protein, carbs, fat, goal) {
    const mealsPerDay = goal === 'gain' ? 5 : 4;
    const caloriesPerMeal = Math.round(calories / mealsPerDay);
    const proteinPerMeal = Math.round(protein / mealsPerDay);

    let planHtml = `
        <div style="margin-bottom: var(--spacing-md);">
            <strong style="color: var(--color-text-primary);">Recommended: ${mealsPerDay} meals/day</strong>
            <span style="color: var(--color-text-tertiary);"> (~${caloriesPerMeal} cal, ~${proteinPerMeal}g protein each)</span>
        </div>
    `;

    const meals = [
        {
            name: 'Breakfast',
            icon: '🌅',
            options: [
                `3 eggs + 2 slices whole grain toast + avocado`,
                `Greek yogurt + granola + berries + protein shake`,
                `Oatmeal + banana + peanut butter + protein powder`
            ]
        },
        {
            name: 'Lunch',
            icon: '☀️',
            options: [
                `Grilled chicken breast + brown rice + vegetables`,
                `Turkey sandwich + side salad + fruit`,
                `Salmon + quinoa + roasted vegetables`
            ]
        },
        {
            name: 'Pre-Workout',
            icon: '💪',
            options: [
                `Banana + protein bar`,
                `Rice cakes + peanut butter`,
                `Fruit smoothie with protein`
            ]
        },
        {
            name: 'Dinner',
            icon: '🌙',
            options: [
                `Lean beef + sweet potato + green beans`,
                `Chicken stir-fry + brown rice`,
                `Fish tacos + black beans + vegetables`
            ]
        }
    ];

    if (goal === 'gain') {
        meals.push({
            name: 'Evening Snack',
            icon: '🌜',
            options: [
                `Cottage cheese + almonds`,
                `Casein protein shake + peanut butter`,
                `Greek yogurt + honey + walnuts`
            ]
        });
    }

    planHtml += '<div class="meal-plan-grid">';
    meals.forEach(meal => {
        const randomOption = meal.options[Math.floor(Math.random() * meal.options.length)];
        planHtml += `
            <div class="meal-card">
                <div class="meal-header">
                    <span class="meal-icon">${meal.icon}</span>
                    <span class="meal-name">${meal.name}</span>
                </div>
                <div class="meal-description">${randomOption}</div>
            </div>
        `;
    });
    planHtml += '</div>';

    planHtml += `
        <p style="color: var(--color-text-tertiary); font-size: 0.75rem; margin-top: var(--spacing-md); font-style: italic;">
            * This is a sample plan. Adjust portions to meet your calorie and protein targets.
            Consult a nutritionist for personalized advice.
        </p>
    `;

    return planHtml;
}

