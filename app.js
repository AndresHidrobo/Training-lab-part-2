const userAdd = document.getElementById('form');
const ShowUser = document.getElementById('area_result');
userAdd.addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect user information
    const fullName = document.getElementById('user_name').value;
    const ageInput = document.getElementById('user_age').value;
    const roleInput = document.getElementById('role-Selected').value;
    const hoursInput = document.getElementById('user_time').value;
    const rulesAccepted = document.getElementById('rules').checked;

    // Data modeling - create user object
    const user = {
        fullName: fullName,
        age: Number(ageInput),
        role: roleInput,
        acceptedRules: rulesAccepted,
        hoursAvailable: Number(hoursInput)
    };
    if (hoursInput <= 0 || hoursInput >= 13) {
        alert("Registration ERROR: The time must be within the set range")
        return
    }
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

    // Display result using innetHTML
    const addHTML = document.createElement("div");
    addHTML.className = "alert mt-3";
    if (decision.status === 'DENY') {
        addHTML.className += " alert-danger";
        addHTML.innerHTML = `
        <h4 class="alert-heading">ACCESS DENIED</h4>
        <p><strong>Decision:</strong> ${decision.status}</p>
        <p><strong>Reason:</strong> ${decision.reason}</p>
        `;
    } else if (decision.status === 'REVIEW') {
        addHTML.className += " alert-warning";
        addHTML.innerHTML = `
        <h4 class="alert-heading">ACCESS UNDER REVIEW</h4>
        <p><strong>Decision:</strong> ${decision.status}</p>
        <p><strong>Reason:</strong> ${decision.reason}</p>
        <p><strong>Role:</strong> ${user.role}</p>
        <p><strong>Risk Score:</strong> ${riskScore}</p>
        <hr>
        <p class="mb-0">PLEASE WAIT FOR MANUAL APPROVAL</p>
        `;
    } else if (decision.status === 'ALLOW') {
        addHTML.className += " alert-success";
        addHTML.innerHTML = `
        <h4 class="alert-heading">WELCOME TO THE TRAINING LAB!</h4>
        <p><strong>Decision:</strong> ${decision.status}</p>
        <p><strong>Reason:</strong> ${decision.reason}</p>
        <p><strong>Role:</strong> ${user.role}</p>
        <p><strong>Hours Available:</strong> ${user.hoursAvailable}</p>
        <hr>
        <p class="mb-0">ENJOY YOUR SESSION, ${user.fullName}!</p>
        `;
    }
    //Add the element to the DOM
    ShowUser.appendChild(addHTML);
    //Final message
    console.log('=== CHECK-IN PROCESS COMPLETE ===');
});
