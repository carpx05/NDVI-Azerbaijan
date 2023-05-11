// Fetch a MODIS NDVI collection and select NDVI.
var col2 = ee.ImageCollection("MODIS/061/MYD13A2").select('NDVI');
var col1 = ee.ImageCollection("MODIS/061/MOD13A2").select('NDVI');
var col = col1.merge(col2);

var mask = ee.FeatureCollection("projects/ee-aa1465/assets/AZE0");
print(mask)

var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');

// Filter the FeatureCollection to get Azerbaijan.
var azerbaijan = countries.filter(ee.Filter.eq('country_na', 'Azerbaijan'));

Map.addLayer(azerbaijan, {color: 'blue'}, 'Azerbaijan Border');

Map.centerObject(mask);

Map.addLayer(mask);

// Define the regional bounds of animation frames.
var region = ee.Geometry.Polygon(
  [[[44.438, 41.899],
    [50.7, 41.923],
    [50.942, 38.338],
    [44.702, 38.303]]],
  null, false
);

// Add day-of-year (DOY) property to each image.
col = col.map(function(img) {
  var doy = ee.Date(img.get('system:time_start')).getRelative('day', 'year');
  return img.set('doy', doy);
});

// Get a collection of distinct images by 'doy'.
var distinctDOY = col.filterDate('2020-01-01', '2023-03-30');

// Define a filter that identifies which images from the complete
// collection match the DOY from the distinct DOY collection.
var filter = ee.Filter.equals({leftField: 'doy', rightField: 'doy'});

// Define a join.
var join = ee.Join.saveAll('doy_matches');

// Apply the join and convert the resulting FeatureCollection to an
// ImageCollection.
var joinCol = ee.ImageCollection(join.apply(distinctDOY, col, filter));

// Define RGB visualization parameters.
var visParams = {
  min: 0.0,
  max: 9000.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};

// Create RGB visualization images for use as animation frames.
var rgbVis = joinCol.map(function(img) {
  return img.visualize(visParams).clip(mask);
});

// Define GIF visualization arguments.
var gifParams = {
  'region': region,
  'dimensions': 400,
  'crs': 'EPSG:3857',
  'framesPerSecond': 10,
  'format': 'gif'
};
print(ui.Thumbnail(rgbVis, gifParams));

// Print the GIF URL to the console.
print( rgbVis.getVideoThumbURL(gifParams));
