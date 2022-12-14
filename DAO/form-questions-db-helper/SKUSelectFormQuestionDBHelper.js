import {ExecuteQuery} from '../../sqlite/DBHelper';

function getCategories(questionBody) {
  const segmentation_category = questionBody?.segmentation_category;
  if (
    segmentation_category &&
    segmentation_category != 'All' &&
    segmentation_category != 'all' &&
    segmentation_category != ''
  ) {
    return segmentation_category.split(',');
  }
  return [];
}

async function fetchProducts(
  business_unit_id,
  client_id,
  group_split,
  region,
  customer_segment,
  placement_segment,
  product_group,
  categories,
) {
  let query = `SELECT
                      psa.product_group,
                      psa.product_id,
                      pcmd.product_name,
                      pcmd.barcode,
                      pcmd.sku_code,
                      c.category,
                      ps.placement_segment
                    FROM products_sku_allocation as psa
                    LEFT JOIN products_core_master_data as pcmd
                    ON psa.product_id = pcmd.product_id
                    LEFT JOIN (
                      SELECT
						pcmfd.product_id,
						pcmfd.field_data as 'placement_segment' 
					  FROM products_custom_master_field_data AS pcmfd
					  LEFT JOIN products_custom_master_fields as pcmf
					  ON pcmfd.custom_master_field_id = pcmf.product_custom_master_field_id AND pcmf.field_tag = 'placement_segment'
					  WHERE
						pcmf.client_id = ${client_id} 
					  AND pcmf.business_unit_id = ${business_unit_id}
					  AND pcmf.delete_status = 0
                    ) as ps
                   ON psa.product_id = ps.product_id
                   LEFT JOIN (
                    SELECT
						pcmfd.product_id,
						pcmfd.field_data as 'category'
					FROM products_custom_master_field_data AS pcmfd
					LEFT JOIN products_custom_master_fields as pcmf
					ON pcmfd.custom_master_field_id = pcmf.product_custom_master_field_id AND pcmf.field_tag = 'category'
					WHERE
						pcmf.client_id = ${client_id}
					AND pcmf.business_unit_id = ${business_unit_id}
					AND pcmf.delete_status = 0
                   ) as c
                   ON psa.product_id = c.product_id
                  WHERE psa.client_id = ${client_id}
                  AND psa.business_unit_id = ${business_unit_id}
                  AND psa.delete_status = 0
                  AND psa.group_split = '${group_split}'
                  AND psa.region = '${region}'
                  AND psa.customer_segment = '${customer_segment}'`;
  if (categories?.length > 0) {
    const categories_comma_split = categories
      .map(item => `'${item}'`)
      .join(', ');

    query += ` AND c.category IN (${categories_comma_split})`;
  }
  if (placement_segment?.length > 0) {
    const placement_segment_comma_split = placement_segment
      .map(item => `'${item}'`)
      .join(', ');

    query += ` AND ps.placement_segment IN (${placement_segment_comma_split})`;
  }
  if (product_group?.length > 0) {
    const product_group_comma_split = product_group
      .map(item => `'${item}'`)
      .join(', ');

    query += ` AND psa.product_group IN (${product_group_comma_split})`;
  }

  query += ` 
            GROUP BY psa.product_id
            ORDER BY psa.product_group, pcmd.product_name
            `;
  const res = await ExecuteQuery(query);
  const result = res.rows ? res.rows : [];
  const resultList = [];
  for (let i = 0; i < result.length; i++) {
    const item = result.item(i);
    resultList.push({...item});
  }
  return resultList;
}
async function getFormQuestionData(
  baseFormData,
  business_unit_id,
  client_id,
  postData,
  questionBody,
) {
  const group_split = questionBody['segmentation_retailer'];
  const region = questionBody['segmentation_region'];
  const customer_segment = questionBody['segmentation_segment'];
  const placement_segment =
    questionBody['segmentation_placement_segment'].split(',');
  const product_group = questionBody['segmentation_product_group'].split(',');
  const categories = getCategories(questionBody);
  const _products = await fetchProducts(
    business_unit_id,
    client_id,
    group_split,
    region,
    customer_segment,
    placement_segment,
    product_group,
    categories,
  );
  const products = {};
  _products.forEach(product => {
    const item = {
      product_id: product.product_id,
      label: product.product_name,
      barcode: product.barcode,
      product_code: product.sku_code,
    };
    if (products[product.product_group]) {
      products[product.product_group].push(item);
    } else {
      products[product.product_group] = [item];
    }
  });
  return {
    ...baseFormData,
    products,
    product_group,
  };
}

export default {
  getFormQuestionData,
};
