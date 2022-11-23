import {ExecuteQuery} from '../../sqlite/DBHelper';

async function fetchExcludeCategories(locationId) {
  if (!locationId) return [];
  const query = `SELECT
                      product_categories
                      FROM touchpoints_smollans_data_categories
                      WHERE location_id = ?`;
  const res = await ExecuteQuery(query, [locationId]);
  if (res.rows && res.rows.length > 0) {
    const excludeCategories = res.rows.item(0).product_categories?.split(',');
    return excludeCategories || [];
  }
  return [];
}

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

async function fetchCategories(
  business_unit_id,
  client_id,
  placement_segment,
  categories,
  excludedCategories,
) {
  let query = `SELECT
                    c.category,ps.placement_segment
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
                      FROM
                      products_custom_master_field_data AS pcmfd
                      LEFT JOIN products_custom_master_fields as pcmf
                      ON pcmfd.custom_master_field_id = pcmf.product_custom_master_field_id AND pcmf.field_tag = 'category'
                      WHERE
                        pcmf.client_id = ${client_id}
                        AND pcmf.business_unit_id = ${business_unit_id}
                      AND pcmf.delete_status = 0
                  ) as c
                    ON psa.product_id = c.product_id
                  WHERE
                    psa.client_id = ${client_id}
                  AND psa.business_unit_id = ${business_unit_id}
                  AND psa.delete_status = 0
                  `;
  if (
    placement_segment &&
    placement_segment.length > 0 &&
    placement_segment[0] != ''
  ) {
    const placement_segment_comman_split = placement_segment
      .map(item => `'${item}'`)
      .join(', ');

    query += ` AND ps.placement_segment IN (${placement_segment_comman_split})`;
  }
  if (categories?.length > 0) {
    const categories_comma_split = categories
      .map(item => `'${item}'`)
      .join(', ');

    query += ` AND c.category IN (${categories_comma_split})`;
  }
  if (excludedCategories?.length > 0) {
    const exclude_categories_comma_split = excludedCategories
      .map(item => `'${item}'`)
      .join(', ');

    query += ` AND c.category NOT IN (${exclude_categories_comma_split})`;
  }

  if (
    placement_segment &&
    placement_segment.length > 0 &&
    placement_segment[0] != ''
  ) {
    query += ` GROUP BY ps.placement_segment,c.category`;
  } else {
    query += ` GROUP BY c.category`;
  }

  const res = await ExecuteQuery(query);
  const result = res.rows ? res.rows : [];
  const resultList = [];
  for (let i = 0; i < result.length; i++) {
    const item = result.item(i);
    resultList.push(item.category);
  }
  return resultList;
}
async function fetchBrand(
  categories,
  business_unit_id,
  client_id,
  form_question_id,
) {
  let query = `SELECT
                    name
                 FROM form_sku_brand_competitors
                 WHERE
                    client_id = ${client_id}
                AND business_unit_id = ${business_unit_id}
                AND type = "Brand"
                AND form_question_id = '${form_question_id}'`;

  if (categories?.length > 0) {
    const categories_comma_split = categories
      .map(item => `'${item}'`)
      .join(', ');

    query += ` AND category IN (${categories_comma_split})`;
  }

  query += ` GROUP BY form_question_id
                LIMIT 1`;
  const res = await ExecuteQuery(query);
  if (res.rows?.length > 0) {
    return res.rows.item(0).name;
  }
  return '';
}

async function fetchCompetitors(
  categories,
  business_unit_id,
  client_id,
  form_question_id,
) {
  let query = `SELECT
                  category,
                  name
                FROM form_sku_brand_competitors
                WHERE
                  client_id = ${client_id}
                AND business_unit_id = ${business_unit_id}
                AND type = "Competitor"
                AND form_question_id = ${form_question_id}`;

  if (categories?.length > 0) {
    const categories_comma_split = categories
      .map(item => `'${item}'`)
      .join(', ');

    query += ` AND category IN (${categories_comma_split})`;
  }

  query += ` ORDER BY category,name`;
  const res = await ExecuteQuery(query);
  const competitors = {};
  const result = res.rows ? res.rows : [];
  for (let i = 0; i < result.length; i++) {
    const item = result.item(i);
    const category = item.category;
    if (competitors[category]) {
      competitors[category].push(item.name);
    } else {
      competitors[category] = [item.name];
    }
  }
  return competitors;
}

async function getFormQuestionData(
  baseFormData,
  business_unit_id,
  client_id,
  postData,
  questionBody,
) {
  //await testQuery();
  const excludeCategories = await fetchExcludeCategories(postData?.location_id);
  const placement_segment =
    questionBody?.segmentation_placement_segment?.split(',');
  const categories = getCategories(questionBody);

  const categoryList = await fetchCategories(
    business_unit_id,
    client_id,
    placement_segment,
    categories,
    excludeCategories,
  );
  const form_question_id = questionBody?.form_question_id;
  const brand = await fetchBrand(
    categoryList,
    business_unit_id,
    client_id,
    form_question_id,
  );
  const competitors = await fetchCompetitors(
    categoryList,
    business_unit_id,
    client_id,
    form_question_id,
  );
  return {
    ...baseFormData,
    categories: categoryList,
    brand,
    competitors,
    market_targets: [],
    completed_data: [],
  };
}

export default {
  getFormQuestionData,
};
