// Configuration for progress calculations and metrics
const progressConfig = {
    totalRevenue: {
        value: 2215200000
    },
    revenuePerEmployee: {
        value: 2789152,
        maxValue: 100000000,
        minValue: 0,
        reverseScale: false
    },
    valuationPerEmployee: {
        value: 145934343,
        maxValue: 1000000000,
        minValue: 0,
        reverseScale: false
    },
    teamSize: {
        value: 20,
        maxValue: 100,
        minValue: 1,
        reverseScale: true
    },
    totalTrackedCompanies: {
        value: 1200,
        displayAs: 'number'
    },
    weeklyTrackedCompanies: {
        value: 45,
        maxValue: 100,
        minValue: 0,
        reverseScale: false,
        displayAs: 'number'
    },
    averageGrowthRate: {
        value: 85,
        maxValue: 200,
        minValue: -50,
        reverseScale: false,
        displayAs: 'percent'
    }
};

function formatCurrency(value) {
    return '$' + value.toLocaleString('en-US');
}

function formatNumber(value) {
    return value.toLocaleString('en-US');
}

function formatValue(config) {
    switch(config.displayAs) {
        case 'currency':
            return formatCurrency(config.value);
        case 'percent':
            return `${config.value}%`;
        case 'number':
        default:
            return formatNumber(config.value);
    }
}

function calculatePercentage(config) {
    let percentage;
    if (config.reverseScale) {
        percentage = ((config.maxValue - config.value) / (config.maxValue - config.minValue)) * 100;
    } else {
        percentage = ((config.value - config.minValue) / (config.maxValue - config.minValue)) * 100;
    }
    return Math.max(0, Math.min(100, percentage));
}

function updateProgressBar(bar, percentText, percentage) {
    bar.style.width = '0%';
    percentText.style.left = '0%';
    percentText.textContent = '0%';
    
    void bar.offsetWidth;
    
    setTimeout(() => {
        bar.style.width = `${percentage}%`;
        percentText.style.left = `${percentage}%`;
        percentText.textContent = `${Math.round(percentage)}%`;
    }, 50);
}

window.addEventListener('DOMContentLoaded', () => {
    const revenuePercentage = calculatePercentage(progressConfig.revenuePerEmployee);
    const valuationPercentage = calculatePercentage(progressConfig.valuationPerEmployee);
    const teamSizePercentage = calculatePercentage(progressConfig.teamSize);
    const weeklyCompaniesPercentage = calculatePercentage(progressConfig.weeklyTrackedCompanies);
    const growthPercentage = calculatePercentage(progressConfig.averageGrowthRate);
    
    try {
        const metricBoxes = document.querySelectorAll('.metric-box');
        
        if (metricBoxes.length >= 7) {
            // Original 4 metrics
            metricBoxes[0].querySelector('.metric-value').textContent = 
                formatCurrency(progressConfig.totalRevenue.value);
            
            metricBoxes[1].querySelector('.metric-value').textContent = 
                formatCurrency(progressConfig.revenuePerEmployee.value);
            updateProgressBar(
                metricBoxes[1].querySelector('.progress-bar-fill'),
                metricBoxes[1].querySelector('.progress-percentage'),
                revenuePercentage
            );
            
            metricBoxes[2].querySelector('.metric-value').textContent = 
                formatCurrency(progressConfig.valuationPerEmployee.value);
            updateProgressBar(
                metricBoxes[2].querySelector('.progress-bar-fill'),
                metricBoxes[2].querySelector('.progress-percentage'),
                valuationPercentage
            );
            
            metricBoxes[3].querySelector('.metric-value').textContent = 
                formatNumber(progressConfig.teamSize.value);
            updateProgressBar(
                metricBoxes[3].querySelector('.progress-bar-fill'),
                metricBoxes[3].querySelector('.progress-percentage'),
                teamSizePercentage
            );
            
            // New metrics
            metricBoxes[4].querySelector('.metric-value').textContent = 
                formatValue(progressConfig.totalTrackedCompanies);
            
            metricBoxes[5].querySelector('.metric-value').textContent = 
                formatValue(progressConfig.weeklyTrackedCompanies);
            updateProgressBar(
                metricBoxes[5].querySelector('.progress-bar-fill'),
                metricBoxes[5].querySelector('.progress-percentage'),
                weeklyCompaniesPercentage
            );
            
            metricBoxes[6].querySelector('.metric-value').textContent = 
                formatValue(progressConfig.averageGrowthRate);
            updateProgressBar(
                metricBoxes[6].querySelector('.progress-bar-fill'),
                metricBoxes[6].querySelector('.progress-percentage'),
                growthPercentage
            );
        }
    } catch (error) {
        console.error('Error updating metrics:', error);
    }
});
