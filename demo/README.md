# Demo

To see our current work, type below commands in your targeted local folder:

* First, clone the project-ninjav folder:

  ```git clone https://github.com/DSCI-554/project-ninjav.git```


* Then,

  ```cd demo```

  ```npm install```

  ```npm run start```

* To build the app for production to the build folder:

  ```npm run build```
  

> Currently there might be some warnings showing up while starting/building the app.
> They are only warnings, not errors, and we will clear it in the near future,
> so don't panic :)

### List of visualizations

| Requirement                            | Label        |
| -------------------------------------- | ------------ |
| responsive d3 chart                    | responsive   |
| interactive d3 chart                   | interactive  |
| d3 chart with an animated transition   | animated     |
| d3 layout                              | layout       |
| d3 map                                 | map          |
| Mapbox map                             | mapbox       |

Table 1: Table of minimum requirements, 1 of each category is required.

In Table2, list all the charts and tables in your pages including minimum requirements labels when applicable.

| Page name                             | Chart description                         | Libraries used  | Requirement label |
| ------------------------------------- | ----------------------------------------- | --------------- | ----------------- |
| Home page - US Labor Market Overview  | word cloud                                | d3-cloud        |                   |
| Data Exploration                      | d3 map, d3 lollipop chart, d3 line chart  | d3, topojson    | responsive, interactive, animated, map |
| Unemployment Claims                   | Mapbox map, donut charts                  | d3              | responsive, Mapbox,layout                 |

Table2: Table of visualizations
