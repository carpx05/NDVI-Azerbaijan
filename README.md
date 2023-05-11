# Normalized Difference Vegetation Index (NDVI) Data analysis for Azerbaijan

This repository contains the code and data necessary to perform NDVI analysis of Azerbaijan. NDVI (Normalized Difference Vegetation Index) is a widely used remote sensing index that provides information about vegetation health and productivity. 
This repository is the result of the `Visualizing and Analyzing Geospatial Dataset` Workshop conducted on 30th March 2023. We were asked to perform NDVI analysis of a country that have the same first letter as our name. Therefore, I chose Azerbaijan, a former Soviet republic surrounded by the Caspian Sea and the Caucasus Mountains, straddling Asia and Europe. 

## Data
The code is implemented in JavaScript and uses the GEE API to access and process satellite imagery from Landsat 8 and Sentinel-2, compute NDVI values, and export the results as a GeoTIFF file for visualization and further analysis in GIS software. The satellite imagery used in this analysis was obtained from the USGS Earth Explorer and the Copernicus Open Access Hub. The Landsat 8 scenes cover the period from 2013 to 2021, while the Sentinel-2 scenes cover the period from 2015 to 2021. The imagery is in Level-1C format and was preprocessed to remove clouds and atmospheric effects. Although this, repository only covers the period from 1st January 2020 to 30th March 2023 (the day of workshop). 
To run the code, you need to have a GEE account and the GEE API installed in your local environment. You can then copy the code to the GEE Code Editor, adjust the parameters if needed, and run the code.

## Results
The output of the code is a GeoTIFF file containing the NDVI values for each pixel in the study area. The file is exported to your GEE Assets folder, from where you can download it or visualize it in the GEE Map Viewer. You can also import the file into GIS software for further analysis or visualization.
