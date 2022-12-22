import { ExecuteQuery } from "../../sqlite/DBHelper";


const fetchDataFromDB = async(business_unit_id , client_id, form_question_id , location_id) => {


  
    var query = `SELECT
                    ffc.campaign_name,
                    ffc.form_fsu_campaign_id,
                    ffct.target,
                    ffca.total_placed,
                    (SELECT
                        DATE(added_date) AS 'last_placed_date'
                    FROM
                        form_fsu_campaign_answers
                    WHERE
                        form_question_id = ` + form_question_id + ` 
                        AND location_id = ` + location_id + `
                    AND fsu_campaign_id =ffc.form_fsu_campaign_id
                    ORDER BY
                        DATE(added_date)
                    LIMIT 1) as 'last_placed_date'
                FROM
                    'form_fsu_campaigns' AS ffc
                LEFT JOIN form_fsu_campaign_targets AS ffct
                ON
                    ffc.form_fsu_campaign_id = ffct.fsu_campaign_id 
                    AND ffc.form_question_id = ffct.form_question_id
                LEFT JOIN(
                    SELECT
                        SUM(placed) AS 'total_placed',
                        fsu_campaign_id,
                        location_id
                    FROM
                        form_fsu_campaign_answers
                    WHERE
                        form_question_id = ` + form_question_id + ` 
                        AND location_id = ` + location_id + ` 
                    GROUP BY
                        fsu_campaign_id
                ) AS ffca
                ON
                    ffc.form_fsu_campaign_id = ffca.fsu_campaign_id
                WHERE
                    ffc.form_question_id = ` + form_question_id + ` 
                    AND ffc.delete_status = 0 
                    AND ffc.status = 'active' 
                    AND ffct.delete_status = 0 
                    AND ffct.status = 'active' 
                    AND ffct.location_id = ` + location_id;
                        
        const res = await ExecuteQuery(query, []);
        const result = res.rows ? res.rows : [];
        console.log("response", result);
        const resultList = [];
        for (let i = 0; i < result.length; i++) {
            const item = result.item(i);      
            console.log("item =>" , item)      
            resultList.push(item);
        }

    return resultList;
}

const generateFormQuestionData = (campaignResults) => {

    var campaigns = []
    campaignResults.forEach((item) => {
        console.log("campaigns => ", item)
        var achieved = item.target == 0 || undefined ? 0 : item.total_placed / item.target * 100;
        var remaining = 0;
        if(item.target = 0) {
            remaining = 0
          } else if (item.target < item.total_placed) {
            remaining = 0
          } else {
            remaining = item.target - item.total_placed
        }

        campaigns.push({
            campaign_name : item.campaign_name,
            fsu_campaign_id: item.form_fsu_campaign_id,
            achieved: achieved,
            target : item.target,
            previous : {
                date : item.last_placed_date,
                placed: item.total_placed,
            },
            remaining: remaining
        });

    });

    return campaigns;
}


async function getFSUFormData(
    baseFormData,
    business_unit_id,
    client_id,
    postData,
    questionBody,
) {

    const campaigns = await fetchDataFromDB(
        business_unit_id,
        client_id,
        questionBody.form_question_id,
        postData.location_id
    );
    
    const campain = generateFormQuestionData(campaigns);

    return {
        ...baseFormData,
        campaigns : campain
    }

}


export default {
    getFSUFormData,
};

  