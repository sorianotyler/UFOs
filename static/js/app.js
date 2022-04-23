// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
const filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {
    
    // 4a. Save the element that was changed as a variable.
    let curr_element = d3.select(this);
    console.log(curr_element);
    // 4b. Save the value that was changed as a variable.
    let curr_value = curr_element.property("value");
    console.log(curr_value);
    // 4c. Save the id of the filter that was changed as a variable.
    //let filter_id = d3.select();
    let curr_id = curr_element.property("id");
    console.log(curr_id);
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (curr_id === "datetime"){
      filters.date  = [];
      if(curr_value != null ){
        filters.date = [curr_id, curr_value];
      } 
    } else if (curr_id === "city"){
      filters.city = [];
      if(curr_value != null ){
        filters.city = [curr_id, curr_value];
      }
    } else if (curr_id === "state"){
      filters.state = [];
      if(curr_value != null ){
        filters.state = [curr_id, curr_value];
      }
    } else if (curr_id === "country"){
      filters.country =[];
      if(curr_value != null ){
        filters.country = [curr_id, curr_value];
      }
    } else if (curr_id === "shape"){
      filters.shape =[];
      if(curr_value != null ){
        filters.shape = [curr_id, curr_value];
      }
    } 
   
    
    console.log(filters);
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filtered_data = tableData;
   
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    for (const filter in filters){
      console.log(filters[filter][1]);
      console.log(filters[filter][1] != "");
      console.log(filters[filter][0]);
      if (filters[filter][0] === "datetime" && filters[filter][1] != ""){
        filtered_data = filtered_data.filter(row => row.datetime === filters[filter][1]);
      } else if (filters[filter][0] === "city" &&  filters[filter][1] != ""){
        filtered_data = filtered_data.filter(row => row.city === filters[filter][1]);
      } else if (filters[filter][0] === "state" && filters[filter][1] != ""){
        filtered_data = filtered_data.filter(row => row.state === filters[filter][1]);
      } else if (filters[filter][0] === "country" && filters[filter][1] != ""){
        filtered_data = filtered_data.filter(row => row.country === filters[filter][1]);
      } else if (filters[filter][0] === "shape" && filters[filter][1] != ""){
        filtered_data = filtered_data.filter(row => row.shape === filters[filter][1]);
      } 
    }
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filtered_data);
  }
  
  // 2. Attach an event to listen for changes to each filter
  //console.log(d3.selectAll("#input"));
  d3.selectAll("input").on("change", updateFilters);
  // Build the table when the page loads
  buildTable(tableData);
