// ==========================================
// IRON PROGRESS - WORKOUT TRACKER
// ==========================================

// ==========================================
// BADGE MILESTONES - Based on Strength Standards
// ==========================================
const BADGE_MILESTONES = {
    // Bench Press Milestones (Easier thresholds for motivation)
    'Bench Press': [
        { weight: 75, name: 'First Plate', tier: 'bronze', icon: '🥉', description: 'Bench 75 lbs' },
        { weight: 115, name: 'One Plate Club', tier: 'silver', icon: '🥈', description: 'Bench 115 lbs' },
        { weight: 155, name: 'Intermediate Presser', tier: 'gold', icon: '🥇', description: 'Bench 155 lbs' },
        { weight: 185, name: 'Two Plate Club', tier: 'platinum', icon: '💎', description: 'Bench 185 lbs' },
        { weight: 265, name: 'Elite Presser', tier: 'diamond', icon: '👑', description: 'Bench 265 lbs' }
    ],

    // Squat Milestones
    'Squat': [
        { weight: 115, name: 'First Squat Plate', tier: 'bronze', icon: '🥉', description: 'Squat 115 lbs' },
        { weight: 155, name: 'Rising Squatter', tier: 'silver', icon: '🥈', description: 'Squat 155 lbs' },
        { weight: 185, name: 'Two Plate Squatter', tier: 'gold', icon: '🥇', description: 'Squat 185 lbs' },
        { weight: 265, name: 'Three Plate Club', tier: 'platinum', icon: '💎', description: 'Squat 265 lbs' },
        { weight: 345, name: 'Four Plate Legend', tier: 'diamond', icon: '👑', description: 'Squat 345 lbs' }
    ],

    // Deadlift Milestones
    'Deadlift': [
        { weight: 115, name: 'Dead Starter', tier: 'bronze', icon: '🥉', description: 'Deadlift 115 lbs' },
        { weight: 185, name: 'Two Plate Puller', tier: 'silver', icon: '🥈', description: 'Deadlift 185 lbs' },
        { weight: 265, name: 'Intermediate Puller', tier: 'gold', icon: '🥇', description: 'Deadlift 265 lbs' },
        { weight: 345, name: 'Four Plate Deadlifter', tier: 'platinum', icon: '💎', description: 'Deadlift 345 lbs' },
        { weight: 425, name: 'Half-Ton Hero', tier: 'diamond', icon: '👑', description: 'Deadlift 425 lbs' }
    ],

    // Overhead Press Milestones
    'Overhead Press': [
        { weight: 55, name: 'Press Beginner', tier: 'bronze', icon: '🥉', description: 'OHP 55 lbs' },
        { weight: 75, name: 'Shoulder Soldier', tier: 'silver', icon: '🥈', description: 'OHP 75 lbs' },
        { weight: 115, name: 'One Plate OHP', tier: 'gold', icon: '🥇', description: 'OHP 115 lbs' },
        { weight: 135, name: 'Strong Shoulders', tier: 'platinum', icon: '💎', description: 'OHP 135 lbs' },
        { weight: 155, name: 'Press Master', tier: 'diamond', icon: '👑', description: 'OHP 155 lbs' }
    ],

    // Barbell Row Milestones
    'Barbell Row': [
        { weight: 75, name: 'Row Rookie', tier: 'bronze', icon: '🥉', description: 'Row 75 lbs' },
        { weight: 115, name: 'One Plate Row', tier: 'silver', icon: '🥈', description: 'Row 115 lbs' },
        { weight: 155, name: 'Strong Back', tier: 'gold', icon: '🥇', description: 'Row 155 lbs' },
        { weight: 185, name: 'Two Plate Row', tier: 'platinum', icon: '💎', description: 'Row 185 lbs' },
        { weight: 235, name: 'Row King', tier: 'diamond', icon: '👑', description: 'Row 235 lbs' }
    ],

    // Leg Press Milestones
    'Leg Press': [
        { weight: 135, name: 'Leg Day Started', tier: 'bronze', icon: '🥉', description: 'Leg Press 135 lbs' },
        { weight: 225, name: 'Building Legs', tier: 'silver', icon: '🥈', description: 'Leg Press 225 lbs' },
        { weight: 315, name: 'Strong Legs', tier: 'gold', icon: '🥇', description: 'Leg Press 315 lbs' },
        { weight: 405, name: 'Quad King', tier: 'platinum', icon: '💎', description: 'Leg Press 405 lbs' },
        { weight: 495, name: 'Leg Press Legend', tier: 'diamond', icon: '👑', description: 'Leg Press 495 lbs' }
    ],

    // Dumbbell Curl Milestones
    'Dumbbell Curl': [
        { weight: 15, name: 'Curl Beginner', tier: 'bronze', icon: '🥉', description: 'Curl 15 lbs' },
        { weight: 25, name: 'Growing Guns', tier: 'silver', icon: '🥈', description: 'Curl 25 lbs' },
        { weight: 35, name: 'Bicep Builder', tier: 'gold', icon: '🥇', description: 'Curl 35 lbs' },
        { weight: 45, name: 'Arm Champion', tier: 'platinum', icon: '💎', description: 'Curl 45 lbs' },
        { weight: 55, name: 'Curl King', tier: 'diamond', icon: '👑', description: 'Curl 55 lbs' }
    ],

    // Lat Pulldown Milestones
    'Lat Pulldown': [
        { weight: 70, name: 'Lat Rookie', tier: 'bronze', icon: '🥉', description: 'Pulldown 70 lbs' },
        { weight: 100, name: 'Growing Wings', tier: 'silver', icon: '🥈', description: 'Pulldown 100 lbs' },
        { weight: 135, name: 'Wide Back', tier: 'gold', icon: '🥇', description: 'Pulldown 135 lbs' },
        { weight: 170, name: 'Lat Champion', tier: 'platinum', icon: '💎', description: 'Pulldown 170 lbs' },
        { weight: 200, name: 'Wing Master', tier: 'diamond', icon: '👑', description: 'Pulldown 200 lbs' }
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
// MUSCLE GROUP DETECTION (AI-like matching)
// ==========================================
const MUSCLE_GROUP_MAP = {
    chest: {
        keywords: ['push', 'bench', 'chest', 'fly', 'pec', 'dip', 'cable cross'],
        emoji: '💪',
        thresholds: [50, 95, 135, 185, 225]
    },
    biceps: {
        keywords: ['curl', 'bicep', 'preacher', 'hammer', 'concentration'],
        emoji: '💪',
        thresholds: [20, 30, 40, 50, 60]
    },
    triceps: {
        keywords: ['tricep', 'extension', 'pushdown', 'skull', 'kickback', 'dip'],
        emoji: '💪',
        thresholds: [30, 50, 70, 90, 110]
    },
    shoulders: {
        keywords: ['shoulder', 'delt', 'lateral', 'front raise', 'rear', 'military', 'overhead press', 'ohp'],
        emoji: '🏋️',
        thresholds: [45, 65, 95, 115, 135]
    },
    back: {
        keywords: ['row', 'lat', 'pull', 'back', 'chin', 'pulldown', 'pullup', 'shrug'],
        emoji: '🔙',
        thresholds: [70, 115, 155, 185, 225]
    },
    legs: {
        keywords: ['squat', 'leg', 'lunge', 'calf', 'quad', 'hamstring', 'glute', 'step'],
        emoji: '🦵',
        thresholds: [95, 155, 225, 315, 405]
    },
    core: {
        keywords: ['ab', 'crunch', 'plank', 'core', 'twist', 'situp', 'sit-up'],
        emoji: '🎯',
        thresholds: [0, 25, 50, 75, 100] // Lower thresholds for ab exercises
    },
    posterior: {
        keywords: ['deadlift', 'hip', 'rdl', 'romanian', 'good morning', 'hyperextension'],
        emoji: '🔥',
        thresholds: [115, 185, 265, 345, 405]
    }
};

// Detect muscle group from exercise name
function detectMuscleGroup(exerciseName) {
    const lowerName = exerciseName.toLowerCase();

    for (const [group, data] of Object.entries(MUSCLE_GROUP_MAP)) {
        for (const keyword of data.keywords) {
            if (lowerName.includes(keyword)) {
                return {
                    group: group,
                    displayName: group.charAt(0).toUpperCase() + group.slice(1),
                    emoji: data.emoji,
                    thresholds: data.thresholds
                };
            }
        }
    }

    // Default to general if no match
    return {
        group: 'general',
        displayName: 'General',
        emoji: '🏋️',
        thresholds: [25, 50, 75, 100, 150]
    };
}

// Generate dynamic badge milestones for custom exercise
function generateDynamicMilestones(exerciseName, muscleGroup) {
    const tiers = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];
    const icons = ['🥉', '🥈', '🥇', '💎', '👑'];
    const tierNames = ['Beginner', 'Rising', 'Strong', 'Advanced', 'Elite'];

    return muscleGroup.thresholds.map((weight, index) => ({
        weight: weight,
        name: `${tierNames[index]} ${exerciseName}`,
        tier: tiers[index],
        icon: icons[index],
        description: `${exerciseName} ${weight} lbs`,
        muscleGroup: muscleGroup.group,
        isDynamic: true
    }));
}

// ==========================================
// STATE MANAGEMENT
// ==========================================
let workoutData = [];
let currentWorkout = [];
let unlockedBadges = [];
let customExerciseBadges = {}; // Store dynamic badges for custom exercises
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
// DATA PERSISTENCE - User-Specific Storage
// ==========================================
function getUserStorageKey(baseKey) {
    // Get current user from auth
    const storedUser = localStorage.getItem('ironProgressUser');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        // Use user's UID for unique storage, fallback to email hash if no UID
        const uniqueId = user.uid || user.email || 'anonymous';
        return `${baseKey}_${uniqueId}`;
    }
    return `${baseKey}_anonymous`;
}

function loadData() {
    const workoutKey = getUserStorageKey('workoutData');
    const badgesKey = getUserStorageKey('unlockedBadges');

    const storedWorkouts = localStorage.getItem(workoutKey);
    const storedBadges = localStorage.getItem(badgesKey);

    if (storedWorkouts) {
        workoutData = JSON.parse(storedWorkouts);
    } else {
        workoutData = [];
    }
    if (storedBadges) {
        unlockedBadges = JSON.parse(storedBadges);
    } else {
        unlockedBadges = [];
    }

    console.log('Loaded data for user:', getUserStorageKey(''));
}

function saveData() {
    const workoutKey = getUserStorageKey('workoutData');
    const badgesKey = getUserStorageKey('unlockedBadges');

    localStorage.setItem(workoutKey, JSON.stringify(workoutData));
    localStorage.setItem(badgesKey, JSON.stringify(unlockedBadges));
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
    const exerciseInput = document.getElementById('exercise-name');
    const muscleIndicator = document.getElementById('muscle-group-indicator');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addExerciseToCurrentWorkout();
    });

    finishBtn.addEventListener('click', finishWorkout);

    // Real-time muscle group detection
    exerciseInput.addEventListener('input', (e) => {
        const exerciseName = e.target.value.trim();
        if (exerciseName.length > 2) {
            const muscleGroup = detectMuscleGroup(exerciseName);
            muscleIndicator.innerHTML = `${muscleGroup.emoji} Detected: <strong>${muscleGroup.displayName}</strong>`;
        } else {
            muscleIndicator.innerHTML = '';
        }
    });

    // Weight type toggle
    const weightTypeSelect = document.getElementById('weight-type');
    const weightContainer = document.getElementById('weight-container');
    const weightInput = document.getElementById('weight');

    if (weightTypeSelect) {
        weightTypeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'bodyweight') {
                weightContainer.style.opacity = '0.5';
                weightInput.value = 0;
                weightInput.disabled = true;
                weightInput.required = false;
            } else {
                weightContainer.style.opacity = '1';
                weightInput.disabled = false;
                weightInput.required = true;
                weightInput.placeholder = '135';
            }
        });
    }
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
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    const weightType = document.getElementById('weight-type')?.value || 'equipment';

    if (!exercise || !sets || !reps) {
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
        weightType,
        volume: sets * reps * (weightType === 'bodyweight' ? 1 : weight)
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
        // Use predefined milestones for known exercises
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
        // AI-based muscle group detection for custom exercises
        const muscleGroup = detectMuscleGroup(exercise);
        const dynamicMilestones = generateDynamicMilestones(exercise, muscleGroup);

        // Store dynamic milestones for this exercise
        if (!customExerciseBadges[exercise]) {
            customExerciseBadges[exercise] = {
                muscleGroup: muscleGroup,
                milestones: dynamicMilestones
            };
        }

        dynamicMilestones.forEach((milestone, index) => {
            if (weight >= milestone.weight) {
                const badgeId = `${exercise}-dynamic-${index}`;
                if (!unlockedBadges.includes(badgeId)) {
                    unlockedBadges.push(badgeId);
                    newBadges.push({
                        ...milestone,
                        exerciseName: exercise,
                        muscleGroupEmoji: muscleGroup.emoji,
                        muscleGroupName: muscleGroup.displayName
                    });
                }
            }
        });
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

    // Show custom exercise badges (AI-detected)
    const customExercises = usedExercises.filter(ex => !BADGE_MILESTONES[ex]);
    if (customExercises.length > 0) {
        badgesHTML += `<div style="grid-column: 1/-1; margin-top: var(--spacing-lg); padding-top: var(--spacing-md); border-top: 1px solid var(--color-border);">
            <h3 style="color: var(--color-text-primary); margin-bottom: var(--spacing-md);">🤖 Custom Exercises (AI Detected)</h3>
        </div>`;

        customExercises.forEach(exercise => {
            const muscleGroup = detectMuscleGroup(exercise);
            const maxWeight = workoutData
                .filter(w => w.exercise === exercise)
                .reduce((max, w) => Math.max(max, w.weight), 0);

            const dynamicMilestones = generateDynamicMilestones(exercise, muscleGroup);

            // Add muscle group label
            badgesHTML += `<div style="grid-column: 1/-1; font-size: 0.75rem; color: var(--color-accent-primary); margin-top: var(--spacing-sm);">
                ${muscleGroup.emoji} ${exercise} → ${muscleGroup.displayName}
            </div>`;

            dynamicMilestones.forEach((milestone, index) => {
                const badgeId = `${exercise}-dynamic-${index}`;
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
    }

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
            <div class="exercise-row" data-id="${entry.id}">
              <strong>${entry.exercise}</strong>
              <span>${entry.sets} sets</span>
              <span>${entry.reps} reps</span>
              <span>${entry.weight} lbs</span>
              <div class="exercise-actions">
                <button class="btn-icon" onclick="editWorkoutEntry(${entry.id})" title="Edit">✏️</button>
                <button class="btn-icon btn-danger-icon" onclick="deleteWorkoutEntry(${entry.id})" title="Delete">🗑️</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    }).join('');
}

// Edit workout entry
function editWorkoutEntry(id) {
    const entry = workoutData.find(w => w.id === id);
    if (!entry) return;

    // Create and show edit modal
    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.id = 'edit-modal';
    modal.innerHTML = `
        <div class="edit-modal-content">
            <h3>Edit Workout Entry</h3>
            <div class="form-group">
                <label>Exercise</label>
                <input type="text" id="edit-exercise" value="${entry.exercise}">
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label>Sets</label>
                    <input type="number" id="edit-sets" value="${entry.sets}" min="1">
                </div>
                <div class="form-group">
                    <label>Reps</label>
                    <input type="number" id="edit-reps" value="${entry.reps}" min="1">
                </div>
                <div class="form-group">
                    <label>Weight (lbs)</label>
                    <input type="number" id="edit-weight" value="${entry.weight}" min="0" step="2.5">
                </div>
            </div>
            <div class="edit-modal-actions">
                <button class="btn btn-secondary" onclick="closeEditModal()">Cancel</button>
                <button class="btn btn-primary" onclick="saveWorkoutEdit(${id})">Save Changes</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Focus first input
    setTimeout(() => document.getElementById('edit-exercise').focus(), 100);
}

function saveWorkoutEdit(id) {
    const exercise = document.getElementById('edit-exercise').value.trim();
    const sets = parseInt(document.getElementById('edit-sets').value);
    const reps = parseInt(document.getElementById('edit-reps').value);
    const weight = parseFloat(document.getElementById('edit-weight').value);

    if (!exercise || !sets || !reps || weight < 0) {
        showNotification('Please fill all fields correctly', false);
        return;
    }

    // Find and update entry
    const index = workoutData.findIndex(w => w.id === id);
    if (index !== -1) {
        workoutData[index].exercise = exercise;
        workoutData[index].sets = sets;
        workoutData[index].reps = reps;
        workoutData[index].weight = weight;
        workoutData[index].volume = sets * reps * weight;

        saveData();
        updateUI();
        showNotification('Workout entry updated! ✏️', false);
    }

    closeEditModal();
}

function closeEditModal() {
    const modal = document.getElementById('edit-modal');
    if (modal) modal.remove();
}

// Delete workout entry
function deleteWorkoutEntry(id) {
    if (!confirm('Delete this workout entry?')) return;

    workoutData = workoutData.filter(w => w.id !== id);
    saveData();
    updateUI();
    updateHistoryTab();
    showNotification('Entry deleted', false);
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
    updateProgressiveOverload();
}

// ==========================================
// PROGRESSIVE OVERLOAD SUGGESTIONS
// ==========================================
function updateProgressiveOverload() {
    const panel = document.getElementById('progressive-overload-list');
    if (!panel) return;

    // Get workouts from last 7 days
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const lastWeekWorkouts = workoutData.filter(w => new Date(w.date) >= oneWeekAgo);

    if (lastWeekWorkouts.length === 0) {
        panel.innerHTML = `
            <div style="text-align: center; color: var(--color-text-tertiary); padding: var(--spacing-lg);">
                <div style="font-size: 2rem; margin-bottom: 8px;">🏋️</div>
                <div>No workouts logged this week yet!</div>
                <div style="font-size: 0.75rem; margin-top: 4px;">Log your first workout to see progressive overload targets.</div>
            </div>
        `;
        return;
    }

    // Group by exercise and get max values
    const exerciseStats = {};
    lastWeekWorkouts.forEach(w => {
        if (!exerciseStats[w.exercise]) {
            exerciseStats[w.exercise] = {
                maxWeight: 0,
                maxReps: 0,
                maxSets: 0,
                sessions: 0,
                isBodyweight: w.weightType === 'bodyweight'
            };
        }
        exerciseStats[w.exercise].maxWeight = Math.max(exerciseStats[w.exercise].maxWeight, w.weight);
        exerciseStats[w.exercise].maxReps = Math.max(exerciseStats[w.exercise].maxReps, w.reps);
        exerciseStats[w.exercise].maxSets = Math.max(exerciseStats[w.exercise].maxSets, w.sets);
        exerciseStats[w.exercise].sessions++;
        // If any session is bodyweight, mark as bodyweight
        if (w.weightType === 'bodyweight') {
            exerciseStats[w.exercise].isBodyweight = true;
        }
    });

    // Calculate progressive overload targets
    let html = '<div style="display: grid; gap: var(--spacing-md);">';

    Object.entries(exerciseStats).forEach(([exercise, stats]) => {
        // Progressive overload rules:
        // - Weight: +2.5-5 lbs (5% increase) - only for equipment
        // - Reps: +1-2 reps
        // - Sets: +1 set if already maxed reps
        const weightIncrease = Math.max(2.5, Math.round(stats.maxWeight * 0.05 / 2.5) * 2.5);
        const targetWeight = stats.maxWeight + weightIncrease;
        const targetReps = stats.maxReps + (stats.isBodyweight ? 2 : 1); // +2 reps for bodyweight
        const targetSets = stats.maxSets + (stats.maxReps >= 12 ? 1 : 0);

        const muscleGroup = detectMuscleGroup(exercise);
        const isBodyweight = stats.isBodyweight;

        html += `
            <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: var(--spacing-md); border-left: 3px solid ${isBodyweight ? '#a855f7' : 'var(--color-accent-primary)'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-weight: 600; color: var(--color-text-primary);">${exercise}</span>
                    <span style="font-size: 0.7rem; color: ${isBodyweight ? '#a855f7' : 'var(--color-accent-primary)'};">${isBodyweight ? '🧍 Bodyweight' : muscleGroup.emoji + ' ' + muscleGroup.displayName}</span>
                </div>
                <div style="display: grid; grid-template-columns: ${isBodyweight ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}; gap: 8px; font-size: 0.8rem;">
                    ${!isBodyweight ? `
                    <div style="text-align: center; padding: 8px; background: rgba(102,126,234,0.1); border-radius: 6px;">
                        <div style="color: var(--color-text-tertiary); font-size: 0.65rem;">WEIGHT</div>
                        <div style="color: var(--color-text-primary); font-weight: bold;">${targetWeight} lbs</div>
                        <div style="color: #4ade80; font-size: 0.65rem;">+${weightIncrease} lbs</div>
                    </div>
                    ` : ''}
                    <div style="text-align: center; padding: 8px; background: rgba(102,126,234,0.1); border-radius: 6px;">
                        <div style="color: var(--color-text-tertiary); font-size: 0.65rem;">REPS</div>
                        <div style="color: var(--color-text-primary); font-weight: bold;">${targetReps} reps</div>
                        <div style="color: #4ade80; font-size: 0.65rem;">+${isBodyweight ? 2 : 1} reps</div>
                    </div>
                    <div style="text-align: center; padding: 8px; background: rgba(102,126,234,0.1); border-radius: 6px;">
                        <div style="color: var(--color-text-tertiary); font-size: 0.65rem;">SETS</div>
                        <div style="color: var(--color-text-primary); font-weight: bold;">${targetSets} sets</div>
                        <div style="color: ${targetSets > stats.maxSets ? '#4ade80' : 'var(--color-text-tertiary)'}; font-size: 0.65rem;">${targetSets > stats.maxSets ? '+1 set' : 'maintain'}</div>
                    </div>
                </div>
                <div style="margin-top: 8px; font-size: 0.7rem; color: var(--color-text-tertiary);">
                    Last week: ${isBodyweight ? '' : stats.maxWeight + ' lbs × '}${stats.maxSets} sets × ${stats.maxReps} reps (${stats.sessions} session${stats.sessions > 1 ? 's' : ''})
                </div>
            </div>
        `;
    });

    html += '</div>';
    panel.innerHTML = html;
}

// ==========================================
// NOTIFICATIONS
// ==========================================
function showNotification(message, isBadge = false) {
    const notification = document.createElement('div');
    notification.className = `notification${isBadge ? ' badge-notification' : ''} `;
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
            < div class="tutorial-item" >
            <div class="tutorial-info">
                <div class="tutorial-title">${video.title}</div>
                <div class="tutorial-channel">📺 ${video.channel}</div>
            </div>
            <a href="${video.url}" target="_blank" rel="noopener" class="btn btn-primary btn-small">
                ▶ Watch
            </a>
        </div >
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
            < div class="suggestion-item success" >
            <div class="suggestion-icon">🎯</div>
            <div class="suggestion-content">
                <div class="suggestion-title">Your ${goalDescription} targets</div>
                <div class="suggestion-description">
                    These numbers are calculated based on your stats. Adjust as needed based on progress.
                </div>
            </div>
        </div >
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
            < div style = "margin-bottom: var(--spacing-md);" >
            <strong style="color: var(--color-text-primary);">Recommended: ${mealsPerDay} meals/day</strong>
            <span style="color: var(--color-text-tertiary);"> (~${caloriesPerMeal} cal, ~${proteinPerMeal}g protein each)</span>
        </div >
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
                `Chicken stir - fry + brown rice`,
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
            < div class="meal-card" >
                <div class="meal-header">
                    <span class="meal-icon">${meal.icon}</span>
                    <span class="meal-name">${meal.name}</span>
                </div>
                <div class="meal-description">${randomOption}</div>
            </div >
            `;
    });
    planHtml += '</div>';

    planHtml += `
            < p style = "color: var(--color-text-tertiary); font-size: 0.75rem; margin-top: var(--spacing-md); font-style: italic;" >
            * This is a sample plan.Adjust portions to meet your calorie and protein targets.
            Consult a nutritionist for personalized advice.
        </p >
            `;

    return planHtml;
}

// ==========================================
// OVERALL RANKING SYSTEM
// ==========================================
const RANK_TIERS = [
    { name: 'Beginner', icon: '🆕', minVolume: 0, color: '#808080' },
    { name: 'Bronze', icon: '🥉', minVolume: 10000, color: '#cd7f32' },
    { name: 'Silver', icon: '🥈', minVolume: 50000, color: '#c0c0c0' },
    { name: 'Gold', icon: '🥇', minVolume: 150000, color: '#ffd700' },
    { name: 'Platinum', icon: '💎', minVolume: 500000, color: '#e5e4e2' },
    { name: 'Diamond', icon: '👑', minVolume: 1000000, color: '#b9f2ff' }
];

function calculateOverallRank() {
    const totalVolume = workoutData.reduce((sum, w) => sum + (w.volume || 0), 0);
    const totalReps = workoutData.reduce((sum, w) => sum + (w.sets * w.reps), 0);

    // Find current rank
    let currentRank = RANK_TIERS[0];
    let nextRank = null;

    for (let i = RANK_TIERS.length - 1; i >= 0; i--) {
        if (totalVolume >= RANK_TIERS[i].minVolume) {
            currentRank = RANK_TIERS[i];
            nextRank = RANK_TIERS[i + 1] || null;
            break;
        }
    }

    // Calculate progress to next rank
    let progressPercent = 100;
    let volumeToNext = 0;

    if (nextRank) {
        const volumeInCurrentTier = totalVolume - currentRank.minVolume;
        const tierSpan = nextRank.minVolume - currentRank.minVolume;
        progressPercent = Math.min(100, (volumeInCurrentTier / tierSpan) * 100);
        volumeToNext = nextRank.minVolume - totalVolume;
    }

    return {
        current: currentRank,
        next: nextRank,
        totalVolume,
        totalReps,
        progressPercent,
        volumeToNext
    };
}

// ==========================================
// MUSCLE GROUP TRACKING
// ==========================================
const MUSCLE_GROUPS = {
    'chest': ['Bench Press', 'Incline Bench Press', 'Dumbbell Press', 'Cable Fly', 'Push-ups', 'Chest Press'],
    'back': ['Deadlift', 'Barbell Row', 'Lat Pulldown', 'Pull-ups', 'Seated Row', 'T-Bar Row'],
    'shoulders': ['Overhead Press', 'Lateral Raise', 'Front Raise', 'Face Pull', 'Shoulder Press'],
    'biceps': ['Dumbbell Curl', 'Barbell Curl', 'Hammer Curl', 'Preacher Curl', 'Cable Curl'],
    'triceps': ['Tricep Extension', 'Tricep Pushdown', 'Skull Crushers', 'Dips', 'Close Grip Bench'],
    'abs': ['Crunches', 'Planks', 'Leg Raises', 'Russian Twists', 'Ab Wheel', 'Cable Crunch'],
    'quads': ['Squat', 'Front Squat', 'Leg Press', 'Leg Extension', 'Lunges', 'Bulgarian Split Squat'],
    'hamstrings': ['Romanian Deadlift', 'Leg Curl', 'Good Morning', 'Nordic Curl', 'Stiff Leg Deadlift'],
    'glutes': ['Hip Thrust', 'Glute Bridge', 'Cable Kickback', 'Squat', 'Lunges', 'Deadlift'],
    'calves': ['Calf Raise', 'Seated Calf Raise', 'Donkey Calf Raise']
};

const MUSCLE_LEVELS = [
    { name: 'Untrained', sessions: 0, color: '#3a3a3a' },
    { name: 'Beginner', sessions: 1, color: '#ffd700' },
    { name: 'Intermediate', sessions: 11, color: '#ff8c00' },
    { name: 'Advanced', sessions: 51, color: '#ff4d4d' },
    { name: 'Elite', sessions: 101, color: '#9b59b6' }
];

function getMuscleGroupStats() {
    const stats = {};

    // First, handle predefined exercise mappings
    Object.keys(MUSCLE_GROUPS).forEach(muscle => {
        const exercises = MUSCLE_GROUPS[muscle];
        const workouts = workoutData.filter(w =>
            exercises.some(ex => w.exercise.toLowerCase().includes(ex.toLowerCase()))
        );

        const sessions = new Set(workouts.map(w => w.date)).size;
        const totalVolume = workouts.reduce((sum, w) => sum + (w.volume || 0), 0);
        const totalReps = workouts.reduce((sum, w) => sum + (w.sets * w.reps), 0);

        // Determine level based on sessions
        let level = MUSCLE_LEVELS[0];
        for (let i = MUSCLE_LEVELS.length - 1; i >= 0; i--) {
            if (sessions >= MUSCLE_LEVELS[i].sessions) {
                level = MUSCLE_LEVELS[i];
                break;
            }
        }

        stats[muscle] = {
            sessions,
            totalVolume,
            totalReps,
            level
        };
    });

    // Then, add custom exercises via AI detection
    const allExercises = [...new Set(workoutData.map(w => w.exercise))];
    const predefinedExercises = Object.values(MUSCLE_GROUPS).flat().map(e => e.toLowerCase());

    allExercises.forEach(exercise => {
        // Skip if already counted in predefined mapping
        const isAlreadyCounted = predefinedExercises.some(ex =>
            exercise.toLowerCase().includes(ex.toLowerCase()) || ex.includes(exercise.toLowerCase())
        );

        if (!isAlreadyCounted) {
            // Use AI detection for custom exercises
            const detectedGroup = detectMuscleGroup(exercise);

            // Map AI muscle groups to body map groups
            const muscleMapping = {
                'chest': 'chest',
                'biceps': 'biceps',
                'triceps': 'triceps',
                'shoulders': 'shoulders',
                'back': 'back',
                'legs': 'quads',
                'core': 'abs',
                'posterior': 'hamstrings',
                'general': null // Skip general
            };

            const bodyMapMuscle = muscleMapping[detectedGroup.group];
            if (bodyMapMuscle && stats[bodyMapMuscle]) {
                const customWorkouts = workoutData.filter(w => w.exercise === exercise);
                const customSessions = new Set(customWorkouts.map(w => w.date)).size;
                const customVolume = customWorkouts.reduce((sum, w) => sum + (w.volume || 0), 0);
                const customReps = customWorkouts.reduce((sum, w) => sum + (w.sets * w.reps), 0);

                // Add to existing stats
                stats[bodyMapMuscle].sessions += customSessions;
                stats[bodyMapMuscle].totalVolume += customVolume;
                stats[bodyMapMuscle].totalReps += customReps;

                // Recalculate level
                for (let i = MUSCLE_LEVELS.length - 1; i >= 0; i--) {
                    if (stats[bodyMapMuscle].sessions >= MUSCLE_LEVELS[i].sessions) {
                        stats[bodyMapMuscle].level = MUSCLE_LEVELS[i];
                        break;
                    }
                }
            }
        }
    });

    return stats;
}

function generateBodyMapSVG() {
    const stats = getMuscleGroupStats();

    return `
            < svg viewBox = "0 0 200 400" class="body-map-svg" >
        < !--Head -->
        <circle cx="100" cy="30" r="25" fill="#2a2a2a" stroke="#444" stroke-width="1"/>
        
        <!--Neck -->
        <rect x="90" y="55" width="20" height="15" fill="#2a2a2a" stroke="#444" stroke-width="1"/>
        
        <!--Shoulders -->
        <ellipse cx="55" cy="85" rx="20" ry="12" fill="${stats.shoulders.level.color}" class="muscle-part" data-muscle="shoulders"/>
        <ellipse cx="145" cy="85" rx="20" ry="12" fill="${stats.shoulders.level.color}" class="muscle-part" data-muscle="shoulders"/>
        
        <!--Chest -->
        <path d="M 60 95 Q 100 85 140 95 Q 140 130 100 135 Q 60 130 60 95" fill="${stats.chest.level.color}" class="muscle-part" data-muscle="chest"/>
        
        <!--Abs -->
        <rect x="75" y="140" width="50" height="60" rx="5" fill="${stats.abs.level.color}" class="muscle-part" data-muscle="abs"/>
        
        <!--Biceps -->
        <ellipse cx="40" cy="130" rx="12" ry="25" fill="${stats.biceps.level.color}" class="muscle-part" data-muscle="biceps"/>
        <ellipse cx="160" cy="130" rx="12" ry="25" fill="${stats.biceps.level.color}" class="muscle-part" data-muscle="biceps"/>
        
        <!--Triceps -->
        <ellipse cx="35" cy="135" rx="8" ry="20" fill="${stats.triceps.level.color}" class="muscle-part" data-muscle="triceps" opacity="0.8"/>
        <ellipse cx="165" cy="135" rx="8" ry="20" fill="${stats.triceps.level.color}" class="muscle-part" data-muscle="triceps" opacity="0.8"/>
        
        <!--Forearms -->
        <ellipse cx="30" cy="175" rx="8" ry="25" fill="#2a2a2a" stroke="#444" stroke-width="1"/>
        <ellipse cx="170" cy="175" rx="8" ry="25" fill="#2a2a2a" stroke="#444" stroke-width="1"/>
        
        <!--Quads -->
        <ellipse cx="80" cy="250" rx="18" ry="45" fill="${stats.quads.level.color}" class="muscle-part" data-muscle="quads"/>
        <ellipse cx="120" cy="250" rx="18" ry="45" fill="${stats.quads.level.color}" class="muscle-part" data-muscle="quads"/>
        
        <!--Hamstrings(visible from front as shadow) -->
        <ellipse cx="80" cy="260" rx="12" ry="35" fill="${stats.hamstrings.level.color}" class="muscle-part" data-muscle="hamstrings" opacity="0.5"/>
        <ellipse cx="120" cy="260" rx="12" ry="35" fill="${stats.hamstrings.level.color}" class="muscle-part" data-muscle="hamstrings" opacity="0.5"/>
        
        <!--Glutes -->
        <ellipse cx="85" cy="210" rx="20" ry="12" fill="${stats.glutes.level.color}" class="muscle-part" data-muscle="glutes"/>
        <ellipse cx="115" cy="210" rx="20" ry="12" fill="${stats.glutes.level.color}" class="muscle-part" data-muscle="glutes"/>
        
        <!--Calves -->
        <ellipse cx="75" cy="330" rx="12" ry="30" fill="${stats.calves.level.color}" class="muscle-part" data-muscle="calves"/>
        <ellipse cx="125" cy="330" rx="12" ry="30" fill="${stats.calves.level.color}" class="muscle-part" data-muscle="calves"/>
        
        <!--Feet -->
        <ellipse cx="75" cy="375" rx="15" ry="8" fill="#2a2a2a" stroke="#444" stroke-width="1"/>
        <ellipse cx="125" cy="375" rx="15" ry="8" fill="#2a2a2a" stroke="#444" stroke-width="1"/>
    </svg >
            `;
}

function generateMuscleLegend() {
    return `
            < div class="muscle-legend" >
                ${MUSCLE_LEVELS.map(level => `
            <div class="legend-item">
                <span class="legend-color" style="background: ${level.color}"></span>
                <span class="legend-label">${level.name}</span>
            </div>
        `).join('')
        }
    </div >
            `;
}

function generateMuscleStats() {
    const stats = getMuscleGroupStats();

    return Object.entries(stats).map(([muscle, data]) => `
            < div class="muscle-stat-item" >
            <div class="muscle-stat-header">
                <span class="muscle-name">${muscle.charAt(0).toUpperCase() + muscle.slice(1)}</span>
                <span class="muscle-level" style="color: ${data.level.color}">${data.level.name}</span>
            </div>
            <div class="muscle-stat-details">
                ${data.sessions} sessions • ${formatVolume(data.totalVolume)} volume
            </div>
        </div >
            `).join('');
}

// Update the badges tab to show new ranking and body map
function updateBadgesTab() {
    const badgesGrid = document.getElementById('badges-grid');
    const rankInfo = calculateOverallRank();
    const muscleStats = getMuscleGroupStats();

    // Build new badges/ranking display
    let html = `
            < !--Overall Rank Section-- >
        <div class="rank-section">
            <div class="current-rank">
                <span class="rank-icon">${rankInfo.current.icon}</span>
                <div class="rank-info">
                    <div class="rank-name">${rankInfo.current.name}</div>
                    <div class="rank-stats">${formatVolume(rankInfo.totalVolume)} lbs lifted • ${rankInfo.totalReps.toLocaleString()} total reps</div>
                </div>
            </div>
            
            ${rankInfo.next ? `
            <div class="rank-progress-section">
                <div class="rank-progress-text">
                    <span>${Math.round(rankInfo.progressPercent)}% to ${rankInfo.next.name}</span>
                    <span>${formatVolume(rankInfo.volumeToNext)} lbs to go</span>
                </div>
                <div class="rank-progress-bar">
                    <div class="rank-progress-fill" style="width: ${rankInfo.progressPercent}%; background: linear-gradient(90deg, ${rankInfo.current.color}, ${rankInfo.next.color})"></div>
                </div>
            </div>
            ` : '<div class="rank-max">🏆 Maximum Rank Achieved!</div>'}
            
            <div class="rank-tiers">
                ${RANK_TIERS.map(tier => `
                    <div class="rank-tier ${rankInfo.totalVolume >= tier.minVolume ? 'achieved' : ''}" title="${tier.name}: ${formatVolume(tier.minVolume)} lbs">
                        <span>${tier.icon}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!--Body Map Section-- >
            <div class="body-map-section">
                <h3>💪 Muscle Development</h3>
                ${generateMuscleLegend()}
                <div class="body-map-container">
                    ${generateBodyMapSVG()}
                    <div class="muscle-stats-list">
                        ${generateMuscleStats()}
                    </div>
                </div>
            </div>
        `;

    badgesGrid.innerHTML = html;

    // Update badges earned count (now shows rank name)
    document.getElementById('badges-earned').textContent = rankInfo.current.name;
}
