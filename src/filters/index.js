// import _ from 'lodash';

import _ from 'lodash';

export default {
  // Returns an object {count:Integer,items:filterItems[]}
  filterItems(table, type, field, filter, unfilteredItems) {
    const result = {};

    // console.log(this[type](filter.value, '900'));
    // console.log(filteredItems.length);

    // unfilteredItems.forEach((item) => {
    //   if (this[type](filter.value, item.fields[field])) {
    //     const index = filteredItems.indexOf(item);
    //     if (index > -1) {
    //       filteredItems.splice(index, 1);
    //     }
    //   }
    // });

    let item = '';
    Object.keys(unfilteredItems).forEach((key) => {
      item = unfilteredItems[key];
      if (this[type](filter.value, item.fields[field])) {
        // console.log(item);
        result[key] = item;
      }
    });
    // console.log(filteredItems.length);
    // if (filterType === 'Range') {
    //   Object.keys(data).forEach((key) => {
    //     if (this.range(filterValue, data[key].fields[field])) {
    //       result[key] = data[key];
    //       result[key].active = true;
    //     }
    //   });
    // } else if (filterType === 'String') {
    //   Object.keys(data).forEach((key) => {
    //     if (this.string(filterValue, data[key].fields[field])) {
    //       result[key] = data[key];
    //       result[key].active = true;
    //     }
    //   });
    // }
    // console.log(type);
    // console.log(filter);
    // console.log(result);
    return result;
  },
  // Returns true if match when provided single field value and filter value.
  range(range, data) {
    const rangeValues = range.split('-');
    const lowerRange = rangeValues[0];
    const upperRange = rangeValues[1];

    if (data > lowerRange && data < upperRange) {
      return true;
    }

    return false;
  },
  // Returns true if match when provided single field value and filter value.
  string(value, data) { // Returns true if match
    // console.log(`@filters string(value,data): value: ${value}, data: ${data}`);
    let targetField = '';
    targetField = data.toString().toLowerCase();
    // console.log(targetField.includes(value.toString().toLowerCase()));
    return targetField.includes(value.toString().toLowerCase());
  },
  // Returns true if match when provided single field value and filter value.
  switch(value, data) { // Returns true if match
    // console.log(`@filters string(value,data): value: ${value}, data: ${data}`);
    let targetField = '';
    // console.log('targetField');
    targetField = data;
    return targetField === true;
  },
  // Returns true if match when provided single field value and filter value.
  stringArray(value, data) { // Returns true if match
    // console.log(`@filters string(value,data): value: ${value}, data: ${data}`);
    let targetField = '';
    targetField = data.toString().toLowerCase();

    return targetField.includes(value.toLowerCase());
  },
  mergeUnique(a, b) {
    return a.concat(b.filter((v) => a.indexOf(v) === -1));
  },
  applyFilterGroup(filterGroup, recs) {
    let filtered = [];
    let merged = [];
    if (filterGroup.active) {
      filterGroup.filterValues.forEach((filter) => {
        filtered = recs;
        if (filter.active) {
          switch (filterGroup.type) {
            case 'switch':
              filtered = _.filter(recs, (r) => {
                const result = this.switch(filter.value, r.fields[filter.field]);
                return result;
              });
              break;
            case 'range':
              filtered = _.filter(recs, (r) => {
                const result = this.range(filter.value, r.fields[filter.field]);
                return result;
              });
              break;
            case 'string':
              filtered = _.filter(recs, (r) => {
                let result = [];
                if (r.fields[filter.field]) {
                  if (r.fields[filter.field].length > 0
                    && _.isArray(r.fields[filter.field])) {
                    result = this.stringArray(filter.value, r.fields[filter.field]);
                  } else if (_.isArray(r.fields[filter.field])) {
                    result = this.string(filter.value, r.fields[filter.field][0]);
                  } else {
                    result = this.string(filter.value, r.fields[filter.field]);
                  }
                }
                return result;
              });
              break;
            default:
              filtered = [];
          }
          merged = this.mergeUnique(merged, filtered);
          // return merged;
        }
        return 'No records';
      });
    }
    return merged;
  },
};
