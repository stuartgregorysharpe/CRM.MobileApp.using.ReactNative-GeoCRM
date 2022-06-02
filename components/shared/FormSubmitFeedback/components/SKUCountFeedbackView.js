import React, {useMemo} from 'react';
import SKUFeedbackTable from '../../SKUCount/components/SKUFeedbackTable';

const SKUCountFeedbackView = props => {
  const {data} = props;
  if (!data) return null;
  const brand = data.brand;
  constructTableData = item => {
    const completed_data = item.completed_data;
    if (!completed_data) return [];
    const categories = [];
    for (const category in item.completed_data.category_value) {
      categories.push(category);
    }

    return categories.map(category => {
      const brand = completed_data['category_value'][category] + '%';
      const market = completed_data['market_targets'][category] + '%';
      const fsi = completed_data['fsi_values'][category] + '%';
      const isHighlightFsi =
        Number(completed_data['fsi_values'][category]) >= 100;
      return {
        category,
        brand,
        market,
        fsi,
        isHighlightFsi,
      };
    });
  };
  const tableData = useMemo(() => constructTableData(data));
  return <SKUFeedbackTable tableData={tableData} brand={brand} />;
};

export default SKUCountFeedbackView;
