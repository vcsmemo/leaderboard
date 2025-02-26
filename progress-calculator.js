// Configuration for progress calculations
const progressConfig = {
    revenuePerEmployee: {
        value: 3354318, // $3,354,318
        maxValue: 100000000, // $100MM
        minValue: 0,
        reverseScale: false // Higher is better
    },
    valuationPerEmployee: {
        value: 144522351, // $144,522,351
        maxValue: 1000000000, // $1B
        minValue: 0,
        reverseScale: false // Higher is better
    },
    teamSize: {
        value: 29, // 29 employees
        maxValue: 100,
        minValue: 1,
        reverseScale: true // Lower is better (closer to 1-person company)
    }
};

// Calculate percentages based on configuration
function calculatePercentage(config) {
    let percentage;
    if (config.reverseScale) {
        // For reverse scale (like team size where smaller is better)
        percentage = ((config.maxValue - config.value) / (config.maxValue - config.minValue)) * 100;
    } else {
        // For normal scale (like revenue where larger is better)
        percentage = ((config.value - config.minValue) / (config.maxValue - config.minValue)) * 100;
    }
    // Ensure percentage is between 0 and 100
    return Math.max(0, Math.min(100, percentage));
}

// Calculate and update progress bars when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Calculate percentages
    const revenuePercentage = calculatePercentage(progressConfig.revenuePerEmployee);
    const valuationPercentage = calculatePercentage(progressConfig.valuationPerEmployee);
    const teamSizePercentage = calculatePercentage(progressConfig.teamSize);
    
    console.log('Calculated percentages:', {
        revenuePercentage,
        valuationPercentage,
        teamSizePercentage
    });
    
    try {
        // Get all metric boxes
        const metricBoxes = document.querySelectorAll('.metric-box');
        console.log('Found metric boxes:', metricBoxes.length);
        
        if (metricBoxes.length >= 4) {
            // Revenue per employee (2nd box)
            const revenueBox = metricBoxes[1];
            const revenueBar = revenueBox.querySelector('.progress-bar-fill');
            const revenuePercentText = revenueBox.querySelector('.progress-percentage');
            
            if (revenueBar && revenuePercentText) {
                // Set initial width to 0 to ensure animation works
                revenueBar.style.width = '0%';
                
                // Force a reflow to ensure the animation works
                void revenueBar.offsetWidth;
                
                // Now set the actual width
                revenueBar.style.width = `${revenuePercentage}%`;
                revenuePercentText.style.left = `calc(${revenuePercentage}%)`;
                revenuePercentText.textContent = `${Math.round(revenuePercentage)}%`;
                console.log('Updated revenue progress bar to', revenuePercentage, '%');
            } else {
                console.error('Could not find revenue progress bar elements');
            }
            
            // Valuation per employee (3rd box)
            const valuationBox = metricBoxes[2];
            const valuationBar = valuationBox.querySelector('.progress-bar-fill');
            const valuationPercentText = valuationBox.querySelector('.progress-percentage');
            
            if (valuationBar && valuationPercentText) {
                // Set initial width to 0 to ensure animation works
                valuationBar.style.width = '0%';
                
                // Force a reflow to ensure the animation works
                void valuationBar.offsetWidth;
                
                // Now set the actual width
                valuationBar.style.width = `${valuationPercentage}%`;
                valuationPercentText.style.left = `calc(${valuationPercentage}%)`;
                valuationPercentText.textContent = `${Math.round(valuationPercentage)}%`;
                console.log('Updated valuation progress bar to', valuationPercentage, '%');
            } else {
                console.error('Could not find valuation progress bar elements');
            }
            
            // Team size (4th box)
            const teamSizeBox = metricBoxes[3];
            const teamSizeBar = teamSizeBox.querySelector('.progress-bar-fill');
            const teamSizePercentText = teamSizeBox.querySelector('.progress-percentage');
            
            if (teamSizeBar && teamSizePercentText) {
                // Set initial width to 0 to ensure animation works
                teamSizeBar.style.width = '0%';
                
                // Force a reflow to ensure the animation works
                void teamSizeBar.offsetWidth;
                
                // Now set the actual width
                teamSizeBar.style.width = `${teamSizePercentage}%`;
                teamSizePercentText.style.left = `calc(${teamSizePercentage}%)`;
                teamSizePercentText.textContent = `${Math.round(teamSizePercentage)}%`;
                console.log('Updated team size progress bar to', teamSizePercentage, '%');
            } else {
                console.error('Could not find team size progress bar elements');
            }
        } else {
            console.error('Not enough metric boxes found');
        }
    } catch (error) {
        console.error('Error updating progress bars:', error);
    }
});
