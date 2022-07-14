export function getLeaderboardItems(data) {
  console.log('getLeaderboardItems', data);
  if (data && data.users) {
    return data.users.map(user => {
      return {
        ...user,
        id: user.user_id,
        name: user.username,
        description: user.region,
        overall_score: user.percent,
      };
    });
  }
  return [];
}

export function getTrendsData(data) {
  console.log('getTrendsData', data);
  if (data && data.graph) {
    return {
      months: data.graph.months,
      data: [
        {
          name: data.graph.location.label,
          overall_score: Object.values(data.graph.location.months),
        },
        {
          name: data.graph.group.label,
          overall_score: Object.values(data.graph.group.months),
        },
      ],
    };
  }
  return null;
}

export function getHistoryListItems(data) {
  console.log('getHistoryListItems', data);
  if (data && data.items) {
    return data.items.map(item => {
      return {
        ...item,
        id: item.submission_id,
        form_name: item.form_name,
        overall_score: item.score,
        date: item.date,
      };
    });
  }
  return [];
}
