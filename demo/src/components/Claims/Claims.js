import React from 'react';

import Donut from '../DonutChart/DonutChart';
import MapBox from '../../containers/MapBox/MapBox';

import classes from './Claims.module.css';

import NationalClaim from '../../assets/data/nationalUnemploymentWeeklyClaims.json';

const Claims = (props) => {
    var labels = ["Before Outbreak", "After Outbreak", "Latest"]
    var weeks = Object.keys(NationalClaim)
    var claimTypes = NationalClaim[weeks[0]].map(d => d.type);

    var donutsArray = []
    for (let i in weeks) {
        donutsArray.push(
            {
                week: weeks[i],
                data: NationalClaim[weeks[i]],
                label: labels[i]
            }
        )
    }
    console.log(donutsArray)
    const donuts = donutsArray.map(d => {
        return <Donut data={d.data} week={d.week} label={d.label} types={claimTypes} />
    })

    return (
        <div>
            <h1 style={{ margin: "1rem" }}>US Unemployment Insurance</h1>
            <p className={classes.Description}>According to the US Department of Labor, in order to receive unemployment insurance benefits,
            applicants need to file a claim with the unemployment insurance program in the state where you worked.
            Applicants are asked to file the claim weekly.
            If you fail to file timely each week, you will not be eligible for payment until you reactivate your claim again.
            </p>
            <br />

            <p className={classes.Description}>Below map shows the total number of jobless claim during the week 24 October 2020 of each state.
            We can see that California has the largest number of claim in the US during the week, following by New York and Texas.
            </p>
            <br />
            <MapBox />
            <p className={classes.Caption}>total number of jobless claim during the week 24 October 2020</p>

            <p className={classes.Description}>We can observe in this map that those states with higher COVID-19 cumulated confirmed cases so far, such as California, Texas, Florida and New York, also suffers from more jobless claims.
            Along with the visualization results in our Data Exploration page, we can conclude that: states with larger number of cumulated confirmed cases have higher unemployment rates than states with fewer confirmed cases,
            although the relationship between confirmed cases and unemployment rate is not always obvious in every state,
            we have to admit that how the state government and people are dealing with COVID-19 do influence its job market situation.
            </p>
            <br />

            <p className={classes.Description}>After exploring the relationship between labor market and COVID-19 confirmed cases, we will try to answer the question "Is the labor market recoverying from the impact of the pandemic?" from our point of view in the following paragraphs.
            </p>
            <br />

            <div className={classes.DonutLegend}>
                <div className={classes.LegendSquare} style={{ backgroundColor: "#B0C4DE" }} />
                <p className={classes.LegendLabel}>Initial Claim</p>
                <div className={classes.LegendSquare} style={{ backgroundColor: "#FFD966" }} />
                <p className={classes.LegendLabel}>Continued Claim</p>
            </div>
            <div className={classes.DonutsArea}>
                {donuts}
            </div>

            <p className={classes.Description}>The above donut charts show the relative proportion of the number of initial jobless claim and continued jobless claim
            in three periods: before the COVID-19 outbreak, after the COVID-19 outbreak and the latest time period.
            </p>
            <br />

            <p className={classes.Description}>Initial claim went sky-high to over 2M during the week of 21 March, which is also the peak of the number of initial claim until now (November 2020).
            The number coming mostly from Pennsylvania and California, while Pennsylvania announced the statewide closure of all "non-life sustaining businesses operations and services" and California annouced its "shelter in place" order on March 19 2020.
            </p>
            <br />

            <p className={classes.Description}>Comparing between the first and the third donut, we can observe at least two points:
            Firstly, the number of the total jobless claim is three times more than the week before the COVID-19 outbreak. Although stores and restaurants are reopening and job openings are increasing in latest weeks,
            the unemployment hole is still deep and lots of people are struggling to find even a part-time job.
            Moreover, we can see that the proportion of the continued jobless claim in the week 24 October is slightly larger than that before pandemic, which means most people who have lost their job haven't found a secure job until now.
            </p>
            <br />

            <p className={classes.Description}>By looking into the COVID-19 data, the unemployment rate history, and the number of jobless claim,
            we observed that the labor market in each state is severely influenced by the number of COVID cases and its related policy. And while the unemployment rate goes down slightly in recent weeks,
            we have yet a long way to go until we go back to the normal level before the pandemic. Before that, please stay safe and healthy, and follow the guidelines annouced by the state government.
            By doing so, we can fight this virus and eventually let the situation of our labor market becomes better.</p>
            <br />

            <p className={classes.Description}>Finally, thank you for visiting our site and exploring the data with us.</p>
            <br />
        </div>
    )
};

export default Claims;