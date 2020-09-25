# TRANSCRIPT

Topic: Visualization of COVID-19 Impact on US Labor Market

Team name: NinjaV

Team members:

- Amar Nath Jha <jhaa@usc.edu>
- Bolong Pan <bolongpa@usc.edu>
- Che Pai Kung <chepaiku@usc.edu>
- Yo Shuan Liu <yoshuanl@usc.edu>

---

## Slide 1, Introduction
- We will visualize the yearly unemployment rate between 2010-2019 and the monthly unemployment rate along with monthly the COVID19 confirmed cases in 2020
- This project addresses to those who want to get an idea of the US labor market before and after the outbreak of COVID-19.
- This issue is important because we need to know how COVID-19 and the following policy actions are impacting the U.S. labor market.

## Slide 2

## Slide 3

## Slide 4

## Slide 5, What others have done on the same topic
- Line chart that visualize the U.S. unemployment rate history since year 1929 with important events pointed out on the timeline.
- Visualization of the global rate of unemployment on a world map.
- Bar chart of weekly unemployment insurance claimed.

## Slide 6

## Slide 7
* Important features and designs
    * Connect the data with map. When clicking the map, the information of that state would show up.
    * Line bar charts that compare number of Covid cases with unemployment rate.
    * Compute the difference of unemployment with given timestamps and show which states suffer the most. 
* Challenges
    * As we do not have the experience with map plot, it might be the biggest challenge when building the project.
## Slide 8
* Data sources
    * Covid Data:  [CSSEGISandData/COVID-19](https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data)
    * Unemployment rate by state: [US Local Area Unemployment Statistics](https://www.bls.gov/lau/)
    * COVID-19 policy actions by state: [US Government Response to Coronavirus](https://www.usa.gov/coronavirus)
* Tools:
    * JavaScript/Jquery/D3
    * Inkscape
    * Python
## Slide 9
* Data Preprocessing:
    * Covid Data is separated by date, to make is easier to retrieve data, we will group them into a file or at least by month.
    * The unemployment rate files are separated by states, so we need to combine them together into a file.
    *   Extract important policies regarding Covid, such as lockdown policy.

## Slide 10

