import { useState, useEffect } from 'react';
import {Buffer} from 'buffer';

import getContributionData from './dataLoader';


function roundToOneDecimal(number) {
    return Math.round((number + Number.EPSILON) * 10) / 10;
}

function contributionDataToSVG(contributionData, duration='full-year') {
    if (!contributionData) return;

    const colors = ["#EAEDF0", "#8edd9d","#82d092","#75c486","#69b87b","#5dac70","#519f65","#45935a","#38874e","#2c7a43"];

    // const angle = 1.7;
    const angle = 4;
    // const size = 6;
    const size = 20;
    let i = 0, j = 0
    // ${duration === "full-year" ? 270 : 170}
    let svg = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0,0 480,${duration === "full-year" ? contributionData.days : 270}">
            ${[1, 2].map(k => `
                <filter id="brightness${k}">
                    <feComponentTransfer>
                        ${[..."RGB"].map(channel => `<feFunc${channel} type="linear" slope="${1 - k * 0.4}" />`).join("")}
                    </feComponentTransfer>
                </filter>`)
                .join("")
            }
            <g transform="scale(3) translate(30, 0)">`

    // for (const week of calendar.weeks) {
    for (const week of contributionData.contributions) {
        svg += `<g transform="translate(${i * angle}, ${i})">`
        j = 0;

        // for (const day of week.contributionDays) {
        for (const day of week.days) {
            // const ratio = (day.contributionCount / reference) || 0
            const ratio = (day.count / contributionData.max) || 0;
            const color = colors[Math.min(roundToOneDecimal(ratio) * 10, 9)];
            
            svg += `
                <g transform="translate(${j * -angle}, ${j + (1 - ratio) * size})">
                    <path fill="${color}" d="M${angle},2 0,1 ${angle},0 ${angle * 2},1 z" />
                    <path fill="${color}" filter="url(#brightness1)" d="M0,1 ${angle},2 ${angle},${2 + ratio * size} 0,${1 + ratio * size} z" />
                    <path fill="${color}" filter="url(#brightness2)" d="M${angle},2 ${angle * 2},1 ${angle * 2},${1 + ratio * size} ${angle},${2 + ratio * size} z" />
                </g>`;
            j++;
        }
        svg += "</g>";
        i++;
    }

    svg += "</g></svg>";

    const base64SVG = Buffer.from(svg, 'utf8').toString('base64');

    return base64SVG;
}

function ContributionCalendar() {
    const [loading, setLoading] = useState(false);
    const [contributionData, setContributionData] = useState(null);

    useEffect(() => {
        if (!contributionData) {
            getContributionData('comfuture', setContributionData, setLoading);
        }
    }, []);

    return (
        <img 
            src={`data:image/svg+xml;base64,${contributionDataToSVG(contributionData)}`} 
            height={250}
            // height={1000}
            width={750} 
            // width={1000}
            style={{ 
                display: 'block', 
                marginLeft: 'auto', 
                marginRight: 'auto',
            }} 
        />
    );
}

export default ContributionCalendar;
