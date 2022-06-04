import { useState, useEffect } from 'react';
import {Buffer} from 'buffer';
import { Typography, Row, Col, Spin, Card } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';

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
    
    // const aspectRatio = 1.31868131868;
    const aspectRatio = 3.2;
    const width = 480;
    const height = Math.round(width / aspectRatio);

    // <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0,0 480,${duration === "full-year" ? contributionData.days : 270}">
    let svg = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x='0px' y='0px' width='100%' viewBox="0,0 ${width},${height}">
            ${[1, 2].map(k => `
                <filter id="brightness${k}">
                    <feComponentTransfer>
                        ${[..."RGB"].map(channel => `<feFunc${channel} type="linear" slope="${1 - k * 0.4}" />`).join("")}
                    </feComponentTransfer>
                </filter>`)
                .join("")
            }
            <g transform="scale(2) translate(25, -5)">`

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

function getCurrentWeekNumber() {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
          
    const weekNumber = Math.ceil((currentDate.getDay() + 1 + days) / 7);

    return weekNumber;
}

function getMedian(list) {
    if (list.length === 0) return 0;

    list.sort((a, b) => {
        return a - b;
    });

    const half = Math.floor(list.length / 2);

    if (list.length % 2) {
        return list[half];
    }
    
    return (list[half - 1] + list[half]) / 2.0;
}

function parseContributionData(contributionData) {
    const currentYear = new Date().getFullYear();
    const currentWeekNumber = getCurrentWeekNumber();
    const nWeeksFromPast = 52 - currentWeekNumber;

    const currentYearsHalf = contributionData.filter((contributions) => contributions.year === currentYear)[0].contributions.slice(0, currentWeekNumber - 1); // 0, currentWeekNumber + 1
    const lastYearsHalf = contributionData.filter((contributions) => contributions.year === currentYear - 1)[0].contributions.slice(52 - (nWeeksFromPast + 1), 52 + 1); // 52 - nWeeksFromPast + 1, 52 + 1
    const contributions = lastYearsHalf.concat(currentYearsHalf);

    return { 
        days: contributions.flatMap((contributionWeek) => contributionWeek.days.map((contributionDay) => contributionDay.count)),
        // max: Math.max(currentYearsContributionData.max, previousYearsContributionData.max), 
        max: Math.max(...contributions.flatMap((contributionWeek) => contributionWeek.days.map((contributionDay) => contributionDay.count))),
        // min: Math.min(currentYearsContributionData.min, previousYearsContributionData.min),
        min: Math.min(...contributions.flatMap((contributionWeek) => contributionWeek.days.map((contributionDay) => contributionDay.count))),
        // median: (currentYearsContributionData.median + previousYearsContributionData.median) / 2,  
        median: getMedian(contributions.flatMap((contributionWeek) => contributionWeek.days.map((contributionDay) => contributionDay.count))), 
        contributions: contributions,
    };
}

function ContributionCalendar(props) {
    const contributionData = parseContributionData(props.githubAccount.contributions);

    return (
        <div>     
            { contributionData && 
                <div>
                    <img 
                        src={`data:image/svg+xml;base64,${contributionDataToSVG(contributionData)}`} 
                        style={{ 
                            display: 'block', 
                            marginLeft: 'auto', 
                            marginRight: 'auto',
                            paddingTop: 24*3,
                        }} 
                    />

                    <div 
                        style={{
                            position: 'absolute',
                            width: '100%',
                            top: 0,
                            // right: 10, 
                            // paddingRight: 24,
                        }}
                    >
                        <Row>
                            <Col flex='auto'></Col>
                            <Col flex='314px'>
                                <Card bodyStyle={{ paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8 }}>
                                    <Row>
                                        <Col span={24}>
                                            <Typography.Text type='primary'>Daily contribution history from the past year:</Typography.Text>
                                        </Col>
                                    </Row>
                                    {/* <br/> */}

                                    <Row>
                                        <Col flex='160px'>
                                            <Typography.Text type='secondary'><CaretUpOutlined /> Max contributions:</Typography.Text>     
                                        </Col>
                                        <Col flex='auto' style={{ textAlign: 'right' }}>
                                            <Typography.Text type='secondary' style={{ textAlign: 'right' }}>{contributionData.max}&nbsp;</Typography.Text>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col flex='160px'>
                                            <Typography.Text type='secondary'><CaretDownOutlined /> Min contributions:</Typography.Text>
                                        </Col>
                                        <Col flex='auto' style={{ textAlign: 'right' }}>
                                            <Typography.Text type='secondary' style={{ textAlign: 'right' }}>{contributionData.min}&nbsp;</Typography.Text>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col flex='160px'>
                                            <Typography.Text type='secondary'><VerticalAlignMiddleOutlined /> Median contributions:</Typography.Text>
                                        </Col>
                                        <Col flex='auto' style={{ textAlign: 'right' }}>
                                            <Typography.Text type='secondary' style={{ textAlign: 'right' }}>{contributionData.median}&nbsp;</Typography.Text>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            {/* <Col flex='auto'></Col> */}
                        </Row>
                        
                        {/* <Row style={{ paddingBottom: 8 }}>
                            <Col span={8}></Col>
                            <Col span={16}>
                                <Typography.Text type='primary'>Daily contribution history from the past year:</Typography.Text>
                            </Col>
                        </Row>
                        
                        <Row justify="space-evenly">
                            <Col span={8}></Col>
                            <Col flex='260px'>
                                <Typography.Text type='secondary'><CaretUpOutlined /> Max contributions:</Typography.Text>
                                <br/>
                                <Typography.Text type='secondary'><CaretDownOutlined /> Min contributions:</Typography.Text>
                                <br/>
                                <Typography.Text type='secondary'><VerticalAlignMiddleOutlined /> Median contributions:</Typography.Text>
                            </Col>
                            <Col span={1} style={{ textAlign: 'right' }}>
                                <Typography.Text type='secondary'>{contributionData.max}</Typography.Text>
                                <br/>
                                <Typography.Text type='secondary'>{contributionData.min}</Typography.Text>
                                <br/>
                                <Typography.Text type='secondary'>{contributionData.median}</Typography.Text>
                                <br/>
                            </Col>
                            <Col flex={'auto'}></Col>
                        </Row> */}
                    </div>
                </div>
            }
        </div>
    );
}

export default ContributionCalendar;
