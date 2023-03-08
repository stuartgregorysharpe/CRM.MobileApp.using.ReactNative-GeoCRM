import {ExecuteQuery} from '../../sqlite/DBHelper';

const fetchTouchpointsFromDB = async (
  business_unit_id,
  client_id,
  form_question_id,
) => {
  const query = `SELECT
                  touchpoint
                  FROM forms_pos_touchpoints
                  WHERE
                    business_unit_id = ?
                    AND
                    client_id = ?
                    AND 
                    delete_status = 0
                    AND
                    form_question_id = ?
                  ORDER BY touchpoint`;
  const res = await ExecuteQuery(query, [
    business_unit_id,
    client_id,
    form_question_id,
  ]);
  const result = res.rows ? res.rows : [];
  const resultList = [];
  for (let i = 0; i < result.length; i++) {
    const item = result.item(i);
    resultList.push(item.touchpoint);
  }
  return resultList;
};
const fetchPlacementAreasFromDB = async (
  business_unit_id,
  client_id,
  form_question_id,
) => {
  const query = `SELECT
                      placement_type,
                      area
                  FROM forms_pos_placement_areas
                  WHERE
                      business_unit_id = ?
                    AND
                      client_id = ?
                    AND 
                      delete_status = 0
                    AND
                      form_question_id = ?
                  ORDER BY placement_type,area`;
  const res = await ExecuteQuery(query, [
    business_unit_id,
    client_id,
    form_question_id,
  ]);
  const result = res.rows ? res.rows : [];
  const resultList = [];
  for (let i = 0; i < result.length; i++) {
    const item = result.item(i);
    resultList.push({
      placement_type: item.placement_type,
      area: item.area,
    });
  }
  return resultList;
};

const fetchPOSProductsFromDB = async (business_unit_id, client_id) => {
  const query = `SELECT 
                  pcmd.product_id,
                  pcmd.brand,
                  pt.product_type,
                  pcmd.product_name,
                  pcmd.barcode
                FROM products_core_master_data as pcmd
                LEFT JOIN product_type as pt
                ON pcmd.product_type_id = pt.product_type_id
                WHERE pcmd.client_id = ?
                AND pcmd.business_unit_id = ?
                AND pcmd.delete_status = 0
                AND pcmd.product_tag = "POS"
                ORDER BY pt.product_type,pcmd.product_name`;
  const res = await ExecuteQuery(query, [client_id, business_unit_id]);
  const result = res.rows ? res.rows : [];
  const resultList = [];
  for (let i = 0; i < result.length; i++) {
    const item = result.item(i);
    resultList.push({
      product_id: item.product_id,
      brand: item.brand,
      product_type: item.product_type,
      product_name: item.product_name,
      barcode: item.barcode,
    });
  }
  return resultList;
};
async function getFormQuestionData(
  baseFormData,
  business_unit_id,
  client_id,
  postData,
  questionBody,
) {
  const pleacementAreas = {};
  const touchpoints = await fetchTouchpointsFromDB(
    business_unit_id,
    client_id,
    questionBody.form_question_id,
  );
  const placementAreaResult = await fetchPlacementAreasFromDB(
    business_unit_id,
    client_id,
    questionBody.form_question_id,
  );
  placementAreaResult.forEach(result => {
    if (pleacementAreas[result.placement_type]) {
      pleacementAreas[result.placement_type].push(result.area);
    } else {
      pleacementAreas[result.placement_type] = [result.area];
    }
  });
  const productsResult = await fetchPOSProductsFromDB(
    business_unit_id,
    client_id,
  );
  return {
    ...baseFormData,
    touchpoints,
    placement_areas: pleacementAreas,
    products: productsResult,
    image_timestamp : questionBody.image_timestamp.toString()
  };
}

export default {
  getFormQuestionData,
};
