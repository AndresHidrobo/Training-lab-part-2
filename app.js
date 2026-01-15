// Function to validate if user is an adult
function isAdult(age) {
    return age >= 18;
}

// Function to validate if role is allowed
function isValidRole(role) {
    const validRoles = ['coder', 'tutor', 'visitor'];
    return validRoles.includes(role);
}

// Function to calculate risk score
function calculateRiskScore(user) {
    let score = 0;

    // Increase score if hours < 2
    if (user.hoursAvailable < 2) {
        score++;
    }

    // Increase score if role is visitor
    if (user.role === 'visitor') {
        score++;
    }

    // Increase score if age is between 18 and 20
    if (user.age >= 18 && user.age <= 20) {
        score++;
    }

    // Decrease score if role is coder and hours >= 4
    if (user.role === 'coder' && user.hoursAvailable >= 4) {
        score--;
    }

    // Ensure score is not negative
    if (score < 0) {
        score = 0;
    }

    return score;
}

// Function to make final decision
function makeDecision(user, riskScore) {
    // DENY conditions
    if (!isAdult(user.age)) {
        return {
            status: 'DENY',
            reason: 'User is not an adult (must be 18 or older)'
        };
    }

    if (!user.acceptedRules) {
        return {
            status: 'DENY',
            reason: 'User did not accept the lab rules'
        };
    }

    if (!isValidRole(user.role)) {
        return {
            status: 'DENY',
            reason: 'Invalid role provided'
        };
    }

    // REVIEW condition (risk score >= 2 is considered high)
    if (riskScore >= 2) {
        return {
            status: 'REVIEW',
            reason: 'High risk score - a review is required'
        };
    }

    // ALLOW - all checks passed
    return {
        status: 'ALLOW',
        reason: 'All requirements met'
    };
}

// Main execution
console.log('=== TRAINING LAB CHECK-IN SYSTEM ===\n');

// Collect user information
const fullName = prompt('Enter your full name:');
const ageInput = prompt('Enter your age:');
const roleInput = prompt('Enter your role (Coder / Tutor / Visitor):');
const rulesInput = prompt('Do you accept the lab rules? (yes / no):');
const hoursInput = prompt('How many hours are you available today? (1-12):');

// Data modeling - create user object
const user = {
    fullName: fullName,
    age: Number(ageInput),
    role: roleInput.toLowerCase().trim(),
    acceptedRules: rulesInput.toLowerCase().trim() === 'yes',
    hoursAvailable: Number(hoursInput)
};

// Show processing alert
alert('Processing your check-in request...');

// Process flow steps
const processSteps = [
    'Validating user data',
    'Checking age requirements',
    'Verifying role authorization',
    'Calculating risk score',
    'Generating final decision'
];

console.log('PROCESS FLOW:');
for (let i = 0; i < processSteps.length; i++) {
    console.log(`Step ${i + 1}: ${processSteps[i]}`);
}
console.log('');

// Display user object
console.log('USER DATA:');
console.log(user);
console.log('');

// Calculate risk score
const riskScore = calculateRiskScore(user);
console.log('RISK ANALYSIS:');
console.log(`Risk Score: ${riskScore}`);
console.log('');

// Make final decision
const decision = makeDecision(user, riskScore);
console.log('FINAL DECISION:');
console.log(`Status: ${decision.status}`);
console.log(`Reason: ${decision.reason}`);
console.log('');

// Display appropriate alert based on decision
if (decision.status === 'DENY') {
    alert(
        `ACCESS DENIED\n\n` +
        `Decision: ${decision.status}\n` +
        `Reason: ${decision.reason}\n`
    );
} else if (decision.status === 'REVIEW') {
    alert(
        `ACCESS UNDER REVIEW\n\n` +
        `Decision: ${decision.status}\n` +
        `Reason: ${decision.reason}\n` +
        `Role: ${user.role}\n` +
        `Risk Score: ${riskScore}\n\n` +
        `Please wait for manual approval.`
    );
} else if (decision.status === 'ALLOW') {
    alert(
        `WELCOME TO THE TRAINING LAB!\n\n` +
        `Decision: ${decision.status}\n` +
        `Reason: ${decision.reason}\n` +
        `Role: ${user.role}\n` +
        `Hours Available: ${user.hoursAvailable}\n\n` +
        `Enjoy your session, ${user.fullName}!`
    );
}

console.log('=== CHECK-IN PROCESS COMPLETE ===');