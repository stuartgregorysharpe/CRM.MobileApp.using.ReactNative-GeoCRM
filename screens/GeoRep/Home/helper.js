export const generateTabs = features => {
  var tabs = [];
  var allTabs = getAllTabs();
  allTabs.forEach((element, index) => {
    if (element.slug === 'main' || features.includes(element.slug)) {
      tabs = [...tabs, {name: element.title, slug: element.slug, id: index}];
    }
  });
  return tabs;
};

const getAllTabs = () => {
  return [
    {
      title: 'Main',
      slug: 'main',
    },
    {
      title: 'Actions',
      slug: 'actions_items',
    },
    {
      title: 'Leaderboard',
      slug: 'leaderboard',
    },
    {
      title: 'sales',
      slug: 'Sales',
    },
    {
      title: 'Orders',
      slug: 'dash_orders',
    },
    {
      title: 'Sales',
      slug: 'danone_sales_dash',
    },
  ];
};
