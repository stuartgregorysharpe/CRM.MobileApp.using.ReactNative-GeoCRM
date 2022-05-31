export function groupByFeedbacksWithQuestionGroup(feedbacks) {
  if (!feedbacks) return [];
  if (feedbacks.length == 0) return [];
  let feedbackGroups = {};
  feedbacks.forEach(item => {
    const question_group_id = item.question_group_id;
    if (feedbackGroups[question_group_id] != null) {
      feedbackGroups[question_group_id].push(item);
    } else {
      feedbackGroups[question_group_id] = [];
      feedbackGroups[question_group_id].push(item);
    }
  });
  const sections = [];
  for (const question_group_id in feedbackGroups) {
    const question_group = feedbackGroups[question_group_id][0].question_group;
    sections.push({
      question_group_id: question_group_id,
      question_group: question_group,
      title: question_group,
      data: feedbackGroups[question_group_id],
    });
  }
  return sections;
}
