const formatQueryString = (days, forks, stars, helpIssues) => {
  const current = new Date();
  const past = new Date(current.getTime() - (60 * 60 * 24 * days * 1000));
  let month = past.getMonth() + 1;
  let day = past.getDate();
  const year = past.getFullYear();

  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  const queryDate = `${year}-${month}-${day}`;
  return `https://api.github.com/search/repositories?q=created:>${queryDate}+stars:>=${stars}+forks:>=${forks}+help-wanted-issues:>=${helpIssues}`;
};

module.exports.formatQueryString = formatQueryString;
